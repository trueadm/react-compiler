// props:{items: [1,2,3,4,5]}
var React = require("react");

function Component({ items }: { items: Array<number> }) {
  return React.createElement(
    "ul",
    null,
    items.map((item, i: number): React.Node =>
      React.createElement(
        "li",
        {
          key: i,
        },
        "Static item!",
      ),
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
