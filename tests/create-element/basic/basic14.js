var React = require("react");

function Component() {
  function handleClick(e): void {
    e.target.textContent = "Worked!";
  }

  return React.createElement(
    "div",
    {
      onClick: handleClick,
    },
    "Hello world",
  );
}

Component.compileRootComponent = true;

module.exports = Component;
