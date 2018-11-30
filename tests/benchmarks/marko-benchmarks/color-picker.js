// props_from_file:tests/benchmarks/marko-benchmarks/color-picker.json

const React = require("react");

type ColorType = {
  hex: string,
  name: string,
  rgb: string,
};

function App({ colors }: { colors: Array<ColorType> }) {
  var colors = colors;
  var selectedColorIndex = 0;
  var selectedColor = colors[selectedColorIndex];

  function renderColor(color: ColorType, i: number): React.Node {
    var style = {
      backgroundColor: color.hex,
    };
  
    var className = "color";
    if (selectedColorIndex === i) {
      className += " selected";
    }
  
    return (
      <li className={className} key={i} style={style}>
        {color.name}
      </li>
    );
  }
  
  function renderColors(colors: Array<ColorType>): React.Node {
    if (colors.length) {
      return <ul>{colors.map(renderColor)}</ul>;
    } else {
      return <div>No colors!</div>;
    }
  }

  return (
    <div className="colors">
      <h1>Choose your favorite color:</h1>
      <div className="colors">{renderColors(colors)}</div>
      <div>
        You chose:
        <div className="chosen-color">{selectedColor.name}</div>
      </div>
    </div>
  );
}

App.compileRootComponent = true;

module.exports = App;
