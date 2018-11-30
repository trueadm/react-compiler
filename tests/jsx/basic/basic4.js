// props:{cond: false}

var React = require("react");

function Component({ cond }: { cond: boolean }) {
  return (
    <div>
      <span>{cond ? "Hello" : "Goodbye"}</span>
      <span>{`<script>alert("Haxor!")</script>`}</span>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
