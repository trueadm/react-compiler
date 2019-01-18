import type { FooterProps } from "./type";

function Footer_ComputeFunction(x) {
  return [x];
}

function Footer() {
  return (// Footer OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , Footer_ComputeFunction // COMPUTE_FUNCTION
    , 2 // VALUE_POINTER_INDEX
    , [2 // OPEN_ELEMENT_DIV
    , 33 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 1 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    ]]
  );
}

module.exports = Footer;