import React from "react";
import Foo from "./Foo";
import {renderText, renderDiv, renderDivWithText, renderSpan} from "./utils";

function App() {
  return (
    <div>
      <Foo text={renderText()} />
      {renderText()}
      {renderDiv()}
      {renderDivWithText("foo bar!")}
      {renderSpan()}
    </div>
  );
}

App.compileRootComponent = true;

module.exports = App;
