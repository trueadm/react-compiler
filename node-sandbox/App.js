// props:{bar: "123", cond: true, cond2: true, defaultClassName: "default-item"}

var React = require("react");

function foo(bar): Array<string | null | boolean | void> {
  return [123, 456, 789, null, false, true, undefined];
}

function Component({
  cond,
  cond2,
  defaultClassName,
  bar
}: {
  cond: boolean,
  cond2: boolean,
  defaultClassName: string,
  bar: string
}) {
  let children = [
    <li key="default" className={undefined}>
      {null}
    </li>
  ];

  let elements;

  if (typeof cond2 !== undefined) {
    elements = foo(bar);
  }

  if (cond) {
    children = [
      <li key="generic" className={""}>
        {elements}
      </li>
    ];
  }

  return (
    <ul id="list-view" className={null}>
      {children}
    </ul>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
