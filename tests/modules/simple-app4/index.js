import React from "react";
import Foo from "./Foo";
import {renderText, renderDivOrNull, renderDivWithText, renderSpan} from "./utils";

function App() {
  return (
    <div>
      <Foo text={renderText()} />
      {renderText()}
      {renderDivOrNull(true)}
      {renderDivWithText("foo bar!")}
      {renderSpan()}
    </div>
  );
}

App.compileRootComponent = true;

module.exports = App;
