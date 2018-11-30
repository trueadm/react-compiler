// props:{x: "foobar"}
var React = require("react");

function Component2({ children }: { children: string }) {
  return React.createElement("span", null, "The child is ", children);
}

function getText(x): string {
  return x.toString();
}

function Component({ x }: { x: string }) {
  return React.createElement("div", null, React.createElement(Component2, null, getText(x)));
}

Component.compileRootComponent = true;

module.exports = Component;
