var React = require("react");

function Component2({ children }: { children: Array<number> }) {
  return React.createElement("span", null, "The child is ", children);
}

function Component() {
  return React.createElement("div", null, React.createElement(Component2, null, [1, 2, 3]));
}

Component.compileRootComponent = true;

module.exports = Component;
