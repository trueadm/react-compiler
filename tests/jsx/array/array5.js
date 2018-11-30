// props:{items: [1,2,3,4,5]}
var React = require("react");

type ReactElementType = React.Node;
type ItemsType = Array<number>;

function Component({ items }: { items: ItemsType }) {
  const children = items
    .filter((item: number) => item % 2)
    .map((item, i: number): ReactElementType => <li key={i}>Static item!</li>);
  return <ul>{children}</ul>;
}

Component.compileRootComponent = true;

module.exports = Component;
