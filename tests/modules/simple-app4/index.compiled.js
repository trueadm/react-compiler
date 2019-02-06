import "react-compiler-runtime";
import Foo from "./Foo.compiled.js";
import { renderText, renderDivOrNull, renderDivWithText, renderSpan } from "./utils.compiled.js";

function App_ComputeFunction() {
  var __cached__2;

  var __cached__1;

  var __cached__0;

  __cached__2 = renderDivWithText("foo bar!");
  __cached__1 = renderDivOrNull(true);
  __cached__0 = renderText();
  renderText();
  return [[renderText()], __cached__0, __cached__1, __cached__2];
}

const App = [0, 0, App_ComputeFunction, [2050, "div", [[11, Foo, 0], [3, 1], [8, [4098, "div", "another span!"], 2], [8, [8194, "div", 0], 3], [36866, "span", "Span!"]]]];
module["exports"] = App;