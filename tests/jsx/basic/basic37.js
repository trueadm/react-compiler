// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: string }) {
  return <span>The child is {node}</span>;
}

function Component({ cond }: { cond: boolean }) {
  return (
    <div>
      <Component2 node={cond ? 123 : 456} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
