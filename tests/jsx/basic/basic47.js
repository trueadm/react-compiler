// props:{cond: true, x: 123}
var React = require("react");

function Component({x, cond}: {x: string, cond: boolean}) {
  var otherVal;

  if (cond) {
    otherVal = <span>456</span>;
  }

  return <div>{otherVal || x}123</div>
}

Component.compileRootComponent = true;

module.exports = Component;