import { getBindingPathRef, getReferenceFromExpression } from "../references";
import { getComponentName, getShapeOfPropsObject, isReactHook, markNodeAsUsed, removePath } from "../utils";
import { compileReactComputeFunction } from "./functions";
import { getTypeAnnotationForExpression } from "../annotations";
import { ComponentTemplateNode } from "../templates";
import invariant from "../invariant";
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
  // Remove the defaultProsp assignment, as it's compiled away
  if (defaultProps !== null) {
    state.applyPostTransform(() => {
      removePath(defaultProps.parentPath);
    });
  }
  const previousComponentTemplateNode = state.componentTemplateNode;
  state.componentTemplateNode = componentTemplateNode;
  const { computeFunctionRef, isStatic, templateNode } = compileReactComputeFunction(componentPath, state, true, false);
  const deeplyStatic = componentTemplateNode.isDeeplyStatic === true && isStatic;
  componentTemplateNode.isDeeplyStatic = deeplyStatic;
  componentTemplateNode.isShallowStatic = isStatic;
  componentTemplateNode.computeFunctionRef = computeFunctionRef;
  componentTemplateNode.templateNode = templateNode;

  if (!isRootComponent) {
    state.componentTemplateNode = previousComponentTemplateNode;
    if (!deeplyStatic && previousComponentTemplateNode !== null) {
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
    name,
    state,
  );
  return componentTemplateNode;
}

function convertReactFunctionComponentToComputeFunctionAndEmitTemplateNode(
  componentTemplateNode,
  componentPath,
  computeFunction,
  name,
  state,
) {
  const templateAST = componentTemplateNode.toAST();
  if (t.isFunctionDeclaration(computeFunction)) {
    const identifier = t.identifier(name);

    if (componentTemplateNode.isShallowStatic) {
      const templateDeclaration = t.variableDeclaration("const", [t.variableDeclarator(identifier, templateAST)]);
      componentPath.replaceWith(templateDeclaration);
      componentTemplateNode.insertionPath = componentPath;
      componentTemplateNode.insertionNode = templateDeclaration;
    } else {
      markNodeAsUsed(identifier);
      if (
        t.isExportDefaultDeclaration(componentPath.parentPath) ||
        t.isExportNamedDeclaration(componentPath.parentPath)
      ) {
        const exportNode = t.isExportDefaultDeclaration(componentPath.parentPath)
          ? t.exportDefaultDeclaration(templateAST)
          : t.exportNamedDeclaration(
              t.variableDeclaration("const", [t.variableDeclarator(identifier, templateAST)]),
              [],
            );
        componentTemplateNode.insertionNode = exportNode;

        const parentPath = componentPath.parentPath;
        parentPath.replaceWith(exportNode);
        parentPath.insertBefore(computeFunction);
        componentTemplateNode.insertionPath = parentPath;
        if (state.componentTemplateNode !== null && !state.isRootComponent) {
          parentPath.remove();
        }
      } else {
        const templateDeclaration = t.variableDeclaration("const", [t.variableDeclarator(identifier, templateAST)]);
        componentTemplateNode.insertionNode = templateDeclaration;
        componentPath.replaceWith(templateDeclaration);
        componentPath.insertBefore(computeFunction);
        componentTemplateNode.insertionPath = componentPath;
        if (state.componentTemplateNode !== null && !state.isRootComponent) {
          componentPath.remove();
        }
      }
    }
  } else {
    const parentPath = componentPath.parentPath;

    if (t.isVariableDeclarator(parentPath.node) && t.isIdentifier(parentPath.node.id)) {
      const declarationPath = parentPath.parentPath;
      markNodeAsUsed(parentPath.node.id);
      const identifier = t.identifier(name);
      markNodeAsUsed(identifier);

      if (componentTemplateNode.isStatic) {
        parentPath.node.id.name = name;
        componentPath.replaceWith(templateAST);
        componentTemplateNode.insertionPath = componentPath;
        if (state.componentTemplateNode !== null && !state.isRootComponent) {
          declarationPath.remove();
        }
      } else {
        const templateDeclaration = t.variableDeclaration("const", [t.variableDeclarator(identifier, templateAST)]);
        const computeFunctionDeclaration = t.variableDeclaration(parentPath.parentPath.node.kind, [parentPath.node]);
        declarationPath.replaceWith(templateDeclaration);
        declarationPath.insertBefore(computeFunctionDeclaration);
        componentTemplateNode.insertionPath = declarationPath;
        componentTemplateNode.insertionNode = templateDeclaration;
        if (state.componentTemplateNode !== null && !state.isRootComponent) {
          declarationPath.remove();
        }
      }
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
