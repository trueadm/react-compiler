// props:{x: "Hello world!"}
var React = require("react");
var { Header, formatString } = require("./Header");
var Footer = require("./Footer");

import type { IndexProps } from "./type";

function App({ x }: IndexProps) {
  return (
    <div>
      <Header x={x} />
      {formatString(x)}
      <Footer x={x} />
    </div>
  );
}

App.compileRootComponent = true;

module.exports = App;
