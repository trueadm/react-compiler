var React = require("react");

function Component() {
  return (
    <div style={null}>
      <div
        style={{
          fontSize: false,
          textAlign: null,
          color: undefined,
          padding: ""
        }}
      >
        Hello world
      </div>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
