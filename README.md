# react-compiler

Note: This project is unmaintained and is highly experimental.

This was a personal side-project to investigate various different implementations of how you might ahead-of-time compile React applications (with contraints in place) in the pursuit of performance and code size wins. The primary reason for open sourcing this code is to share the ideas explored in this project, so others can make better use of them.

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
