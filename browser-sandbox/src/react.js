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

const props = {cond: false, defaultClassName: "default-item"};
const updateProps = {cond: true, defaultClassName: "default-item"};

console.time("Render")
ReactDOM.render(<Component {...props} />, root);
ReactDOM.render(<Component {...updateProps} />, root);
// render(<Component {...props} />, root);
console.timeEnd("Render")
