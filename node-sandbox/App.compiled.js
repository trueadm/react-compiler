// props:{bar: "123", cond: true, cond2: true, defaultClassName: "default-item"}
function foo(bar): Array<string | null | boolean | void> {
  return [123, 456, 789, null, false, true, undefined];
}

function Component_ComputeFunction(bar, cond, cond2, defaultClassName) {
  var __cached__0;

  let elements;

  if (typeof cond2 !== undefined) {
    elements = foo(bar);
  }

  if (__cached__0 = cond) {}

  return [__cached__0, elements];
}

var Component = [0, ["bar", "cond", "cond2", "defaultClassName"], Component_ComputeFunction, [322, "ul", ["id", "list-view", "className", null], [7, [0, [66, "li", ["className", ""]], null, [66, "li", ["className", void 0]]]]]];
module["exports"] = Component;