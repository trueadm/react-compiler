// props:{cond: true}
var React = require("react");

function Component2({ node }: { node: string }) {
  return <span>The child is {node}</span>;
}

function Component({ cond }: { cond: boolean }) {
  let node = 123

  if (cond) {
    node = 456
  }

  return (
    <div>
      <Component2 node={node} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
