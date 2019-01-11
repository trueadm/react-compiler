// DO NOT MODIFY

import { Component } from "./App.compiled.js";
import React from "react";
import { render } from "react-compiler-runtime/render";

const root = document.getElementById("root");
const props = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};

// Warm-up
render(<Component {...props} />, root);
render(null, root);

console.time("Render");
render(<Component {...props} />, root);
console.timeEnd("Render");

const updateProps = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};
// render(React.createElement(Component, updateProps), root);
