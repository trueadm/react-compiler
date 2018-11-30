// props:{val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"}
var React = require("react");

function Component({
  val1,
  val2,
  val3,
  val4,
  val5,
  val6,
  val7,
}: {
  val1: string,
  val2: string,
  val3: string,
  val4: string,
  val5: string,
  val6: string,
  val7: string,
}) {
  return React.createElement(
    "div",
    {
      className: "container",
    },
    React.createElement(
      "header",
      {
        className: "header-bar",
      },
      React.createElement("h1", null, val1),
    ),
    React.createElement(
      "section",
      {
        className: "section-divider",
      },
      React.createElement(
        "div",
        null,
        React.createElement("h2", null, "Sub-section #1"),
        React.createElement(
          "div",
          {
            className: "details",
          },
          React.createElement("p", null, val2),
          React.createElement(
            "span",
            {
              className: val3,
            },
            val4,
          ),
          React.createElement(
            "button",
            {
              className: "button",
              id: "button1",
            },
            "Click here!",
          ),
          React.createElement(
            "button",
            {
              className: "button",
              id: "button1",
            },
            "Click here!",
          ),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement("h2", null, "Sub-section #2"),
        React.createElement(
          "div",
          {
            className: "details",
          },
          React.createElement("p", null, val5),
          React.createElement(
            "span",
            {
              className: val6,
            },
            val7,
          ),
          React.createElement(
            "button",
            {
              className: "button",
              id: "button1",
            },
            "Click here!",
          ),
          React.createElement(
            "button",
            {
              className: "button",
              id: "button1",
            },
            "Click here!",
          ),
        ),
      ),
    ),
  );
}

Component.compileRootComponent = true;

module.exports = Component;
