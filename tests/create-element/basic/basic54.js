// props:{a: "this is a", b: "this is b", c: "this is c", id: "this is id", className: "this is className"}
var React = require("react");

function Component({ a, b, c, ...others }: { a: string, b: string, c: string, className: string, id: string }) {
  return React.createElement("div", null, a, b, c, others.id.toString(), others.className.toString());
}

Component.compileRootComponent = true;

module.exports = Component;
