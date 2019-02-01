import { getBindingPathRef, getReferenceFromExpression } from "../references";
import { getComponentName, getShapeOfPropsObject, isReactHook, markNodeAsUsed } from "../utils";
import { compileReactComputeFunction } from "./functions";
import { getTypeAnnotationForExpression } from "../annotations";
import { ComponentTemplateNode } from "../templates";
import * as t from "@babel/types";

export function compileReactFunctionComponent(componentPath, state) {
  const computeFunction = componentPath.node;
  const name = getComponentName(componentPath);
  const functionKind = componentPath.scope.getBinding(name).kind;
  const binding = getBindingPathRef(componentPath, name, state);
  const shapeOfPropsObject = getShapeOfPropsObject(componentPath, state);
  const typeAnnotation = getTypeAnnotationForExpression(componentPath, state, false);
  const defaultProps = getDefaultPropsObjectExpressionPath(binding, state);
  const componentUsesHooks = doesFunctionComponentUseHooks(componentPath, state);
  const isRootComponent = state.isRootComponent;
  const componentTemplateNode = new ComponentTemplateNode(
    name,
    componentPath,
    isRootComponent,
    componentUsesHooks,
    defaultProps,
    functionKind,
    typeAnnotation,
    shapeOfPropsObject,
  );
  state.compiledComponentCache.set(name, componentTemplateNode);

  const previousComponentTemplateNode = state.componentTemplateNode;
  state.componentTemplateNode = componentTemplateNode;
  const { computeFunctionRef, isStatic, templateNode } = compileReactComputeFunction(componentPath, state, true, null);
  componentTemplateNode.isStatic = isStatic;
  componentTemplateNode.computeFunctionRef = computeFunctionRef;
  componentTemplateNode.templateNode = templateNode;

  if (!isRootComponent) {
    state.componentTemplateNode = previousComponentTemplateNode;
    if (!isStatic) {
      previousComponentTemplateNode.childComponents.push(componentTemplateNode);
    }
  }

  // insertComputFunctionCachedOpcodes(componentPath, state);

  // Re-write function props as arguments
  rewriteArgumentsForReactFunctionComponent(computeFunction, shapeOfPropsObject);

  // Re-write the function as a compute function with opcodes emitted
  convertReactFunctionComponentToComputeFunctionAndEmitTemplateNode(
    componentTemplateNode,
    componentPath,
    computeFunction,
    isStatic,
    name,
    state,
  );
  return componentTemplateNode;
}

function convertReactFunctionComponentToComputeFunctionAndEmitTemplateNode(
  componentTemplateNode,
  componentPath,
  computeFunction,
  isStatic,
  name,
  state,
) {
  const templateAST = componentTemplateNode.toAST();
  if (t.isFunctionDeclaration(computeFunction)) {
    const identifier = t.identifier(name);
    markNodeAsUsed(identifier);

    if (isStatic) {
      componentPath.replaceWith(t.variableDeclaration("const", [t.variableDeclarator(identifier, templateAST)]));
    } else {
      const templateDeclaration = t.variableDeclaration("const", [t.variableDeclarator(identifier, templateAST)]);
      componentTemplateNode.insertionNode = templateDeclaration;
      if (
        t.isExportDefaultDeclaration(componentPath.parentPath.node) ||
        t.isExportNamedDeclaration(componentPath.parentPath.node)
      ) {
        const exportNode = t.isExportDefaultDeclaration(componentPath.parentPath.node)
          ? t.exportDefaultDeclaration(templateDeclaration)
          : t.exportNamedDeclaration(templateDeclaration, []);
        const parentPath = componentPath.parentPath;
        parentPath.replaceWith(exportNode);
        parentPath.insertBefore(computeFunction);
        componentTemplateNode.insertionPath = parentPath;
        if (!state.isRootComponent) {
          parentPath.remove();
        }
      } else {
        componentPath.replaceWith(templateDeclaration);
        componentPath.insertBefore(computeFunction);
        componentTemplateNode.insertionPath = componentPath;
        if (!state.isRootComponent) {
          componentPath.remove();
        }
      }
    }
  } else {
    debugger;
    const parentPath = componentPath.parentPath;

    if (t.isVariableDeclarator(parentPath.node) && t.isIdentifier(parentPath.node.id)) {
      markNodeAsUsed(parentPath.node.id);
      const identifier = t.identifier(name);
      markNodeAsUsed(identifier);

      // if (isRootComponent) {
      if (isStatic) {
        parentPath.node.id.name = name;
        componentPath.replaceWith(templateAST);
      } else {
        parentPath.replaceWithMultiple([parentPath.node, t.variableDeclarator(identifier, templateAST)]);
      }
      // } else {
      //   const arrayWrapperFunction = t.variableDeclarator(
      //     identifier,
      //     t.functionExpression(null, [], t.blockStatement([t.returnStatement(opcodesArray)])),
      //   );
      //   if (isStatic) {
      //     parentPath.node.id.name = name;
      //     componentPath.replaceWith(arrayWrapperFunction);
      //   } else {
      //     parentPath.replaceWithMultiple([parentPath.node, arrayWrapperFunction]);
      //   }
      // }
    } else {
      invariant(false, "TODO");
    }
  }
}

function rewriteArgumentsForReactFunctionComponent(computeFunction, shapeOfPropsObject) {
  const params = computeFunction.params;

  if (params.length > 0 && t.isObjectPattern(params[0])) {
    computeFunction.params = shapeOfPropsObject.map(a => t.identifier(a.value));
  }
}

function doesFunctionComponentUseHooks(componentPath, state) {
  let usesHooks = false;
  componentPath.traverse({
    CallExpression(path) {
      if (isReactHook(path, state)) {
        markNodeAsUsed(path.node);
        usesHooks = true;
      }
    },
  });
  return usesHooks;
}

function getDefaultPropsObjectExpressionPath(binding, state) {
  if (binding !== undefined) {
    for (let referencePath of binding.referencePaths) {
      let parentPath = referencePath.parentPath;

      if (
        t.isMemberExpression(parentPath.node) &&
        t.isIdentifier(parentPath.node.property) &&
        parentPath.node.property.name === "defaultProps"
      ) {
        parentPath = parentPath.parentPath;
        if (t.isAssignmentExpression(parentPath.node)) {
          const rightPath = parentPath.get("right");
          const rightPathRef = getReferenceFromExpression(rightPath, state);
          if (t.isObjectExpression(rightPathRef.node)) {
            return rightPathRef;
          }
        }
      }
    }
  } else {
    throw new Error("TODO");
  }
  return null;
}
