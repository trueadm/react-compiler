import { createVNode } from "react-compiler-runtime";
// props_from_file:tests/benchmarks/marko-benchmarks/color-picker.json
type ColorType = {
  hex: string,
  name: string,
  rgb: string,
};

function App_ComputeFunction(colors) {
  var __cached__0;

  var colors = colors;
  var selectedColorIndex = 0;
  var selectedColor = colors[selectedColorIndex];

  function renderColor(color: ColorType, i: number): React.Node {
    var className = "color";

    if (selectedColorIndex === i) {
      className += " selected";
    }

    return createVNode([8834, "li", ["className", 0, 0], ["background-color", 1], 2], [className, color["hex"], color["name"]], i);
  }

  function renderColors(colors: Array<ColorType>): React.Node {
    if (colors["length"]) {
      return [0, colors["map"](renderColor)];
    } else {
      return [1];
    }
  }

  __cached__0 = renderColors(colors);
  return [__cached__0, selectedColor["name"]];
}

const App = [0, ["colors"], App_ComputeFunction, [2114, "div", ["className", 0, "colors"], [[4098, "h1", "Choose your favorite color:"], [1090, "div", ["className", 0, "colors"], [8, [14, 0, [1026, "ul", [79, 1]], 1, [4098, "div", "No colors!"]], 0]], [2050, "div", [[32771, "You chose:"], [66, "div", ["className", 0, "chosen-color"]]]]]]];
module["exports"] = App;