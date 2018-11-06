const t = require("babel-types");
const { pushOpcode, pushOpcodeValue } = require("./opcodes");

const isDevMode = true;

function stringLiteralTrimmer(lastNonEmptyLine, lineCount, line, i) {
  var isFirstLine = (i === 0);
  var isLastLine = (i === lineCount - 1);
  var isLastNonEmptyLine = (i === lastNonEmptyLine);
  // replace rendered whitespace tabs with spaces
  var trimmedLine = line.replace(/\t/g, ' ');
  // trim leading whitespace
  if (!isFirstLine) {
    trimmedLine = trimmedLine.replace(/^[ ]+/, '');
  }
  // trim trailing whitespace
  if (!isLastLine) {
    trimmedLine = trimmedLine.replace(/[ ]+$/, '');
  }
  if (trimmedLine.length > 0) {
    if (!isLastNonEmptyLine) {
      trimmedLine += ' ';
    }
    return trimmedLine;
  }
  return '';
}

function handleWhiteSpace(value) {
  var lines = value.split(/\r\n|\n|\r/);
  var lastNonEmptyLine = 0;

  for (var i = lines.length - 1; i > 0; i--) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
      break;
    }
  }
  var str = lines
    .map(stringLiteralTrimmer.bind(null, lastNonEmptyLine, lines.length))
    .filter(function (line) {
      return line.length > 0;
    })
    .join('');

  if (str.length > 0) {
    return str;
  }
  return '';
}

function isPrimitive(arg) {
  return (
    t.isNullLiteral(arg) ||
    t.isNumericLiteral(arg) ||
    t.isStringLiteral(arg) ||
    t.isBooleanLiteral(arg)
  );
}

function getCodeLocation(loc) {
  return `${loc.start.line}:${loc.start.column}`;
}

function isRootPathConditional(componentPath, path) {
  let currentPath = path;

  while (currentPath !== undefined && currentPath !== componentPath) {
    let node = currentPath.node;
    if (
      t.isIfStatement(node) ||
      t.isConditionalExpression(node) ||
      t.isLogicalExpression(node)
    ) {
      return true;
    }
    currentPath = currentPath.parentPath;
  }
  return false;
}

function getComponentName(node) {
  if (t.isIdentifier(node.id)) {
    return node.id.name;
  }
  debugger;
}

function isHostComponent(strName) {
  const firstChar = strName[0];
  return (
    firstChar === firstChar.toLowerCase() &&
    firstChar !== "_" &&
    firstChar !== "$"
  );
}

function getTypeAnnotationForExpression(path) {
  const node = path.node;

  if (t.isStringLiteral(node)) {
    return t.stringTypeAnnotation();
  }
  if (t.isMemberExpression(node)) {
    const objectPath = path.get("object");
    const objectType = getTypeAnnotationForExpression(objectPath);
    const property = node.property;

    if (t.isObjectTypeAnnotation(objectType)) {
      for (let typeProperty of objectType.properties) {
        const typePropertyKey = typeProperty.key;

        if (
          t.isIdentifier(property) &&
          t.isIdentifier(typePropertyKey) &&
          property.name === typePropertyKey.name
        ) {
          return typeProperty.value;
        }
      }
    }
  } else if (t.isIdentifier(node)) {
    const binding = path.scope.getBinding(path.node.name);
    if (binding !== undefined && binding.path !== path) {
      const bindingPath = binding.path;
      const bindingNode = bindingPath.node;
      const typeForIdentifier = getTypeAnnotationForExpression(bindingPath);

      if (
        t.isObjectPattern(bindingNode) &&
        t.isObjectTypeAnnotation(typeForIdentifier)
      ) {
        for (let typeProperty of typeForIdentifier.properties) {
          const typePropertyKey = typeProperty.key;

          if (
            t.isIdentifier(typePropertyKey) &&
            node.name === typePropertyKey.name
          ) {
            return typeProperty.value;
          }
        }
      }
      return typeForIdentifier;
    }
    const annotation = path.getTypeAnnotation();

    if (!t.isAnyTypeAnnotation(annotation)) {
      return annotation;
    }
  } else if (t.isVariableDeclarator(node)) {
    const initPath = path.get("init");
    return getTypeAnnotationForExpression(initPath);
  } else if (t.isJSXExpressionContainer(node)) {
    const expressionPath = path.get("expression");
    return getTypeAnnotationForExpression(expressionPath);
  } else if (t.isObjectPattern(node)) {
    const annotation = path.getTypeAnnotation();

    if (!t.isAnyTypeAnnotation(annotation)) {
      return annotation;
    }
  } else if (t.isConditionalExpression(node)) {
    let consequentPath = path.get("consequent");
    let alternatePath = path.get("alternate");
    let consequentType = getTypeAnnotationForExpression(consequentPath);
    let alternateType = getTypeAnnotationForExpression(alternatePath);
    if (consequentType.type === alternateType.type) {
      return consequentType;
    }
    debugger;
  } else {
    debugger;
  }
  throw new Error(
    `Missing or <any> type annotation for runtime value "${path.getSource()}" at ${getCodeLocation(
      path.node.loc
    )}`
  );
}

function recursivelyCreateOpcodesForJSXNode(path, opcodes, runtimeValues) {
  const node = path.node;
  const openingElementPath = path.get("openingElement");
  const openingElement = node.openingElement;
  const name = openingElement.name;
  let isHostNode = false;

  if (t.isJSXIdentifier(name)) {
    const strName = name.name;

    if (isHostComponent(strName)) {
      isHostNode = true;
      if (strName === "div") {
        pushOpcode(opcodes, "OPEN_ELEMENT_DIV");
      } else if (strName === "span") {
        pushOpcode(opcodes, "OPEN_ELEMENT_SPAN");
      } else {
        pushOpcode(opcodes, "OPEN_ELEMENT", strName);
      }
    } else {
      debugger;
    }
  } else {
    debugger;
  }
  const attributes = openingElement.attributes;
  const attributesPath = openingElementPath.get("attributes");

  if (attributes.length > 0) {
    for (let i = 0; i < attributes.length; i++) {
      let attributePath = attributesPath[i];
      let attributeNode = attributes[i];

      if (t.isJSXAttribute(attributeNode)) {
        const attributeName = attributeNode.name;
        let nameStr;

        if (t.isJSXIdentifier(attributeName)) {
          nameStr = attributeName.name;
        } else {
          debugger;
        }
        const attributeOpcodes = [];
        const runtimeValuesSize = runtimeValues.size;
        recursivelyCreateOpcodesForNode(
          attributePath.get("value"),
          attributeOpcodes,
          runtimeValues
        );
        // Static vs dynamic
        if (runtimeValuesSize === runtimeValues.size) {
          if (nameStr === "className" || nameStr === "class") {
            pushOpcode(opcodes, "STATIC_PROP_CLASS_NAME", attributeOpcodes);
          } else {
            pushOpcode(opcodes, "STATIC_PROP", [nameStr, ...attributeOpcodes]);
          }
        } else {
          pushOpcode(opcodes, "DYNAMIC_PROP", [nameStr, ...attributeOpcodes]);
        }
      } else {
        debugger;
      }
    }
  }
  const children = node.children;
  const childrenPath = path.get("children");

  const createOpcodesForChild = (i, onlyChild) => {
    const childOpcodes = [];
    const runtimeValuesSize = runtimeValues.size;
    const childPath = childrenPath[i];

    recursivelyCreateOpcodesForNode(childPath, childOpcodes, runtimeValues);
    // Static vs dynamic
    if (runtimeValuesSize === runtimeValues.size) {
      if (onlyChild) {
        pushOpcode(opcodes, "ELEMENT_STATIC_TEXT_CONTENT", childOpcodes);
      } else {
        pushOpcode(opcodes, "ELEMENT_STATIC_TEXT_CHILD", childOpcodes);
      }
    } else {
      const typeAnnotation = getTypeAnnotationForExpression(childPath);
      // Text child/children
      if (t.isStringTypeAnnotation(typeAnnotation)) {
        if (onlyChild) {
          pushOpcode(opcodes, "ELEMENT_DYNAMIC_TEXT_CONTENT", childOpcodes);
        } else {
          pushOpcode(opcodes, "ELEMENT_DYNAMIC_TEXT_CHILD", childOpcodes);
        }
      } else {
        debugger;
      }
    }
  };

  if (children.length > 1) {
    for (let i = 0; i < children.length; i++) {
      createOpcodesForChild(i, false);
    }
  } else {
    createOpcodesForChild(0, true);
  }
  pushOpcode(opcodes, "CLOSE_ELEMENT");
}

function recursivelyCreateOpcodesForExpressionNode(
  path,
  opcodes,
  runtimeValues
) {
  const node = path.node;
  if (isPrimitive(node)) {
    if (t.isNullLiteral(node)) {
      pushOpcodeValue(opcodes, null);
    } else {
      pushOpcodeValue(opcodes, node.value);
    }
    return;
  }
  const runtimeValuePointer = runtimeValues.size;
  runtimeValues.set(path.node, runtimeValuePointer);
  pushOpcodeValue(opcodes, runtimeValuePointer);
}

function recursivelyCreateOpcodesForNode(path, opcodes, runtimeValues) {
  const node = path.node;

  if (t.isJSXElement(node)) {
    recursivelyCreateOpcodesForJSXNode(path, opcodes, runtimeValues);
  } else if (t.isJSXText(node) || isPrimitive(node)) {
    const text = handleWhiteSpace(node.value);
    if (text !== "") {
      pushOpcodeValue(opcodes, text);
    }
  } else if (t.isJSXExpressionContainer(node)) {
    recursivelyCreateOpcodesForExpressionNode(
      path.get("expression"),
      opcodes,
      runtimeValues
    );
  } else {
    debugger;
  }
}

function createOpcodesForRootTemplateBranch(rootTemplateBranch, rootTemplateBranchIndex) {
  const opcodes = [];
  const runtimeValues = new Map();
  if (rootTemplateBranchIndex !== null) {
    runtimeValues.set(t.numericLiteral(rootTemplateBranchIndex), 0);
  }
  // Get the argument from the return statement
  const path = rootTemplateBranch.path.get("argument");
  const node = path.node;
  recursivelyCreateOpcodesForNode(path, opcodes, runtimeValues);
  const isStatic = runtimeValues.size === 0;
  // replace branch with values array
  const runtimeValuesArray = [];
  for (let [runtimeValue, index] of runtimeValues) {
    runtimeValuesArray[index] = runtimeValue;
  }
  path.replaceWith(t.arrayExpression(runtimeValuesArray));
  return [opcodes, isStatic];
}

function createOpcodesForRootTemplateBranches(
  rootTemplateBranches,
  opcodes,
  computeFunction
) {
  if (rootTemplateBranches.length === 1) {
    const rootTemplateBranch = rootTemplateBranches[0];
    pushOpcode(opcodes, "ROOT_RETURN");
    const [
      opcodesForTemplateBranch,
      isBranchStatic
    ] = createOpcodesForRootTemplateBranch(rootTemplateBranch, null);
    if (!isBranchStatic) {
      pushOpcode(opcodes, "COMPUTE_FUNCTION", computeFunction);
    }
    pushOpcodeValue(opcodes, t.arrayExpression(opcodesForTemplateBranch));
    return isBranchStatic;
  } else {
    // Check how many non primitive roots we have
    const nonPrimitiveRoots = rootTemplateBranches.filter(
      branch => !branch.isPrimitive
    );

    if (nonPrimitiveRoots.length === 1) {
      // Optimization path, for where all roots, but one, are primitives. We don't need
      // to use a conditional root return.
      const rootTemplateBranch = nonPrimitiveRoots[0];
      pushOpcode(opcodes, "ROOT_RETURN");
      const [
        opcodesForTemplateBranch,
        isBranchStatic
      ] = createOpcodesForRootTemplateBranch(rootTemplateBranch, null);
      if (!isBranchStatic) {
        pushOpcode(opcodes, "COMPUTE_FUNCTION", computeFunction);
      }
      pushOpcodeValue(opcodes, t.arrayExpression(opcodesForTemplateBranch));
      return isBranchStatic;
    } else {
      pushOpcode(opcodes, "CONDITIONAL_ROOT_RETURN");
      let rootTemplateBranchIndex = 0;
      let isStatic = true;
      for (let rootTemplateBranch of rootTemplateBranches) {
        if (!rootTemplateBranch.isPrimitive) {
          pushOpcodeValue(
            opcodes,
            rootTemplateBranchIndex,
            "CONDITIONAL_ROOT_INDEX"
          );
          const [
            opcodesForTemplateBranch,
            isBranchStatic
          ] = createOpcodesForRootTemplateBranch(rootTemplateBranch, rootTemplateBranchIndex);
          if (!isBranchStatic) {
            isStatic = false;
          }
          pushOpcodeValue(opcodes, t.arrayExpression(opcodesForTemplateBranch));
          rootTemplateBranchIndex++;
        }
      }
      if (!isStatic) {
        pushOpcode(opcodes, "COMPUTE_FUNCTION", computeFunction);
      }
      return isStatic;
    }
  }
}

function createOpcodesForReactFunctionComponent(componentPath, state) {
  const computeFunction = componentPath.node;
  const name = getComponentName(computeFunction);
  const opcodes = [];
  let previousRootWasConditional = false;

  // Change compute function name
  if (t.isFunctionDeclaration(computeFunction)) {
    if (t.isIdentifier(computeFunction.id)) {
      computeFunction.id.name = `${name}_ComputeFunction`;
    }
  } else {
    debugger;
  }

  pushOpcode(opcodes, "COMPONENT_WITH_HOOKS");

  if (isDevMode) {
    pushOpcodeValue(opcodes, name, "DISPLAY_NAME");
  }

  const rootTemplateBranches = [];
  componentPath.traverse({
    ReturnStatement(templatePath) {
      if (templatePath.scope.getFunctionParent() !== componentPath.scope) {
        return;
      }
      const isConditional =
        previousRootWasConditional ||
        isRootPathConditional(componentPath, templatePath);
      if (isConditional) {
        previousRootWasConditional = true;
      }
      // Replace template note with value array
      const arg = templatePath.node.argument;

      rootTemplateBranches.push({
        path: templatePath,
        isConditional,
        isPrimitive: isPrimitive(arg)
      });
    }
  });
  const isStatic = createOpcodesForRootTemplateBranches(
    rootTemplateBranches,
    opcodes,
    computeFunction
  );
  const opcodesArray = t.arrayExpression(opcodes);

  opcodesArray.leadingComments = [
    { type: "BlockComment", value: ` ${name} OPCODES` }
  ];
  if (t.isFunctionDeclaration(computeFunction)) {
    if (isStatic) {
      componentPath.replaceWith(
        t.variableDeclaration("var", [
          t.variableDeclarator(t.identifier(name), opcodesArray)
        ])
      );
    } else {
      componentPath.replaceWithMultiple([
        computeFunction,
        t.variableDeclaration("var", [
          t.variableDeclarator(t.identifier(name), opcodesArray)
        ])
      ]);
    }
  }
}

module.exports = function() {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        const node = path.node;

        if (node.react === true) {
          createOpcodesForReactFunctionComponent(path, state);
        }
      }
    }
  };
};
