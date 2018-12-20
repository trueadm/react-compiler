import { createTemplateNode } from "react-compiler-runtime";
import type { FooterProps } from "./type";

function Footer_ComputeFunction(x) {
  return [x];
}

function Footer() {
  return (// Footer OPCODES
    [0 // COMPONENT
    , "Footer" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [8 // OPEN_ELEMENT_DIV
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    ], Footer_ComputeFunction // COMPUTE_FUNCTION
    ])]
  );
}

module.exports = Footer;