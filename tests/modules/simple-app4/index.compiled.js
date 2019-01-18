import "react-compiler-runtime";
import Foo from "./Foo.compiled.js";
import { renderText, renderDivOrNull, renderDivWithText, renderSpan } from "./utils.compiled.js";
var __opcodes__0 // OPCODES
= // renderDivOrNull OPCODES
[2 // OPEN_ELEMENT_DIV
, 31 // ELEMENT_STATIC_CHILDREN_VALUE
, "another span!", 8 // CLOSE_ELEMENT
],
    __opcodes__1 // OPCODES
= // renderDivWithText OPCODES
[2 // OPEN_ELEMENT_DIV
, 33 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 3 // HOST_NODE_VALUE_POINTER_INDEX
, 8 // CLOSE_ELEMENT
];

function App_ComputeFunction() {
  var __cached__2;

  var __cached__1;

  var __cached__0;

  renderSpan();
  __cached__2 = renderDivWithText("foo bar!");
  __cached__1 = renderDivOrNull(true);
  __cached__0 = renderText();
  renderText();
  return [[renderText()], __cached__0, __cached__1, __cached__2];
}

var App = // App OPCODES
[10 // COMPONENT
, 0 // USES_HOOKS
, 0 // ROOT_PROPS_SHAPE
, App_ComputeFunction // COMPUTE_FUNCTION
, 5 // VALUE_POINTER_INDEX
, [2 // OPEN_ELEMENT_DIV
, 27 // REF_COMPONENT
, Foo, 0 // COMPONENT_PROPS_ARRAY
, 32 // ELEMENT_DYNAMIC_CHILD_VALUE
, 1, 1 // HOST_NODE_VALUE_POINTER_INDEX
, 34 // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL
, __opcodes__0, 2 // COMPUTE_VALUES
, 2 // HOST_NODE_VALUE_POINTER_INDEX
, 34 // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL
, __opcodes__1, 3 // COMPUTE_VALUES
, 4 // HOST_NODE_VALUE_POINTER_INDEX
, 4 // OPEN_ELEMENT_SPAN
, 31 // ELEMENT_STATIC_CHILDREN_VALUE
, "Span!", 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
]];
module["exports"] = App;