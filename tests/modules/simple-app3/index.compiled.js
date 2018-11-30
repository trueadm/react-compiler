import { createTemplateNode } from "react-compiler-runtime";
import Foo from "./Foo.compiled.js";
import { renderText, renderDiv, renderDivWithText, renderSpan } from "./utils.compiled.js";
var __opcodes__1 = // renderDivWithText OPCODES
[20 // UNCONDITIONAL_TEMPLATE
, [8 // OPEN_ELEMENT_DIV
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
], null // COMPUTE_FUNCTION
];

function App_ComputeFunction // COMPUTE_FUNCTION
() {
  var __cached__1;

  var __cached__0;

  renderSpan();
  __cached__1 = renderDivWithText("foo bar!");
  renderDiv();
  __cached__0 = renderText();
  renderText();
  return [[renderText()], __cached__0, __cached__1];
}

var App = // App OPCODES
[0 // COMPONENT
, "App" // DISPLAY_NAME
, null // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [8 // OPEN_ELEMENT_DIV
, 29 // REF_COMPONENT
, Foo, 0 // COMPONENT_PROPS_ARRAY
, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 1, 8 // OPEN_ELEMENT_DIV
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "span!", 10 // CLOSE_ELEMENT
, 44 // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL
, __opcodes__1, 2 // COMPUTE_VALUES
, 9 // OPEN_ELEMENT_SPAN
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Span!", 10 // CLOSE_ELEMENT
, 10 // CLOSE_ELEMENT
], App_ComputeFunction])];
module["exports"] = App;