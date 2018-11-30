// props:{x: 10}
var React = require("react");

function Component2({ children }: { children: React.Node }) {
  return React.createElement("span", null, children);
}

function Component({ x }: { x: number }) {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, null, React.createElement("div", null, x)),
    React.createElement(Component2, null, React.createElement("div", null, x)),
    React.createElement(Component2, null, React.createElement("div", null, x)),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
