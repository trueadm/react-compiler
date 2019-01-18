import { pushOpcode, pushOpcodeValue } from "./opcodes";
import { assertType, getTypeAnnotationForExpression } from "./annotations";
import { getBindingPathRef, getReferenceFromExpression } from "./references";
import {
  getAllPathsFromMutatedBinding,
  getCachedRuntimeValue,
  getComponentName,
  getPathConditions,
  getRuntimeValueIndex,
  isCommonJsLikeRequireCall,
  isFbCxCall,
  isPrimitive,
  isReactCreateElement,
  isNodeWithinReactElementTemplate,
  joinPathConditions,
  markNodeAsUsed,
  moveOutCallExpressionFromTemplate,
  moveOutFunctionFromTemplate,
  normalizeOpcodes,
  pathContainsReactElement,
  updateCommonJSLikeRequireCallPathToCompiledPath,
  updateImportSyntaxPathToCompiledPath,
} from "./utils";
import {
  createOpcodesForJSXElement,
  createOpcodesForJSXFragment,
  createOpcodesForReactCreateElement,
} from "./react/elements";
import invariant from "./invariant";
import { createOpcodesForReactComputeFunction } from "./react/functions";
import { validateArgumentsDoNotContainTemplateNodes } from "./validation";
import * as t from "@babel/types";

export function createOpcodesForMutatedBinding(childPath, opcodes, state, componentPath, callback) {
  const { paths, binding } = getAllPathsFromMutatedBinding(childPath, state);
  if (paths.length === 0) {
    return null;
  }
  pushOpcode(opcodes, "MULTI_CONDITIONAL");
  pushOpcodeValue(opcodes, paths.length + 1, "MULTI_CONDITIONAL_SIZE");
  const reconcilerValueIndexForHostNode = state.reconciler.valueIndex++;
  pushOpcodeValue(opcodes, reconcilerValueIndexForHostNode, "HOST_NODE_VALUE_POINTER_INDEX");
  const reconcilerValueIndexForCase = state.reconciler.valueIndex++;
  pushOpcodeValue(opcodes, reconcilerValueIndexForCase, "CASE_VALUE_POINTER_INDEX");
  // Given that mutliple conditions might evalaute to true, we reverse the conditions.
  // This means the last condition we hit the evaluates to true is the one we use. The default
  // should always be the last case, so we add that on after all the paths are dealt with.
  paths.reverse();
  for (let { pathConditions, path } of paths) {
    const joinedPathConditionsNode = joinPathConditions(pathConditions, state);
    const conditionalValuePointer = getRuntimeValueIndex(joinedPathConditionsNode, state);
    pushOpcodeValue(opcodes, conditionalValuePointer);
    const pathOpcodes = [];
    callback(path, pathOpcodes);
    pushOpcodeValue(opcodes, normalizeOpcodes(pathOpcodes));
  }
  const node = binding.path.node;
  if (t.isVariableDeclarator(node)) {
    if (node.init !== null) {
      const elsePath = binding.path.get("init");
      const pathOpcodes = [];
      callback(elsePath, pathOpcodes);
      pushOpcodeValue(opcodes, normalizeOpcodes(pathOpcodes));
    } else {
      pushOpcodeValue(opcodes, t.numericLiteral(0));
    }
  } else {
    // TODO
    throw new Error("TODO");
  }
}

function createOpcodesForArrayExpression(path, refPath, opcodes, state, componentPath, isRoot, processNodeValueFunc) {
  const elementsPath = refPath.get("elements");
  if (elementsPath.length > 0) {
    for (let elementPath of elementsPath) {
      createOpcodesForNode(elementPath, elementPath, opcodes, state, componentPath, false, processNodeValueFunc);
    }
  }
}

function createOpcodesForCallExpression(path, refPath, opcodes, state, componentPath, isRoot, processNodeValueFunc) {
  if (isReactCreateElement(path, state)) {
    createOpcodesForReactCreateElement(refPath, opcodes, state, componentPath);
    return;
  }
  if (isFbCxCall(path, state)) {
    return;
  }
  // Check if any of the nodes passed as arguments contain template nodes
  validateArgumentsDoNotContainTemplateNodes(path, refPath, state);

  if (isNodeWithinReactElementTemplate(path, state)) {
    refPath.node.movedOut = true;
    moveOutCallExpressionFromTemplate(path, refPath, state);
  }
  if (assertType(path, getTypeAnnotationForExpression(refPath, state), true, state, "REACT_NODE")) {
    createOpcodesForCallExpressionReturningTemplateNodes(
      path,
      refPath,
      opcodes,
      state,
      componentPath,
      isRoot,
      processNodeValueFunc,
    );
    return;
  }
  const pathConditions = getPathConditions(componentPath, refPath, state);
  let node = refPath.node;
  if (pathConditions.length > 0 || isNodeWithinReactElementTemplate(path, state)) {
    node = getCachedRuntimeValue(node, state);
  }
  // TODO check if the condtion is used more than once?
  const runtimeValuePointer = getRuntimeValueIndex(node, state);
  if (isRoot) {
    pushOpcode(opcodes, "ROOT_DYNAMIC_VALUE", runtimeValuePointer);
  } else {
    pushOpcodeValue(opcodes, runtimeValuePointer);
  }
}

function createOpcodesForCallExpressionReturningTemplateNodes(
  childPath,
  childRefPath,
  opcodes,
  state,
  componentPath,
  isRoot,
  processNodeValueFunc,
) {
  const calleePath = getReferenceFromExpression(childRefPath.get("callee"), state);
  if (t.isIdentifier(calleePath.node) || t.isMemberExpression(calleePath.node)) {
    const cachedNode = getCachedRuntimeValue(childRefPath.node, state);
    const runtimeValuePointer = getRuntimeValueIndex(cachedNode, state);
    pushOpcode(opcodes, "REACT_NODE_TEMPLATE_FROM_FUNC_CALL", runtimeValuePointer);
    return;
  }
  const name = getComponentName(calleePath);
  const { isStatic, cachedOpcodes, templateOpcodes } = createOpcodesForReactComputeFunction(
    calleePath,
    state,
    false,
    null,
    processNodeValueFunc,
  );

  if (isStatic) {
    opcodes.push(...templateOpcodes);
  } else {
    if (state.externalPathRefs.has(calleePath)) {
      const pathRef = state.externalPathRefs.get(calleePath);

      if (isCommonJsLikeRequireCall(pathRef)) {
        state.applyPostTransform(() => {
          updateCommonJSLikeRequireCallPathToCompiledPath(pathRef);
        });
      } else if (t.isImportDefaultSpecifier(pathRef.node) || t.isImportSpecifier(pathRef.node)) {
        state.applyPostTransform(() => {
          updateImportSyntaxPathToCompiledPath(pathRef.parentPath);
        });
      }
      const moduleState = calleePath.moduleState;
      moduleState.needsCompiling();
    }
    pushOpcode(opcodes, "TEMPLATE_FROM_FUNC_CALL");
    let cachedOpcodesNode;

    if (cachedOpcodes === null) {
      const opcodesArray = normalizeOpcodes(templateOpcodes);
      opcodesArray.leadingComments = [{ type: "BlockComment", value: ` ${name} OPCODES` }];
      const computeFunctionCache = state.computeFunctionCache;
      cachedOpcodesNode = t.identifier("__opcodes__" + (computeFunctionCache.size - 1));
      computeFunctionCache.get(calleePath.node).cachedOpcodes = {
        node: cachedOpcodesNode,
        opcodesArray,
      };
    } else {
      cachedOpcodesNode = cachedOpcodes.node;
    }
    pushOpcodeValue(opcodes, cachedOpcodesNode, "OPCODES");
    const childNode = childRefPath.node;
    const node = getCachedRuntimeValue(childNode, state);
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    pushOpcodeValue(opcodes, runtimeValuePointer, "COMPUTE_VALUES");
  }
}

export function createOpcodesForConditionalExpressionTemplate(path, opcodes, state, callback) {
  const testPath = getReferenceFromExpression(path.get("test"), state);
  const test = testPath.node;
  pushOpcode(opcodes, "CONDITIONAL");
  let runtimeConditionalIndex;

  const runtimeConditionals = state.runtimeConditionals;
  if (runtimeConditionals.has(test)) {
    runtimeConditionalIndex = runtimeConditionals.get(test);
  } else {
    runtimeConditionalIndex = runtimeConditionals.size;
    runtimeConditionals.set(test, runtimeConditionalIndex);
  }

  const reconcilerValueIndex = state.reconciler.valueIndex++;
  pushOpcodeValue(opcodes, reconcilerValueIndex, "VALUE_POINTER_INDEX");
  const runtimeValuePointer = getRuntimeValueIndex(test, state);
  pushOpcodeValue(opcodes, runtimeValuePointer);
  const consequentOpcodes = [];
  const consequentPath = path.get("consequent");
  const consequentPathRef = getReferenceFromExpression(consequentPath, state);
  callback(consequentPathRef, consequentOpcodes);
  pushOpcodeValue(opcodes, normalizeOpcodes(consequentOpcodes), "CONDITIONAL_CONSEQUENT");

  const alternateOpcodes = [];
  const alternatePath = path.get("alternate");
  const alternatePathRef = getReferenceFromExpression(alternatePath, state);
  callback(alternatePathRef, alternateOpcodes);
  pushOpcodeValue(opcodes, normalizeOpcodes(alternateOpcodes), "CONDITIONAL_ALTERNATE");
}

export function createOpcodesForLogicalExpressionTemplate(path, opcodes, state, componentPath, isRoot, callback) {
  const operator = path.node.operator;
  if (operator === "||") {
    pushOpcode(opcodes, "LOGICAL_OR");
  } else {
    pushOpcode(opcodes, "LOGICAL_AND");
  }
  const leftOpcodes = [];
  const leftPath = path.get("left");
  const leftPathRef = getReferenceFromExpression(leftPath, state);
  callback(leftPathRef, leftOpcodes);
  pushOpcodeValue(opcodes, normalizeOpcodes(leftOpcodes), "LOGICAL_LEFT");

  const rightOpcodes = [];
  const rightPath = path.get("right");
  const rightPathhRef = getReferenceFromExpression(rightPath, state);
  callback(rightPathhRef, rightOpcodes);
  pushOpcodeValue(opcodes, normalizeOpcodes(rightOpcodes), "LOGICAL_RIGHT");
}

function createOpcodesForString(string, opcodes, isRoot, processNodeValueFunc) {
  if (processNodeValueFunc !== null) {
    string = processNodeValueFunc(string);
  }
  if (string === null) {
    return;
  }
  if (isRoot) {
    throw new Error("TODO");
  } else {
    pushOpcodeValue(opcodes, string);
  }
}

export function createOpcodesForNode(path, refPath, opcodes, state, componentPath, isRoot, processNodeValueFunc) {
  let node = refPath.node;

  if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
    if (isNodeWithinReactElementTemplate(refPath, state)) {
      moveOutFunctionFromTemplate(refPath);
    }
    const pathConditions = getPathConditions(componentPath, refPath, state);
    if (pathConditions.length > 0) {
      node = getCachedRuntimeValue(node, state);
    }
    // TODO check if the condtion is used more than once?
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    pushOpcodeValue(opcodes, runtimeValuePointer);
  } else if (t.isArrayExpression(node)) {
    createOpcodesForArrayExpression(path, refPath, opcodes, state, componentPath, isRoot, processNodeValueFunc);
  } else if (t.isCallExpression(node)) {
    createOpcodesForCallExpression(path, refPath, opcodes, state, componentPath, isRoot, processNodeValueFunc);
  } else if (t.isJSXElement(node)) {
    createOpcodesForJSXElement(refPath, opcodes, state, componentPath);
  } else if (t.isJSXFragment(node)) {
    createOpcodesForJSXFragment(refPath.get("children"), opcodes, state, componentPath);
  } else if (typeof node === "string") {
    createOpcodesForString(node, opcodes, isRoot, processNodeValueFunc);
  } else if (t.isJSXText(node) || isPrimitive(node)) {
    const parentNode = refPath.parentPath.node;
    // This string isn't constant
    if (t.isAssignmentExpression(parentNode) && (parentNode.operator === "+=" || parentNode.operator === "-=")) {
      const leftPathRef = getReferenceFromExpression(refPath.parentPath.get("left"), state);
      invariant(t.isIdentifier(leftPathRef), "TODO");
      markNodeAsUsed(parentNode.left);
      const bindingName = leftPathRef.node.name;
      const binding = getBindingPathRef(path, bindingName, state);
      const runtimeValuePointer = getRuntimeValueIndex(binding.identifier, state);
      if (isRoot) {
        pushOpcode(opcodes, "ROOT_DYNAMIC_VALUE", runtimeValuePointer);
      } else {
        pushOpcodeValue(opcodes, runtimeValuePointer);
      }
      return;
    }
    if (t.isNullLiteral(node)) {
      if (isRoot) {
        pushOpcode(opcodes, "ROOT_STATIC_VALUE", t.nullLiteral());
      } else {
        if (processNodeValueFunc !== null) {
          pushOpcodeValue(opcodes, processNodeValueFunc(node));
        } else {
          pushOpcodeValue(opcodes, node);
        }
      }
      return;
    }
    let text = node.value;
    if (processNodeValueFunc !== null) {
      text = processNodeValueFunc(text);
    }
    if (text !== null) {
      if (isRoot) {
        pushOpcode(opcodes, "ROOT_STATIC_VALUE", text);
      } else {
        pushOpcodeValue(opcodes, text);
      }
    }
  } else if (t.isConditionalExpression(node) && pathContainsReactElement(refPath, state)) {
    createOpcodesForConditionalExpressionTemplate(refPath, opcodes, state, (conditionalPath, conditionalOpcodes) => {
      createOpcodesForNode(
        conditionalPath,
        conditionalPath,
        conditionalOpcodes,
        state,
        componentPath,
        isRoot,
        processNodeValueFunc,
      );
    });
  } else if (t.isLogicalExpression(node) && pathContainsReactElement(refPath, state)) {
    createOpcodesForLogicalExpressionTemplate(
      refPath,
      opcodes,
      state,
      componentPath,
      isRoot,
      (conditionalPath, conditionalOpcodes) => {
        createOpcodesForNode(
          conditionalPath,
          conditionalPath,
          conditionalOpcodes,
          state,
          componentPath,
          isRoot,
          processNodeValueFunc,
        );
      },
    );
  } else if (
    t.isIdentifier(node) ||
    t.isMemberExpression(node) ||
    t.isConditionalExpression(node) ||
    t.isLogicalExpression(node) ||
    t.isUpdateExpression(node) ||
    t.isUnaryExpression(node) ||
    t.isFunctionExpression(node) ||
    t.isArrowFunctionExpression(node) ||
    t.isObjectExpression(node)
  ) {
    if (t.isIdentifier(node) && node.name === "undefined") {
      pushOpcodeValue(opcodes, t.identifier("undefined"));
      return;
    }
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    if (isRoot) {
      pushOpcode(opcodes, "ROOT_DYNAMIC_VALUE", runtimeValuePointer);
    } else {
      pushOpcodeValue(opcodes, runtimeValuePointer);
    }
  } else if (t.isFunctionDeclaration(node)) {
    const cachedNode = getCachedRuntimeValue(node, state);
    const runtimeValuePointer = getRuntimeValueIndex(cachedNode, state);
    if (isRoot) {
      pushOpcode(opcodes, "ROOT_DYNAMIC_VALUE", runtimeValuePointer);
    } else {
      pushOpcodeValue(opcodes, runtimeValuePointer);
    }
  } else if (t.isTemplateLiteral(node)) {
    if (node.expressions.length > 0) {
      const runtimeValuePointer = getRuntimeValueIndex(node, state);
      if (isRoot) {
        pushOpcode(opcodes, "ROOT_DYNAMIC_VALUE", runtimeValuePointer);
      } else {
        pushOpcodeValue(opcodes, runtimeValuePointer);
      }
    } else {
      for (let i = 0; i < node.quasis.length; i++) {
        const quasi = node.quasis[i];

        if (t.isTemplateElement(quasi)) {
          createOpcodesForString(quasi.value.raw, opcodes, false, processNodeValueFunc);
        } else {
          throw new Error("TODO");
        }
      }
    }
  } else if (t.isBinaryExpression(node)) {
    // Binary expressions can never have templates nodes?
    const leftPath = refPath.get("left");
    const rightPath = refPath.get("right");
    const leftExpression = getReferenceFromExpression(leftPath, state);
    const rightExpression = getReferenceFromExpression(rightPath, state);
    // If they are primitive, concat them together
    if (isPrimitive(leftExpression.node) && isPrimitive(rightExpression.node)) {
      createOpcodesForString(
        leftExpression.node.value + rightExpression.node.value,
        opcodes,
        isRoot,
        processNodeValueFunc,
      );
      return;
    }
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    pushOpcodeValue(opcodes, runtimeValuePointer);
  } else {
    throw new Error("TODO: found Babel node type that hasn't beed added to createOpcodesForNode");
  }
}
