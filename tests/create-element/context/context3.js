var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  var Provider = MyContext.Provider;
  return React.createElement(
    Provider,
    null,
    React.createElement("div", null, "Hello world"),
    React.createElement(React.Fragment, null, "Static text"),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
