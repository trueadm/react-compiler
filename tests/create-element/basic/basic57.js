var React = require("react");

function Component() {
  const props = {
    className: "big-div",
    id: "big",
  };
  return React.createElement("div", props, "Hello world");
}

Component.compileRootComponent = true;

module.exports = Component;
