// props:{items: [1,2,3,4,5]}
var React = require("react");

type ReactElementType = React.Node;
type ItemsType = Array<number>;

function Component({ items }: { items: ItemsType }) {
  const children = items
    .filter((item: number) => item % 2)
    .map(
      (item, i: number): ReactElementType =>
        React.createElement(
          "li",
          {
            key: i,
          },
          "Static item!",
        ),
    );
  return React.createElement("ul", null, children);
}

Component.compileRootComponent = true;

module.exports = Component;
