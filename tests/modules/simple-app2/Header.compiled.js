const {
  formatString
} = require("./utils");

import type { HeaderProps } from "./type";

function Header_ComputeFunction(x) {
  return [x];
}

const Header = [1, Header_ComputeFunction, [8194, "div", 0]];
module.exports = {
  formatString,
  Header
};