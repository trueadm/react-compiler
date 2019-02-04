import * as t from "@babel/types";
import invariant from "../invariant";
import { StaticTextTemplateNode } from "../templates";
import cx from "cx";

export function compileCxMockCall(path, state) {
  const node = path.node;
  const args = node.arguments.map(arg => {
    if (t.isStringLiteral(arg)) {
      return arg.value;
    } else {
      invariant(false, "TODO");
    }
  });
  return new StaticTextTemplateNode(cx.apply(null, args));
}
