var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  const { Consumer, Provider } = MyContext;
  const func = (value: number) => React.createElement("span", null, value);

  return React.createElement(
    Provider,
    null,
    React.createElement("div", null, "Hello world"),
    React.createElement(React.Fragment, null, "Static text"),
    React.createElement(Consumer, null, func),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
