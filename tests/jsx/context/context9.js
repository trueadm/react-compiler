var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  const { Consumer, Provider } = MyContext;
  const func = (value: number) => <span>{value}</span>;
  return (
    <Provider>
      <div>Hello world</div>
      <>
        Static text
      </>
      <Consumer>{func}</Consumer>
    </Provider>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
