// props:{cond: true, text: "hello world ##"}
var React = require("react");

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
            <span>
              {icon}
              {childText}
            </span>
          );
        }}
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
