var React = require("react");

function Component2({ children }: { children: string }) {
  return React.createElement("span", null, "The child is ", children);
}

function Component() {
  return React.createElement("div", null, React.createElement(Component2, null, "Hello world"));
}

Component.compileRootComponent = true;

module.exports = Component;
