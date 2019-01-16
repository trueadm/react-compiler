import "react-compiler-runtime";
import Foo from "./Foo.compiled.js";
import { renderText, renderDiv, renderDivWithText, renderSpan } from "./utils.compiled.js";
var __opcodes__1 = // renderDivWithText OPCODES
[13 // UNCONDITIONAL_TEMPLATE
, [2 // OPEN_ELEMENT_DIV
, 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 2 // HOST_NODE_VALUE_POINTER_INDEX
, 8 // CLOSE_ELEMENT
], 0 // COMPUTE_FUNCTION
];

function App_ComputeFunction() {
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
[10 // COMPONENT
, 0 // USES_HOOKS
, 0 // ROOT_PROPS_SHAPE
, [13 // UNCONDITIONAL_TEMPLATE
, [2 // OPEN_ELEMENT_DIV
, 29 // REF_COMPONENT
, Foo, 0 // COMPONENT_PROPS_ARRAY
, 34 // ELEMENT_DYNAMIC_CHILD_VALUE
, 1, 1 // HOST_NODE_VALUE_POINTER_INDEX
, 2 // OPEN_ELEMENT_DIV
, 33 // ELEMENT_STATIC_CHILDREN_VALUE
, "span!", 8 // CLOSE_ELEMENT
, 36 // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL
, __opcodes__1, 2 // COMPUTE_VALUES
, 3 // HOST_NODE_VALUE_POINTER_INDEX
, 4 // OPEN_ELEMENT_SPAN
, 33 // ELEMENT_STATIC_CHILDREN_VALUE
, "Span!", 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
], App_ComputeFunction // COMPUTE_FUNCTION
, 4 // VALUE_POINTER_INDEX
]];
module["exports"] = App;