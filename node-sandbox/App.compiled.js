// props:{cond: true, x: 123}
function Component_ComputeFunction(cond, x) {
  var otherVal;

  if (cond) {
    otherVal = <span>456</span>;
  }

  return [otherVal, x];
}

const Component = [0, ["cond", "x"], Component_ComputeFunction, [2050, "div", [[135, [4, 0], [4, 1]], [32771, "123"]]]];
module["exports"] = Component;