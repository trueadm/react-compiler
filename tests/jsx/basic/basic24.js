var React = require("react");

function Component2({ children }: { children: string }) {
  return <span>The child is {children}</span>;
}

function Component() {
  return (
    <div>
      <Component2>Hello world</Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
