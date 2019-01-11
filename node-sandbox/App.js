import React from "react";

function getLiBody(bodyText: string): React.Node {
  return <span>{bodyText}</span>;
}

export function Component({ cond, defaultClassName, id }: { cond: boolean, defaultClassName: string, id: string }) {
  let children = [
    <li key="default" className={defaultClassName}>
      {getLiBody("Default item")}
    </li>,
  ];

  if (cond) {
    children = [
      <li key="generic" className={"generic-item"}>
        {getLiBody("Generic item")}
      </li>,
    ];
  }

  return (
    <ul id={id + "-conntected"} className={"list"}>
      {children}
    </ul>
  );
}

Component.compileRootComponent = true;
