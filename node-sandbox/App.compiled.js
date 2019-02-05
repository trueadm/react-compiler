// props:{a: "this is a", b: "this is b", c: "this is c", id: "this is id", className: "this is className"}
function Component2_ComputeFunction(others) {
  var __cached__1;

  var __cached__0;

  __cached__1 = others["className"]["toString"]();
  __cached__0 = others["id"]["toString"]();
  return [__cached__0, __cached__1];
}

function Component_ComputeFunction(a, b, c, className, id) {
  return [a, b, c, [{
    ["className"]: className,
    ["id"]: id
  }]];
}

const Component2 = [1, Component2_ComputeFunction, [2050, "span", [[32771, " "], [3, 0], [3, 1]]]];
const Component = [0, ["a", "b", "c", "className", "id"], Component_ComputeFunction, [2050, "div", [[3, 0], [3, 1], [3, 2], [11, Component2, 3]]]];
module["exports"] = Component;