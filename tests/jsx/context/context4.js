var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  const { Consumer, Provider } = MyContext;
  return (
    <Provider>
      <div>Hello world</div>
      <>
        Static text
      </>
      <Consumer>{(value: number) => <span>{value}</span>}</Consumer>
    </Provider>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
