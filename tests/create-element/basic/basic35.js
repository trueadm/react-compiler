// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: React.Node }) {
  return React.createElement("span", null, "The child is ", node);
}

function Component({ cond }: { cond: boolean }) {
  let node = React.createElement("div", null, "Hello world");

  if (cond) {
    node = React.createElement("span", null, "This should show!");
  }

  return React.createElement("div", null, React.createElement(Component2, {
    node: node
  }));
}

Component.compileRootComponent = true;

module.exports = Component;
