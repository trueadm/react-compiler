// props:{x: "foobar"}
var React = require("react");

function Component2({ foo, bar }: { foo: string, bar: Array<React.Node> }) {
  return (
    <span>
      The child is {foo}
      {bar}
    </span>
  );
}

function getText(x): string {
  return x.toString();
}

function Component({ x }: { x: string }) {
  const bar = [<span key="a">123</span>, <span key="b">456</span>];
  return (
    <div>
      <Component2 foo={getText(x)} bar={bar} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
