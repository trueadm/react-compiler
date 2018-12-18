import * as t from "@babel/types";
import invariant from "../invariant";
import cx from "cx";

export function createOpcodesForCxMockCall(path, opcodes, state) {
  const node = path.node;
  const args = node.arguments.map(arg => {
    if (t.isStringLiteral(arg)) {
      return arg.value;
    } else {
      invariant(false, "TODO");
    }
  });
  opcodes.push(t.stringLiteral(cx.apply(null, args)));
}
