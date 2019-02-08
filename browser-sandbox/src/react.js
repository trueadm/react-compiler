// DO NOT MODIFY

import { Component } from "./App.js";
import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");
const props = {};

const start = performance.now();
ReactDOM.render(<Component {...props} />, root);
alert(performance.now() - start);

