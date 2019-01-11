import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import babel from 'rollup-plugin-babel';

export default {
  input: "src/react.js",
  output: {
    file: "react-bundle.js",
    format: "umd",
    name: "App",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      presets: [
        "@babel/preset-react",
      ],
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ],
};
