import { createReactNode } from "react-compiler-runtime";

// props:{val: "hello world"}
function Component2_ComputeFunction(children) {
  return [children];
}

function Component2() {
  return (// Component2 OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , Component2_ComputeFunction // COMPUTE_FUNCTION
    , 1 // VALUE_POINTER_INDEX
    , [4 // OPEN_ELEMENT_SPAN
    , 30 // ELEMENT_STATIC_CHILD_VALUE
    , "The child is ", 37 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 0, 0 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    ]]
  );
}

function Component3() {
  return (// Component3 OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , 0 // COMPUTE_FUNCTION
    , [11 // ROOT_STATIC_VALUE
    , "It works!"]]
  );
}

var __hoisted__opcodes__0 = [4 // OPEN_ELEMENT_SPAN
, 31 // ELEMENT_STATIC_CHILDREN_VALUE
, "Hello world", 8 // CLOSE_ELEMENT
];
var __hoisted__opcodes__1 = [27 // REF_COMPONENT
, Component3, null // COMPONENT_PROPS_ARRAY
];
var Component = // Component OPCODES
[10 // COMPONENT
, 0 // USES_HOOKS
, ["val"] // ROOT_PROPS_SHAPE
, 0 // COMPUTE_FUNCTION
, [2 // OPEN_ELEMENT_DIV
, 27 // REF_COMPONENT
, Component2, [[createReactNode(__hoisted__opcodes__0), createReactNode(__hoisted__opcodes__1)]] // COMPONENT_PROPS_ARRAY
, 8 // CLOSE_ELEMENT
]];
module["exports"] = Component;