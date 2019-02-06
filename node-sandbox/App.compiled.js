import { createVNode } from "react-compiler-runtime";

// props:{items: [1,2,3,4,5]}
function Component_ComputeFunction(items) {
  return [items["filter"]((item: number) => item % 2)["map"]((item, i: number): React.Node => createVNode([36866, "li", "Static item!"], [], i))];
}

const Component = [0, ["items"], Component_ComputeFunction, [1026, "ul", [79, 0]]];
module["exports"] = Component;