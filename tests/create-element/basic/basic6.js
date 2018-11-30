// props:{cond: false, defaultClassName: "default-item"}

var React = require("react");

function Component({ cond, defaultClassName }: { cond: boolean, defaultClassName: string }) {
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

  if (cond) {
    children = [
      React.createElement(
        "li",
        {
          key: "generic",
          className: "generic-item",
        },
        "Generic item",
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
