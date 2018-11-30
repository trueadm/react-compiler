// props:{val: "hello world"}
var React = require("react");

function Component2({ children }: { children: Array<React.Node> }) {
  return React.createElement("span", null, "The child is ", children);
}

function Component3() {
  return "It works!";
}

function Component({ val }: { val: string }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      Component2,
      null,
      React.createElement("span", null, "Hello world"),
      React.createElement(Component3, null),
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
