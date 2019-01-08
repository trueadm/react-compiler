import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

export default {
  input: "src/index.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "App",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      ignore: ["react"],
    }),
  ],
};
