// props:{var: "This should show up!", bar: "123", cond: true, cond2: true, defaultClassName: "default-item"}

var React = require("react");

function foo(bar): React.Node {
  return [<span key="1">Hello world</span>, <div key="2">{bar + ""}</div>];
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
    <li key="default" className={defaultClassName}>
      Default item
    </li>
  ];

  let elements;

  if (typeof cond2 !== undefined) {
    elements = foo(bar);
  }

  if (cond) {
    children = [
      <li key="generic" className={"generic-item"}>
        {elements}
      </li>
    ];
  }

  return (
    <ul id="list-view" className={"list"}>
      {children}
    </ul>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
