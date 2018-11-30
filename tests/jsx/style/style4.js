// props:{styles: {color: "red", backgroundColor: "black", margin: 10}}

var React = require("react");

function Component({ styles }: { styles: { color: string, backgroundColor: string, margin: number } }) {
  return (
    <div style={null}>
      <div style={styles}>Hello world</div>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
