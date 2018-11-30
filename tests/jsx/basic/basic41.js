var React = require("react");

function Component2({ x, y, z }: { x: string, y: string, z: number }) {
  return (
    <header>
      <div className={z}>{x}</div>
      <span className={z}>{y}</span>
    </header>
  );
}

Component2.defaultProps = {
  x: "default-x",
  y: "default-y",
  z: "default-class",
};

function Component() {
  return (
    <div>
      <Component2 x={"over-ride x"} y={"over-ride y"} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
