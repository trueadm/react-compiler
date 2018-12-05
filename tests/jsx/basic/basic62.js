// props:{a: "this is a", b: "this is b", c: "this is c", className: "this is className", id: "this is id"}
var React = require("react");

function Component2({ className, id }: { className: string, id: string }) {
  return (
    <span className={className} id={id}>
      Hello world
    </span>
  );
}

function Component({ a, b, c, ...others }: { a: string, b: string, c: string, className: string, id: string }) {
  return (
    <div {...others} className="override" children={null}>
      {a}
      {b}
      {c}
      <Component2 className="123" {...others} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
