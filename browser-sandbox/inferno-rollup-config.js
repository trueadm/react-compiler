import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import babel from 'rollup-plugin-babel';

export default {
  input: "src/inferno.js",
  output: {
    file: "inferno-bundle.js",
    format: "umd",
    name: "App",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      plugins: [
        "babel-plugin-inferno",
      ],
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ],
};
