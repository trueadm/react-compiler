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
const props = {};

const start = performance.now();
render(<Component {...props} />, root);
alert(performance.now() - start);

