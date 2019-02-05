import { assertType, getTypeAnnotationForExpression } from "./annotations";
import { getBindingPathRef, getReferenceFromExpression, isIdentifierReferenceConstant } from "./references";
import {
  escapeText,
  getAllPathsFromMutatedBinding,
  getCachedRuntimeValue,
  getPathConditions,
  getRuntimeValueIndex,
  handleWhiteSpace,
  isCommonJsLikeRequireCall,
  isFbCxCall,
  isPrimitive,
  isReactCreateElement,
  isNodeWithinReactElementTemplate,
  joinPathConditions,
  markNodeAsUsed,
  moveOutCallExpressionFromTemplate,
  moveOutFunctionFromTemplate,
  pathContainsReactElement,
  updateCommonJSLikeRequireCallPathToCompiledPath,
  updateImportSyntaxPathToCompiledPath,
} from "./utils";
import { compileJSXElement, compileJSXFragment, compileReactCreateElement } from "./react/elements";
import invariant from "./invariant";
import { compileReactComputeFunction } from "./react/functions";
import { validateArgumentsDoNotContainTemplateNodes } from "./validation";
import * as t from "@babel/types";
import {
  ConditionalTemplateNode,
  DynamicTextTemplateNode,
  DynamicValueTemplateNode,
  FragmentTemplateNode,
  LogicalTemplateNode,
  MultiConditionalTemplateNode,
  StaticTextTemplateNode,
  TemplateFunctionCallTemplateNode,
  StaticValueTemplateNode,
  ReferenceVNode,
} from "./templates";

export function compileMutatedBinding(childPath, state, componentPath, isRoot) {
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
    const conditionTemplateNode = compileNode(path, path, state, componentPath, isRoot);
    templateNode.conditions.push({ isDefault: false, valueIndex, conditionTemplateNode });
  }
  const node = binding.path.node;
  if (t.isVariableDeclarator(node)) {
    if (node.init !== null) {
      const elsePath = binding.path.get("init");
      const conditionTemplateNode = compileNode(elsePath, elsePath, state, componentPath, isRoot);
      templateNode.conditions.push({ isDefault: true, valueIndex: null, conditionTemplateNode });
    }
  } else {
    // TODO
    throw new Error("TODO");
  }
  return templateNode;
}

function compileArrayExpression(path, refPath, state, componentPath, isRoot) {
  const children = [];
  const elementsPath = refPath.get("elements");
  if (elementsPath.length > 0) {
    for (let elementPath of elementsPath) {
      children.push(compileNode(elementPath, elementPath, state, componentPath, false));
    }
  }
  if (children.length === 1) {
    return children[0];
  }
  return new FragmentTemplateNode(children);
}

function compileCallExpression(path, refPath, state, componentPath, isRoot) {
  if (isReactCreateElement(refPath, state)) {
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
    return compileCallExpressionReturningTemplateNodes(path, refPath, state, componentPath, isRoot);
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

function compileCallExpressionReturningTemplateNodes(childPath, childRefPath, state, componentPath, isRoot) {
  const calleePath = getReferenceFromExpression(childRefPath.get("callee"), state);
  if (t.isIdentifier(calleePath.node) || t.isMemberExpression(calleePath.node)) {
    const cachedNode = getCachedRuntimeValue(childRefPath.node, state);
    const runtimeValuePointer = getRuntimeValueIndex(cachedNode, state);
    return new ReferenceVNode(runtimeValuePointer);
  }
  const { isStatic, templateNode } = compileReactComputeFunction(calleePath, state, false, null, false);

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

export function compileConditionalExpressionTemplate(path, state, componentPath, isRoot) {
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
  const alternateTemplateNode = compileNode(alternatePath, alternatePathRef, state, componentPath, isRoot);

  return new ConditionalTemplateNode(valueIndex, consequentTemplateNode, alternateTemplateNode);
}

export function compileLogicalExpressionTemplate(path, state, componentPath, isRoot) {
  const operator = path.node.operator;
  const leftPath = path.get("left");
  const leftPathRef = getReferenceFromExpression(leftPath, state);
  const leftTemplateNode = compileNode(leftPath, leftPathRef, state, componentPath, isRoot);
  const rightPath = path.get("right");
  const rightPathRef = getReferenceFromExpression(rightPath, state);
  const rightTemplateNode = compileNode(rightPath, rightPathRef, state, componentPath, isRoot);
  return new LogicalTemplateNode(operator, leftTemplateNode, rightTemplateNode);
}

function compileString(string) {
  if (string === null) {
    return null;
  }
  return new StaticTextTemplateNode(handleWhiteSpace(escapeText(string)));
}

export function compileNode(path, refPath, state, componentPath, isRoot) {
  let node = refPath.node;

  if (t.isIdentifier(node) && pathContainsReactElement(refPath, state)) {
    if (isIdentifierReferenceConstant(refPath, state)) {
      const runtimeValueIndex = getRuntimeValueIndex(node, state);
      return new ReferenceVNode(runtimeValueIndex);
    } else {
      return compileMutatedBinding(refPath, state, componentPath, false);
    }
  } else if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
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
    return compileArrayExpression(path, refPath, state, componentPath, isRoot);
  } else if (t.isCallExpression(node)) {
    return compileCallExpression(path, refPath, state, componentPath, isRoot);
  } else if (t.isJSXElement(node)) {
    return compileJSXElement(refPath, state, componentPath);
  } else if (t.isJSXFragment(node)) {
    const attributesPath = refPath.get("openingFragment").get("attributes");
    return compileJSXFragment(refPath.get("children"), attributesPath, state, componentPath, isRoot);
  } else if (typeof node === "string") {
    return compileString(node);
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
    if (typeof node.value === "string") {
      return compileString(node.value);
    }
    if (t.isNullLiteral(node)) {
      return new StaticValueTemplateNode(null);
    }
    return new StaticValueTemplateNode(node.value);
  } else if (t.isConditionalExpression(node) && pathContainsReactElement(refPath, state)) {
    return compileConditionalExpressionTemplate(refPath, state, componentPath, isRoot);
  } else if (t.isLogicalExpression(node) && pathContainsReactElement(refPath, state)) {
    return compileLogicalExpressionTemplate(refPath, state, componentPath, isRoot);
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
      return new StaticValueTemplateNode(undefined);
    }
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    return new DynamicValueTemplateNode(runtimeValuePointer);
  } else if (t.isFunctionDeclaration(node)) {
    const cachedNode = getCachedRuntimeValue(node, state);
    const valueIndex = getRuntimeValueIndex(cachedNode, state);
    return new DynamicValueTemplateNode(valueIndex);
  } else if (t.isTemplateLiteral(node)) {
    if (node.expressions.length > 0) {
      const valueIndex = getRuntimeValueIndex(node, state);
      return new DynamicValueTemplateNode(valueIndex);
    } else {
      for (let i = 0; i < node.quasis.length; i++) {
        const quasi = node.quasis[i];
        const templateNodes = [];

        if (t.isTemplateElement(quasi)) {
          templateNodes.push(compileString(quasi.value.raw));
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
      return compileString(leftExpression.node.value + rightExpression.node.value);
    }
    const runtimeValuePointer = getRuntimeValueIndex(node, state);
    return new DynamicValueTemplateNode(runtimeValuePointer);
  } else {
    throw new Error("TODO: found Babel node type that hasn't beed added to createOpcodesForNode");
  }
}
