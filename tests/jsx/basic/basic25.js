var React = require("react");

function Component2({ children }: { children: Array<number> }) {
  return <span>The child is {children}</span>;
}

function Component() {
  return (
    <div>
      <Component2>{[1, 2, 3]}</Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
