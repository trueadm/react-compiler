import { createVNode } from "react-compiler-runtime";

// props:{cond: false, text: "hello world 2"}
function Component4_ComputeFunction(children) {
  return [children];
}

function Component3_ComputeFunction(children) {
  return [children];
}

function Component2_ComputeFunction(children) {
  var __cached__0;

  __cached__0 = children("Hello world");
  return [__cached__0];
}

function Component_ComputeFunction(cond, text) {
  var __cached__1;

  if (__cached__1 = !cond) {} else {}

  return [[(childText: string) => createVNode(__vnode_tpl_1, function (): React.Node {
    return [[[__cached__1 ? null : !__cached__1 ? createVNode(__vnode_tpl_0, [[text]]) : null, childText]]];
  }())]];
}

const Component2 = [1, Component2_ComputeFunction, [1026, "div", [13, 0]]];
const Component3 = [1, Component3_ComputeFunction, [1026, "span", [13, 0]]];
const Component4 = [1, Component4_ComputeFunction, [8194, "span", 0]];
const __vnode_tpl_0 = [11, Component4, 0];
const __vnode_tpl_1 = [11, Component3, 0];
const Component = [0, ["cond", "text"], Component_ComputeFunction, [1026, "div", [11, Component2, 0]]];
module["exports"] = Component;