// props:{cond: true, cond2: true, defaultClassName: "default-item", id: "dynamic-id"}

var React = require("react");

function getLiBody(bodyText: string): React.Node {
  return <span>{bodyText}</span>;
}

function getClassName(className: string, cond2: boolean): string | null {
  return cond2 ? className : null;
}

function Component({
  cond,
  cond2,
  defaultClassName,
  id
}: {
  cond: boolean,
  cond2: boolean,
  defaultClassName: string,
  id: string
}) {
  let children = [
    <li key="default" className={defaultClassName}>
      {getLiBody("Default item")}
    </li>
  ];

  if (cond) {
    children = [
      <li key="generic" className={getClassName("generic-item", cond2)}>
        {getLiBody("Generic item")}
      </li>
    ];
  }

  return (
    <ul id={id + "-conntected"} className={"list"}>
      {children}
    </ul>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
