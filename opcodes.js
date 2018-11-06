const t = require("babel-types");

const OPCODES = {
  COMPONENT: 0,
  COMPONENT_WITH_HOOKS: 1,
  DISPLAY_NAME: 2,
  COMPUTE_FUNCTION: 3,

  OPEN_ELEMENT: 6,
  OPEN_ELEMENT_DIV: 7,
  OPEN_ELEMENT_SPAN: 8,
  CLOSE_ELEMENT: 9,

  ROOT_RETURN: 10,
  CONDITIONAL_ROOT_RETURN: 11,

  ELEMENT_STATIC_TEXT_CHILD: 20,
  ELEMENT_STATIC_TEXT_CONTENT: 21,
  ELEMENT_DYNAMIC_TEXT_CHILD: 22,
  ELEMENT_DYNAMIC_TEXT_CONTENT: 23,
  STATIC_PROP: 24,
  DYNAMIC_PROP: 25,

  STATIC_PROP_CLASS_NAME: 25
};

function toBabelNode(value) {
  if (
    t.isArrayExpression(value) ||
    t.isStringLiteral(value) ||
    t.isNumericLiteral(value) ||
    t.isNullLiteral(value)
  ) {
    return value;
  }

  if (typeof value === "number") {
    return t.numericLiteral(value);
  } else if (typeof value === "string") {
    return t.stringLiteral(value);
  } else if (t.isFunctionDeclaration(value)) {
    return value.id;
  } else if (value === null) {
    return t.nullLiteral();
  }
  debugger;
}

function pushOpcode(opcodes, key, value, valueComment) {
  if (OPCODES[key] === undefined) {
    throw new Error("Bad opcode!");
  }
  let babelNode = toBabelNode(OPCODES[key]);
  babelNode.trailingComments = [{ type: "BlockComment", value: ` ${key}` }];
  opcodes.push(babelNode);
  if (value !== undefined) {
    if (Array.isArray(value)) {
      for (let val of value) {
        pushOpcodeValue(opcodes, val, valueComment);
      }
    } else {
      pushOpcodeValue(opcodes, value, valueComment);
    }
  }
}

function pushOpcodeValue(opcodes, value, valueComment) {
  const babelNode = toBabelNode(value);
  if (valueComment !== undefined) {
    babelNode.trailingComments = [
      { type: "BlockComment", value: ` ${valueComment}` }
    ];
  }
  opcodes.push(babelNode);
}

module.exports = {
  pushOpcode,
  pushOpcodeValue
};
