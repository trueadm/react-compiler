// props:{cond: false, x: 123}
var React = require("react");

function Component({x, cond}: {x: string, cond: boolean}) {
  var otherVal;

  if (cond) {
    otherVal = React.createElement(
      "span",
      null,
      "456"
    );
  }

  return React.createElement(
    "div",
    null,
    otherVal && x,
    "123"
  );
}

Component.compileRootComponent = true;

module.exports = Component;