// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: React.Node }) {
  return <span>The child is {node}</span>;
}

function Component({ cond }: { cond: boolean }) {
  return (
    <div>
      <Component2 node={cond ? <span>Hello world</span> : <div>Hello world</div>} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
