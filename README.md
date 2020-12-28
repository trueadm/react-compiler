# react-compiler

Note: This project is unmaintained and is highly experimental.

This was a personal side-project to investigate various different implementations of how you might ahead-of-time compile React applications (with contraints in place) in the pursuit of performance and code size wins. The primary reason for open sourcing this code is to share the ideas explored in this project, so others can make better use of them.

## Getting started

### SSR

You can see quick working examples in the `tests` directory. If you copy them into `node-sandbox/App.js` and then run:

```
node lib/cli.js --entry=node-sandbox/App.js
```

You should see the compiled output in `node-sandbox/App.compiled.js`.

The compiler doesn't use the React/ReactDOM runtime. Instead it has its own runtime that only supports a handful of React
APIs. The node runtime (which generates HTML) can be found in `scripts/compiler-runtime`.

### DOM

There's a small DOM runtime that shows the basics working. This can be found `browser-sandbox`. If you want to make changes,
you can modify the starting entry point in `browser-sandbox/compiled.js`. To build the changes, make sure you run `yarn build` from within the `browser-sandbox` directory.

Lastly, open `browser-sandbox/index.html` in your browser to see the output.

## Tests

Run tests:

`yarn test`

Run a test:

`yarn test basic1.js`

Run tests and see minified Google Closure Compiler size comparisons:

`yarn test --size`

Run benchmark tests and see the performance differences (10 warmups before metrics are captured):

`yarn test --benchmark`

Run benchmark tests and see the performance differences and minified size comparisons (10 warmups before metrics are captured):

`yarn test --benchmark --size`
