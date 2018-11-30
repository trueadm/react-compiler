var React = require("react");

function foo(): string {
  return "A string!";
}

function Component() {
  return foo();
}

Component.compileRootComponent = true;

module.exports = Component;
