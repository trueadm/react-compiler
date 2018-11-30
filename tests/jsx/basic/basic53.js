// props:{a: "this is a", b: "this is b", c: "this is c", className: "this is className", id: "this is id"}
var React = require("react");

function Component({ a, b, c, ...others }: { a: string, b: string, c: string, className: string, id: string }) {
  return (
    <div {...others}>
      {a}
      {b}
      {c}
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
