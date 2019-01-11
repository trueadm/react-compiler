function getLiBody(bodyText: string): React.Node {
  return [bodyText];
}

var __opcodes__0 = // getLiBody OPCODES
[20 // UNCONDITIONAL_TEMPLATE
, [9 // OPEN_ELEMENT_SPAN
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
], null // COMPUTE_FUNCTION
];

function Component_ComputeFunction(cond, defaultClassName, id) {
  var __cached__2;

  var __cached__0;

  __cached__2 = getLiBody("Default item");

  if (__cached__0 = cond) {
    var __cached__1;

    __cached__1 = getLiBody("Generic item");
  }

  return [id + "-conntected", __cached__0, __cached__1, defaultClassName, __cached__2];
}

export var Component = // Component OPCODES
[0 // COMPONENT
, ["cond", "defaultClassName", "id"] // ROOT_PROPS_SHAPE
, [20 // UNCONDITIONAL_TEMPLATE
, [6 // OPEN_ELEMENT
, "ul", 61 // DYNAMIC_PROP
, "id", 0, 0, 62 // STATIC_PROP_CLASS_NAME
, "list", 25 // MULTI_CONDITIONAL
, 2 // MULTI_CONDITIONAL_SIZE
, 1, [6 // OPEN_ELEMENT
, "li", 70 // STATIC_PROP_KEY
, "generic", 62 // STATIC_PROP_CLASS_NAME
, "generic-item", 45 // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL
, __opcodes__0, 2 // COMPUTE_VALUES
, 10 // CLOSE_ELEMENT
], [6 // OPEN_ELEMENT
, "li", 70 // STATIC_PROP_KEY
, "default", 63 // DYNAMIC_PROP_CLASS_NAME
, 0, 3, 45 // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL
, __opcodes__0, 4 // COMPUTE_VALUES
, 10 // CLOSE_ELEMENT
], 10 // CLOSE_ELEMENT
], Component_ComputeFunction // COMPUTE_FUNCTION
]];