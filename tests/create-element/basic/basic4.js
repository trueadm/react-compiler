// props:{cond: false}

var React = require("react");

function Component({ cond }: { cond: boolean }) {
  return React.createElement(
    "div",
    null,
    React.createElement("span", null, cond ? "Hello" : "Goodbye"),
    React.createElement("span", null, `<script>alert("Haxor!")</script>`),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
