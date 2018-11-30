var React = require("react");

function Component() {
  const [value, updateValue] = React.useState("Hello world");
  return <div>{value}</div>;
}

Component.compileRootComponent = true;

module.exports = Component;
