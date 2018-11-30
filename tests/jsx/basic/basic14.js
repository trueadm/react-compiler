var React = require("react");

function Component() {
  function handleClick(e): void {
    e.target.textContent = "Worked!";
  }

  return <div onClick={handleClick}>Hello world</div>;
}

Component.compileRootComponent = true;

module.exports = Component;
