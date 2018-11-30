var React = require("react");

const MyContext = React.createContext(10);

function Component() {
  return (
    <MyContext.Provider value={20}>
      <div>Hello world</div>
    </MyContext.Provider>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
