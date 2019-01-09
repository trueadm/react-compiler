import React from "react";

export function Component({ val }: { val: string }) {
  return (
    <>
      <div>Hello world</div>
      <>
        <span>{val}</span>
        456
        <input type="text" />
        <>
          <>{val}</>
        </>
      </>
    </>
  );
}

Component.compileRootComponent = true;
