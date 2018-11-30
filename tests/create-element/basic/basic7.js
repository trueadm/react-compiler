// props:{cond: false, defaultClassName: "default-item", id: "dynamic-id"}

var React = require("react");

function getLiBody(bodyText: string): React.Node {
  return React.createElement("span", null, bodyText);
}

function Component({ cond, defaultClassName, id }: { cond: boolean, defaultClassName: string, id: string }) {
  let children = [
    React.createElement(
      "li",
      {
        key: "default",
        className: defaultClassName,
      },
      getLiBody("Default item"),
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
        getLiBody("Generic item"),
      ),
    ];
  }

  return React.createElement(
    "ul",
    {
      id: id + "-conntected",
      className: "list",
    },
    children,
  );
}

Component.compileRootComponent = true;

module.exports = Component;
