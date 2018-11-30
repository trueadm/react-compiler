var React = require("react");

function Component2({ children }: { children: React.Node }) {
  return React.createElement("span", null, "The child is ", children);
}

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, null, React.createElement("span", null, "Hello world")),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
