import { createTemplateNode } from "react-compiler-runtime";

var React = require("react");

var Component = // Component OPCODES
[0 // COMPONENT
, "Component" // DISPLAY_NAME
, null // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [12 // OPEN_FRAGMENT
, 8 // OPEN_ELEMENT_DIV
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Hello world", 10 // CLOSE_ELEMENT
, 12 // OPEN_FRAGMENT
, 9 // OPEN_ELEMENT_SPAN
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "123", 10 // CLOSE_ELEMENT
, 40 // ELEMENT_STATIC_CHILD_VALUE
, "456", 7 // OPEN_VOID_ELEMENT
, "input", 60 // STATIC_PROP
, "type", "text", 11 // CLOSE_VOID_ELEMENT
, 12 // OPEN_FRAGMENT
, 12 // OPEN_FRAGMENT
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "789", 13 // CLOSE_FRAGMENT
, 13 // CLOSE_FRAGMENT
, 13 // CLOSE_FRAGMENT
, 13 // CLOSE_FRAGMENT
], null // COMPUTE_FUNCTION
])];
module["exports"] = Component;