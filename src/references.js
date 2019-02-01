import { validateArrayHasNotBeenMutated } from "./validation";
import {
  getCodeLocation,
  isCommonJsLikeRequireCall,
  isFbCxCall,
  isFbCxRequireCall,
  isFbtRequireCall,
  isFbtCall,
  isModuleExportsAssignment,
  isPrimitive,
} from "./utils";
import traverse from "@babel/traverse";
import invariant from "./invariant";
import * as t from "@babel/types";

// TODO: add the rest
const globalBindings = new Set([
  "Object",
  "Array",
  "RegEx",
  "Function",
  "String",
  "Number",
  "Boolean",
  "Date",
  "Math",
  "window",
  "document",
  "global",
  "process",
  "setTimeout",
  "setInterval",
  "console",
  "require",
  "JSON",
]);

function createDestructuredRef(object, property) {
  return {
    object,
    property,
    type: "DestructuredRef",
  };
}

export function isDestructuredRef(obj) {
  return obj !== null && obj !== undefined && obj.type === "DestructuredRef";
}

export function isIdentifierReferenceConstant(path, state, errorOnBadIdentifier = true) {
  const node = path.node;
  if (node.name === "undefined" || node.name === "arguments") {
    return true;
  }
  if (globalBindings.has(node.name)) {
    return true;
  }
  if (state.compiledComponentCache.has(node.name)) {
    return true;
  }
  const binding = getBindingPathRef(path, node.name, state);
  if (binding === undefined) {
    if (!errorOnBadIdentifier) {
      return true;
    }
    throw new Error(`Unable to find reference to binding "${node.name}" at ${getCodeLocation(node)}`);
  }
  return binding.constantViolations.length === 0;
}

function recursivelyGetReferenceFromConstantIdentifier(path, state, visitedBindings, errorOnBadIdentifier) {
  const node = path.node;
  const bindingName = path.node.name;
  const binding = path.scope.getBinding(bindingName);

  if (state.compiledComponentCache.has(bindingName)) {
    const result = state.compiledComponentCache.get(bindingName);
    return result.componentPath;
  }
  if (binding !== undefined && binding.path !== path && !visitedBindings.has(binding) && !binding.path.removed) {
    visitedBindings.add(binding);
    const bindingPath = binding.path;
    const bindingNode = bindingPath.node;

    if (bindingNode === null) {
      return path;
    }
    if (t.isObjectPattern(bindingNode)) {
      const propertiesPath = bindingPath.get("properties");
      for (let i = 0; i < bindingNode.properties.length; i++) {
        const property = bindingNode.properties[i];
        if (t.isObjectProperty(property) && t.isIdentifier(property.key) && property.key.name === node.name) {
          return recursivelyGetReferenceFromExpression(
            propertiesPath[i].get("value"),
            state,
            visitedBindings,
            errorOnBadIdentifier,
          );
        }
      }
    } else {
      const pathRef = recursivelyGetReferenceFromExpression(bindingPath, state, visitedBindings, errorOnBadIdentifier);

      if (Array.isArray(pathRef)) {
        const objectPathRef = pathRef[1];
        if (state.externalPathRefs.has(objectPathRef)) {
          state.externalBindings.set(bindingName, {
            pathRef: state.externalPathRefs.get(objectPathRef),
            resolvedPathRef: objectPathRef,
          });
        }
        return recursivelyGetReferenceFromObjectOrArrayPatternWithBindingName(pathRef, bindingName, state);
      }
      if (state.externalPathRefs.has(pathRef)) {
        state.externalBindings.set(bindingName, {
          pathRef: state.externalPathRefs.get(pathRef),
          resolvedPathRef: pathRef,
        });
      }
      return pathRef;
    }
  }
  return path;
}

function recursivelyGetReferenceFromObjectOrArrayPatternWithBindingName(ref, bindingName, state) {
  const [patternPathRef, objectPathRef] = ref;

  if (objectPathRef.moduleState !== undefined && t.isObjectExpression(objectPathRef.node)) {
    const properties = objectPathRef.get("properties");

    for (let propertyPathRef of properties) {
      if (
        t.isObjectProperty(propertyPathRef.node) &&
        t.isIdentifier(propertyPathRef.node.value) &&
        propertyPathRef.node.value.name === bindingName
      ) {
        return createDestructuredRef(objectPathRef, propertyPathRef);
      }
    }
  } else if (t.isObjectPattern(patternPathRef.node)) {
    const properties = patternPathRef.get("properties");

    for (let propertyPathRef of properties) {
      if (
        t.isObjectProperty(propertyPathRef.node) &&
        t.isIdentifier(propertyPathRef.node.value) &&
        propertyPathRef.node.value.name === bindingName
      ) {
        return createDestructuredRef(objectPathRef, propertyPathRef);
      }
    }
    throw new Error("TODO!");
  } else if (t.isArrayPattern(patternPathRef.node)) {
    const elements = patternPathRef.get("elements");

    for (let propertyPathRef of elements) {
      if (t.isIdentifier(propertyPathRef.node) && propertyPathRef.node.name === bindingName) {
        return createDestructuredRef(objectPathRef, propertyPathRef);
      }
    }
    throw new Error("TODO!");
  }
}

function recursivelyGetReferenceFromExpression(path, state, visitedBindings, errorOnBadIdentifier) {
  const node = path.node;

  if (isFbCxRequireCall(path) || isFbCxCall(path, state) || isFbtRequireCall(path) || isFbtCall(path, state)) {
    return path;
  }
  // Check if this a reference in another file
  if (t.isCallExpression(node) && isCommonJsLikeRequireCall(path)) {
    const moduleName = node.arguments[0].value;
    if (moduleName === "react" || moduleName === "react-compiler-runtime") {
      return path;
    }
    const externalPathRef = state.resolveModuleBindingSync(moduleName, state.currentModulePath, "default");
    state.externalPathRefs.set(externalPathRef, path);
    return externalPathRef;
  } else if (t.isImportSpecifier(node)) {
    const parentPath = path.parentPath;
    let bindingName;

    if (t.isIdentifier(node.imported)) {
      bindingName = node.imported.name;
    } else {
      invariant(false, "TODO");
    }

    if (t.isImportDeclaration(parentPath.node)) {
      const moduleName = parentPath.node.source.value;
      if (moduleName === "react" || moduleName === "react-compiler-runtime") {
        return path;
      }
      const externalPathRef = state.resolveModuleBindingSync(moduleName, state.currentModulePath, bindingName);
      state.externalPathRefs.set(externalPathRef, path);
      return externalPathRef;
    }
  } else if (t.isImportDefaultSpecifier(node)) {
    const parentPath = path.parentPath;

    if (t.isImportDeclaration(parentPath.node)) {
      const moduleName = parentPath.node.source.value;
      if (moduleName === "react" || moduleName === "react-compiler-runtime") {
        return path;
      }
      const externalPathRef = state.resolveModuleBindingSync(moduleName, state.currentModulePath, "default");
      state.externalPathRefs.set(externalPathRef, path);
      return externalPathRef;
    }
  }

  if (
    isPrimitive(node) ||
    t.isUnaryExpression(node) ||
    t.isUpdateExpression(node) ||
    t.isBinaryExpression(node) ||
    t.isCallExpression(node) ||
    t.isFunctionDeclaration(node) ||
    t.isFunctionExpression(node) ||
    t.isArrowFunctionExpression(node) ||
    t.isArrayExpression(node)
  ) {
    return path;
  }

  if (t.isIdentifier(node) || t.isJSXIdentifier(node)) {
    if (node.name === "undefined") {
      return path;
    }
    if (isIdentifierReferenceConstant(path, state, errorOnBadIdentifier)) {
      const refPath = recursivelyGetReferenceFromConstantIdentifier(path, state, visitedBindings, errorOnBadIdentifier);

      if (Array.isArray(refPath)) {
        return recursivelyGetReferenceFromObjectOrArrayPatternWithBindingName(refPath, node.name, state);
      }
      if (t.isArrayExpression(refPath.node)) {
        validateArrayHasNotBeenMutated(refPath, node.name, state);
      }
      return refPath;
    }
    return path;
  } else if (t.isObjectExpression(node)) {
    return path;
  } else if (t.isMemberExpression(node)) {
    let objectPath = path.get("object");
    let objectExpression = recursivelyGetReferenceFromExpression(
      objectPath,
      state,
      visitedBindings,
      errorOnBadIdentifier,
    );
    let propertyName;

    if (!node.computed && t.isIdentifier(node.property)) {
      propertyName = node.property.name;
    } else if (node.computed && t.isStringLiteral(node.property)) {
      propertyName = node.property.value;
    } else if (node.computed && t.isNumericLiteral(node.property)) {
      propertyName = node.property.value;
    } else if (node.computed && t.isIdentifier(node.property)) {
      // TODO get around to doing computed properties properly
      return path;
    } else {
      throw new Error("TODO");
    }
    const propertiesPath = objectExpression.get("properties");
    for (let i = 0; i < propertiesPath.length; i++) {
      const objectProperty = propertiesPath[i].node;
      if (
        t.isObjectProperty(objectProperty) &&
        t.isIdentifier(objectProperty.key) &&
        objectProperty.key.name === propertyName
      ) {
        const valuePath = propertiesPath[i].get("value");
        return recursivelyGetReferenceFromExpression(valuePath, state, visitedBindings, errorOnBadIdentifier);
      } else if (
        t.isObjectMethod(objectProperty) &&
        t.isIdentifier(objectProperty.key) &&
        objectProperty.key.name === propertyName
      ) {
        return propertiesPath[i];
      }
    }
    if (t.isStringLiteral(objectExpression.node)) {
      switch (propertyName) {
        case "toString":
          // return string as original object is a string
          return objectPath;
        default:
          throw new Error("TODO");
      }
    }
    return path;
  } else if (t.isLogicalExpression(node)) {
    return path;
  } else if (t.isConditionalExpression(node)) {
    return path;
  } else if (t.isVariableDeclarator(node)) {
    const initPath = path.get("init");
    const initPathRef = recursivelyGetReferenceFromExpression(initPath, state, visitedBindings, errorOnBadIdentifier);

    if (t.isArrayPattern(node.id) || t.isObjectPattern(node.id)) {
      return [path.get("id"), initPathRef];
    }
    return initPathRef;
  } else if (t.isVariableDeclaration(node)) {
    const declarations = path.get("declarations");
    if (declarations.length === 1) {
      return recursivelyGetReferenceFromExpression(declarations[0], state, visitedBindings, errorOnBadIdentifier);
    } else {
      invariant(false, "TODO");
    }
  } else if (t.isJSXExpressionContainer(node)) {
    const expressionPath = path.get("expression");
    return recursivelyGetReferenceFromExpression(expressionPath, state, visitedBindings, errorOnBadIdentifier);
  } else if (t.isJSXElement(node) || t.isJSXText(node) || t.isJSXFragment(node)) {
    return path;
  } else if (t.isTemplateLiteral(node)) {
    // TODO: handles expressions properly
    return path;
  } else if (t.isNewExpression(node)) {
    // TODO: handle this properly
    return path;
  } else {
    debugger;
    throw new Error("TODO");
  }
}

export function getReferenceFromExpression(path, state, errorOnBadIdentifier = true, bindingName) {
  const refPath = recursivelyGetReferenceFromExpression(path, state, new Set(), errorOnBadIdentifier);
  if (Array.isArray(refPath)) {
    invariant(
      bindingName !== undefined,
      "internal function getReferenceFromExpression() referenced an object/array pattern without being passed a binding name",
    );
    return recursivelyGetReferenceFromObjectOrArrayPatternWithBindingName(refPath, bindingName, state);
  }
  return refPath;
}

export function resolveModuleBindingReference(moduleAst, binding, state) {
  let pathRef = null;
  traverse(moduleAst, {
    AssignmentExpression(path) {
      if (binding === "default" && isModuleExportsAssignment(path)) {
        const rightPath = path.get("right");
        pathRef = getReferenceFromExpression(rightPath, state);
      }
    },
    ExportDefaultDeclaration(path) {
      if (binding === "default") {
        const declarationPath = path.get("declaration");
        const declarationPathRef = getReferenceFromExpression(declarationPath, state, true);
        pathRef = declarationPathRef;
      }
    },
    ExportNamedDeclaration(path) {
      const node = path.node;
      const declarationNode = node.declaration;

      if (t.isTypeAlias(declarationNode)) {
        if (t.isIdentifier(declarationNode.id) && declarationNode.id.name === binding) {
          pathRef = path.get("declaration").get("right");
        }
      } else {
        const declarationPath = path.get("declaration");
        const declarationPathRef = getReferenceFromExpression(declarationPath, state, true);

        if (t.isFunctionDeclaration(declarationNode)) {
          if (t.isIdentifier(declarationNode.id) && declarationNode.id.name === binding) {
            pathRef = declarationPathRef;
          }
        } else if (t.isVariableDeclaration(declarationNode)) {
          const declarations = declarationPath.get("declarations");
          if (declarations.length === 1) {
            const firstDeclarationNode = declarations[0].node;
            if (t.isIdentifier(firstDeclarationNode.id) && firstDeclarationNode.id.name === binding) {
              pathRef = declarationPathRef;
            }
          } else {
            invariant(false, "TODO");
          }
        } else {
          invariant(false, "TODO");
        }
      }
    },
  });
  if (pathRef === null) {
    throw new Error(`Failed to find reference to "${binding}" binding for module ${state.currentModulePath}`);
  }
  pathRef.moduleState = state;
  return pathRef;
}

export function getBindingPathRef(path, bindingName, state) {
  if (state.externalBindings.has(bindingName)) {
    const { resolvedPathRef } = state.externalBindings.get(bindingName);
    return resolvedPathRef.scope.getBinding(bindingName);
  }
  return path.scope.getBinding(bindingName);
}
