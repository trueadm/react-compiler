var React = require("react");

function Component2({ obj }: { obj: { val: string, el: React.Node, func: () => string, func2: () => React.Node } }) {
  return React.createElement("span", null, obj.val, obj.el, obj.func(), obj.func2());
}

function Component() {
  const obj = {
    val: "Hello world",
    el: React.createElement("span", null, "123"),
    func: (): string => "foo bar!",
    func2: (): React.Node => React.createElement("span", null, "456"),
  };

  return React.createElement(
    "div",
    null,
    React.createElement(Component2, {
      obj: obj,
    }),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
