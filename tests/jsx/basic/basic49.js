// props:{val: "hello world"}
var React = require("react");

function Component2({ children }: { children: Array<string | React.Node> }) {
  return <span>The child is {children}</span>;
}

function getChildren(val: string): string {
  return val;
}

function getChildren2(x: string): React.Node {
  return <span>{x}</span>;
}

function Component({ val }: { val: string }) {
  return (
    <div>
      <Component2>
        {getChildren(val)}
        {getChildren2("Hello world")}
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
