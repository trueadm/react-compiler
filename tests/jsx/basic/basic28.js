// props:{val: "hello world"}
var React = require("react");

function Component2({ children }: { children: React.Node }) {
  return <span>The child is {children}</span>;
}

function Component({ val }: { val: string }) {
  return (
    <div>
      <Component2>
        <span>Hello world</span>
        <div>{val}</div>
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
