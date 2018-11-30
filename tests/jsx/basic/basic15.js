var React = require("react");

function Component() {
  function getHandler(): (e) => void {
    return e => {
      e.target.textContent = "Worked!";
    };
  }

  return <div onClick={getHandler()}>Hello world</div>
}

Component.compileRootComponent = true;

module.exports = Component;