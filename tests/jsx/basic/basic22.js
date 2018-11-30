var React = require("react");

function Component2() {
  return <span>Hello world!</span>;
}

function Component() {
  return (
    <div>
      <Component2 />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
