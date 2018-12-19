// props:{cond: true}
var React = require("react");

function Component({ cond }: { cond: boolean }) {
  const Tag = cond ? "a" : "span";

  return <Tag>Hello world</Tag>;
}

Component.compileRootComponent = true;

module.exports = Component;