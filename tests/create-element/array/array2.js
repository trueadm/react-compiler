// props:{items: [1,2,3,4,5]}
var React = require("react");

function Component({ items }: { items: Array<number> }) {
  return (
    <ul>
      {items.map(
        (item: number): React.Node =>
          React.createElement(
            "li",
            {
              key: item,
            },
            "The item is ",
            item,
          ),
      )}
    </ul>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
