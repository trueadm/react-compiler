import Foo from "./Foo.compiled.js";
import { renderText, renderDiv, renderDivWithText, renderSpan } from "./utils.compiled.js";
var __opcodes__1 = // renderDivWithText OPCODES
[0, 0, 20 // UNCONDITIONAL_TEMPLATE
, [0, 0, 8 // OPEN_ELEMENT_DIV
, 1 // VALUE_POINTER_INDEX
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
], 1 // VALUE_POINTER_INDEX
, null // COMPUTE_FUNCTION
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
[0, 0, 0 // COMPONENT
, null // ROOT_PROPS_SHAPE
, [0, 0, 20 // UNCONDITIONAL_TEMPLATE
, [0, 0, 8 // OPEN_ELEMENT_DIV
, 0 // VALUE_POINTER_INDEX
, 29 // REF_COMPONENT
, Foo, 0 // COMPONENT_PROPS_ARRAY
, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 1, 8 // OPEN_ELEMENT_DIV
, 1 // VALUE_POINTER_INDEX
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "span!", 10 // CLOSE_ELEMENT
, 44 // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL
, __opcodes__1, 2 // COMPUTE_VALUES
, 9 // OPEN_ELEMENT_SPAN
, 1 // VALUE_POINTER_INDEX
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Span!", 10 // CLOSE_ELEMENT
, 10 // CLOSE_ELEMENT
], 0 // VALUE_POINTER_INDEX
, App_ComputeFunction // COMPUTE_FUNCTION
]];
module["exports"] = App;