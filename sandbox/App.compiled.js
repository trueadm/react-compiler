import { createTemplateNode } from "react-compiler-runtime";

// props:{val: "hello world"}
var Component2_ComputeFunction = function (children) {
  return [children];
},
    Component2 = function () {
  return (// Component2 OPCODES
    [0 // COMPONENT
    , "Component2" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    ], Component2_ComputeFunction // COMPUTE_FUNCTION
    ])]
  );
};

var Component_ComputeFunction = function (val) {
  return [[val]];
},
    Component = // Component OPCODES
[0 // COMPONENT
, "Component" // DISPLAY_NAME
, ["val"] // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [29 // REF_COMPONENT
, Component2, 0 // COMPONENT_PROPS_ARRAY
], Component_ComputeFunction // COMPUTE_FUNCTION
])];

module["exports"] = Component;