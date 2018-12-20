var React = require("react");

var Component = function() {
  return React.createElement("span", null, "123");
};

Component.compileRootComponent = true;

module.exports = Component;
