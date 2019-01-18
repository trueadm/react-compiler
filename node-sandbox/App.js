// props:{val: "hello world"}
var React = require("react");

function Component2({ children }: { children: Array<React.Node> }) {
  return <span>The child is {children}</span>;
}

function Component3() {
  return "It works!";
}

function Component({ val }: { val: string }) {
  return (
    <div>
      <Component2>
        <span>Hello world</span>
        <Component3 />
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
