import type { FooterProps } from "./type";

function Footer_ComputeFunction(x) {
  return [x];
}

function Footer() {
  return (// Footer OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , [13 // UNCONDITIONAL_TEMPLATE
    , [2 // OPEN_ELEMENT_DIV
    , 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 1 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    ], Footer_ComputeFunction // COMPUTE_FUNCTION
    , 2 // VALUE_POINTER_INDEX
    ]]
  );
}

module.exports = Footer;