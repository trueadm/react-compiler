import { createTemplateNode } from "react-compiler-runtime";

var Header = require("./Header.compiled.js");

var App = // App OPCODES
[0 // COMPONENT
, "App" // DISPLAY_NAME
, null // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [8 // OPEN_ELEMENT_DIV
, 29 // REF_COMPONENT
, Header, null // COMPONENT_PROPS_ARRAY
, 40 // ELEMENT_STATIC_CHILD_VALUE
, "App", 10 // CLOSE_ELEMENT
], null // COMPUTE_FUNCTION
])];
module["exports"] = App;