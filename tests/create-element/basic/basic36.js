// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: string }) {
  return React.createElement("span", null, "The child is ", node);
}

function Component({ cond }: { cond: boolean }) {
  let node = 123

  if (cond) {
    node = 456
  }

  return React.createElement("div", null, React.createElement(Component2, {
    node: node
  }));
}

Component.compileRootComponent = true;

module.exports = Component;
