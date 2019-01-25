// props:{var: "This should show up!", bar: "123", cond: true, cond2: true, defaultClassName: "default-item"}
function foo(bar): React.Node {
  return [bar + ""];
}

function Component_ComputeFunction(bar, cond, cond2, defaultClassName) {
  var __cached__1;

  var __cached__0;

  if (__cached__1 = typeof cond2 !== undefined) {
    var __cached__2;

    __cached__2 = foo(bar);
  }

  if (__cached__0 = cond) {}

  return [__cached__0, __cached__1, __cached__2, defaultClassName];
}

var Component = [0, ["bar", "cond", "cond2", "defaultClassName"], Component_ComputeFunction, [322, "ul", ["id", "list-view", "className", "list"], [7, [0, [322, "li", ["className", "generic-item"], [7, [1, [6, [8, [[1026, "span", "Hello world"], [2050, "div", 0]]], 2]]]], null, [1154, "li", ["className", 3], "Default item"]]]]];
module["exports"] = Component;