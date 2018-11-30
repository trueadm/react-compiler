// props:{cond: true, cond2: true, x: 123}
var React = require("react");

function Component({ x, cond, cond2 }: { x: string, cond: boolean, cond2: boolean }) {
  var otherVal;

  if (cond) {
    otherVal = <span>{x}</span>;
  }

  if (cond2) {
    otherVal = [<div>{x}</div>];
  }

  return (
    <div>
      {otherVal}
      {x}
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
