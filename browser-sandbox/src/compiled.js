// DO NOT MODIFY

import { Component } from "./App.compiled.js";
import React from "react";
import { render } from "react-compiler-runtime/render";

const root = document.getElementById("root");
const props = { cond: false, val: "foo" };
const updateProps = { cond: true, val: "foo" };

// Warm-up
console.time("Render")
render(<Component {...props} />, root);
render(<Component {...props} />, root);
console.timeEnd("Render")
