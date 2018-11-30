import { getProgramPath } from "./utils";
import * as t from "@babel/types";

function getTargetBody(path) {
  let parentPath = path;

  while (!t.isBlockStatement(parentPath.node)) {
    parentPath = parentPath.parentPath;
  }
  return parentPath.node.body;
}

function tagParentsWithCachedChildFlag(path) {
  while (path !== null && !t.isBlockStatement(path.node)) {
    path.containsCachedChildReplacement = true;
    path = path.parentPath;
  }
}

export function applyCachedRuntimeValues(functionPath, runtimeCachedValues) {
  const assignedCachedValue = new Set();
  const programPath = getProgramPath(functionPath);
  // First path, replace runtimeCachedValues
  programPath.traverse({
    VariableDeclarator(path) {
      const idPath = path.get("id");

      if (t.isArrayPattern(idPath.node)) {
        const elements = idPath.get("elements");
        for (let element of elements) {
          if (runtimeCachedValues.has(element.node)) {
            throw new Error("TODO");
          }
        }
      }
    },
    ConditionalExpression(path) {
      const testPath = path.get("test");
      if (runtimeCachedValues.has(testPath.node)) {
        const cachedRuntimeValue = runtimeCachedValues.get(testPath.node);

        if (cachedRuntimeValue === undefined) {
          return;
        }
        const { index, node } = cachedRuntimeValue;
        if (!assignedCachedValue.has(index)) {
          let parentPath = path.parentPath;
          let lastPathKey = path.key;

          while (!t.isBlockStatement(parentPath.node)) {
            lastPathKey = parentPath.key;
            parentPath = parentPath.parentPath;
          }
          // Insert the cached variable assignment in the block statement, before the current
          // statement.
          parentPath.node.body.splice(
            lastPathKey,
            0,
            t.expressionStatement(t.assignmentExpression("=", node, testPath.node)),
          );
          assignedCachedValue.add(index);
          cachedRuntimeValue.targetBody = getTargetBody(path);
        }
        tagParentsWithCachedChildFlag(testPath);
        testPath.replaceWith(node);
      }
    },
    IfStatement(path) {
      const testPath = path.get("test");
      if (runtimeCachedValues.has(testPath.node)) {
        const cachedRuntimeValue = runtimeCachedValues.get(testPath.node);

        if (cachedRuntimeValue === undefined) {
          return;
        }
        const { index, node } = cachedRuntimeValue;
        if (!assignedCachedValue.has(index)) {
          testPath.replaceWith(t.assignmentExpression("=", node, testPath.node));
          assignedCachedValue.add(index);
          cachedRuntimeValue.targetBody = getTargetBody(path);
        } else {
          testPath.replaceWith(node);
        }
      }
    },
    ArrowFunctionExpression(path) {
      const funcNode = path.node;
      if (runtimeCachedValues.has(funcNode)) {
        const cachedRuntimeValue = runtimeCachedValues.get(funcNode);

        if (cachedRuntimeValue === undefined) {
          return;
        }
        const { index, node } = cachedRuntimeValue;
        if (!assignedCachedValue.has(index)) {
          tagParentsWithCachedChildFlag(path);
          path.replaceWith(t.assignmentExpression("=", node, funcNode));
          assignedCachedValue.add(index);
          cachedRuntimeValue.targetBody = getTargetBody(path);
        }
      }
    },
    FunctionDeclaration(path) {
      const funcNode = path.node;
      if (runtimeCachedValues.has(funcNode)) {
        const cachedRuntimeValue = runtimeCachedValues.get(funcNode);

        if (cachedRuntimeValue === undefined) {
          return;
        }
        const { index, node } = cachedRuntimeValue;
        if (!assignedCachedValue.has(index)) {
          tagParentsWithCachedChildFlag(path);
          path.replaceWith(
            t.assignmentExpression(
              "=",
              node,
              t.functionExpression(funcNode.id, funcNode.params, funcNode.body, funcNode.generator, funcNode.async),
            ),
          );
          assignedCachedValue.add(index);
          cachedRuntimeValue.targetBody = getTargetBody(path);
        }
      }
    },
    FunctionExpression(path) {
      const funcNode = path.node;
      if (runtimeCachedValues.has(funcNode)) {
        const cachedRuntimeValue = runtimeCachedValues.get(funcNode);

        if (cachedRuntimeValue === undefined) {
          return;
        }
        const { index, node } = cachedRuntimeValue;
        if (!assignedCachedValue.has(index)) {
          tagParentsWithCachedChildFlag(path);
          path.replaceWith(t.assignmentExpression("=", node, funcNode));
          assignedCachedValue.add(index);
          cachedRuntimeValue.targetBody = getTargetBody(path);
        }
      }
    },
    CallExpression(path) {
      const callNode = path.node;
      if (runtimeCachedValues.has(callNode)) {
        const cachedRuntimeValue = runtimeCachedValues.get(callNode);

        if (cachedRuntimeValue === undefined) {
          return;
        }
        const { index, node } = cachedRuntimeValue;
        if (!assignedCachedValue.has(index)) {
          tagParentsWithCachedChildFlag(path);
          path.replaceWith(t.assignmentExpression("=", node, callNode));
          assignedCachedValue.add(index);
          cachedRuntimeValue.targetBody = getTargetBody(path);
        }
      }
    },
  });
  if (runtimeCachedValues.size > 0) {
    // Convert to block statement
    if (!t.isBlockStatement(functionPath.node.body)) {
      throw new Error("TODO: check");
      functionPath.node.body = t.blockStatement([t.returnStatement(functionPath.node.body)]);
    }
    for (let [, { node, targetBody }] of runtimeCachedValues) {
      targetBody.unshift(t.variableDeclaration("var", [t.variableDeclarator(node)]));
    }
  }
}

export function makeClosureCompilerAdvancedFriendly(componentPath) {
  const programPath = getProgramPath(componentPath);
  programPath.traverse({
    MemberExpression(path) {
      // This is for Google Closure Compiler advanced mode
      const node = path.node;
      if (node.computed === false && t.isIdentifier(node.property)) {
        node.computed = true;
        node.property = t.stringLiteral(node.property.name);
      }
    },
    "ObjectProperty|ObjectMethod"(path) {
      // This is for Google Closure Compiler advanced mode
      const node = path.node;
      if (node.computed === false && t.isIdentifier(node.key)) {
        node.computed = true;
        node.key = t.stringLiteral(node.key.name);
      }
    },
  });
}
