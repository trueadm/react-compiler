var React = require("react");

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement("span", null, "Hello"),
    React.createElement("span", null, "world"),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
