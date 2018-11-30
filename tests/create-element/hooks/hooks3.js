// Due to a Closure Compiler Bug, this code can't compile in ADVANCED
// https://github.com/google/closure-compiler/issues/3145
// gcc_SIMPLE
// props:{cond: true}

var React = require("react");
var { useState } = React;

function Component({ cond }: { cond: boolean }) {
  const [value, updateValue] = useState("Hello world 2");

  if (cond) {
    return null;
  }
  return React.createElement("div", null, value, value + " - again");
}

Component.compileRootComponent = true;

module.exports = Component;
