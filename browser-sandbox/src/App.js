import React, { useState } from "react";

export function Component() {
  const [count, updateCount] = useState(0);

  function increment(): void {
    updateCount(count + 1);
  }

  return (
    <div>
      <h1>This is a counter!</h1>
      <div>
        <p>The counter is currently at {count}</p>
        <button onClick={increment}>Increase count</button>
      </div>
    </div>
  );
}

Component.compileRootComponent = true;
