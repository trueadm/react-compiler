import { isDestructuredRef, isIdentifierReferenceConstant, getReferenceFromExpression } from "./references";
import * as t from "@babel/types";
import { getTypeAlias, getTypeAnnotationForExpression, assertType } from "./annotations";
import invariant from "./invariant";

export function getProgramPath(path) {
  while (path !== null && !t.isProgram(path.node)) {
    path = path.parentPath;
  }
  return path;
}

export function wasParentPathRemoved(path) {
  while (path !== null && !t.isProgram(path.node)) {
    if (path.removed) {
      return true;
    }
    path = path.parentPath;
  }
  return false;
}

export function wasParentPathFlaggedWithDCE(path) {
  while (path !== null && !t.isProgram(path.node)) {
    if (path.node == null) {
      return true;
    }
    if (path.node.canDCE) {
      return true;
    }
    path = path.parentPath;
  }
  return false;
}

export function removePath(path) {
  try {
    if (path.parentPath.containsCachedChildReplacement) {
      if (t.isAssignmentExpression(path.node)) {
        path.replaceWith(path.node.right);
      } else {
        // debugger;
      }
    } else {
      path.remove();
    }
  } catch (e) {
    const parentPath = path.parentPath;

    if (parentPath.containsCachedChildReplacement) {
      if (t.isVariableDeclarator(parentPath) && path.key === "id") {
        // if we have a declaration, then replace the whole thing with just the init
        // if there is only the one declaration
        if (
          t.isVariableDeclaration(parentPath.parentPath.node) &&
          parentPath.parentPath.node.declarations.length === 1
        ) {
          parentPath.parentPath.replaceWith(t.expressionStatement(parentPath.node.init));
        }
      }
    } else {
      if (t.isImportDefaultSpecifier(parentPath.node)) {
        const specifiers = parentPath.parentPath.node.specifiers;
        for (let i = 0; i < specifiers.length; i++) {
          if (specifiers[i] === parentPath.node) {
            parentPath.parentPath.node.specifiers.splice(i, 1);
            break;
          }
        }
      }
      if (t.isVariableDeclarator(parentPath) && path.key === "id") {
        removePath(parentPath);
      }
      // try {
      //   debugger;
      //   path.replaceWith(t.unaryExpression("void", t.numericLiteral(0)));
      // } catch (e) {
      //   // NO-OP
      //   debugger;
      // }
    }
  }
}

export function pathContainsReactElement(path, state) {
  let containsJSXElement = false;
  path.traverse({
    JSXElement() {
      containsJSXElement = true;
    },
    CallExpression(callExpressionPath) {
      if (isReactCreateElement(callExpressionPath, state)) {
        containsJSXElement = true;
      }
    },
  });
  return containsJSXElement;
}

function stringLiteralTrimmer(lastNonEmptyLine, lineCount, line, i) {
  const isFirstLine = i === 0;
  const isLastLine = i === lineCount - 1;
  const isLastNonEmptyLine = i === lastNonEmptyLine;
  // replace rendered whitespace tabs with spaces
  let trimmedLine = line.replace(/\t/g, " ");
  // trim leading whitespace
  if (!isFirstLine) {
    trimmedLine = trimmedLine.replace(/^[ ]+/, "");
  }
  // trim trailing whitespace
  if (!isLastLine) {
    trimmedLine = trimmedLine.replace(/[ ]+$/, "");
  }
  if (trimmedLine.length > 0) {
    if (!isLastNonEmptyLine) {
      trimmedLine += " ";
    }
    return trimmedLine;
  }
  return "";
}

export function handleWhiteSpace(value) {
  const lines = value.split(/\r\n|\n|\r/);
  let lastNonEmptyLine = 0;

  for (let i = lines.length - 1; i > 0; i--) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
      break;
    }
  }
  const str = lines
    .map(stringLiteralTrimmer.bind(null, lastNonEmptyLine, lines.length))
    .filter(function(line) {
      return line.length > 0;
    })
    .join("");

  if (str.length > 0) {
    return str;
  }
  return "";
}

export function isPrimitive(arg) {
  return t.isNullLiteral(arg) || t.isNumericLiteral(arg) || t.isStringLiteral(arg) || t.isBooleanLiteral(arg);
}

export function getCodeLocation(node) {
  const loc = node.loc;
  if (!loc) {
    if (t.isLogicalExpression(node)) {
      return getCodeLocation(node.left);
    } else if (t.isIdentifier(node)) {
      return "unknown location";
    }
  }
  return `${loc.start.line}:${loc.start.column}`;
}

export function isRootPathConditional(componentPath, path) {
  let currentPath = path;

  while (currentPath !== undefined && currentPath !== componentPath) {
    let node = currentPath.node;
    if (t.isIfStatement(node) || t.isConditionalExpression(node) || t.isLogicalExpression(node)) {
      return true;
    }
    currentPath = currentPath.parentPath;
  }
  return false;
}

export function getComponentName(componentPath) {
  if (t.isFunctionDeclaration(componentPath.node) && t.isIdentifier(componentPath.node.id)) {
    return componentPath.node.id.name;
  }
  const parentPath = componentPath.parentPath;

  if (t.isVariableDeclarator(parentPath.node) && t.isIdentifier(parentPath.node.id)) {
    return parentPath.node.id.name;
  }
  invariant(false, "TODO");
}

export function isConditionalComponentType(path, state) {
  const pathRef = getReferenceFromExpression(path, state);
  if (t.isConditionalExpression(pathRef.node)) {
    return true;
  }
  if (t.isIdentifier(pathRef.node) && !isIdentifierReferenceConstant(pathRef, state)) {
    return true;
  }
  return false;
}

export function isHostComponentType(path, state) {
  if (t.isStringLiteral(path.node)) {
    return true;
  } else if (t.isJSXIdentifier(path.node)) {
    const firstChar = path.node.name[0];
    if (firstChar === firstChar.toLowerCase() && firstChar !== "_" && firstChar !== "$") {
      return true;
    }
  }
  const pathRef = getReferenceFromExpression(path, state);
  return t.isStringLiteral(pathRef.node);
}

export function getPathConditions(rootPath, path, state) {
  const conditions = [];
  let parentKey = path.key;

  while (path !== rootPath && path !== null) {
    const node = path.node;

    if (t.isSwitchCase(node)) {
      // TODO
      invariant(false, "TODO");
    } else if (t.isIfStatement(node)) {
      const testPath = path.get("test");
      // We don't really need the test path, but this validates that
      // the test path binding exists.
      getReferenceFromExpression(testPath, state);
      if (parentKey === "consequent") {
        conditions.unshift({ node: testPath.node, inverse: false });
      } else if (parentKey === "alternate") {
        conditions.unshift({ node: testPath.node, inverse: true });
      } else {
        invariant(false, "TODO");
      }
    }
    parentKey = path.key;
    path = path.parentPath;
  }
  return conditions;
}

export function joinPathConditions(pathConditions, state) {
  const handlePathCondition = pathCondition => {
    const { node, inverse } = pathCondition;
    const cachedNode = getCachedRuntimeValue(node, state);
    if (inverse) {
      return t.unaryExpression("!", cachedNode);
    } else {
      return cachedNode;
    }
  };

  if (pathConditions.length === 1) {
    return handlePathCondition(pathConditions[0]);
  }
  let joinedCondition;
  for (let pathCondition of pathConditions) {
    const node = handlePathCondition(pathCondition);
    if (joinedCondition === undefined) {
      joinedCondition = node;
    } else {
      joinedCondition = t.logicalExpression("&&", joinedCondition, node);
    }
  }
  return joinedCondition;
}

export function normalizeOpcodes(opcodes) {
  if (opcodes.length === 0) {
    return t.numericLiteral(0);
  } else if (opcodes.length === 1 && t.isNullLiteral(opcodes[0])) {
    return t.numericLiteral(0);
  }
  return t.arrayExpression(opcodes);
}

export function getCachedRuntimeValue(node, state) {
  const runtimeCachedValues = state.runtimeCachedValues;
  let cachedRuntimeValue = runtimeCachedValues.get(node);
  markNodeAsUsed(node);
  if (cachedRuntimeValue === undefined) {
    const runtimeCachedValueIndex = runtimeCachedValues.size;
    const cachedNode = t.identifier("__cached__" + state.counters.runtimeCachedValues++);
    runtimeCachedValues.set(node, {
      index: runtimeCachedValueIndex,
      node: cachedNode,
      targetBody: null,
    });
    return cachedNode;
  } else {
    return cachedRuntimeValue.node;
  }
}

const rxUnescaped = new RegExp(/["'&<>]/);

export function escapeText(text: string): string {
  if (typeof text === "string") {
    /* Much faster when there is no unescaped characters */
    if (!rxUnescaped.test(text)) {
      return text;
    }

    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      switch (text.charCodeAt(i)) {
        case 34: // "
          escape = "&quot;";
          break;
        case 39: // '
          escape = "&#x27;";
          break;
        case 38: // &
          escape = "&amp;";
          break;
        case 60: // <
          escape = "&lt;";
          break;
        case 62: // >
          escape = "&gt;";
          break;
        default:
          continue;
      }
      if (i > start) {
        escape = text.slice(start, i) + escape;
      }
      result = start > 0 ? result + escape : escape;
      start = i + 1;
    }
    if (i !== start) {
      return result + text.slice(start, i);
    }
    return result;
  }
  return text.toString();
}

// TODO: rename this
export function optimizedEscapeText(text) {
  if (typeof text === "string") {
    if (text.indexOf("&") === -1 && text.indexOf("<") === -1 && text.indexOf(">") === -1) {
      return text;
    }

    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      let escape;
      switch (text.charCodeAt(i)) {
        case 38: // &
          escape = "&amp;";
          break;
        case 60: // <
          escape = "&lt;";
          break;
        case 62: // >
          escape = "&gt;";
          break;
        default:
          continue;
      }
      if (i > start) {
        escape = text.slice(start, i) + escape;
      }
      result = start > 0 ? result + escape : escape;
      start = i + 1;
    }
    if (i !== start) {
      return result + text.slice(start, i);
    }
    return result;
  }
  return text.toString();
}

// <, > and single quotes are allowed in attribute values
// TODO: rename this
export function optimizedEscapeAttributeValue(text) {
  if (typeof text === "string") {
    if (text.indexOf('"') === -1 && text.indexOf("&") === -1) {
      return text;
    }

    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      let escape;
      switch (text.charCodeAt(i)) {
        case 34: // "
          escape = "&quot;";
          break;
        case 38: // &
          escape = "&amp;";
          break;
        default:
          continue;
      }
      if (i > start) {
        escape = text.slice(start, i) + escape;
      }
      result = start > 0 ? result + escape : escape;
      start = i + 1;
    }
    if (i !== start) {
      return result + text.slice(start, i);
    }
    return result;
  }
  return text.toString();
}

export function isOpcodesTemplateFromFuncCall(opcodes) {
  // 24 is TEMPLATE_FROM_FUNC_CALL
  return opcodes.length > 1 && t.isNumericLiteral(opcodes[0]) && opcodes[0].value === 24;
}

export function markNodeAsDCE(node) {
  if (node == null) {
    return;
  }
  node.used = false;
  node.canDCE = true;

  if (
    t.isJSXIdentifier(node) ||
    t.isIdentifier(node) ||
    t.isBooleanLiteral(node) ||
    t.isNumericLiteral(node) ||
    t.isStringLiteral(node) ||
    t.isNullLiteral(node) ||
    t.isJSXText(node)
  ) {
    // NO-OP
  } else if (t.isJSXExpressionContainer(node)) {
    markNodeAsDCE(node.expression);
  } else if (t.isMemberExpression(node) || t.isJSXMemberExpression(node)) {
    markNodeAsDCE(node.object);
    markNodeAsDCE(node.property);
  } else if (t.isConditionalExpression(node)) {
    markNodeAsDCE(node.alternate);
    markNodeAsDCE(node.consequent);
  } else if (t.isUpdateExpression(node) || t.isUnaryExpression(node)) {
    markNodeAsDCE(node.argument);
  } else if (t.isTemplateLiteral(node)) {
    for (let expression of node.expressions) {
      markNodeAsDCE(expression);
    }
  } else if (t.isLogicalExpression(node) || t.isBinaryExpression(node) || t.isAssignmentExpression(node)) {
    markNodeAsDCE(node.left);
    markNodeAsDCE(node.right);
  } else if (t.isCallExpression(node)) {
    markNodeAsDCE(node.callee);
    for (let arg of node.arguments) {
      markNodeAsDCE(arg);
    }
  } else if (t.isArrayExpression(node)) {
    for (let element of node.elements) {
      markNodeAsDCE(element);
    }
  } else if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node) || t.isFunctionDeclaration(node)) {
    markNodeAsDCE(node.id);
  } else if (t.isObjectExpression(node) || t.isJSXElement(node) || t.isJSXFragment(node) || t.isObjectProperty(node)) {
    // TODO
  } else {
    invariant(false, "TODO");
  }
}

// Used nodes do not get dead code eliminated
export function markNodeAsUsed(node) {
  if (node == null) {
    return;
  }
  node.used = true;
  node.canDCE = false;

  if (
    t.isIdentifier(node) ||
    t.isBooleanLiteral(node) ||
    t.isNumericLiteral(node) ||
    t.isStringLiteral(node) ||
    t.isNullLiteral(node)
  ) {
    // NO-OP
  } else if (t.isMemberExpression(node)) {
    markNodeAsUsed(node.object);
    markNodeAsUsed(node.property);
  } else if (t.isConditionalExpression(node)) {
    markNodeAsUsed(node.alternate);
    markNodeAsUsed(node.consequent);
  } else if (t.isUpdateExpression(node) || t.isUnaryExpression(node)) {
    markNodeAsUsed(node.argument);
  } else if (t.isTemplateLiteral(node)) {
    for (let expression of node.expressions) {
      markNodeAsUsed(expression);
    }
  } else if (t.isLogicalExpression(node) || t.isBinaryExpression(node) || t.isAssignmentExpression(node)) {
    markNodeAsUsed(node.left);
    markNodeAsUsed(node.right);
  } else if (t.isCallExpression(node)) {
    markNodeAsUsed(node.callee);
    for (let arg of node.arguments) {
      markNodeAsUsed(arg);
    }
  } else if (t.isArrayExpression(node)) {
    for (let element of node.elements) {
      markNodeAsUsed(element);
    }
  } else if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node) || t.isFunctionDeclaration(node)) {
    markNodeAsUsed(node.id);
  } else if (t.isObjectExpression(node)) {
    // TODO
  } else {
    invariant(false, "TODO");
  }
}

export function getRuntimeValueIndex(node, state) {
  const runtimeValues = state.runtimeValues;
  if (runtimeValues.has(node)) {
    const data = runtimeValues.get(node);
    data.references++;
    return data.index;
  }
  const runtimeValuePointer = runtimeValues.size;
  markNodeAsUsed(node);
  runtimeValues.set(node, { index: runtimeValuePointer, references: 1 });
  return runtimeValuePointer;
}

export function getRuntimeValueIndexForPropsArray(propsArray, state) {
  const runtimeValues = state.runtimeValues;
  const node = t.arrayExpression(propsArray);
  const runtimeValuePointer = runtimeValues.size;
  markNodeAsUsed(node);
  runtimeValues.set(node, { index: runtimeValuePointer, references: 1 });
  return runtimeValuePointer;
}

export function getRuntimeValueHash(state) {
  const runtimeValues = state.runtimeValues;
  let hashStr = "";
  for (let [key, value] of runtimeValues) {
    hashStr += JSON.stringify(key) + JSON.stringify(value);
  }
  return hashStr;
}

export function isReactObject(path, state) {
  const pathRef = getReferenceFromExpression(path, state);
  const node = pathRef.node;

  if (
    isCommonJsLikeRequireCall(pathRef) &&
    t.isStringLiteral(node.arguments[0]) &&
    (node.arguments[0].value === "react" || node.arguments[0].value === "react-compiler-runtime")
  ) {
    return true;
  }
  if (t.isImportDefaultSpecifier(pathRef.node)) {
    const parentPath = pathRef.parentPath;

    if (
      t.isImportDeclaration(parentPath.node) &&
      t.isStringLiteral(parentPath.node.source) &&
      (parentPath.node.source.value === "react" || parentPath.node.source.value === "react-compiler-runtime")
    ) {
      return true;
    }
  }
  return false;
}

export function moveOutCallExpressionFromTemplate(expressionContainerPath, callExpressionPath, state) {
  let parentPath = expressionContainerPath;
  let lastPathKey = expressionContainerPath.key;

  // Do not bother taking fb cx calls out
  if (isFbCxCall(callExpressionPath, state)) {
    return;
  }
  while (!t.isBlockStatement(parentPath.node) && !t.isArrowFunctionExpression(parentPath.parentPath.node)) {
    lastPathKey = parentPath.key;
    parentPath = parentPath.parentPath;
  }
  if (t.isArrowFunctionExpression(parentPath.parentPath.node) && !t.isBlockStatement(parentPath.node)) {
    parentPath.replaceWith(
      t.blockStatement([t.expressionStatement(callExpressionPath.node), t.returnStatement(parentPath.node)]),
    );
  } else {
    parentPath.node.body.splice(lastPathKey, 0, t.expressionStatement(callExpressionPath.node));
  }
}

export function moveOutFunctionFromTemplate(functionPath) {
  let parentPath = functionPath;
  let lastPathKey = functionPath.key;

  while (!t.isBlockStatement(parentPath.node)) {
    lastPathKey = parentPath.key;
    parentPath = parentPath.parentPath;
  }
  parentPath.node.body.splice(
    lastPathKey,
    0,
    t.isFunctionDeclaration(functionPath.node) ? functionPath.node : t.expressionStatement(functionPath.node),
  );
}

function getAllObjectPropertiesMapFromTypeAnnotation(path, annotation, state) {
  const propertiesMap = new Map();

  if (t.isObjectTypeAnnotation(annotation)) {
    for (let propertyAnnotation of annotation.properties) {
      if (t.isObjectTypeProperty(propertyAnnotation) && t.isIdentifier(propertyAnnotation.key)) {
        propertiesMap.set(propertyAnnotation.key.name, propertyAnnotation.value);
      } else if (t.isObjectTypeProperty(propertyAnnotation) && t.isStringLiteral(propertyAnnotation.key)) {
        propertiesMap.set(propertyAnnotation.key.value, propertyAnnotation.value);
      } else {
        invariant(false, "TODO");
      }
    }
  } else if (t.isGenericTypeAnnotation(annotation)) {
    const typeAlias = getTypeAlias(path, annotation, state);
    const rightAlias = typeAlias.right;
    return getAllObjectPropertiesMapFromTypeAnnotation(path, rightAlias, state);
  } else {
    invariant(false, "TODO");
  }

  return propertiesMap;
}

export function getShapeOfPropsObject(path, state) {
  const params = path.get("params");

  if (params.length === 0) {
    return null;
  }
  const propsParam = params[0];

  if (t.isObjectPattern(propsParam.node)) {
    const properties = propsParam.get("properties");
    const propsAnnotation = getTypeAnnotationForExpression(propsParam, state, true);
    const propertyAnnotations = getAllObjectPropertiesMapFromTypeAnnotation(path, propsAnnotation, state);
    const propsFound = new Set();
    const paramNames = [];

    for (let property of properties) {
      const propertyNode = property.node;

      if (t.isObjectProperty(propertyNode)) {
        if (t.isIdentifier(propertyNode.key) && t.isIdentifier(propertyNode.value)) {
          const name = propertyNode.key.name;
          propsFound.add(name);
          if (!propertyAnnotations.has(name)) {
            throw new Error(
              `The compiler failed to find a strong type annotation for the prop "${name}" at ${getCodeLocation(
                propertyNode,
              )}`,
            );
          }
          paramNames.push({
            annotation: propertyAnnotations.get(name),
            isRest: false,
            key: name,
            value: propertyNode.value.name,
          });
        } else {
          invariant(false, "TODO");
        }
      } else if (t.isRestElement(propertyNode)) {
        const spreadIdentifier = propertyNode.argument;
        invariant(t.isIdentifier(spreadIdentifier), "TODO");
        const spreadProperties = [];
        const spreadPropertyAnnotations = [];

        for (let [propertyName] of propertyAnnotations) {
          const sanitizedName = propertyName.replace(/-/g, "_");
          if (!propsFound.has(propertyName)) {
            propsFound.add(propertyName);
            paramNames.push({
              annotation: propertyAnnotations.get(propertyName),
              isRest: true,
              key: propertyName,
              value: sanitizedName,
            });
            const identifier = t.identifier(propertyName);
            const sanitizedIdentifier = t.identifier(sanitizedName);
            propsParam.pushContainer("properties", t.objectProperty(identifier, sanitizedIdentifier, false, true));
            const alreadyTransformed = new Set();
            path.traverse({
              Identifier(identifierPath) {
                if (alreadyTransformed.has(identifierPath.node)) {
                  return;
                }
                if (identifierPath.node.name === propertyName) {
                  const parentPath = identifierPath.parentPath;

                  if (t.isMemberExpression(parentPath.node)) {
                    alreadyTransformed.add(sanitizedIdentifier);
                    parentPath.replaceWith(sanitizedIdentifier);
                  }
                }
              },
            });
            spreadProperties.push(t.objectProperty(identifier, sanitizedIdentifier, false, true));
            spreadPropertyAnnotations.push(t.objectTypeProperty(identifier, propertyAnnotations.get(propertyName)));
          }
        }
        // Re-register the props param so all our new bindings get picked up
        propsParam.scope.registerBinding("param", params[0]);
        // Create an object for the spread in the body of the function, in case
        // the spread object is referenced directly. If it's not, it should get
        // DCEd out.
        property.remove();
        const spreadObject = t.objectExpression(spreadProperties);
        spreadObject.typeAnnotation = t.objectTypeAnnotation(spreadPropertyAnnotations);
        path.scope.push({ id: spreadIdentifier, init: spreadObject });
        break;
      }
    }
    // Sort alpha-numerically
    paramNames.sort((a, b) => {
      const nameA = a.key;
      const nameB = b.key;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return paramNames;
  }
}

export function isArrayMapConstructorTemplate(path, state) {
  if (isArrayConstructor(path, state)) {
    const calleePath = path.get("callee");
    const calleeNode = calleePath.node;

    if (t.isMemberExpression(calleeNode) && t.isIdentifier(calleeNode.property) && calleeNode.property.name === "map") {
      return true;
    }
  }
  return false;
}

export function isArrayConstructor(path, state) {
  if (t.isCallExpression(path.node)) {
    const calleePath = path.get("callee");
    const calleeNode = calleePath.node;

    // Array.from, Array.of, Object.values, Object.keys and all the Array.prototype methods that create
    // new arrays instead of mutating the existing array.
    if (t.isMemberExpression(calleeNode) && t.isIdentifier(calleeNode.property)) {
      const propertyName = calleeNode.property.name;
      const objectPathRef = getReferenceFromExpression(calleePath.get("object"), state);
      const objectNode = objectPathRef.node;

      if (t.isIdentifier(objectNode) && objectNode.name === "Object") {
        return propertyName === "keys" || propertyName === "values";
      } else if (t.isIdentifier(objectNode) && objectNode.name === "Array") {
        return propertyName === "from" || propertyName === "of";
      } else if (t.isCallExpression(objectNode) && isArrayConstructor(objectPathRef, state)) {
        return true;
      } else if (t.isConditionalExpression(objectNode)) {
        const alternatePath = objectPathRef.get("alternate");
        const alternateAnnotation = getTypeAnnotationForExpression(alternatePath, state, false);
        if (assertType(path, alternateAnnotation, true, state, "ARRAY")) {
          return true;
        }
        const consequentPath = objectPathRef.get("alternate");
        const consequentAnnotation = getTypeAnnotationForExpression(consequentPath, state, false);
        if (assertType(path, consequentAnnotation, true, state, "ARRAY")) {
          return true;
        }
      } else {
        if (isReactObject(objectPathRef, state)) {
          return false;
        }
        const args = path.get("arguments");
        if (args.length === 0) {
          return false;
        }
        const objectAnnotation = getTypeAnnotationForExpression(objectPathRef, state, false);
        const mapFuncAnnotation = getTypeAnnotationForExpression(args[0], state, false);

        if (
          assertType(path, objectAnnotation, true, state, "ARRAY") &&
          assertType(path, mapFuncAnnotation, true, state, "REACT_NODE")
        ) {
          return (
            propertyName === "map" ||
            propertyName === "reduce" ||
            propertyName === "filter" ||
            propertyName === "every" ||
            propertyName === "some" ||
            propertyName === "slice" ||
            propertyName === "entries" ||
            propertyName === "flat" ||
            propertyName === "flatMap" ||
            propertyName === "keys" ||
            propertyName === "values" ||
            propertyName === "concat"
          );
        }
      }
    }
  }
  return false;
}

export function isReactHook(path, state) {
  if (t.isCallExpression(path.node)) {
    let calleePathRef = getReferenceFromExpression(path.get("callee"), state);

    if (isDestructuredRef(calleePathRef)) {
      if (
        isReactObject(calleePathRef.object, state) &&
        t.isObjectProperty(calleePathRef.property.node) &&
        t.isIdentifier(calleePathRef.property.node.value)
      ) {
        const propertyName = calleePathRef.property.node.value.name;
        return propertyName.startsWith("use");
      }
    }
    if (t.isMemberExpression(calleePathRef.node)) {
      const objectPath = calleePathRef.get("object");

      if (isReactObject(objectPath, state) && t.isIdentifier(calleePathRef.node.property)) {
        const propertyName = calleePathRef.node.property.name;
        return propertyName.startsWith("use");
      }
    }
    if (t.isImportSpecifier(calleePathRef.node)) {
      const parentPath = calleePathRef.parentPath;

      if (
        t.isImportDeclaration(parentPath.node) &&
        t.isStringLiteral(parentPath.node.source) &&
        (parentPath.node.source.value === "react" || parentPath.node.source.value === "react-compiler-runtime")
      ) {
        return calleePathRef.node.imported.name.startsWith("use");
      }
    }
  }
  return false;
}

export function isReactCreateElement(path, state) {
  if (t.isCallExpression(path.node)) {
    let calleePathRef = getReferenceFromExpression(path.get("callee"), state, false);

    if (isDestructuredRef(calleePathRef)) {
      return (
        isReactObject(calleePathRef.object, state) &&
        t.isObjectProperty(calleePathRef.property.node) &&
        t.isIdentifier(calleePathRef.property.node.value) &&
        calleePathRef.property.node.value.name === "createElement"
      );
    }
    if (t.isMemberExpression(calleePathRef.node)) {
      const objectPath = calleePathRef.get("object");

      return (
        isReactObject(objectPath, state) &&
        ((t.isIdentifier(calleePathRef.node.property) && calleePathRef.node.property.name === "createElement") ||
          (t.isStringLiteral(calleePathRef.node.property) && calleePathRef.node.property.value === "createElement"))
      );
    }
  }
}

export function isReactFragment(path, state) {
  if (t.isMemberExpression(path.node) || t.isJSXMemberExpression(path.node)) {
    const objectPath = path.get("object");

    return (
      isReactObject(objectPath, state) &&
      (t.isIdentifier(path.node.property) || t.isJSXIdentifier(path.node.property)) &&
      path.node.property.name === "Fragment"
    );
  }
}

export function getAllPathsFromMutatedBinding(bindingPath, state) {
  const binding = bindingPath.scope.getBinding(bindingPath.node.name);
  const constantViolations = binding.constantViolations;
  const paths = [];

  for (let constantViolation of constantViolations) {
    const pathConditions = getPathConditions(bindingPath, constantViolation, state);
    let path;

    if (t.isAssignmentExpression(constantViolation.node)) {
      path = constantViolation.get("right");
    } else {
      invariant(false, "TODO");
    }

    if (pathConditions.length > 0) {
      paths.push({ pathConditions, path });
    }
  }
  return { paths, binding };
}

export function isNodeWithinReactElementTemplate(path, state) {
  let currentPath = path;

  while (currentPath != null) {
    if (
      t.isJSXExpressionContainer(currentPath.node) ||
      t.isJSXMemberExpression(currentPath.node) ||
      isReactCreateElement(currentPath, state)
    ) {
      return true;
    }
    currentPath = currentPath.parentPath;
  }
  return false;
}

export function isCommonJsLikeRequireCall(path) {
  const node = path.node;

  if (t.isCallExpression(node) && t.isIdentifier(node.callee) && node.callee.name === "require") {
    if (node.arguments.length === 1 && t.isStringLiteral(node.arguments[0])) {
      return true;
    }
  }
  return false;
}

export function isModuleExportsAssignment(path) {
  const node = path.node;

  return (
    t.isAssignmentExpression(node) &&
    t.isMemberExpression(node.left) &&
    t.isIdentifier(node.left.object) &&
    node.left.object.name === "module" &&
    t.isIdentifier(node.left.property) &&
    node.left.property.name === "exports"
  );
}

export function updateCommonJSLikeRequireCallPathToCompiledPath(path, state) {
  const node = path.node;

  if (t.isCallExpression(node)) {
    const requirePathString = node.arguments[0];
    const source = requirePathString.value;
    let newPath;

    if (source.endsWith(".compiled.js")) {
      return;
    }
    if (source.endsWith(".js")) {
      const basePath = source.slice(source.length - 3);
      newPath = `${basePath}.compiled.js`;
    } else {
      newPath = `${source}.compiled.js`;
    }

    requirePathString.value = newPath;
  }
}

export function updateImportSyntaxPathToCompiledPath(path, state) {
  const node = path.node;

  if (t.isImportDeclaration(node)) {
    const source = node.source.value;
    let newPath;

    if (source.endsWith(".compiled.js")) {
      return;
    }
    if (source.endsWith(".js")) {
      const basePath = source.slice(source.length - 3);
      newPath = `${basePath}.compiled.js`;
    } else {
      newPath = `${source}.compiled.js`;
    }

    node.source.value = newPath;
  }
}

export function isFbCxRequireCall(pathRef) {
  const node = pathRef.node;
  if (t.isCallExpression(node)) {
    if (
      isCommonJsLikeRequireCall(pathRef) &&
      t.isStringLiteral(node.arguments[0]) &&
      node.arguments[0].value === "cx"
    ) {
      return true;
    }
  }
  return false;
}

export function isFbCxCall(pathRef, state) {
  const node = pathRef.node;
  if (t.isCallExpression(node)) {
    const calleePath = pathRef.get("callee");
    const calleePathRef = getReferenceFromExpression(calleePath, state);

    if (isFbCxRequireCall(calleePathRef)) {
      return true;
    }
  }
  return false;
}

export function isFbtRequireCall(pathRef) {
  const node = pathRef.node;
  if (t.isCallExpression(node)) {
    if (
      isCommonJsLikeRequireCall(pathRef) &&
      t.isStringLiteral(node.arguments[0]) &&
      node.arguments[0].value === "fbt"
    ) {
      return true;
    }
  }
  return false;
}

export function isFbtImportCall(pathRef) {
  if (t.isImportDefaultSpecifier(pathRef.node)) {
    const parentPath = pathRef.parentPath;

    if (
      t.isImportDeclaration(parentPath.node) &&
      t.isStringLiteral(parentPath.node.source) &&
      parentPath.node.source.value === "fbt"
    ) {
      return true;
    }
  }
  return false;
}

export function isFbtCall(pathRef, state) {
  const node = pathRef.node;
  if (t.isCallExpression(node)) {
    const calleePath = pathRef.get("callee");
    const calleePathRef = getReferenceFromExpression(calleePath, state);

    if (isFbtRequireCall(calleePathRef)) {
      return true;
    }
    if (isFbtImportCall(calleePathRef)) {
      return true;
    }
  }
  return false;
}

export function isObjectAssignCall(pathRef, state) {
  const node = pathRef.node;
  if (t.isCallExpression(node)) {
    const calleePath = pathRef.get("callee");
    const calleePathRef = getReferenceFromExpression(calleePath, state);

    return (
      t.isMemberExpression(calleePathRef.node) &&
      t.isIdentifier(calleePathRef.node.object) &&
      calleePathRef.node.object.name === "Object" &&
      t.isIdentifier(calleePathRef.node.property) &&
      calleePathRef.node.property.name === "assign"
    );
  }
  return false;
}

export const emptyObject = t.objectExpression([]);
emptyObject.canDCE = true;
