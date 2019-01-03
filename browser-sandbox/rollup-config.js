import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "App",
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      ignore: ["react"],
    }),
  ],
};
