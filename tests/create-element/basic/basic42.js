var React = require("react");

function Component2() {
  return React.createElement("span", null, "Hello world!");
}

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, null),
    React.createElement(Component2, null),
    React.createElement(Component2, null),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
