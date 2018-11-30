var React = require("react");

function Component() {
  let val = "foo";
  let count = 0;
  let count2 = 5;

  val = val + "bar";
  val += " test";
  count = count + 1;
  count = ++count;
  count2 -= 1;

  return React.createElement("span", null, val, ++count, --count2, typeof count);
}

Component.compileRootComponent = true;

module.exports = Component;
