var React = require("react");

function Component() {
  return (
    <div style={null}>
      <div style={{ color: "red", backgroundColor: "black" }}>Hello world</div>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
