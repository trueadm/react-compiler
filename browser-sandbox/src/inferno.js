// DO NOT MODIFY

import { Component } from "./App.js";
import { render } from "inferno";

const root = document.getElementById("root");
const props = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};

// Warm-up
const start = performance.now();
for (let i = 0; i < 1000; i++) {
  render(null, root);
  render(<Component {...props} />, root);
}
const timeTaken = performance.now() - start;
console.log(timeTaken);

const updateProps = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};
// render(React.createElement(Component, updateProps), root);
