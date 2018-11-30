// props:{number2: 101}

var React = require("react");

const MyContext = React.createContext(10);

function Component({ number2 }: { number2: 10 }) {
  const { Consumer, Provider } = MyContext;
  const number = 10;
  return React.createElement(
    Provider,
    {
      value: 200,
    },
    React.createElement("div", null, "Hello world"),
    React.createElement(React.Fragment, null, "Static text"),
    React.createElement(Consumer, null, (value: number) => React.createElement("span", null, value, number, number2)),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
