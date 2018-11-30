// props:{val: "hello world"}
var React = require("react");

function Component2({ children }: { children: Array<string | React.Node> }) {
  return <span>The child is {children}</span>;
}

function getChildren(val: string): string {
  return val;
}

function getChildren2(): React.Node {
  return <span>Hello world</span>;
}

function Component({ val }: { val: string }) {
  return (
    <div>
      <Component2>
        {getChildren(val)}
        {getChildren2()}
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
