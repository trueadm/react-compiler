// props:{cond1: true, cond2: true}
var React = require("react");

function Component({ cond1, cond2 }: { cond1: boolean, cond2: boolean }) {
  let className = cond1 ? "class2" : cond2 ? "class3" : "class1";

  return <div className={className}>Hello world</div>;
}

Component.compileRootComponent = true;

module.exports = Component;
