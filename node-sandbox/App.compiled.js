import { createTemplateNode } from "react-compiler-runtime";

function Component_ComputeFunction(cond, defaultClassName) {
  var __cached__0;

  if (__cached__0 = cond) {}

  return [__cached__0, defaultClassName];
}

export var Component = // Component OPCODES
[0 // COMPONENT
, ["cond", "defaultClassName"] // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [6 // OPEN_ELEMENT
, "ul", 60 // STATIC_PROP
, "id", "list-view", 62 // STATIC_PROP_CLASS_NAME
, "list", 25 // MULTI_CONDITIONAL
, 2 // MULTI_CONDITIONAL_SIZE
, 0, [6 // OPEN_ELEMENT
, "li", 70 // STATIC_PROP_KEY
, "generic", 62 // STATIC_PROP_CLASS_NAME
, "generic-item", 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Generic item", 10 // CLOSE_ELEMENT
], [6 // OPEN_ELEMENT
, "li", 70 // STATIC_PROP_KEY
, "default", 63 // DYNAMIC_PROP_CLASS_NAME
, 0, 1, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Default item", 10 // CLOSE_ELEMENT
], 10 // CLOSE_ELEMENT
], Component_ComputeFunction // COMPUTE_FUNCTION
])];