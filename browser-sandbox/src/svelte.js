import App from "./App.html";

let app;

console.time("Render");
const props = { val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7" }
for (let i = 0; i < 1000; i++) {
  props.val1 = "val1-" + i
  props.val2 = "val2-" + i
  props.val3 = "val3-" + i
  props.val4 = "val4-" + i
  props.val5 = "val5-" + i
  props.val6 = "val6-" + i
  props.val7 = "val7-" + i
  if (app !== undefined) {
    app.destroy();
  }
  app = new App({
    // `target` is the only required option. This is the
    // DOM element your component will be appended to
    target: document.getElementById("root"),

    // `data` is optional.
    // A component can have default data – we'll learn about that later.
    data: props,
  });
}
console.timeEnd("Render");

export default app;
