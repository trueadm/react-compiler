// props:{val: "hello world"}
var React = require("react");

var Component = function({ val }: { val: string }) {
  return <span>{val}</span>
};

Component.compileRootComponent = true;

module.exports = Component;
