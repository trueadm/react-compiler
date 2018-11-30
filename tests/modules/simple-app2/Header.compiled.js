import { createTemplateNode } from "react-compiler-runtime";

const {
  formatString
} = require("./utils");

import type { HeaderProps } from "./type";

function Header_ComputeFunction // COMPUTE_FUNCTION
(x) {
  return [x];
}

function Header() {
  return (// Header OPCODES
    [0 // COMPONENT
    , "Header" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [8 // OPEN_ELEMENT_DIV
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    ], Header_ComputeFunction])]
  );
}

module.exports = {
  formatString,
  Header
};