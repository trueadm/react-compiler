// props:{cond: true, text: "hello world 2"}
var React = require("react");

function Component3({ children }: { children: React.Node }) {
  return <span>{children}</span>;
}

function Component2({ children }: { children: (text: string) => React.Node }) {
  return <div>{children("Hello world")}</div>;
}

function Component({ cond, text }: { cond: boolean, text: string }) {
  var icon;

  if (!cond) {
    icon = null;
  } else {
    icon = <div>{text}</div>;
  }

  return (
    <div>
      <Component2>
        {function(childText: string): React.Node {
          return (
            <Component3>
              {icon}
              {childText}
            </Component3>
          );
        }}
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
