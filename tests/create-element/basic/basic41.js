var React = require("react");

function Component2({ x, y, z }: { x: string, y: string, z: number }) {
  return React.createElement(
    "header",
    null,
    React.createElement(
      "div",
      {
        className: z,
      },
      x,
    ),
    React.createElement(
      "span",
      {
        className: z,
      },
      y,
    ),
  );
}

Component2.defaultProps = {
  x: "default-x",
  y: "default-y",
  z: "default-class",
};

function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      x: "over-ride x",
      y: "over-ride y",
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
