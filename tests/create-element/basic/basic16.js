// props:{cond: false}
var React = require("react");

function Component({ cond }: { cond: boolean }) {
  const elements = [
    React.createElement(
      "span",
      {
        key: "a",
      },
      "123",
    ),
    React.createElement(
      "span",
      {
        key: "b",
      },
      "456",
    ),
  ];

  let elements2 = [7, 8, 9];

  if (!cond) {
    elements2 = [10, 11, 12];
  }

  function getElements(): React.Node {
    return React.createElement("div", null, elements, elements2);
  }

  return React.createElement("div", null, getElements());
}

Component.compileRootComponent = true;

module.exports = Component;
