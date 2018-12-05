var React = require("react");

function Component2({
  children,
  className,
  id,
  foo,
}: {
  children: string,
  className: string,
  id: string,
  foo: string,
}) {
  return React.createElement(
    "div",
    {
      className: className,
      id: id,
    },
    children,
    foo,
  );
}

function Component() {
  const props = {
    className: "big-div",
    id: "big",
    foo: "bar",
  };
  return React.createElement(
    Component2,
    Object.assign(
      {
        id: "override1",
        className: "override2",
      },
      props,
    ),
    "Hello world",
  );
}

Component.compileRootComponent = true;

module.exports = Component;
