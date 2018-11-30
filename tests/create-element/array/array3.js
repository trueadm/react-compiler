// props:{items: [{id: 0, text: "Item 1"}, {id: 1, text: "Item 2"}, {id: 2, text: "Item 3"}, {id: 3, text: "Item 4"}, {id: 4, text: "Item 5"}]}
var React = require("react");

function Component({ items }: { items: Array<number> }) {
  const children = Array.from(items).map(
    (item: { id: number, text: string }): React.Node =>
      React.createElement(
        "li",
        {
          key: item.id,
        },
        React.createElement("div", null, "The text is ", item.text, "!"),
      )
  );
  return React.createElement("ul", null, children);
}

Component.compileRootComponent = true;

module.exports = Component;
