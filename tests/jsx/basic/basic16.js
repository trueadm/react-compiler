// props:{cond: false}
var React = require("react");

function Component({ cond }: { cond: boolean }) {
  const elements = [<span key="a">123</span>, <span key="b">456</span>];

  let elements2 = [7, 8, 9];

  if (!cond) {
    elements2 = [10, 11, 12];
  }

  function getElements(): React.Node {
    return (
      <div>
        {elements}
        {elements2}
      </div>
    );
  }

  return <div>{getElements()}</div>;
}

Component.compileRootComponent = true;

module.exports = Component;
