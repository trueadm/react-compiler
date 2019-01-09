import { createTemplateNode } from "react-compiler-runtime";

function Component_ComputeFunction(val) {
  return [val];
}

export var Component = // Component OPCODES
[0 // COMPONENT
, ["val"] // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [12 // OPEN_FRAGMENT
, 8 // OPEN_ELEMENT_DIV
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Hello world", 10 // CLOSE_ELEMENT
, 12 // OPEN_FRAGMENT
, 9 // OPEN_ELEMENT_SPAN
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
, 40 // ELEMENT_STATIC_CHILD_VALUE
, "456", 7 // OPEN_VOID_ELEMENT
, "input", 60 // STATIC_PROP
, "type", "text", 11 // CLOSE_VOID_ELEMENT
, 12 // OPEN_FRAGMENT
, 12 // OPEN_FRAGMENT
, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 0, 13 // CLOSE_FRAGMENT
, 13 // CLOSE_FRAGMENT
, 13 // CLOSE_FRAGMENT
, 13 // CLOSE_FRAGMENT
], Component_ComputeFunction // COMPUTE_FUNCTION
])];