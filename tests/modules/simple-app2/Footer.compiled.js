import type { FooterProps } from "./type";

function Footer_ComputeFunction(x) {
  return [x];
}

function Footer() {
  return (// Footer OPCODES
    [0, 0, 0 // COMPONENT
    , [0, 0, 20 // UNCONDITIONAL_TEMPLATE
    , [0, 0, 8 // OPEN_ELEMENT_DIV
    , 0 // VALUE_POINTER_INDEX
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    ], 0 // VALUE_POINTER_INDEX
    , Footer_ComputeFunction // COMPUTE_FUNCTION
    ]]
  );
}

module.exports = Footer;