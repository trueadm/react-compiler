var React = require("react");

function Component2({ x }: { x: number }) {
  return React.createElement("span", null, "The number is ", x);
}

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      x: 5,
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
