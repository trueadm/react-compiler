// props:{val: "hello world"}
var React = require("react");

var Component = function({ val }: { val: string }) {
  return React.createElement("span", null, val);
};

Component.compileRootComponent = true;

module.exports = Component;
