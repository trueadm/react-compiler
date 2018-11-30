// props:{cond1: true, cond2: false}
var React = require("react");

function Component({ cond1, cond2 }: { cond1: boolean, cond2: boolean }) {
  let className = "class1";

  if (cond1) {
    className = "class2";
  }
  if (cond2) {
    className = "class3";
  }

  return React.createElement(
    "div",
    {
      className: className,
    },
    "Hello world",
  );
}

Component.compileRootComponent = true;

module.exports = Component;
