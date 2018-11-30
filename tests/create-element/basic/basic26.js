var React = require("react");

function Component2({ children }: { children: { text: string } }) {
  return React.createElement("span", null, "The child is ", children.text);
}

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, null, {
      text: "Hello world!",
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
