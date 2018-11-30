// props:{x: 10}
var React = require("react");

function Component2({ children }: { children: React.Node }) {
  return <span>{children}</span>;
}

function Component({ x }: { x: number }) {
  return (
    <div>
      <Component2>
        <div>{x}</div>
      </Component2>
      <Component2>
        <div>{x}</div>
      </Component2>
      <Component2>
        <div>{x}</div>
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
