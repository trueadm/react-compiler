import "react-compiler-runtime";

function Foo_ComputeFunction(text) {
  return [text];
}

export default function Foo() {
  return (// Foo OPCODES
    [0 // COMPONENT
    , 0 // USES_HOOKS
    , [20 // UNCONDITIONAL_TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 40 // ELEMENT_STATIC_CHILD_VALUE
    , "Hello world", 6 // OPEN_ELEMENT
    , "em", 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    , 10 // CLOSE_ELEMENT
    ], Foo_ComputeFunction // COMPUTE_FUNCTION
    , 1 // VALUE_POINTER_INDEX
    ]]
  );
}