// DO NOT MODIFY

import { Component } from "./App.js";
import React from "react";
import ReactDOM from "react-dom";

// const root = document.getElementById("root");
// const props = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};

// console.time("Render");
// for (let i = 0; i < 1000; i++) {
//   ReactDOM.render(null, root);
//   ReactDOM.render(<Component {...props} />, root);
// }
// console.timeEnd("Render");

// const updateProps = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};
// render(React.createElement(Component, updateProps), root);

const props = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};

console.time("Render");
for (let i = 0; i < 1000; i++) {
  props.val1 = "val1-" + i
  props.val2 = "val2-" + i
  props.val3 = "val3-" + i
  props.val4 = "val4-" + i
  props.val5 = "val5-" + i
  props.val6 = "val6-" + i
  props.val7 = "val7-" + i
  ReactDOM.render(<Component {...props} />, root);
}
console.timeEnd("Render");
