// props:{cond: false, defaultClassName: "default-item"}

var React = require("react");

function Component({ cond, defaultClassName }: { cond: boolean, defaultClassName: string }) {
  let children = [
    <li key="default" className={defaultClassName}>
      Default item
    </li>
  ];

  if (cond) {
    children = [
      <li key="generic" className={"generic-item"}>
        Generic item
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
