// props:{cond: false, text: "hello world 2"}
var React = require("react");

function Component4({ children }: { children: string }) {
  return <span>{children}</span>;
}

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
    icon = <Component4>{text}</Component4>;
  }

  return icon ? (
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
  ) : null;
}

Component.compileRootComponent = true;

module.exports = Component;
