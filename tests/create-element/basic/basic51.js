// props:{cond: true, cond2: true, x: 123, padding: 10}
var React = require("react");

function getValue(x): string {
  return x;
}

function Component({ x, cond, cond2, padding }: { x: string, cond: boolean, cond2: boolean, padding: number }) {
  var otherVal;

  if (cond) {
    otherVal = React.createElement("span", null, cond2 ? getValue(x) : getValue("456"));
  }

  if (cond2) {
    otherVal = [cond ? React.createElement("div", null, x) : React.createElement("span", null, x)];
  }

  var span = React.createElement("span", null, "Span!");
  var span2 = React.createElement("span", null, "Span 2!");
  return React.createElement(
    "div",
    {
      style: {
        padding,
      },
    },
    otherVal,
    x,
    span && span2,
  );
}

Component.compileRootComponent = true;

module.exports = Component;
