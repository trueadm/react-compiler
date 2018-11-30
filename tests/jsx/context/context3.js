var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  var Provider = MyContext.Provider;
  return (
    <Provider>
      <div>Hello world</div>
      <>
        Static text
      </>
    </Provider>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
