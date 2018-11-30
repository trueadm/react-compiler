// props:{cond: true, cond2: true, x: 123}
var React = require("react");

function Component({ x, cond, cond2 }: { x: string, cond: boolean, cond2: boolean }) {
  var otherVal;

  if (cond) {
    otherVal = React.createElement("span", null, x);
  }

  if (cond2) {
    otherVal = [React.createElement("div", null, x)];
  }

  return React.createElement("div", null, otherVal, x);
}

Component.compileRootComponent = true;

module.exports = Component;
