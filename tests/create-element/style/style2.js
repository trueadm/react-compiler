var React = require("react");

function Component() {
  return React.createElement(
    "div",
    {
      style: null,
    },
    React.createElement(
      "div",
      {
        style: {
          fontSize: 100,
          textAlign: "left",
        },
      },
      "Hello world",
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
