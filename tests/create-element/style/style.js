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
          color: "red",
          backgroundColor: "black",
        },
      },
      "Hello world",
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
