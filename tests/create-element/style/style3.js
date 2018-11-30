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
          fontSize: false,
          textAlign: null,
          color: undefined,
          padding: "",
        },
      },
      "Hello world",
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
