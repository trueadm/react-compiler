// props:{styles: {color: "red", backgroundColor: "black", margin: 10}}

var React = require("react");

function Component({ styles }: { styles: { color: string, backgroundColor: string, margin: number } }) {
  return React.createElement(
    "div",
    {
      style: null,
    },
    React.createElement(
      "div",
      {
        style: styles,
      },
      "Hello world",
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
