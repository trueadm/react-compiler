var React = require("react");

function Component2({ children }: { children: {text: string} }) {
  return <span>The child is {children.text}</span>;
}

function Component() {
  return (
    <div>
      <Component2>{{text: "Hello world!"}}</Component2>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
