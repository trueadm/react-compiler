var React = require("react");

function Component() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("div", null, "Hello world"),
    React.createElement(
      React.Fragment,
      null,
      React.createElement("span", null, "123"),
      "456",
      React.createElement("input", {
        type: "text",
      }),
      React.createElement(React.Fragment, null, React.createElement(React.Fragment, null, "789")),
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
