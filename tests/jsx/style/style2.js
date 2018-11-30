var React = require("react");

function Component() {
  return (
    <div style={null}>
      <div style={{ fontSize: 100, textAlign: "left" }}>Hello world</div>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
