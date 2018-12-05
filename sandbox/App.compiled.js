import { createTemplateNode } from "react-compiler-runtime";

// props:{a: "this is a", b: "this is b", c: "this is c", className: "this is className", id: "this is id"}
function Component2_ComputeFunction // COMPUTE_FUNCTION
(className, id) {
  return [className, id];
}

function Component2() {
  return (// Component2 OPCODES
    [0 // COMPONENT
    , "Component2" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 0, 61 // DYNAMIC_PROP
    , "id", 0, 1, 41 // ELEMENT_STATIC_CHILDREN_VALUE
    , "Hello world", 10 // CLOSE_ELEMENT
    ], Component2_ComputeFunction])]
  );
}

function Component_ComputeFunction // COMPUTE_FUNCTION
(a, b, c, className, id) {
  return [id, a, b, c, [className, id]];
}

var Component = // Component OPCODES
[0 // COMPONENT
, "Component" // DISPLAY_NAME
, ["a", "b", "c", "className", "id"] // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [8 // OPEN_ELEMENT_DIV
, 62 // STATIC_PROP_CLASS_NAME
, "override", 61 // DYNAMIC_PROP
, "id", 0, 0, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 1, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 2, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 3, 29 // REF_COMPONENT
, Component2, 4 // COMPONENT_PROPS_ARRAY
, 10 // CLOSE_ELEMENT
], Component_ComputeFunction])];
module["exports"] = Component;