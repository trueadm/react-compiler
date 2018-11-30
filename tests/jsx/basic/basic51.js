// props:{cond: true, cond2: true, x: 123, padding: 10}
var React = require("react");

function getValue(x): string {
  return x;
}

function Component({ x, cond, cond2, padding }: { x: string, cond: boolean, cond2: boolean, padding: number }) {
  var otherVal;

  if (cond) {
    otherVal = <span>{cond2 ? getValue(x) : getValue("456")}</span>;
  }

  if (cond2) {
    otherVal = [cond ? <div>{x}</div> : <span>{x}</span>];
  }

  var span = <span>Span!</span>;
  var span2 = <span>Span 2!</span>;

  return (
    <div style={{ padding }}>
      {otherVal}
      {x}
      {span && span2}
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
