// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: string }) {
  return React.createElement("span", null, "The child is ", node);
}

function Component({ cond }: { cond: boolean }) {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      node: cond ? 123 : 456,
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
