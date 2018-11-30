var React = require("react");

function Component2({ renderText }: { renderText: () => string }) {
  return <span>The child is {renderText()}</span>;
}

function Component() {
  const renderText = function(): string {
    return "Hello world!";
  };

  return (
    <div>
      <Component2 renderText={renderText} />
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
