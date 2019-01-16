// DO NOT MODIFY

import { Component } from "./App.compiled.js";
import { render } from "react-compiler-runtime/render";
import { reactElementSymbol } from "react-compiler-runtime/utils";

const React = {
  createElement(type, props) {
    return {
      $$typeof: reactElementSymbol,
      key: null,
      props,
      ref: null,
      type,
    };
  }
}

const root = document.getElementById("root");
// const props = {cond: false, cond2: false, cond3: true};
// const updateProps = {cond: true, cond2: false, cond3: true};
// const updateProps2 = {cond: false, cond2: true, cond3: true };
// const updateProps3 = {cond: true, cond2: true, cond3: true };
// const updateProps4 = {cond: true, cond2: true, cond3: false };

// console.time("Render")
// render(<Component {...updateProps4} />, root);
// render(<Component {...updateProps3} />, root);
// render(<Component {...updateProps4} />, root);
// console.timeEnd("Render")

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
  render(<Component {...props} />, root);
}
console.timeEnd("Render");

