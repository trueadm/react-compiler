// props:{cond: false, defaultClassName: "default-item", id: "dynamic-id"}
function getLiBody(bodyText: string): React.Node {
  return [bodyText];
}

function Component_ComputeFunction(cond, defaultClassName, id) {
  var __cached__2;

  var __cached__0;

  __cached__2 = getLiBody("Default item");

  if (__cached__0 = cond) {
    var __cached__1;

    __cached__1 = getLiBody("Generic item");
  }

  return [id + "-conntected", __cached__0, __cached__1, defaultClassName, __cached__2];
}

var Component = [0, ["cond", "defaultClassName", "id"], Component_ComputeFunction, [450, "ul", ["className", "list"], ["id", 0], [7, [1, [322, "li", ["className", "generic-item"], [6, [2050, "span", 0], 2]], null, [386, "li", ["className", 3], [6, [2050, "span", 0], 4]]]]]];
module["exports"] = Component;