var React = require("react");

function Component() {
  const props = {
    className: "big-div",
    id: "big",
  };
  return React.createElement(
    "div",
    Object.assign({}, props, {
      id: "override1",
      className: "override2",
    }),
    "Hello world",
  );
}

Component.compileRootComponent = true;

module.exports = Component;
