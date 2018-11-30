// Due to a Closure Compiler Bug, this code can't compile in ADVANCED
// https://github.com/google/closure-compiler/issues/3145
// gcc_SIMPLE

var React = require("react");
var { useState } = React;

function Component() {
  const [value, updateValue] = useState("Hello world 2");
  return (
    <div>
      {value}
      {value + " - again"}
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
