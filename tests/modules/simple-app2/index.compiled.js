// props:{x: "Hello world!"}
var {
  ["Header"]: Header,
  ["formatString"]: formatString
} = require("./Header.compiled.js");

var Footer = require("./Footer.compiled.js");

import type { IndexProps } from "./type";

function App_ComputeFunction(x) {
  var __cached__0;

  __cached__0 = formatString(x);
  return [[x], __cached__0, [x]];
}

var App = // App OPCODES
[10 // COMPONENT
, 0 // USES_HOOKS
, ["x"] // ROOT_PROPS_SHAPE
, [13 // UNCONDITIONAL_TEMPLATE
, [2 // OPEN_ELEMENT_DIV
, 29 // REF_COMPONENT
, Header, 0 // COMPONENT_PROPS_ARRAY
, 34 // ELEMENT_DYNAMIC_CHILD_VALUE
, 1, 1 // HOST_NODE_VALUE_POINTER_INDEX
, 29 // REF_COMPONENT
, Footer, 2 // COMPONENT_PROPS_ARRAY
, 8 // CLOSE_ELEMENT
], App_ComputeFunction // COMPUTE_FUNCTION
, 2 // VALUE_POINTER_INDEX
]];
module["exports"] = App;