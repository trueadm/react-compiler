import { createTemplateNode } from "react-compiler-runtime";

// props:{number2: 101}
var React = require("react");

const MyContext = React["createContext"](10);

function formatValue(val): string {
  return `The value is ${val}!`;
}

function Component_ComputeFunction // COMPUTE_FUNCTION
(number2) {
  const {
    ["Consumer"]: Consumer,
    ["Provider"]: Provider
  } = MyContext;
  return [MyContext, (value: number) => {
    var __cached__0;

    __cached__0 = formatValue(value);
    return [__cached__0];
  }, (value: number) => {
    var __cached__1;

    __cached__1 = formatValue(value);
    return [__cached__1];
  }];
}

var Component = // Component OPCODES
[0 // COMPONENT
, "Component" // DISPLAY_NAME
, ["number2"] // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [12 // OPEN_FRAGMENT
, 26 // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE
, 0, [9 // OPEN_ELEMENT_SPAN
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
], 1 // CONTEXT_CONSUMER_COMPUTE_FUNCTION
, 14 // OPEN_CONTEXT_PROVIDER
, 0, 64 // STATIC_PROP_VALUE
, 200, 8 // OPEN_ELEMENT_DIV
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Hello world", 10 // CLOSE_ELEMENT
, 12 // OPEN_FRAGMENT
, 41 // ELEMENT_STATIC_CHILDREN_VALUE
, "Static text", 13 // CLOSE_FRAGMENT
, 26 // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE
, 0, [9 // OPEN_ELEMENT_SPAN
, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
, 0, 10 // CLOSE_ELEMENT
], 2 // CONTEXT_CONSUMER_COMPUTE_FUNCTION
, 15 // CLOSE_CONTEXT_PROVIDER
, 13 // CLOSE_FRAGMENT
], Component_ComputeFunction])];
module["exports"] = Component;