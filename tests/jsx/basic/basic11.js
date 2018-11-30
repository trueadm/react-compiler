var React = require("react");

function Component() {
  return (
    <>
      <div>Hello world</div>
      <>
        <span>123</span>
        456
        <input type="text" />
        <>
          <>
            789
          </>
        </>
      </>
    </>
  );
}

Component.compileRootComponent = true;

module.exports = Component;