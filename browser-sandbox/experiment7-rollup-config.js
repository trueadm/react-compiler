import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import closure from 'rollup-plugin-google-closure-compiler';

export default {
  input: "src/experiment7new.js",
  output: {
    file: "build/compiled-experiment7.js",
    format: "umd",
    name: "App",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            modules: false,
            targets: {
              ie: "11",
            },
          },
        ],
      ],
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      ignore: ["react"],
    }),
    closure({
      language_in: 'ECMASCRIPT5_STRICT',
      language_out: 'ECMASCRIPT5_STRICT',
    }),
  ],
};
