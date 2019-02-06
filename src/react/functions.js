import { getReferenceFromExpression } from "../references";
import { emptyObject, getComponentName, isPrimitive, isRootPathConditional } from "../utils";
import { applyCachedRuntimeValues } from "../transforms";
import { compileNode } from "../nodes";
import { MultiReturnConditionalTemplateNode, StaticValueTemplateNode } from "../templates";
import invariant from "../invariant";
import * as t from "@babel/types";

function replaceTemplateReturn(path, originalPathNode, replacement) {
  if (!path.removed) {
    if (path.node === originalPathNode || path.node === emptyObject) {
      path.replaceWith(replacement);
    } else if (t.isBlockStatement(path.node)) {
      for (let blockNode of path.node.body) {
        if (
          t.isReturnStatement(blockNode) &&
          (blockNode.argument === originalPathNode || blockNode.argument === emptyObject)
        ) {
          blockNode.argument = replacement;
          break;
        }
      }
    } else {
      throw new Error("TODO");
    }
  }
}

function compileTemplateBranch(templateBranch, templateBranchIndex, state, componentPath, compileToVNode) {
  const runtimeValues = new Map();
  if (templateBranchIndex !== null) {
    runtimeValues.set(t.numericLiteral(templateBranchIndex), {
      index: 0,
      references: 1,
    });
  }
  const childState = { ...state, ...{ runtimeValues } };
  // Get the argument from the return statement
  const isExplicitReturn = templateBranch.isExplicitReturn;
  const path = isExplicitReturn ? templateBranch.path.get("argument") : templateBranch.path;
  const refPath = getReferenceFromExpression(path, state);
  const originalPathNode = path.node;
  const templateNode = compileNode(path, refPath, childState, componentPath, true);
  const isStatic = runtimeValues.size === 0 && templateBranch.isConditional === false;
  templateNode.isStatic = isStatic;
  // replace branch with values array
  const runtimeValuesArray = [];
  for (let [runtimeValue, { index }] of runtimeValues) {
    runtimeValuesArray[index] = runtimeValue;
  }
  const runtimeValuesArrayAST = t.arrayExpression(runtimeValuesArray);
  if (compileToVNode) {
    state.helpers.add("createVNode");
    const vNodeAST = t.callExpression(t.identifier("createVNode"), [
      templateNode.toAST(),
      runtimeValuesArrayAST,
      templateNode.getKeyASTNode(),
    ]);
    replaceTemplateReturn(path, originalPathNode, vNodeAST);
  } else {
    replaceTemplateReturn(path, originalPathNode, runtimeValuesArrayAST);
  }
  return templateNode;
}

function compileTemplateBranches(templateBranches, computeFunction, state, functionPath, compileToVNode) {
  if (templateBranches.length === 1) {
    const templateBranch = templateBranches[0];
    return compileTemplateBranch(templateBranch, null, state, functionPath, compileToVNode);
  } else {
    // Check how many non primitive roots we have
    const nonPrimitiveRoots = templateBranches.filter(branch => !branch.isPrimitive);

    if (nonPrimitiveRoots.length === 1) {
      const templateBranch = nonPrimitiveRoots[0];
      return compileTemplateBranch(templateBranch, null, state, functionPath, compileToVNode);
    } else {
      const multiConditionalTemplateNode = new MultiReturnConditionalTemplateNode();
      let templateBranchIndex = 0;
      let isStatic = true;

      for (let templateBranch of templateBranches) {
        if (!templateBranch.isPrimitive) {
          const templateBranchTemplateNode = compileTemplateBranch(
            templateBranch,
            templateBranchIndex,
            state,
            functionPath,
            compileToVNode,
          );
          if (!templateBranch.isStatic) {
            isStatic = false;
          }
          multiConditionalTemplateNode.conditions.push([templateBranchIndex, templateBranchTemplateNode]);
          templateBranchIndex++;
        }
      }
      if (isStatic) {
        return new StaticValueTemplateNode(null);
      }
      return multiConditionalTemplateNode;
    }
  }
}

export function compileReactComputeFunction(functionPath, state, isComponentFunction, compileToVNode) {
  const computeFunction = functionPath.node;
  if (state.computeFunctionCache.has(computeFunction)) {
    return state.computeFunctionCache.get(computeFunction);
  }
  if (isComponentFunction) {
    updateComputeFunctionName(functionPath);
  }

  const templateBranches = [];
  const runtimeConditionals = new Map();
  const runtimeCachedValues = new Map();
  let previousRootWasConditional = false;

  // When the arrow function body is an expression
  if (t.isArrowFunctionExpression(computeFunction) && !t.isBlockStatement(computeFunction.body)) {
    templateBranches.push({
      path: functionPath.get("body"),
      isConditional: false,
      isExplicitReturn: false,
      isPrimitive: isPrimitive(computeFunction.body),
    });
  } else {
    functionPath.traverse({
      ReturnStatement(templatePath) {
        if (templatePath.scope.getFunctionParent() !== functionPath.scope) {
          return;
        }
        const isConditional = previousRootWasConditional || isRootPathConditional(functionPath, templatePath);
        if (isConditional) {
          previousRootWasConditional = true;
        }
        // Replace template note with value array
        const arg = templatePath.node.argument;

        templateBranches.push({
          path: templatePath,
          isConditional,
          isExplicitReturn: true,
          isPrimitive: isPrimitive(arg),
        });
      },
    });
  }

  const childState = {
    ...state,
    ...{
      runtimeCachedValues,
      runtimeConditionals,
    },
  };
  const templateNode = compileTemplateBranches(
    templateBranches,
    computeFunction,
    childState,
    functionPath,
    compileToVNode,
  );
  const isStatic = templateNode.isStatic;

  let computeFunctionRef = null;
  if (isComponentFunction) {
    if (!isStatic) {
      computeFunctionRef = getComponentName(functionPath);
    }
  }

  state.computeFunctionCache.set(computeFunction, {
    compileToVNode,
    computeFunctionRef,
    isStatic,
    templateNode,
  });

  applyCachedRuntimeValues(functionPath, runtimeCachedValues);

  return {
    compileToVNode,
    computeFunctionRef,
    isStatic,
    templateNode,
  };
}

// function insertComputFunctionCachedOpcodes(componentPath, state) {
//   const computeFunctionCache = state.computeFunctionCache;
//   if (computeFunctionCache.size > 0) {
//     const declarators = [];
//     for (let [, { cachedOpcodes }] of computeFunctionCache) {
//       if (cachedOpcodes !== null) {
//         const { node, opcodesArray } = cachedOpcodes;
//         if (cachedOpcodes.inserted) {
//           continue;
//         }
//         cachedOpcodes.inserted = true;
//         declarators.push(t.variableDeclarator(node, opcodesArray));
//       }
//     }
//     if (declarators.length > 0) {
//       componentPath.insertBefore(t.variableDeclaration("var", declarators));
//     }
//   }
// }

function updateComputeFunctionName(functionPath) {
  const name = getComponentName(functionPath);
  // Change compute function name
  if (t.isFunctionDeclaration(functionPath.node) && t.isIdentifier(functionPath.node.id)) {
    functionPath.node.id.name = `${name}_ComputeFunction`;
  } else {
    const parentPath = functionPath.parentPath;
    if (t.isVariableDeclarator(parentPath.node) && t.isIdentifier(parentPath.node.id)) {
      parentPath.node.id.name = `${name}_ComputeFunction`;
    } else {
      invariant(false, "TODO");
    }
  }
}
