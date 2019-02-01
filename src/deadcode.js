import {
  isNodeWithinReactElementTemplate,
  removePath,
  wasParentPathFlaggedWithDCE,
  wasParentPathRemoved,
  isReactObject,
} from "./utils";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

function filterReferencePaths(path, state) {
  // If the node is used, then we need this path
  if (path.node.used) {
    return true;
  }
  if (path.node.canDCE) {
    return false;
  }
  const parentPath = path.parentPath;
  if (
    t.isMemberExpression(parentPath.node) &&
    (isReactObject(parentPath.get("object"), state) &&
      ((t.isIdentifier(parentPath.node.property) && parentPath.node.property.name === "createElement") ||
        (t.isStringLiteral(parentPath.node.property) && parentPath.node.property.value === "createElement")))
  ) {
    return false;
  }
  // Ignore React.Node types referencing React
  if (t.isQualifiedTypeIdentifier(path.container)) {
    return false;
  }
  if (isNodeWithinReactElementTemplate(path, state)) {
    return false;
  }
  if (wasParentPathRemoved(path)) {
    return false;
  }
  if (wasParentPathFlaggedWithDCE(path)) {
    return false;
  }
  return true;
}

// This isn't a thorough dead code removal tool. It's designed to complement
// other tools such as Google Closure Compiler, so they can do a better job.
export function applyDeadCodeElimination(moduleAst, moduleState) {
  const deadCodePasses = 3;
  for (let i = 0; i < deadCodePasses; i++) {
    // Second pass, remove unused identifiers and convert member expressions to computed
    traverse(moduleAst, {
      Identifier(path) {
        const node = path.node;

        // Flag we set to ensure we don't DCE this identifier
        if (node.used === true) {
          return;
        }
        if (node === undefined) {
          return;
        }
        if (moduleState.externalBindings.has(node.name)) {
          return;
        }
        const binding = path.scope.getBinding(node.name);
        if (binding === undefined) {
          return;
        }
        // Don't attempt to remove function params right now.
        if (binding.kind === "param") {
          return;
        }
        // If this is the id of a function, skip dead coding it.
        if (path.key === "id" && t.isFunctionDeclaration(path.parentPath.node)) {
          return;
        }
        const filteredReferencePaths = binding.referencePaths.filter(p => filterReferencePaths(p, moduleState));
        if (filteredReferencePaths.length === 0) {
          node.toBeRemoved = true;
          // Exclude object pattern for now
          if (!t.isObjectPattern(binding.path.node)) {
            traverse(moduleAst, {
              AssignmentExpression(assignPath) {
                const assignmentNode = assignPath.node;
                if (t.isIdentifier(assignmentNode.left) && assignmentNode.left.name === node.name) {
                  removePath(assignPath);
                }
              },
            });
            moduleState.applyPostTransform(() => {
              removePath(path);
            });
          }
        }
      },
    });
  }
}
