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
  CONDITIONAL_TEMPLATE: 13,
  MULTI_CONDITIONAL: 14,
  CONDITIONAL: 15,
  OPEN_FRAGMENT: 16,
  CLOSE_FRAGMENT: 17,
  OPEN_CONTEXT_PROVIDER: 18,
  CLOSE_CONTEXT_PROVIDER: 19,
  CONTEXT_CONSUMER: 20,
  OPEN_PROP_STYLE: 21,
  CLOSE_PROP_STYLE: 22,
  TEMPLATE_FROM_FUNC_CALL: 23,
  REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  REF_COMPONENT: 25,
  LOGICAL_OR: 26,
  LOGICAL_AND: 27,
  ELEMENT_STATIC_CHILD_VALUE: 28,
  ELEMENT_STATIC_CHILDREN_VALUE: 29,
  ELEMENT_DYNAMIC_CHILD_VALUE: 30,
  ELEMENT_DYNAMIC_CHILDREN_VALUE: 31,
  ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 32,
  ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 33,
  ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 34,
  ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 35,
  ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 36,
  ELEMENT_DYNAMIC_FUNCTION_CHILD: 37,
  STATIC_PROP: 38,
  DYNAMIC_PROP: 39,
  STATIC_PROP_CLASS_NAME: 40,
  DYNAMIC_PROP_CLASS_NAME: 41,
  STATIC_PROP_VALUE: 42,
  DYNAMIC_PROP_VALUE: 43,
  STATIC_PROP_STYLE: 44,
  DYNAMIC_PROP_STYLE: 45,
  STATIC_PROP_UNITLESS_STYLE: 46,
  DYNAMIC_PROP_UNITLESS_STYLE: 47,
  DYNAMIC_PROP_REF: 48,
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
