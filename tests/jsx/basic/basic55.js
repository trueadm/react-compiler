// props:{id: "this is id", className: "this is className"}
var React = require("react");

function Component({ a, b, c, ...others }: { a: string, b: string, c: string, className: string, id: string }) {
  return (
    <div>
      {a}
      {b}
      {c}
      {others.id.toString()}
      {others.className.toString()}
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
