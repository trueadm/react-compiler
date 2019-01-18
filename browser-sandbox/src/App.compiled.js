import { useState } from "react-compiler-runtime";

function Component_ComputeFunction() {
  var __cached__0;

  const [count, updateCount] = useState(0);

  __cached__0 = function increment() {
    updateCount(count + 1);
  };

  return [count, __cached__0];
}

export var Component = // Component OPCODES
[10 // COMPONENT
, 1 // USES_HOOKS
, 0 // ROOT_PROPS_SHAPE
, [13 // UNCONDITIONAL_TEMPLATE
, [2 // OPEN_ELEMENT_DIV
, 0 // OPEN_ELEMENT
, "h1", 33 // ELEMENT_STATIC_CHILDREN_VALUE
, "This is a counter!", 8 // CLOSE_ELEMENT
, 2 // OPEN_ELEMENT_DIV
, 0 // OPEN_ELEMENT
, "p", 32 // ELEMENT_STATIC_CHILD_VALUE
, "The counter is currently at ", 34 // ELEMENT_DYNAMIC_CHILD_VALUE
, 0, 1 // HOST_NODE_VALUE_POINTER_INDEX
, 8 // CLOSE_ELEMENT
, 1 // OPEN_ELEMENT_WITH_POINTER
, "button", 2 // HOST_NODE_VALUE_POINTER_INDEX
, 43 // DYNAMIC_PROP
, "click", 2, 3, 1, 33 // ELEMENT_STATIC_CHILDREN_VALUE
, "Increase count", 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
], Component_ComputeFunction // COMPUTE_FUNCTION
, 3 // VALUE_POINTER_INDEX
]];