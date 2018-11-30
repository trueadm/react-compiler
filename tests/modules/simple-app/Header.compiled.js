import { createTemplateNode } from "react-compiler-runtime";

function Header() {
  return (// Header OPCODES
    [0 // COMPONENT
    , "Header" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [8 // OPEN_ELEMENT_DIV
    , 41 // ELEMENT_STATIC_CHILDREN_VALUE
    , "Header", 10 // CLOSE_ELEMENT
    ], null // COMPUTE_FUNCTION
    ])]
  );
}

module.exports = Header;