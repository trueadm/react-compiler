var React = require("react");

function Component() {
  const [value, updateValue] = React.useState("Hello world");
  return React.createElement("div", null, value);
}

Component.compileRootComponent = true;

module.exports = Component;
