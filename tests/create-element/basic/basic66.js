// props:{cond: false, text: "hello world 2"}
var React = require("react");

function Component4({ children }: { children: string }) {
  return React.createElement("span", null, children);
}

function Component3({ children }: { children: React.Node }) {
  return React.createElement("span", null, children);
}

function Component2({ children }: { children: (text: string) => React.Node }) {
  return React.createElement("div", null, children("Hello world"));
}

function Component({ cond, text }: { cond: boolean, text: string }) {
  var icon;

  if (!cond) {
    icon = null;
  } else {
    icon = React.createElement(Component4, null, text);
  }

  return React.createElement(
    "div",
    null,
    React.createElement(Component2, null, function(childText: string): React.Node {
      return React.createElement(Component3, null, icon, childText);
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
