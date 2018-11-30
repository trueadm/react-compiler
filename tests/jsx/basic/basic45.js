// props:{cond: true}
var React = require("react");

function Component({ cond }: { cond: boolean }) {
  let val = "foo";
  let count = 0;
  let count2 = 5;

  if (cond) {
    val += " test";
  }

  return (
    <span>
      {val}
      {++count}
      {--count2}
      {typeof count}
    </span>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
