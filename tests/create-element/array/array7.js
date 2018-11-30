// props:{items: [1,2,3,4,5]}
var React = require("react");

function Component2({ children }: { children: Array<string> }) {
  return React.createElement("li", null, children);
}

function Component({ items }: { items: Array<number> }) {
  return React.createElement(
    "ul",
    null,
    items.map((item: number): React.Node =>
      React.createElement(
        React.Fragment,
        {
          key: item,
        },
        React.createElement(Component2, null, "The item is ", item),
        React.createElement(Component2, null, "The item is ", item),
      ),
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
