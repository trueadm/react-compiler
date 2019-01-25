// props:{cond: true, cond2: true, cond3: true, cond4: false, defaultClassName: "default-item", id: "dynamic-id"}
function getLiBody(bodyText: string): React.Node {
  return [bodyText];
}

function getLiBody2(bodyText: string, cond: boolean): string | React.Node {
  return [cond, bodyText];
}

function getClassName(className: string, cond2: boolean): string | null {
  return cond2 ? className : null;
}

function Component_ComputeFunction(cond, cond2, cond3, cond4, defaultClassName, id) {
  var __cached__4;

  var __cached__0;

  __cached__4 = getLiBody("Default item");

  if (__cached__0 = cond) {
    var __cached__3;

    var __cached__2;

    var __cached__1;

    __cached__1 = getLiBody("Generic item");
    __cached__2 = getLiBody2("Generic item", cond4);
    __cached__3 = getLiBody2("Generic item", true);
  }

  return [id + "-conntected", __cached__0, cond3 ? getClassName("generic-item", cond2) : getClassName("generic-item2", cond2), __cached__1, __cached__2, __cached__3, defaultClassName, __cached__4];
}

var Component = [0, ["cond", "cond2", "cond3", "cond4", "defaultClassName", "id"], Component_ComputeFunction, [450, "ul", ["className", "list"], ["id", 0], [7, [1, [642, "li", ["className", 2], [[6, [2050, "span", 0], 3], [6, [5, 0, [2050, "span", 1], [4099, "No wrapping element!"]], 4], [6, [5, 0, [2050, "span", 1], [4099, "No wrapping element!"]], 5]]], null, [386, "li", ["className", 6], [6, [2050, "span", 0], 7]]]]]];
module["exports"] = Component;