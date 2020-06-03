import App from "./App.html";

console.time("Render");
const props = { val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7" }
const app = new App({
  // `target` is the only required option. This is the
  // DOM element your component will be appended to
  target: document.getElementById("root"),

  // `data` is optional.
  // A component can have default data – we'll learn about that later.
  data: props,
});
console.timeEnd("Render");

export default app;
