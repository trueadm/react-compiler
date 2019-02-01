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

const App = [0, ["x"], App_ComputeFunction, [2050, "div", [[10, Header, 0], [3, 1], [10, Footer, 2]]]];
module["exports"] = App;