import { useState } from "react-compiler-runtime";

function Component_ComputeFunction() {
  const [value] = useState("Hello world");
  return [value];
}

export var Component = // Component OPCODES
[0 // COMPONENT
, 1 // USES_HOOKS
, 0 // ROOT_PROPS_SHAPE
, [20 // UNCONDITIONAL_TEMPLATE
, [8 // OPEN_ELEMENT_DIV
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
], Component_ComputeFunction // COMPUTE_FUNCTION
, 1 // VALUE_POINTER_INDEX
]];