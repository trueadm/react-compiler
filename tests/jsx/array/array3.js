// props:{items: [{id: 0, text: "Item 1"}, {id: 1, text: "Item 2"}, {id: 2, text: "Item 3"}, {id: 3, text: "Item 4"}, {id: 4, text: "Item 5"}]}
var React = require("react");

function Component({ items }: { items: Array<number> }) {
  const children = Array.from(items).map(
    (item: { id: number, text: string }): React.Node => (
      <li key={item.id}>
        <div>The text is {item.text}!</div>
      </li>
    ),
  );
  return <ul>{children}</ul>;
}

Component.compileRootComponent = true;

module.exports = Component;
