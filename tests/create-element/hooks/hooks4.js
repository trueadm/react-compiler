// Due to a Closure Compiler Bug, this code can't compile in ADVANCED
// https://github.com/google/closure-compiler/issues/3145
// gcc_SIMPLE
// props:{cond: false, cond2: false}

var React = require("react");
var { useState } = React;

function Component({ cond, cond2 }: { cond: boolean, cond2: boolean }) {
  const [value, updateValue] = useState("Hello world 2");

  if (cond) {
    return React.createElement("span", null, value);
  }

  if (cond2) {
    return React.createElement("div", null, value);
  }

  return React.createElement("div", null, value, value + " - again");
}

Component.compileRootComponent = true;

module.exports = Component;
