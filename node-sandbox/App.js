// props:{val: "hello world"}
var React = require("react");

function Component2({ children }: { children: Array<string | React.Node> }) {
  return React.createElement("span", null, "The child is ", children);
}

function getChildren(val: string): string {
  return val;
}

function getChildren2(): React.Node {
  return React.createElement("span", null, "Hello world");
}

function Component({ val }: { val: string }) {
  return React.createElement("div", null, React.createElement(Component2, null, getChildren(val), getChildren2()));
}

Component.compileRootComponent = true;

module.exports = Component;
