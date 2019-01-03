import React from "react";

export function Component() {
  return (
    <>
      <div>Hello world</div>
      <>
        <span>123</span>
        456
        <input type="text" />
        <>
          <>789</>
        </>
      </>
    </>
  );
}

Component.compileRootComponent = true;