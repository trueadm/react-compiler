import "react-compiler-runtime";

function Foo_ComputeFunction(text) {
  return [text];
}

export default function Foo() {
  return (// Foo OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , [13 // UNCONDITIONAL_TEMPLATE
    , [4 // OPEN_ELEMENT_SPAN
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , "Hello world", 0 // OPEN_ELEMENT
    , "em", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 1 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    ], Foo_ComputeFunction // COMPUTE_FUNCTION
    , 2 // VALUE_POINTER_INDEX
    ]]
  );
}