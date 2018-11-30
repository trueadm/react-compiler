var React = require("react");

function Component2({ obj }: { obj: { val: string, el: React.Node, func: () => string, func2: () => React.Node } }) {
  return (
    <span>
      {obj.val}
      {obj.el}
      {obj.func()}
      {obj.func2()}
    </span>
  );
}

function Component() {
  const obj = {
    val: "Hello world",
    el: <span>123</span>,
    func: (): string => "foo bar!",
    func2: (): React.Node => <span>456</span>,
  };

  return (
    <div>
      <Component2 obj={obj} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
