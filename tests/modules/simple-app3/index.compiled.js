import Foo from "./Foo.compiled.js";
import { renderText, renderDiv, renderDivWithText, renderSpan } from "./utils.compiled.js";

function App_ComputeFunction() {
  var __cached__1;

  var __cached__0;

  __cached__1 = renderDivWithText("foo bar!");
  __cached__0 = renderText();
  renderText();
  return [[renderText()], __cached__0, __cached__1];
}

const App = [0, 0, App_ComputeFunction, [2050, "div", [[12, Foo, 0], [3, 1], [102402, "div", "span!"], [8, [8194, "div", 0], 2], [102402, "span", "Span!"]]]];
module["exports"] = App;