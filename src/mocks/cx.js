import * as t from "@babel/types";
import invariant from "../invariant";
import cx from "cx";

export function createOpcodesForCxMockCall(path, opcodes, state) {
  const node = path.node;
  const firstArgument = node.arguments[0];

  if (t.isStringLiteral(firstArgument)) {
    const str = firstArgument.value;
    opcodes.push(t.stringLiteral(cx(str)));
  } else {
    invariant(false, "TODO");
  }
}
