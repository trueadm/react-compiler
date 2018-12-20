import * as t from "@babel/types";
import traverse from "@babel/traverse";
import { getCodeLocation, getComponentName, getProgramPath, isReactCreateElement } from "./utils";
import { assertType, getTypeAnnotationForExpression } from "./annotations";
import { getBindingPathRef, getReferenceFromExpression } from "./references";

function arrayMethodMutates(arrayMethod) {
  return (
    arrayMethod === "push" ||
    arrayMethod === "splice" ||
    arrayMethod === "unshift" ||
    arrayMethod === "pop" ||
    arrayMethod === "shift" ||
    arrayMethod === "sort" ||
    arrayMethod === "reverse" ||
    arrayMethod === "fill"
  );
}

export function validateArrayHasNotBeenMutated(path, bindingName, state) {
  const binding = getBindingPathRef(path, bindingName, state);
  // Check if any array mutation occurs, then throw an error if found.
  // TODO check if the array is passed to the outside or to another
  // function, where it might be mutated.
  for (let referencePath of binding.referencePaths) {
    const parentPath = referencePath.parentPath;
    const parentNode = parentPath.node;

    if (t.isMemberExpression(parentNode) && t.isIdentifier(parentNode.property)) {
      const arrayMethod = parentNode.property.name;
      if (arrayMethodMutates(arrayMethod)) {
        throw new Error(
          `The compiler does not support mutated arrays that are used as part of a component's render. Found mutating array method "${bindingName}.${arrayMethod}(...)" at ${getCodeLocation(
            path.node,
          )}`,
        );
      }
    }
  }
  // Check if the array has been updated via square bracket notation
  const programPath = getProgramPath(path);
  programPath.traverse({
    AssignmentExpression(assignPath) {
      const node = assignPath.node;

      if (
        t.isMemberExpression(node.left) &&
        t.isIdentifier(node.left.object) &&
        node.left.object.name === bindingName
      ) {
        throw new Error(
          `The compiler does not support mutated arrays that are used as part of a component's render. Found direct array mutation at ${getCodeLocation(
            assignPath.node,
          )}`,
        );
      }
    },
  });
}

export function validateArgumentsDoNotContainTemplateNodes(path, refPath, state) {
  const argumentsPath = refPath.get("arguments");
  for (let argPath of argumentsPath) {
    const argPathRef = getReferenceFromExpression(argPath, state);
    const typeAnnotation = getTypeAnnotationForExpression(argPath, state);

    if (
      t.isJSXElement(argPathRef.node) ||
      (assertType(path, typeAnnotation, true, state, "REACT_NODE") &&
        !t.isArrowFunctionExpression(argPathRef.node) &&
        !t.isFunctionExpression(argPathRef.node) &&
        !t.isFunctionDeclaration(argPathRef.node))
    ) {
      throw new Error(
        `The compiler does not currently support passing of React elements to function calls at ${getCodeLocation(
          refPath.node,
        )}`,
      );
    }
  }
}

export function validateReactElementsHaveAllBeenCompiled(moduleAst, state) {
  traverse(moduleAst, {
    JSXElement(path) {
      throw new Error(
        `The compiler failed to reach JSX node and compile it away at ${getCodeLocation(
          path.node,
        )}. This is likely due to an unsupported code style or due to the complexity of the component code.`,
      );
    },
    CallExpression(path) {
      if (
        t.isIdentifier(path.node.callee) &&
        (path.node.callee.name === "createTemplateNode" || path.node.callee.name === "createReactNode")
      ) {
        return;
      }
      if (isReactCreateElement(path, state)) {
        throw new Error(
          `The compiler failed to reach React.createElement and compile it away at ${getCodeLocation(
            path.node,
          )}. This is likely due to an unsupported code style or due to the complexity of the component code.`,
        );
      }
    },
  });
}

export function validateFunctionComponentUsesDestructuredProps(path) {
  const node = path.node;
  const name = getComponentName(path);

  if (node.params.length > 0 && !t.isObjectPattern(node.params[0])) {
    throw new Error(`Compilation failed on component "${name}". "props" argument must be a destructured object.`);
  }
}

export function validateParamsDoNotConflictOuterScope(params, componentPath, path, state) {
  for (let param of params) {
    if (t.isIdentifier(param)) {
      const paramName = param.name;
      const binding = componentPath.scope.getBinding(paramName);
      if (binding !== undefined && binding.path !== path) {
        throw new Error(
          `Compilation failed due to a function paramater of the same name being created in an outer scope at ${getCodeLocation(
            path.node,
          )}`,
        );
      }
    }
  }
}
