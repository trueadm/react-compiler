function Foo_ComputeFunction(text) {
  return [text];
}

export default function Foo() {
  return (// Foo OPCODES
    [0, 0, 0 // COMPONENT
    , [0, 0, 20 // UNCONDITIONAL_TEMPLATE
    , [0, 0, 9 // OPEN_ELEMENT_SPAN
    , 0 // VALUE_POINTER_INDEX
    , 40 // ELEMENT_STATIC_CHILD_VALUE
    , "Hello world", 6 // OPEN_ELEMENT
    , "em", 1 // VALUE_POINTER_INDEX
    , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 10 // CLOSE_ELEMENT
    , 10 // CLOSE_ELEMENT
    ], 0 // VALUE_POINTER_INDEX
    , Foo_ComputeFunction // COMPUTE_FUNCTION
    ]]
  );
}