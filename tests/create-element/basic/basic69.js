// props:{cond: true}
var React = require("react");

function Component2() {
  return React.createElement("div", null, "Hello world");
}

function Component({ cond }: { cond: boolean }) {
  var Tag = cond ? Component2 : "span";

  return React.createElement(Tag, null, "Hello world");
}

Component.compileRootComponent = true;

module.exports = Component;