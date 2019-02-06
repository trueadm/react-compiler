import { getReferenceFromExpression, isDestructuredRef, isIdentifierReferenceConstant } from "../references";
import {
  getCodeLocation,
  getRuntimeValueIndex,
  handleWhiteSpace,
  isHostComponentType,
  isReactCreateElement,
  isReactObject,
  markNodeAsUsed,
} from "../utils";
import { compileReactComputeFunction } from "./functions";
import * as t from "@babel/types";
import { ContextConsumerTemplateNode } from "../templates";

export function compileReactContextConsumer(namePath, childrenPath, state, componentPath) {
  const filteredChildrenPath = childrenPath.filter(childPath => {
    if (t.isJSXText(childPath.node) && handleWhiteSpace(childPath.node.value) === "") {
      return false;
    }
    return true;
  });
  if (filteredChildrenPath.length !== 1) {
    throw new Error(
      `Compiler failed to find a single child function for <Context.Consumer> at ${getCodeLocation(childrenPath.node)}`,
    );
  }
  const contextObjectValueIndex = getContextObjectRuntimeValueIndex(namePath, state);
  const childrenPathRef = getReferenceFromExpression(filteredChildrenPath[0], state);

  if (t.isIdentifier(childrenPathRef.node) && !isIdentifierReferenceConstant(childrenPathRef, state)) {
    throw new Error(
      `The compiler is not yet able to evaluate conditional <Context.Consumer> references at ${getCodeLocation(
        childrenPathRef.node,
      )}.`,
    );
  }
  if (t.isCallExpression(childrenPathRef.node)) {
    throw new Error(
      `The compiler is not yet able to evaluate <Context.Consumer> references to call expressions at ${getCodeLocation(
        childrenPathRef.node,
      )}.`,
    );
  }
  const { isStatic, templateNode } = compileReactComputeFunction(childrenPathRef, state, false, false);
  if (!isStatic) {
    const parentNode = childrenPathRef.parentPath.node;
    let computeFunctionValueIndex;

    if (t.isJSXExpressionContainer(parentNode) || isReactCreateElement(childrenPathRef.parentPath, state)) {
      computeFunctionValueIndex = getRuntimeValueIndex(childrenPathRef.node, state);
    } else if (t.isVariableDeclarator(parentNode) && t.isIdentifier(parentNode.id)) {
      computeFunctionValueIndex = getRuntimeValueIndex(parentNode.id, state);
      markNodeAsUsed(parentNode.id);
    } else {
      throw new Error("TODO");
    }
    return new ContextConsumerTemplateNode(contextObjectValueIndex, templateNode, computeFunctionValueIndex);
  }
  return templateNode;
}

function isReferenceReactContext(path, state) {
  const pathRef = getReferenceFromExpression(path, state);
  const objectNode = pathRef.node;

  if (t.isCallExpression(objectNode)) {
    const calleePath = pathRef.get("callee");
    const calleePathNode = calleePath.node;

    if (t.isMemberExpression(calleePathNode)) {
      const memberObjectPath = calleePath.get("object");

      if (
        isReactObject(memberObjectPath, state) &&
        t.isIdentifier(calleePathNode.property) &&
        calleePathNode.property.name === "createContext"
      ) {
        return true;
      }
    }
  }
  return false;
}

function isReferenceReactContextConsumerOrProvider(path, name, state) {
  const node = path.node;

  if (
    (t.isJSXMemberExpression(node) || t.isMemberExpression(node)) &&
    (t.isJSXIdentifier(node.property) || t.isIdentifier(node.property)) &&
    node.property.name === name
  ) {
    const objectPath = path.get("object");

    return isReferenceReactContext(objectPath, state);
  } else if ((t.isJSXIdentifier(node) || t.isIdentifier(node)) && !isHostComponentType(path, state)) {
    let pathRef = getReferenceFromExpression(path, state);

    if (isDestructuredRef(pathRef)) {
      pathRef = pathRef.object;
    }
    const pathRefNode = pathRef.node;

    if (
      t.isMemberExpression(pathRefNode) &&
      t.isIdentifier(pathRefNode.property) &&
      pathRefNode.property.name === name
    ) {
      const objectPath = pathRef.get("object");
      return isReferenceReactContext(objectPath, state);
    } else if (t.isCallExpression(pathRefNode)) {
      return isReferenceReactContext(pathRef, state) && node.name === name;
    }
  }
  return false;
}

export function isReferenceReactContextProvider(path, state) {
  return isReferenceReactContextConsumerOrProvider(path, "Provider", state);
}

export function isReferenceReactContextConsumer(path, state) {
  return isReferenceReactContextConsumerOrProvider(path, "Consumer", state);
}

export function getContextObjectRuntimeValueIndex(path, state) {
  let contextObjectPath;

  if (t.isJSXMemberExpression(path.node) || t.isMemberExpression(path.node)) {
    contextObjectPath = getReferenceFromExpression(path.get("object"), state);
  } else if (t.isJSXIdentifier(path.node) || t.isIdentifier(path.node)) {
    contextObjectPath = getReferenceFromExpression(path, state);
  } else {
    throw new Error("TODO");
  }
  let contextObjectRefNode;

  if (isDestructuredRef(contextObjectPath)) {
    contextObjectPath = contextObjectPath.object;
  }

  if (t.isVariableDeclarator(contextObjectPath.parentPath.node)) {
    contextObjectRefNode = contextObjectPath.parentPath.node.id;
  } else {
    throw new Error("TODO");
  }
  return getRuntimeValueIndex(contextObjectRefNode, state);
}
