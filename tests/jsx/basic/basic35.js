// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: React.Node }) {
  return <span>The child is {node}</span>;
}

function Component({ cond }: { cond: boolean }) {
  let node = <div>Hello world</div>;

  if (cond) {
    node = <span>This should show!</span>;
  }

  return (
    <div>
      <Component2 node={node} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
