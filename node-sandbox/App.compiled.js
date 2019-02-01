import { createVNode } from "react-compiler-runtime";

// props:{val: "hello world"}
function Component2_ComputeFunction(children) {
  return [children];
}

function getChildren(val: string): string {
  return val;
}

function getChildren2(): React.Node {
  return [];
}

function Component_ComputeFunction(val) {
  getChildren2();
  getChildren(val);
  return [[[getChildren(val), createVNode([36866, "span", "Hello world"])]]];
}

const Component2 = [1, Component2_ComputeFunction, [2050, "span", [[32771, "The child is "], [13, 0]]]];
const Component = [0, ["val"], Component_ComputeFunction, [1026, "div", [11, Component2, 0]]];
module["exports"] = Component;