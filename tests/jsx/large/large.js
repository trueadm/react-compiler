// props:{val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"}
var React = require("react");

function Component({
  val1,
  val2,
  val3,
  val4,
  val5,
  val6,
  val7
}: {
  val1: string,
  val2: string,
  val3: string,
  val4: string,
  val5: string,
  val6: string,
  val7: string,
}) {
  return (
    <div className="container">
      <header className="header-bar">
        <h1>{val1}</h1>
      </header>
      <section className={"section-divider"}>
        <div>
          <h2>Sub-section #1</h2>
          <div className="details">
            <p>{val2}</p>
            <span className={val3}>{val4}</span>
            <button className="button" id="button1">
              Click here!
            </button>
            <button className="button" id="button1">
              Click here!
            </button>
          </div>
        </div>
        <div>
          <h2>Sub-section #2</h2>
          <div className="details">
            <p>{val5}</p>
            <span className={val6}>{val7}</span>
            <button className="button" id="button1">
              Click here!
            </button>
            <button className="button" id="button1">
              Click here!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
