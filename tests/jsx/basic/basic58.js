var React = require("react");

function Component() {
  const props = {
    className: "big-div",
    id: "big",
  };
  return <div {...props} id="override1" className="override2">Hello world</div>
}

Component.compileRootComponent = true;

module.exports = Component;