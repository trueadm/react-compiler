// props:{val: "hello world"}
var React = require("react");

var Component2 = function({ children }: { children: string }) {
  return React.createElement("span", null, children);
};

var Component = function({ val }: { val: string }) {
  return React.createElement(Component2, null, val);
};

Component.compileRootComponent = true;

module.exports = Component;
