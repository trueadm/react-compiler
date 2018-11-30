// props:{var: "This should show up!", bar: "123", cond: true, cond2: true, defaultClassName: "default-item"}

var React = require("react");

function foo(bar): React.Node {
  return [
    React.createElement(
      "span",
      {
        key: "1",
      },
      "Hello world",
    ),
    React.createElement(
      "div",
      {
        key: "2",
      },
      bar + "",
    ),
  ];
}

function Component({
  cond,
  cond2,
  defaultClassName,
  bar,
}: {
  cond: boolean,
  cond2: boolean,
  defaultClassName: string,
  bar: string,
}) {
  let children = [
    React.createElement(
      "li",
      {
        key: "default",
        className: defaultClassName,
      },
      "Default item",
    ),
  ];
  let elements;

  if (typeof cond2 !== undefined) {
    elements = foo(bar);
  }

  if (cond) {
    children = [
      React.createElement(
        "li",
        {
          key: "generic",
          className: "generic-item",
        },
        elements,
      ),
    ];
  }

  return React.createElement(
    "ul",
    {
      id: "list-view",
      className: "list",
    },
    children,
  );
}

Component.compileRootComponent = true;

module.exports = Component;
