var React = require("react");

function Component2({ node }: { node: React.Node }) {
  return <span>The child is {node}</span>;
}

function Component() {
  const node = <div>Hello world</div>;

  return (
    <div>
      <Component2 node={node} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
