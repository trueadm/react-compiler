// props:{a: "this is a", b: "this is b", c: "this is c", className: "this is className", id: "this is id"}
var React = require("react");

function Component2({ className, id }: { className: string, id: string }) {
  return React.createElement(
    "span",
    {
      className: className,
      id: id,
    },
    "Hello world",
  );
}

function Component({ a, b, c, ...others }: { a: string, b: string, c: string, className: string, id: string }) {
  return React.createElement(
    "div",
    Object.assign({}, others, {
      className: "override",
      children: null,
    }),
    a,
    b,
    c,
    React.createElement(Component2, others),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
