// props:{cond1: true, cond2: true, val1: "works"}
var React = require("react");

function getVal2(): string {
  return "works2";
}

function Component({
  cond1,
  cond2,
  val1
}: {
  cond1: boolean,
  cond2: boolean,
  val1: string
}) {
  let className = cond1 ? val1 : cond2 ? getVal2() : "class1";

  return <div className={className}>Hello world</div>;
}

Component.compileRootComponent = true;

module.exports = Component;
