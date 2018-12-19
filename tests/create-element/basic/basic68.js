// props:{cond: true}
var React = require("react");

function Component({ cond }: { cond: boolean }) {
  var Tag = cond ? "a" : "span";

  return React.createElement(Tag, null, "Hello world");
}

Component.compileRootComponent = true;

module.exports = Component;
