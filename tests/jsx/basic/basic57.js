var React = require("react");

function Component() {
  const props = {
    className: "big-div",
    id: "big",
  };
  return <div {...props}>Hello world</div>
}

Component.compileRootComponent = true;

module.exports = Component;