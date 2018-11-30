// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: React.Node }) {
  return React.createElement("span", null, "The child is ", node);
}

function Component({ cond }: { cond: boolean }) {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      node: cond ? React.createElement("span", null, "Hello world") : React.createElement("div", null, "Hello world"),
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
