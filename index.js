var babel = require('babel-core');
var plugin = require('./plugin.js');

var babelSettings = {
  presets: [['babel-preset-env', {modules: false, loose: true, targets: {browsers:"last 1 Chrome versions"}}]],
  plugins: [
      [plugin, {imports: true}],
      'babel-plugin-syntax-jsx',
      'babel-plugin-syntax-flow'
  ]
};

const input = `
(function() {
  var React = require("react");

  react function SimpleCounter({handleClick, text}: { handleClick: () => void, text?: string }) {
    if (props.reason) {
      return (
        <div className="123" onClick={handleClick}>
          Hello world {text === undefined ? "No title" : text}
          <span>{"123"}</span>
        </div>
      );
    }
    return <div>{123}</div>
  }
  
  module.exports = SimpleCounter;
})();
`
const code = babel.transform(input, babelSettings).code;

console.log(code);

// return (
//   <div>
//     *{
//       if (count > 0) {
//         yield <>
//           <div>Counter is at: {count}</div>
//           <button onInput={increment}>+</button>
//         </>
//       } else {
//         yield <>
//           <span>Press the button to start counting!</span>
//           <button onInput={increment}>Begin!</button>
//         </>
//       }
//     }
//   </div>
// )