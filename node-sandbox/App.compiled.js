// props_from_file:tests/benchmarks/marko-benchmarks/color-picker.json
type ColorType = {
  hex: string,
  name: string,
  rgb: string,
};
var __opcodes__1 = // renderColors OPCODES
[14 // CONDITIONAL_TEMPLATE
, 1 // HOST_NODE_VALUE_POINTER_INDEX
, 2 // BRANCH_OPCODES_VALUE_POINTER_INDEX
, 0 // COMPUTE_FUNCTION
, [0 // CONDITIONAL_ROOT_INDEX
, [1 // OPEN_ELEMENT_WITH_POINTER
, "ul", 7 // HOST_NODE_VALUE_POINTER_INDEX
, 38 // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE
, 1, [13 // UNCONDITIONAL_TEMPLATE
, [1 // OPEN_ELEMENT_WITH_POINTER
, "li", 6 // HOST_NODE_VALUE_POINTER_INDEX
, 15 // MULTI_CONDITIONAL
, 2 // MULTI_CONDITIONAL_SIZE
, 3 // HOST_NODE_VALUE_POINTER_INDEX
, 4 // CASE_VALUE_POINTER_INDEX
, 0, [45 // DYNAMIC_PROP_CLASS_NAME
, 0, 1], [44 // STATIC_PROP_CLASS_NAME
, "color"], 21 // OPEN_PROP_STYLE
, 49 // DYNAMIC_PROP_STYLE
, "background-color", 3, 22 // CLOSE_PROP_STYLE
, 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 4, 5 // HOST_NODE_VALUE_POINTER_INDEX
, 8 // CLOSE_ELEMENT
], 0 // COMPUTE_FUNCTION
] // ARRAY_MAP_OPCODES
, 2 // ARRAY_MAP_COMPUTE_FUNCTION
, 8 // CLOSE_ELEMENT
], 1 // CONDITIONAL_ROOT_INDEX
, [2 // OPEN_ELEMENT_DIV
, 33 // ELEMENT_STATIC_CHILDREN_VALUE
, "No colors!", 8 // CLOSE_ELEMENT
]]];

function App_ComputeFunction(colors) {
  var __cached__1;

  var colors = colors;
  var selectedColorIndex = 0;

  function renderColor(color: ColorType, i: number): React.Node {
    var __cached__0;

    var className = "color";

    if (__cached__0 = selectedColorIndex === i) {
      className += " selected";
    }

    return [__cached__0, className, i, color["hex"], color["name"]];
  }

  function renderColors(colors: Array<ColorType>): React.Node {
    if (colors["length"]) {
      return [0, colors, renderColor];
    } else {
      return [1];
    }
  }

  __cached__1 = renderColors(colors);
  return [__cached__1];
}

var App = // App OPCODES
[10 // COMPONENT
, 0 // USES_HOOKS
, ["colors"] // ROOT_PROPS_SHAPE
, [13 // UNCONDITIONAL_TEMPLATE
, [2 // OPEN_ELEMENT_DIV
, 44 // STATIC_PROP_CLASS_NAME
, "colors", 0 // OPEN_ELEMENT
, "h1", 33 // ELEMENT_STATIC_CHILDREN_VALUE
, "Choose your favorite color:", 8 // CLOSE_ELEMENT
, 2 // OPEN_ELEMENT_DIV
, 44 // STATIC_PROP_CLASS_NAME
, "colors", 37 // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL
, __opcodes__1, 0 // COMPUTE_VALUES
, 8 // HOST_NODE_VALUE_POINTER_INDEX
, 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
], App_ComputeFunction // COMPUTE_FUNCTION
, 9 // VALUE_POINTER_INDEX
]];
module["exports"] = App;