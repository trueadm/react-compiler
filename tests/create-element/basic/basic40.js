// props:{x: "foobar"}
var React = require("react");

function Component2({ foo, bar }: { foo: string, bar: Array<React.Node> }) {
  return React.createElement("span", null, "The child is ", foo, bar);
}

function getText(x): string {
  return x.toString();
}

function Component({ x }: { x: string }) {
  const bar = [
    React.createElement(
      "span",
      {
        key: "a",
      },
      "123",
    ),
    React.createElement(
      "span",
      {
        key: "b",
      },
      "456",
    ),
  ];
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      foo: getText(x),
      bar: bar,
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
