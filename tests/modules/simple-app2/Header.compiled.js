const {
  formatString
} = require("./utils");

import type { HeaderProps } from "./type";

function Header_ComputeFunction(x) {
  return [x];
}

function Header() {
  return (// Header OPCODES
    [0, 0, 0 // COMPONENT
    , [0, 0, 20 // UNCONDITIONAL_TEMPLATE
    , [0, 0, 8 // OPEN_ELEMENT_DIV
    , 0 // VALUE_POINTER_INDEX
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    ], 0 // VALUE_POINTER_INDEX
    , Header_ComputeFunction // COMPUTE_FUNCTION
    ]]
  );
}

module.exports = {
  formatString,
  Header
};