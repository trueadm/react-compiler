var React = require("react");

function Component2({ children }: { children: React.Node }) {
  return <span>The child is {children}</span>;
}

function Component() {
  return (
    <div>
      <Component2>
        <span>Hello world</span>
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
