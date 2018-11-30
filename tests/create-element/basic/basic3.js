var React = require("react");

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement("div", null, "Hello"),
    React.createElement("br", null),
    React.createElement("span", null, "world"),
    "Random text!",
    "More text!",
    123,
    React.createElement("custom-element", null, "123"),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
