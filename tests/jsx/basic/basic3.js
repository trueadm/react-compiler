var React = require("react");

function Component() {
  return (
    <div>
      <div>Hello</div>
      <br />
      <span>world</span>
      Random text!
      {"More text!"}
      {123}
      <custom-element>123</custom-element>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
