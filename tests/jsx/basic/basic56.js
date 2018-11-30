// props:{a: "this is a", b: "this is b", c: "this is c", id: "this is id", className: "this is className"}
var React = require("react");

function Component2({ others }: { others: { className: string, id: string } }) {
  return (
    <span>
      {" "}
      {others.id.toString()}
      {others.className.toString()}
    </span>
  );
}

function Component({ a, b, c, ...others }: { a: string, b: string, c: string, className: string, id: string }) {
  return (
    <div>
      {a}
      {b}
      {c}
      <Component2 others={others} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
