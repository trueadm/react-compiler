// props:{x: "foobar"}
var React = require("react");

function Component2({ children }: { children: string }) {
  return <span>The child is {children}</span>;
}

function getText(x): string {
  return x.toString();
}

function Component({ x }: { x: string }) {
  return (
    <div>
      <Component2>{getText(x)}</Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
