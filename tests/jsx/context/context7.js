// props:{number2: 101}

var React = require("react");

const MyContext = React.createContext(10);

function formatValue(val): string {
  return `The value is ${val}!`;
}

function Component({ number2 }: { number2: 10 }) {
  const { Consumer, Provider } = MyContext;
  const number = 10;
  return (
    <>
      <Consumer>
          {(value: number) => <span>{formatValue(value)}</span>}
      </Consumer>
      <Provider value={200}>
        <div>Hello world</div>
        <>Static text</>
        <Consumer>
          {(value: number) => <span>{formatValue(value)}</span>}
        </Consumer>
      </Provider>
    </>
  );
}

Component.compileRootComponent = true;

module.exports = Component;