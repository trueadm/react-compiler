import React from "react";

export function Component({ cond, val }: { cond: boolean, val: string }) {
  return <div>{cond ? <span>123</span> : <span>456</span>}</div>;
}

Component.compileRootComponent = true;
