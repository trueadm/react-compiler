var React = require("react");

function Component2({ node }: { node: React.Node }) {
  return React.createElement("span", null, "The child is ", node);
}

function Component() {
  const node = React.createElement("div", null, "Hello world");
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      node: node,
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
