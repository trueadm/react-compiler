// DO NOT MODIFY

import { Component } from "./App.compiled.js";
import React from "react";
import { render } from "react-compiler-runtime/render";

const root = document.getElementById("root");
const props = {cond: false, defaultClassName: "default-item", id: "dynamic-id"};

render(React.createElement(Component, props), root);
