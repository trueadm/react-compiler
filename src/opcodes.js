import * as t from "@babel/types";

const OPCODES = {
  COMPONENT: 0,
  COMPONENT_WITH_HOOKS: 1,
  ROOT_STATIC_VALUE: 2,
  ROOT_DYNAMIC_VALUE: 3,

  OPEN_ELEMENT: 6,
  OPEN_VOID_ELEMENT: 7,
  OPEN_ELEMENT_DIV: 8,
  OPEN_ELEMENT_SPAN: 9,
  CLOSE_ELEMENT: 10,
  CLOSE_VOID_ELEMENT: 11,
  OPEN_FRAGMENT: 12,
  CLOSE_FRAGMENT: 13,
  OPEN_CONTEXT_PROVIDER: 14,
  CLOSE_CONTEXT_PROVIDER: 15,
  OPEN_PROP_STYLE: 16,
  CLOSE_PROP_STYLE: 17,

  UNCONDITIONAL_TEMPLATE: 20,
  CONDITIONAL_TEMPLATE: 21,
  TEMPLATE: 22,
  TEMPLATE_FROM_FUNC_CALL: 23,
  REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  MULTI_CONDITIONAL: 25,
  CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  CONTEXT_CONSUMER_TEMPLATE: 28,
  REF_COMPONENT: 29,
  CONDITIONAL: 30,
  LOGICAL_OR: 31,
  LOGICAL_AND: 32,

  ELEMENT_STATIC_CHILD_VALUE: 40,
  ELEMENT_STATIC_CHILDREN_VALUE: 41,
  ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,

  STATIC_PROP: 60,
  DYNAMIC_PROP: 61,
  STATIC_PROP_CLASS_NAME: 62,
  DYNAMIC_PROP_CLASS_NAME: 63,
  STATIC_PROP_VALUE: 64,
  DYNAMIC_PROP_VALUE: 65,
  STATIC_PROP_STYLE: 66,
  DYNAMIC_PROP_STYLE: 67,
  STATIC_PROP_UNITLESS_STYLE: 68,
  DYNAMIC_PROP_UNITLESS_STYLE: 69,
  STATIC_PROP_KEY: 70,
  DYNAMIC_PROP_KEY: 71,
  DYNAMIC_PROP_REF: 72,
};

function toBabelNode(value) {
  if (
    t.isArrayExpression(value) ||
    t.isStringLiteral(value) ||
    t.isNumericLiteral(value) ||
    t.isNullLiteral(value) ||
    t.isBooleanLiteral(value) ||
    t.isCallExpression(value) ||
    t.isIdentifier(value) ||
    t.isFunctionExpression(value) ||
    t.isArrowFunctionExpression(value)
  ) {
    return value;
  }

  if (typeof value === "boolean") {
    return t.booleanLiteral(value);
  } else if (typeof value === "number") {
    return t.numericLiteral(value);
  } else if (typeof value === "string") {
    return t.stringLiteral(value);
  } else if (value === null) {
    return t.nullLiteral();
  }
  throw new Error("TODO");
}

export function pushOpcode(opcodes, key, value, valueComment) {
  if (OPCODES[key] === undefined) {
    throw new Error("Bad opcode!");
  }
  let babelNode = toBabelNode(OPCODES[key]);
  babelNode.trailingComments = [{ type: "BlockComment", value: ` ${key}` }];
  opcodes.push(babelNode);
  if (value !== undefined) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        pushOpcodeValue(opcodes, t.nullLiteral());
      } else {
        for (let val of value) {
          pushOpcodeValue(opcodes, val, valueComment);
        }
      }
    } else {
      pushOpcodeValue(opcodes, value, valueComment);
    }
  }
}

export function pushOpcodeValue(opcodes, value, valueComment) {
  const babelNode = toBabelNode(value);
  if (valueComment !== undefined) {
    babelNode.trailingComments = [{ type: "BlockComment", value: ` ${valueComment}` }];
  }
  opcodes.push(babelNode);
}
