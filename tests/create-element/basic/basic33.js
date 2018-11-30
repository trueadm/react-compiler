var React = require("react");

function Component2({ renderText }: { renderText: () => string }) {
  return React.createElement("span", null, "The child is ", renderText());
}

function Component() {
  const renderText = function(): string {
    return "Hello world!";
  };

  return React.createElement("div", null, React.createElement(Component2, {
    renderText: renderText
  }));
}

Component.compileRootComponent = true;

module.exports = Component;
