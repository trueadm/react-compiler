var React = require("react");
var Header = require("./Header");

function App() {
  return (
    <div>
      <Header />
      App
    </div>
  );
}

App.compileRootComponent = true;

module.exports = App;
