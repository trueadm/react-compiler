var React = require("react");

function Component() {
  return (
    <div>
      <span>Hello</span>
      <span>world</span>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
