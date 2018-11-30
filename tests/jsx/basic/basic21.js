// props:{cond: true, cond2: false, txt: '<script>alert("Haxor!")</script>', number: 123}

var React = require("react");

type PropsType = {
  cond: boolean,
  cond2: boolean,
  txt: string,
  num: number,
};

function Component({ cond, cond2, txt, num }: PropsType) {
  var numStr = num + "";
  var txt2 = "100".toString();
  var txt3 = "Hello" + "world";
  return (
    <div>
      <span>{!cond && cond2 === false ? txt : numStr}</span>
      <span className={txt} id={`<script>alert("Haxor!")</script>`}>
        {txt2}
        {txt3}
        Static text!
        {txt}
      </span>
    </div>
  );
}

Component.compileRootComponent = true;

module.exports = Component;
