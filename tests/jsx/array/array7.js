// props:{items: [1,2,3,4,5]}
var React = require("react");

function Component2({children}: {children: Array<string>}) {
  return <li>{children}</li>;
}

function Component({ items }: { items: Array<number> }) {
  return (
    <ul>
      {items.map(
        (item: number): React.Node => (
          <React.Fragment key={item}>
            <Component2>The item is {item}</Component2>
            <Component2>The item is {item}</Component2>
          </React.Fragment>
        ),
      )}
    </ul>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
