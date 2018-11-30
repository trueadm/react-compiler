// props:{cond: true}
var React = require("react");

function Component({ cond }: { cond: boolean }) {
  let val = "foo";
  let count = 0;
  let count2 = 5;

  if (cond) {
    val += " test";
    count++;
    count2 -= 1;
    count--;
  }

  return React.createElement("span", null, val, ++count, --count2, typeof count);
}

Component.compileRootComponent = true;

module.exports = Component;
