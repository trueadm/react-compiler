import type { FooterProps } from "./type";

function Footer_ComputeFunction(x) {
  return [x];
}

function Footer() {
  return (// Footer OPCODES
    [0 // COMPONENT
    , 0 // USES_HOOKS
    , [20 // UNCONDITIONAL_TEMPLATE
    , [8 // OPEN_ELEMENT_DIV
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    ], Footer_ComputeFunction // COMPUTE_FUNCTION
    , 1 // VALUE_POINTER_INDEX
    ]]
  );
}

module.exports = Footer;