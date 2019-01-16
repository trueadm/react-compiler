import * as t from "@babel/types";

const OPCODES = {
  OPEN_ELEMENT: 0,
  OPEN_ELEMENT_WITH_POINTER: 1,
  OPEN_ELEMENT_DIV: 2,
  OPEN_ELEMENT_DIV_WITH_POINTER: 3,
  OPEN_ELEMENT_SPAN: 4,
  OPEN_ELEMENT_SPAN_WITH_POINTER: 5,
  OPEN_VOID_ELEMENT: 6,
  OPEN_VOID_ELEMENT_WITH_POINTER: 7,
  CLOSE_ELEMENT: 8,
  CLOSE_VOID_ELEMENT: 9,
  COMPONENT: 10,
  ROOT_STATIC_VALUE: 11,
  ROOT_DYNAMIC_VALUE: 12,
  UNCONDITIONAL_TEMPLATE: 13,
  CONDITIONAL_TEMPLATE: 14,
  MULTI_CONDITIONAL: 15,
  CONDITIONAL: 16,
  OPEN_FRAGMENT: 17,
  CLOSE_FRAGMENT: 18,
  OPEN_CONTEXT_PROVIDER: 19,
  CLOSE_CONTEXT_PROVIDER: 20,
  OPEN_PROP_STYLE: 21,
  CLOSE_PROP_STYLE: 22,
  TEMPLATE: 23,
  TEMPLATE_FROM_FUNC_CALL: 24,
  REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 25,
  CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  CONTEXT_CONSUMER_TEMPLATE: 28,
  REF_COMPONENT: 29,
  LOGICAL_OR: 30,
  LOGICAL_AND: 31,
  ELEMENT_STATIC_CHILD_VALUE: 32,
  ELEMENT_STATIC_CHILDREN_VALUE: 33,
  ELEMENT_DYNAMIC_CHILD_VALUE: 34,
  ELEMENT_DYNAMIC_CHILDREN_VALUE: 35,
  ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 36,
  ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 37,
  ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 38,
  ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 39,
  ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 40,
  ELEMENT_DYNAMIC_FUNCTION_CHILD: 41,
  STATIC_PROP: 42,
  DYNAMIC_PROP: 43,
  STATIC_PROP_CLASS_NAME: 44,
  DYNAMIC_PROP_CLASS_NAME: 45,
  STATIC_PROP_VALUE: 46,
  DYNAMIC_PROP_VALUE: 47,
  STATIC_PROP_STYLE: 48,
  DYNAMIC_PROP_STYLE: 49,
  STATIC_PROP_UNITLESS_STYLE: 50,
  DYNAMIC_PROP_UNITLESS_STYLE: 51,
  DYNAMIC_PROP_REF: 52,
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
        pushOpcodeValue(opcodes, t.numericLiteral(0));
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
