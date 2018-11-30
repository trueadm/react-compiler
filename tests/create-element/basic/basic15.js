var React = require("react");

function Component() {
  function getHandler(): e => void {
    return e => {
      e.target.textContent = "Worked!";
    };
  }

  return React.createElement(
    "div",
    {
      onClick: getHandler(),
    },
    "Hello world",
  );
}

Component.compileRootComponent = true;

module.exports = Component;
