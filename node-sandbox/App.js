var React = require("react");

function Component() {
  return React.createElement("div", null, "Hello world");
}

Component.compileRootComponent = true;

module.exports = Component;
