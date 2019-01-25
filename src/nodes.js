import { pushOpcode, pushOpcodeValue } from "./opcodes";
import { assertType, getTypeAnnotationForExpression } from "./annotations";
import { getBindingPathRef, getReferenceFromExpression } from "./references";
import {
  getAllPathsFromMutatedBinding,
  getCachedRuntimeValue,
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
import { compileJSXElement, createOpcodesForJSXFragment, compileReactCreateElement } from "./react/elements";
import invariant from "./invariant";
import { compileReactComputeFunction } from "./react/functions";
import { validateArgumentsDoNotContainTemplateNodes } from "./validation";
import * as t from "@babel/types";
import {
  ConditionalTemplateNode,
  DynamicTextTemplateNode,
  DynamicValueTemplateNode,
  FragmentTemplateNode,
  MultiConditionalTemplateNode,
  StaticTextTemplateNode,
  TemplateFunctionCallTemplateNode,
} from "./templates";

export function compileMutatedBinding(childPath, state, componentPath, isRoot, processNodeValueFunc) {
  const { paths, binding } = getAllPathsFromMutatedBinding(childPath, state);
  if (paths.length === 0) {
    return null;
  }
  const templateNode = new MultiConditionalTemplateNode();
  // Given that mutliple conditions might evalaute to true, we reverse the conditions.
  // This means the last condition we hit the evaluates to true is the one we use. The default
  // should always be the last case, so we add that on after all the paths are dealt with.
  paths.reverse();
  for (let { pathConditions, path } of paths) {
    const joinedPathConditionsNode = joinPathConditions(pathConditions, state);
    const valueIndex = getRuntimeValueIndex(joinedPathConditionsNode, state);
    const conditionTemplateNode = compileNode(path, path, state, componentPath, isRoot, processNodeValueFunc);
    templateNode.conditions.push({ isDefault: false, valueIndex, conditionTemplateNode });
  }
  const node = binding.path.node;
  if (t.isVariableDeclarator(node)) {
    if (node.init !== null) {
      const elsePath = binding.path.get("init");
      const conditionTemplateNode = compileNode(elsePath, elsePath, state, componentPath, isRoot, processNodeValueFunc);
      templateNode.conditions.push({ isDefault: true, valueIndex: null, conditionTemplateNode });
    }
  } else {
    // TODO
    throw new Error("TODO");
  }
  return templateNode;
}

function compileArrayExpression(path, refPath, state, componentPath, isRoot, processNodeValueFunc) {
  const children = [];
  const elementsPath = refPath.get("elements");
  if (elementsPath.length > 0) {
    for (let elementPath of elementsPath) {
      children.push(compileNode(elementPath, elementPath, state, componentPath, false, processNodeValueFunc));
    }
  }
  if (children.length === 1) {
    return children[0];
  }
  return new FragmentTemplateNode(children);
}

function compileCallExpression(path, refPath, state, componentPath, isRoot, processNodeValueFunc) {
  if (isReactCreateElement(path, state)) {
    return compileReactCreateElement(refPath, state, componentPath);
  }
  if (isFbCxCall(path, state)) {
    return null;
  }
  // Check if any of the nodes passed as arguments contain template nodes
  validateArgumentsDoNotContainTemplateNodes(path, refPath, state);

  if (isNodeWithinReactElementTemplate(path, state)) {
    refPath.node.movedOut = true;
    moveOutCallExpressionFromTemplate(path, refPath, state);
  }
  if (assertType(path, getTypeAnnotationForExpression(refPath, state), true, state, "REACT_NODE")) {
    return compileCallExpressionReturningTemplateNodes(
      path,
      refPath,
      state,
      componentPath,
      isRoot,
      processNodeValueFunc,
    );
  }
  const pathConditions = getPathConditions(componentPath, refPath, state);
  let node = refPath.node;
  if (pathConditions.length > 0 || isNodeWithinReactElementTemplate(path, state)) {
    node = getCachedRuntimeValue(node, state);
  }
  // TODO check if the condtion is used more than once?
  const runtimeValuePointer = getRuntimeValueIndex(node, state);
  return new DynamicValueTemplateNode(runtimeValuePointer);
}

function compileCallExpressionReturningTemplateNodes(
  childPath,
  childRefPath,
  state,
  componentPath,
  isRoot,
  processNodeValueFunc,
) {
  const calleePath = getReferenceFromExpression(childRefPath.get("callee"), state);
  if (t.isIdentifier(calleePath.node) || t.isMemberExpression(calleePath.node)) {
    debugger;
    const cachedNode = getCachedRuntimeValue(childRefPath.node, state);
    const runtimeValuePointer = getRuntimeValueIndex(cachedNode, state);
    pushOpcode(opcodes, "REACT_NODE_TEMPLATE_FROM_FUNC_CALL", runtimeValuePointer);
    return;
  }
  const { isStatic, templateNode } = compileReactComputeFunction(calleePath, state, false, null, processNodeValueFunc);

  if (isStatic) {
    return templateNode;
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
    const childNode = childRefPath.node;
    const node = getCachedRuntimeValue(childNode, state);
    const computeFunctionValueIndex = getRuntimeValueIndex(node, state);
    return new TemplateFunctionCallTemplateNode(templateNode, computeFunctionValueIndex);
  }
}

export function compileConditionalExpressionTemplate(path, state, componentPath, isRoot, processNodeValueFunc) {
  const testPath = getReferenceFromExpression(path.get("test"), state);
  const test = testPath.node;
  let runtimeConditionalIndex;

  const runtimeConditionals = state.runtimeConditionals;
  if (runtimeConditionals.has(test)) {
    runtimeConditionalIndex = runtimeConditionals.get(test);
  } else {
    runtimeConditionalIndex = runtimeConditionals.size;
    runtimeConditionals.set(test, runtimeConditionalIndex);
  }
  const valueIndex = getRuntimeValueIndex(test, state);

  const consequentPath = path.get("consequent");
  const consequentPathRef = getReferenceFromExpression(consequentPath, state);
  const consequentTemplateNode = compileNode(consequentPath, consequentPathRef, state, componentPath, isRoot);

  const alternatePath = path.get("alternate");
  const alternatePathRef = getReferenceFromExpression(alternatePath, state);
  const alternateTemplateNode = compileNode(
    alternatePath,
    alternatePathRef,
    state,
    componentPath,
    isRoot,
    processNodeValueFunc,
  );

  return new ConditionalTemplateNode(valueIndex, consequentTemplateNode, alternateTemplateNode);
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

function compileString(string, isRoot, processNodeValueFunc) {
  if (processNodeValueFunc !== null) {
    string = processNodeValueFunc(string);
  }
  if (string === null) {
    return null;
  }
  if (isRoot) {
    throw new Error("TODO");
  } else {
    return new StaticTextTemplateNode(string);
  }
}

export function compileNode(path, refPath, state, componentPath, isRoot, processNodeValueFunc) {
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
    const valueIndex = getRuntimeValueIndex(node, state);
    return new DynamicValueTemplateNode(valueIndex);
  } else if (t.isArrayExpression(node)) {
    return compileArrayExpression(path, refPath, state, componentPath, isRoot, processNodeValueFunc);
  } else if (t.isCallExpression(node)) {
    return compileCallExpression(path, refPath, state, componentPath, isRoot, processNodeValueFunc);
  } else if (t.isJSXElement(node)) {
    return compileJSXElement(refPath, state, componentPath);
  } else if (t.isJSXFragment(node)) {
    createOpcodesForJSXFragment(refPath.get("children"), opcodes, state, componentPath);
  } else if (typeof node === "string") {
    return compileString(node, isRoot, processNodeValueFunc);
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
      return new DynamicTextTemplateNode(runtimeValuePointer);
    }
    if (t.isNullLiteral(node)) {
      if (processNodeValueFunc !== null) {
        return new StaticTextTemplateNode(processNodeValueFunc(node));
      } else {
        return new StaticTextTemplateNode(node.value);
      }
    }
    let text = node.value;
    if (processNodeValueFunc !== null) {
      text = processNodeValueFunc(text);
    }
    if (text !== null) {
      return new StaticTextTemplateNode(text);
    }
    return null;
  } else if (t.isConditionalExpression(node) && pathContainsReactElement(refPath, state)) {
    return compileConditionalExpressionTemplate(refPath, state, componentPath, isRoot, processNodeValueFunc);
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
      throw new Error("Should we really be doing this?");
      return null;
    }
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    return new DynamicValueTemplateNode(runtimeValuePointer);
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
        const templateNodes = [];

        if (t.isTemplateElement(quasi)) {
          templateNodes.push(compileString(quasi.value.raw, false, processNodeValueFunc));
        } else {
          throw new Error("TODO");
        }

        if (templateNodes.length === 1) {
          return templateNodes[0];
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
      return compileString(leftExpression.node.value + rightExpression.node.value, isRoot, processNodeValueFunc);
    }
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    return new DynamicValueTemplateNode(runtimeValuePointer);
  } else {
    throw new Error("TODO: found Babel node type that hasn't beed added to createOpcodesForNode");
  }
}
