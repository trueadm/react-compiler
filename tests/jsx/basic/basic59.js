var React = require("react");

function Component2({ children, className, id, foo }: { children: string, className: string, id: string, foo: string }) {
  return (
    <div className={className} id={id}>
      {children}{foo}
    </div>
  );
}

function Component() {
  const props = {
    className: "big-div",
    id: "big",
    foo: "bar",
  };
  return (
    <Component2 {...props} id="override1" className="override2">
      Hello world
    </Component2>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
