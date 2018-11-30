var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  return React.createElement(
    MyContext.Provider,
    {
      value: 20,
    },
    React.createElement("div", null, "Hello world"),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
