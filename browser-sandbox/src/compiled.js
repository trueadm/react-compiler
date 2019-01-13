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
const props = {cond: false, defaultClassName: "default-item"};
const updateProps = {cond: true, defaultClassName: "default-item"};

console.time("Render")
render(<Component {...props} />, root);
// render(<Component {...updateProps} />, root);
// render(<Component {...props} />, root);
console.timeEnd("Render")

// const props = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};

// console.time("Render");
// for (let i = 0; i < 1000; i++) {
//   render(null, root);
//   render(<Component {...props} />, root);
// }
// console.timeEnd("Render");
