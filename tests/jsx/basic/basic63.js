var React = require("react");

function Component2({ children }: { children: (text: string) => React.Node }) {
  return <div>{children("Hello world")}</div>;
}

function Component() {
  return (
    <div>
      <Component2>
        {function(text: string): React.Node {
          return <span>{text}</span>;
        }}
      </Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
