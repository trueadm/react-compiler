var React = require("react");

function Component2({ x }: { x: number }) {
  return <span>The number is {x}</span>;
}

function Component() {
  return (
    <div>
      <Component2 x={5} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
