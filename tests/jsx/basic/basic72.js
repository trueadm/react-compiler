// props:{val: "hello world"}
var React = require("react");

var Component2 = function({ children }: { children: string }) {
  return <span>{children}</span>
};

var Component = function({ val }: { val: string }) {
  return <Component2>{val}</Component2>
};

Component.compileRootComponent = true;

module.exports = Component;
