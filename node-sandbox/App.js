import React from "react";

const { useState } = React;

export function Component() {
  const [value, updateValue] = useState("Hello world");
  return <div>{value}</div>;
}

Component.compileRootComponent = true;
