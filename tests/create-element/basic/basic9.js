// props:{cond: true, cond2: true, cond3: true, cond4: false, defaultClassName: "default-item", id: "dynamic-id"}

var React = require("react");

function getLiBody(bodyText: string): React.Node {
  return React.createElement("foo", null, bodyText);
}

function getLiBody2(bodyText: string, cond: boolean): string | React.Node {
  return cond ? React.createElement("span", null, bodyText) : "No wrapping element!";
}

function getClassName(className: string, cond2: boolean): string | null {
  return cond2 ? className : null;
}

function Component({
  cond,
  cond2,
  cond3,
  cond4,
  defaultClassName,
  id,
}: {
  cond: boolean,
  cond2: boolean,
  cond3: boolean,
  cond4: boolean,
  defaultClassName: string,
  id: string,
}) {
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
          className: cond3 ? getClassName("generic-item", cond2) : getClassName("generic-item2", cond2),
        },
        getLiBody("Generic item"),
        getLiBody2("Generic item", cond4),
        getLiBody2("Generic item", true),
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
