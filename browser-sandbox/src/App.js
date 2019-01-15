import React, { useState } from "react";

export function Component() {
  const [value, updateValue] = useState("Hello world");
  return <div>{value}</div>;
}

Component.compileRootComponent = true;
