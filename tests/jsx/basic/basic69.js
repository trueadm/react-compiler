// props:{cond: true}
var React = require("react");

function Component2() {
  return <span>Hello world</span>;
}

function Component({ cond }: { cond: boolean }) {
  const Tag = cond ? Component2 : "span";

  return <Tag>Hello world</Tag>;
}

Component.compileRootComponent = true;

module.exports = Component;