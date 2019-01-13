import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import svelte from 'rollup-plugin-svelte';
import closure from 'rollup-plugin-google-closure-compiler';

export default {
  input: "src/svelte.js",
  output: {
    file: "build/svelte-bundle.js",
    format: "umd",
    name: "App",
  },
  plugins: [
		svelte({
			skipIntroByDefault: true,
			nestedTransitions: true,
			dev: false,
		}),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    closure(),
  ],
};
