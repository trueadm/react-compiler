'use strict';(function(A){"function"===typeof define&&define.amd?define(A):A()})(function(){function A(a,c){var b=c.time;b=((new Date).getTime()/1E3-b)/60;b=60>b?Math.round(b)+" minutes ago":Math.round(b/60)+" hours ago";var e=(c.url+"").replace("https://","").replace("http://","").split("/")[0];return[a+".",c.title,c.url,e,c.score+" points",c.by,b,(c.descendants||0)+" comments"]}function Z(){return[10,0,[13,[17,0,"tr",44,"athing",0,"td",21,48,"vertical-align","top",48,"text-align","right",22,44,
"title",4,44,"rank",35,0,0,8,8,0,"td",44,"votelinks",21,48,"vertical-align","top",22,0,"center",0,"a",42,"href","#",2,44,"votearrow",42,"title","upvote",8,8,8,8,0,"td",44,"title",0,"a",42,"href","#",44,"storylink",35,1,1,8,16,2,2,[4,44,"sitebit comhead",32," ",32,"(",0,"a",42,"href","#",35,3,3,8,32,")",8],0,8,8,0,"tr",0,"td",42,"colSpan",2,8,0,"td",44,"subtext",4,44,"score",35,4,4,8,32," by",32," ",0,"a",42,"href","#",44,"hnuser",35,5,5,8,32," ",4,44,"age",0,"a",42,"href","#",35,6,6,8,8,32," ",32,
"| ",0,"a",42,"href","#",33,"hide",8,32," | ",0,"a",42,"href","#",35,7,7,8,8,8,0,"tr",21,48,"height","5px",22,44,"spacer",8,18],A,8]]}function aa(a){return[a,function(a,b){return[[++b,a]]}]}function ta(a,c){var b=[];if(0!==c)for(var e=0,k=c.length;e<k;e++)b.push(a[c[e]]);return b}function E(a,c){if(K(a))a.push(c);else if(K(c))for(var b=0,e=c.length;b<e;b++)E(a,c[b]);else a.appendChild(c)}function L(a,c){return 0===c.length?a():1===c.length?a(c[0]):2===c.length?a(c[0],c[1]):3===c.length?a(c[0],c[1],
c[2]):4===c.length?a(c[0],c[1],c[2],c[3]):7===c.length?a(c[0],c[1],c[2],c[3],c[4],c[5],c[6]):a.apply(null,c)}function y(a,c,b){null===b.hostNode&&(b.hostNode=a);null!==c.currentHostNode&&(b=c.currentHostNodeStackIndex++,c.currentHostNodeStack[b]=c.currentHostNode);c.currentHostNode=a}function r(a,c,b,e){var k=a.length,g=x.get(a),m=B.get(a),f=void 0===g,h=null===e?null:e.values;!0===f&&(g=[],m=[],x.set(a,g),B.set(a,m));for(var d=0;d<k;){switch(a[d]){case 29:var l=a[++d],p=a[++d],n=ba.get(l);void 0===
n?(n=l(),ba.set(l,n)):n=ba.get(l);var q=null;K(p)?q=p:null!==p&&(q=c[p]);b.propsArray=q;var t=r(n,c,b,e);!0===f&&g.push(n,p);break;case 44:var u=a[++d];b.currentHostNode.className=u;break;case 45:var v=a[++d],w=a[++d],z=c[w];if(v&1)throw Error("TODO DYNAMIC_PROP_CLASS_NAME");b.currentHostNode.className=z;!0===f&&g.push(45,v,w);break;case 42:var A=a[++d],D=a[++d],J=b.currentHostNode;"id"===A?J.id=D:J.setAttribute(A,D);break;case 43:var X=a[++d],Y=a[++d],Z=a[++d],ca=c[Z];if(Y&1)throw Error("TODO renderStaticProp");
null!==ca&&void 0!==ca&&b.currentHostNode.setAttribute(X,ca);break;case 32:var aa=a[++d],ra=document.createTextNode(aa);E(b.currentHostNode,ra);break;case 33:var sa=a[++d];b.currentHostNode.textContent=sa;break;case 34:var Ya=a[++d],Za=document.createTextNode(c[Ya]);E(b.currentHostNode,Za);break;case 35:var ua=a[++d],va=a[++d],wa=b.currentHostNode;wa.textContent=c[ua];h[va]=wa.firstChild;!0===f&&g.push(35,ua,va);break;case 2:var $a=document.createElement("div");y($a,b,e);break;case 4:var ab=document.createElement("span");
y(ab,b,e);break;case 0:var bb=a[++d],cb=document.createElement(bb);y(cb,b,e);break;case 3:var xa=document.createElement("div"),ya=a[++d];y(xa,b,e);h[ya]=xa;!0===f&&g.push(3,ya);break;case 5:var za=document.createElement("span"),Aa=a[++d];y(za,b,e);h[Aa]=za;!0===f&&g.push(5,Aa);break;case 1:var db=a[++d],Ba=a[++d],Ca=document.createElement(db);y(Ca,b,e);h[Ba]=Ca;!0===f&&g.push(1,Ba);break;case 9:case 8:var M=b.currentHostNodeStackIndex,Da=b.currentHostNode;t=Da;if(0===M)b.currentHostNode=null;else{M=
--b.currentHostNodeStackIndex;var Ea=b.currentHostNodeStack[M];b.currentHostNodeStack[M]=null;E(Ea,Da);b.currentHostNode=Ea}break;case 6:var eb=a[++d],fb=document.createElement(eb);y(fb,b,e);break;case 7:var gb=a[++d],Fa=a[++d],Ga=document.createElement(gb);y(Ga,b,e);h[Fa]=Ga;!0===f&&g.push(7,Fa);break;case 37:var hb=a[++d],ib=a[++d];r(hb,c[ib],b,e);break;case 48:var jb=a[++d],F=a[++d];if(null==F||void 0===F)break;"number"===typeof F&&(F+="px");b.currentHostNode.style.setProperty(jb,F);break;case 49:var kb=
a[++d],lb=a[++d],G=c[lb];if(null==G||void 0===G)break;"number"===typeof G&&(G+="px");b.currentHostNode.style.setProperty(kb,G);break;case 50:var mb=a[++d],da=a[++d];if(null==da||void 0===da)break;b.currentHostNode.style.setProperty(mb,da);break;case 16:var Ha=a[++d],Ia=a[++d],nb=c[Ia],ea=a[++d],fa=a[++d],ha=void 0;!0===f&&g.push(16,Ha,Ia,ea,fa);nb?null!==ea&&(ha=r(ea,c,b,e)):null!==fa&&(ha=r(fa,c,b,e));t=h[Ha]=ha;break;case 15:var H=a[++d],Ja=a[++d],Ka=a[++d],La=d,ob=H-1;if(!0===f){var Ma,Na=La+1,
pb=Na+2*(H-1)+1;(Ma=g).push.apply(Ma,[15,H,Ja,Ka].concat(a.slice(Na,pb)))}for(var ia=void 0,N=0;N<H;N++)if(N===ob){var Oa=a[++d];null!==Oa&&(ia=r(Oa,c,b,e))}else{var qb=a[++d];if(!0===c[qb]){var Pa=a[++d];null!==Pa&&(ia=r(Pa,c,b,e));break}++d}h[Ka]=N-1;h[Ja]=ia;d=La+2*(H-1)+1;break;case 38:for(var rb=a[++d],sb=a[++d],Qa=a[++d],ja=c[rb],Ra=0===Qa?null:c[Qa],tb=ja.length,O=0;O<tb;++O){var ub=ja[O],Sa=c;null!==Ra&&(Sa=Ra(ub,O,ja));r(sb,Sa,b,e)}break;case 13:var Ta=a[++d],ka=a[++d],la=c,P=void 0;0!==
ka&&(P=a[++d],la=L(ka,b.currentComponent.props),h[P]=la);!0===f&&(g.push(13,Ta,ka),void 0!==P&&g.push(P));return r(Ta,la,b,e);case 14:var Ua=a[++d],Va=a[++d],ma=a[++d],I=c,Q=void 0,R=void 0,S=void 0;0!==ma&&(Q=a[++d],I=L(ma,b.currentComponent.props),h[Q]=I,null===I&&(S=null,R=document.createTextNode("")));var C=void 0;if(void 0===R){C=a[++d];for(var vb=C.length,wb=I[0],T=0;T<vb;){if(C[T]===wb){S=C[++T];R=r(S,I,b,e);break}T+=2}}!0===f&&(g.push(14,Ua,Va,ma),void 0!==Q&&g.push(Q),void 0===C&&(C=a[++d]),
g.push(C));h[Va]=S;return h[Ua]=R;case 10:var Wa=a[++d],U=b.currentComponent,V=void 0,xb=U;if(null===U){V=a[++d];var yb={props:ta(b.rootPropsObject,V),usesHooks:!1};U=b.currentComponent=yb}else b.currentComponent={props:b.propsArray,usesHooks:!1},b.propsArray=null;var na=a[++d],W=new zb(null,[]);!0===f&&(g.push(10,Wa,na),void 0!==V&&g.push(V),m.push(10,Wa,na));W.values[0]=U;if(null===e)b.fiber=W;else{var oa=e,Xa=W;Xa.parent=oa;null===oa.child&&(oa.child=Xa)}var Ab=r(na,c,b,W);b.currentComponent=xb;
return Ab;case 11:var pa=a[++d],qa=void 0;if(null===pa)qa=document.createTextNode("");else if("string"===typeof pa)qa=document.createTextNode(pa);else throw Error("TODO");return qa;case 17:case 18:case 21:case 22:break;default:++d}++d}return t}function w(a,c,b,e,k){for(var g=a.length,m=null===k?null:k.values,f=0;f<g;){switch(a[f]){case 29:var h=a[++f];h=x.get(h);var d=a[++f],l=null;K(d)?l=d:null!==d&&(l=b[d]);e.propsArray=l;w(h,c,b,e,k);break;case 35:h=a[++f];l=a[++f];d=b[h];l=m[l];c[h]!==d&&(l.nodeValue=
d);break;case 45:h=a[++f];d=a[++f];l=b[d];if(c[d]!==l){if(h&1)throw Error("TODO DYNAMIC_PROP_CLASS_NAME");e.currentHostNode.className=l}break;case 1:case 7:case 3:case 5:h=a[++f];e.currentHostNode=m[h];break;case 16:h=a[++f];d=a[++f];var p=c[d],n=b[d];d=a[++f];l=a[++f];var q=p===n;p=void 0;n?null===d||q||(null!==l&&(l=B.get(l),z(l,e,k,!0)),p=r(d,b,e,k)):null===l||q||(null!==d&&(d=B.get(d),z(d,e,k,!0)),p=r(l,b,e,k));void 0!==p&&(d=m[h],d.parentNode.replaceChild(p,d),m[h]=p);break;case 15:d=a[++f];
h=a[++f];n=a[++f];l=f;p=d-1;q=m[n];var t=!1;n=void 0;for(var u=0;u<d;++u)if(u===p){var v=a[++f];q!==u&&(t=!0);null!==v&&(!0===t?n=r(v,b,e,k):(v=x.get(v),w(v,c,b,e,k)))}else{v=a[++f];if(!0===b[v]){f=a[++f];q!==u&&(t=!0);null!==f&&(!0===t?n=r(f,b,e,k):(f=x.get(f),w(f,c,b,e,k)));break}++f}!0===t&&(f=B.get(a[q===p?l+1+2*q:l+2+2*q]),z(f,e,k,!0));f=l+2*(d-1)+1;void 0!==n&&(d=m[h],d.parentNode.replaceChild(n,d),m[h]=n);break;case 13:g=a[++f];g=x.get(g);h=a[++f];d=b;0!==h&&(a=a[++f],d=L(h,e.currentComponent.props),
c=m[a],m[a]=b);w(g,c,d,e,k);return;case 14:g=a[++f];h=a[++f];p=a[++f];d=c;l=b;b=void 0;n=!1;c=void 0;0!==p&&(q=a[++f],l=L(p,e.currentComponent.props),d=m[q],m[q]=l,null===l&&null!==d&&(n=!0,c=null,b=document.createTextNode("")));if(void 0===b)for(a=a[++f],f=a.length,p=null===d?null:d[0],q=l[0],t=0;t<f;){u=a[t];if(u===q){u!==p&&(n=!0);c=a[++t];n?b=r(c,l,e,k):(a=x.get(c),w(a,d,l,e,k));break}t+=2}!0===n&&(a=m[h],null!==a&&(a=B.get(a),z(a,e,k,!0)),m[h]=c);void 0!==b&&(e=m[g],e.parentNode.replaceChild(b,
e),m[g]=b);return b;case 10:++f;m=a[++f];m=x.get(m);d=e.currentComponent;g=void 0;h=d;null===k&&(g=e.fiber);k=g.values[0];null===d?(a=a[++f],a=ta(e.rootPropsObject,a)):a=e.propsArray;k.props=a;e.currentComponent=k;w(m,c,b,e,g);e.currentComponent=h;return;default:++f}++f}}function z(a,c,b,e){for(var k=a.length,g=0;g<k;){switch(a[g]){case 13:return;case 10:++g;k=void 0;var m=c.currentComponent;null===b&&(k=c.fiber);b=k.values[0];a=a[++g];c.currentComponent=b;z(a,c,k,e);c.currentComponent=m;return;default:++g}++g}}
function J(a,c){var b=B.get(c.mountOpcodes);z(b,c,null,!0);a.removeChild(c.fiber.hostNode);c.fiber=null}function ra(a){this.currentHostNode=this.currentComponent=null;this.currentHostNodeStack=[];this.currentHostNodeStackIndex=0;this.fiber=null;this.mountOpcodes=a;this.propsArray=D;this.rootPropsObject=null}function zb(a,c){this.parent=this.sibling=this.memoizedState=this.key=this.hostNode=this.child=null;this.values=c}var X=Symbol.for("react.element"),K=Array.isArray,D=[],Y=new Map,x=new Map,B=new Map,
ba=new Map,sa=document.getElementById("root");console.time("Render");(function(a,c){var b=Y.get(c);if(null===a||void 0===a)void 0!==b&&J(c,b);else if(a.$$typeof===X){var e=a.type,k=!1;void 0===b?(b=new ra(e),Y.set(c,b)):null!==b.fiber&&(b.mountOpcodes===e?k=!0:J(c,b));b.mountOpcodes=e;b.rootPropsObject=a.props;!0===k?(c=x.get(e),w(c,D,D,b,null)):(b=r(e,D,b,null),E(c,b))}else throw Error("render() expects a ReactElement as the first argument");})(function(a,c){return{$$typeof:X,key:null,props:c,ref:null,
type:a}}([10,0,["stories"],[13,[0,"center",0,"table",42,"id","hnmain",42,"border",0,42,"cellPadding",0,42,"cellSpacing",0,42,"width","85%",21,48,"background-color","#f6f6ef",22,0,"tbody",29,function(){return[10,0,[13,[0,"tr",21,48,"background-color","#222",22,0,"table",42,"width","100%",21,48,"padding","4px",22,42,"cellSpacing",0,42,"cellPadding",0,0,"tbody",0,"td",21,48,"width","18px",48,"padding-right","4px",22,0,"a",42,"href","#",6,"img",42,"src","logo.png",42,"width",16,42,"height",16,21,48,"border",
"1px solid #00d8ff",22,9,8,8,0,"td",21,50,"line-height","12pt",22,42,"height",10,4,44,"pagetop",0,"b",44,"hnname",33,"React HN Benchmark",8,0,"a",42,"href","#",33,"new",8,32," | ",0,"a",42,"href","#",33,"comments",8,32," | ",0,"a",42,"href","#",33,"show",8,32," | ",0,"a",42,"href","#",33,"ask",8,32," |",32," ",0,"a",42,"href","#",33,"jobs",8,32," | ",0,"a",42,"href","#",33,"submit",8,8,8,8,8,8],0]]},null,0,"tr",42,"height",10,8,29,function(){return[10,0,[13,[0,"tr",0,"td",1,"table",0,42,"cellPadding",
0,42,"cellSpacing",0,42,"classList","itemlist",38,0,[13,[29,Z,0],0],1,8,8,8],aa,1]]},0,8,8,8],function(a){return[[a]]},1]],{stories:[{by:"rendx",descendants:49,id:14201562,kids:[14201704,14202297,14202233,14201771,14201765,14201897,14201750,14201913,14201854,14201667,14201759,14202073],score:186,time:1493197629,title:"Postal: Open source mail delivery platform, alternative to Mailgun or Sendgrid",type:"story",url:"https://github.com/atech/postal"},{by:"rabyss",descendants:4,id:14202124,kids:[14202293,
14202249],score:16,time:1493205989,title:"Show HN: BreakLock \u2013 A hybrid of Mastermind and the Android pattern lock",type:"story",url:"https://maxwellito.github.io/breaklock/"},{by:"morid1n",descendants:137,id:14200563,kids:[14201274,14200711,14201147,14201365,14201499,14200618,14201169,14200911,14200734,14201083,14200706,14200785,14201032],score:178,time:1493183234,title:"My Hackintosh Hardware Spec \u2013 clean, based on a 2013 iMac",type:"story",url:"https://infinitediaries.net/my-exact-hackintosh-spec/"},
{by:"robertwiblin",descendants:203,id:14196731,kids:[14201298,14201838,14201381,14197574,14201398,14199764,14198491,14197E3,14198224,14200614,14201983,14200697,14199252,14201214,14198923,14200224,14197509,14200859,14200064,14200114,14197256,14197220,14200653,14197186,14199258,14197155,14197344,14198361,14197969,14199813,14197259,14197503],score:562,time:1493145853,title:"Evidence-based advice we've found on how to be successful in a job",type:"story",url:"https://80000hours.org/career-guide/how-to-be-successful/"},
{by:"ryan_j_naughton",descendants:565,id:14196812,kids:[14198306,14197339,14200899,14198165,14198750,14202199,14201432,14197619,14197471,14201113,14202214,14202043,14197313,14197751,14197332,14198050,14201616,14197404,14199730,14198007,14197358,14197283,14200959,14197891,14198203,14197312,14200796,14201528,14197249,14198271,14197989,14198842,14197205,14199148,14197458,14200457,14197330,14199993,14197855,14200102,14197378,14199315,14198240,14198397,14199326,14200159,14198798,14201296,14198173,14197323,
14197383,14197459,14197275,14198305,14198005,14198015,14199380,14199079,14198413,14197334,14197327,14197234],score:385,time:1493146342,title:"Is Every Speed Limit Too Low?",type:"story",url:"https://priceonomics.com/is-every-speed-limit-too-low/"},{by:"monort",descendants:63,id:14196322,kids:[14197628,14200026,14197457,14197486,14202126,14201266,14197227,14199404,14199338,14196382,14200598,14197377,14199689,14198538,14196905,14200404,14198781,14197278,14197888,14197742,14197764],score:316,time:1493143464,
title:"Experimental Nighttime Photography with Nexus and Pixel",type:"story",url:"https://research.googleblog.com/2017/04/experimental-nighttime-photography-with.html"},{by:"networked",descendants:9,id:14199028,kids:[14201588,14200361,14200314,14200338],score:121,time:1493161601,title:"JPEG Huffman Coding Tutorial",type:"story",url:"http://www.impulseadventure.com/photo/jpeg-huffman-coding.html"},{by:"jasontan",id:14202227,score:1,time:1493207865,title:"Are you adept at understanding concurrency problems? Sift Science is hiring",
type:"job",url:"https://boards.greenhouse.io/siftscience/jobs/550699#.WPUZhlMrLfY"},{by:"pouwerkerk",descendants:80,id:14196077,kids:[14199434,14196279,14196604,14197440,14201734,14200922,14200452,14197115,14199837,14199894,14196596,14198243,14196565,14197400,14197049,14197686,14198545,14198475],score:717,time:1493142008,title:"Painting with Code: Introducing our new open source library React Sketch.app",type:"story",url:"http://airbnb.design/painting-with-code/"},{by:"mromnia",descendants:16,id:14201670,
kids:[14201835,14202115,14202176,14201890,14202325,14201859,14202158,14201763,14201902],score:62,time:1493198949,title:"How to mod a Porsche 911 to run Doom [video]",type:"story",url:"https://www.youtube.com/watch?v=NRMpNA86e8Q"},{by:"rbanffy",descendants:16,id:14192383,kids:[14197494,14201805,14197484],score:194,time:1493118160,title:"Go programming language secure coding practices guide",type:"story",url:"https://github.com/Checkmarx/Go-SCP"},{by:"intous",descendants:0,id:14200446,score:39,time:1493181245,
title:"Building Functional Chatbot for Messenger with Ruby on Rails",type:"story",url:"https://tutorials.botsfloor.com/chatbot-development-tutorial-how-to-build-a-fully-functional-weather-bot-on-facebook-messenger-c94ac7c59185"},{by:"nanospeck",descendants:23,id:14201207,kids:[14202252,14201646,14201620,14202076,14201511,14201324,14201940,14201425,14201505,14201304,14201435,14201287,14201739,14202031,14202018],score:57,text:"This question was asked on both 2015 &amp; 2016 in HN. I would like to ask it again today to know what are the newest options for this.<p>Q: What would you recommend as a reasonably priced (sub 150$) quad-copter&#x2F;drone, that has a camera, the ability to be programmed (so that I can process video&#x2F;write my own stability algorithms for it), good range, and reasonable flying time?\nIn the event nothing fits that price point, any pointers on what the state of the art is?<p>Thanks!",
time:1493192641,title:"Ask HN (again): What is the best affordable programmable drone?",type:"story"},{by:"geuis",descendants:57,id:14196708,kids:[14197480,14198523,14198705,14200969,14200079,14197605,14198979,14202203,14197679,14198461,14200389,14198065,14197883,14197908],score:123,time:1493145655,title:"Hackpad shutting down",type:"story",url:"https://hackpad.com/"},{by:"jfoutz",descendants:55,id:14195956,kids:[14199594,14196972,14202101,14198197,14196771,14197326,14196956,14200842,14201529,14198581,
14196777,14200177,14200422,14198571],score:167,time:1493141367,title:"Linkerd 1.0",type:"story",url:"https://blog.buoyant.io/2017/04/25/announcing-linkerd-1.0/index.html"},{by:"DavidBuchanan",descendants:19,id:14199364,kids:[14199735,14200889,14202245,14200205,14200104,14201697,14200061,14199996,14199867],score:66,time:1493164755,title:"Show HN: TARDIS \u2013 Warp a process's perspective of time by hooking syscalls",type:"story",url:"https://github.com/DavidBuchanan314/TARDIS"},{by:"rchen8",descendants:121,
id:14195664,kids:[14196654,14196206,14196677,14197035,14196041,14196399,14196200,14196140,14196216,14196421,14196370,14196146,14197601,14197107,14196866,14196691,14197704,14196772,14200089,14198588,14196937,14198530,14197119,14197247,14198632,14196137,14200323,14196346],score:486,time:1493139957,title:"How to Become Well-Connected",type:"story",url:"http://firstround.com/review/how-to-become-insanely-well-connected/"},{by:"dbrgn",descendants:89,id:14191186,kids:[14200855,14200035,14200110,14201408,
14202159,14197876,14200348,14198720,14198183,14199824,14198281,14201643,14201591,14199541,14198423,14201738,14200037,14201349,14200028,14201206,14197995,14197830,14199603],score:135,time:1493100791,title:"How to Say (Almost) Everything in a Hundred-Word Language (2015)",type:"story",url:"https://www.theatlantic.com/technology/archive/2015/07/toki-pona-smallest-language/398363/?single_page=true"},{by:"runesoerensen",descendants:62,id:14198866,kids:[14199494,14199495,14200288,14201118,14199599],score:155,
time:1493160263,title:"Nginx 1.13 released with TLS 1.3 support",type:"story",url:"http://mailman.nginx.org/pipermail/nginx-announce/2017/000195.html"},{by:"bcherny",descendants:20,id:14199299,kids:[14200694,14201832,14200517,14201760,14200966,14200558,14201815,14201231,14201073,14201124],score:54,time:1493163960,title:"Show HN: JSONSchema to TypeScript compiler",type:"story",url:"https://github.com/bcherny/json-schema-to-typescript"},{by:"tormeh",descendants:37,id:14198557,kids:[14201027,14199082,
14201023,14201160,14200367,14200647],score:70,time:1493158034,title:"A practitioner\u2019s guide to hedonism (2007)",type:"story",url:"https://www.1843magazine.com/story/a-practitioners-guide-to-hedonism"},{by:"nickreiner",descendants:33,id:14199125,kids:[14202332,14201634,14201200,14201215,14201157,14201898,14201969,14201125],score:52,time:1493162517,title:"Best Linux Distros for Gaming in 2017",type:"story",url:"https://thishosting.rocks/best-linux-distros-for-gaming/"},{by:"BinaryIdiot",descendants:170,
id:14200486,kids:[14200680,14200677,14201515,14200793,14200534,14200908,14200649,14200633,14200701,14202295,14200578,14200709,14200580,14201107,14201779,14200773,14200804,14200720,14202060,14200948,14200903,14200748,14200875,14200750,14200821,14200756,14201707,14201689,14200669,14200997,14200818,14201586,14200603,14201054,14201457,14200616,14201095,14200915,14200878,14200629,14201523,14200620,14202099],score:316,time:1493181945,title:"Suicide of an Uber engineer: Widow blames job stress",type:"story",
url:"http://www.sfchronicle.com/business/article/Suicide-of-an-Uber-engineer-widow-blames-job-11095807.php?t=7e40d1f554&cmpid=fb-premium&cmpid=twitter-premium"},{by:"catc",descendants:34,id:14195522,kids:[14202316,14202278,14197167,14199152,14202077,14197239,14197721,14197632,14197219,14198296,14197245,14197201,14197403,14198051,14196747],score:87,time:1493139414,title:"Show HN: React Timekeeper \u2013 Time picker based on the style of Google Keep",type:"story",url:"https://catc.github.io/react-timekeeper/"},
{by:"Integer",descendants:152,id:14192353,kids:[14197671,14197754,14199091,14198533,14201249,14198626,14198263,14198009,14195130,14199551,14197663,14198285,14199611,14199835,14197482,14198924,14198943],score:273,time:1493117771,title:"Windows Is Bloated, Thanks to Adobe\u2019s Extensible Metadata Platform",type:"story",url:"https://www.thurrott.com/windows/109962/windows-bloated-thanks-adobes-extensible-metadata-platform"},{by:"craigcannon",descendants:23,id:14197852,kids:[14200024,14199986,14202106,
14198011,14199228,14202138,14198917,14198607],score:58,time:1493153342,title:"New England Lost Ski Areas Project",type:"story",url:"http://www.nelsap.org/"},{by:"golfer",descendants:105,id:14198229,kids:[14200202,14198948,14199770,14198634,14200263,14198797,14198919,14200447,14198645,14199267,14199124,14198833,14199059],score:282,time:1493155745,title:"Uber must turn over information about its acquisition of Otto to Waymo",type:"story",url:"https://techcrunch.com/2017/04/25/uber-must-turn-over-information-about-its-acquisition-of-otto-to-waymo-court-rules/"},
{by:"JoshTriplett",descendants:116,id:14198403,kids:[14199771,14199980,14198664,14198764,14201086,14200307,14199294,14198860,14198817],score:139,time:1493156882,title:"Shutting down public FTP services",type:"story",url:"https://lists.debian.org/debian-announce/2017/msg00001.html"},{by:"mabynogy",descendants:50,id:14191577,kids:[14194021,14195402,14193886,14193792,14194355,14197136,14200386,14194151,14193989,14193798,14194042,14197100,14198984,14193925,14194170],score:365,time:1493107104,title:"A Primer on B\u00e9zier Curves",
type:"story",url:"https://pomax.github.io/bezierinfo#preface"},{by:"robertothais",descendants:29,id:14192946,kids:[14202311,14202299,14201900,14200029,14198260,14198605,14201850,14199858,14198223,14198610],score:61,time:1493124627,title:"Consciousness as a State of Matter (2014)",type:"story",url:"https://arxiv.org/abs/1401.1219"},{by:"leephillips",descendants:2,id:14202078,kids:[14202122],score:5,time:1493205152,title:"The Republican Lawmaker Who Secretly Created Reddit\u2019s Women-Hating \u2018Red Pill\u2019",
type:"story",url:"http://www.thedailybeast.com/articles/2017/04/25/the-republican-lawmaker-who-secretly-created-reddit-s-women-hating-red-pill.html"},{by:"anguswithgusto",descendants:55,id:14196325,kids:[14197131,14196789,14197299,14197466,14196737,14199929,14197550,14197511,14196888,14200109,14197101],score:80,time:1493143475,title:"Gett in advanced talks to buy Juno for $250M as Uber rivals consolidate",type:"story",url:"https://techcrunch.com/2017/04/25/gett-in-advanced-talks-to-buy-juno-for-250m-as-uber-rivals-consolidate/"},
{by:"fabuzaid",descendants:2,id:14196339,kids:[14201557,14201170],score:46,time:1493143560,title:"Implementing a Fast Research Compiler in Rust",type:"story",url:"http://dawn.cs.stanford.edu/blog/weld.html"},{by:"bluesilver07",descendants:61,id:14196154,kids:[14197614,14196853,14197074,14197050,14200090,14197731,14196352,14197442],score:72,time:1493142448,title:"Xenko Game Engine 2.0 released",type:"story",url:"http://xenko.com/blog/release-xenko-2-0-0/"},{by:"molecule",descendants:254,id:14189392,
kids:[14190198,14190800,14193591,14190274,14189796,14190118,14190405,14190006,14189430,14190244,14189877,14190064,14190211,14189918,14190071,14191312,14195969,14190542,14194775,14189900,14190032,14189847,14192128,14191737,14191047,14190992,14192759,14191405,14190815,14194136,14190737,14190552,14191385,14189816,14191316,14193780,14193979,14190768,14192973,14191217,14190879,14190780,14189914,14190925,14192906,14190528,14189893,14190007,14189929,14190049,14191859,14191304,14190177,14193355,14193352,
14190324,14190846,14189803],score:630,time:1493076480,title:"Robert M. Pirsig has died",type:"story",url:"http://www.npr.org/sections/thetwo-way/2017/04/24/525443040/-zen-and-the-art-of-motorcycle-maintenance-author-robert-m-pirsig-dies-at-88"},{by:"artsandsci",descendants:67,id:14194422,kids:[14199418,14196266,14197226,14196647,14196324,14201761,14196265,14195599,14199054,14196057],score:127,time:1493134376,title:"An extra-uterine system to physiologically support the extreme premature lamb",type:"story",
url:"https://www.nature.com/articles/ncomms15112"},{by:"miobrien",descendants:9,id:14198261,kids:[14199610,14199447,14199862,14201753,14199068],score:30,time:1493155969,title:"Prior Indigenous Technological Species",type:"story",url:"https://arxiv.org/abs/1704.07263"},{by:"zdw",descendants:2,id:14199197,kids:[14200610],score:12,time:1493163087,title:"Should Curve25519 keys be validated?",type:"story",url:"https://research.kudelskisecurity.com/2017/04/25/should-ecdh-keys-be-validated/"},{by:"spearo77",
descendants:213,id:14189688,kids:[14191654,14192373,14190683,14192095,14191856,14190771,14190570,14190599,14190721,14192049,14189694,14191430,14193610,14190543,14190372,14191818,14192171,14192177,14192135,14191483,14190560,14190341,14190362,14190452,14192563,14190458,14195245,14190809,14192706,14192959,14190636,14190634,14190368,14191163,14191379,14190668,14191673,14190884,14192565,14190480,14190442],score:447,time:1493079289,title:"WikiTribune \u2013 Evidence-based journalism",type:"story",url:"https://www.wikitribune.com"},
{by:"adbrebs",descendants:294,id:14182262,kids:[14183335,14183715,14182725,14183897,14185812,14184510,14182468,14183231,14182580,14183996,14182449,14185671,14182428,14182666,14186599,14182519,14185571,14185159,14182636,14185864,14188340,14183433,14183146,14184034,14184363,14183368,14183098,14182495,14182753,14184720,14188085,14187692,14183633,14188137,14182606,14186796,14196166,14185084,14185899,14188219,14186885,14183406,14185561,14183388,14191457,14183281,14183399,14183674,14183236,14183990,14183760,
14183248,14184114,14183318,14183457,14186509,14186900,14186695,14188405,14184636,14184630,14188301,14184144,14183023,14184555,14185946,14184611,14184490,14183653,14183881,14182715,14184440,14182573,14183251,14184962,14187249,14182545,14192314],score:1356,time:1493014335,title:"Lyrebird \u2013 An API to copy the voice of anyone",type:"story",url:"https://lyrebird.ai/demo"},{by:"mathgenius",descendants:6,id:14192442,kids:[14197265,14195645],score:43,time:1493118936,title:"Quantum \u2013 Open journal for quantum science",
type:"story",url:"http://quantum-journal.org/papers/"},{by:"tjalfi",descendants:5,id:14190937,kids:[14199744,14197114,14190946],score:107,time:1493097061,title:"A Seven Dimensional Analysis of Hashing Methods [pdf]",type:"story",url:"http://www.vldb.org/pvldb/vol9/p96-richter.pdf"},{by:"mxstbr",descendants:0,id:14196935,score:24,time:1493147015,title:"One GraphQL Client for JavaScript, iOS, and Android",type:"story",url:"https://dev-blog.apollodata.com/one-graphql-client-for-javascript-ios-and-android-64993c1b7991"},
{by:"uptown",descendants:166,id:14192817,kids:[14197690,14195597,14196750,14195237,14196320,14195150,14198816,14194916,14197746,14196332,14194695,14196726,14194947,14199715,14195059,14195778,14196204,14200435,14194780,14195030,14198452,14199023,14194852,14197577,14197778,14195361,14196368,14194948,14199024,14195060,14199498],score:226,time:1493123621,title:"How Yahoo Killed Flickr (2012)",type:"story",url:"https://gizmodo.com/5910223/how-yahoo-killed-flickr-and-lost-the-internet"},{by:"mattklein123",
descendants:42,id:14194026,kids:[14194573,14195577,14194430,14195407,14194569,14195298,14200054,14194456,14198329,14199198],score:167,time:1493131921,title:"Envoy: 7 months later",type:"story",url:"https://eng.lyft.com/envoy-7-months-later-41986c2fd443"},{by:"misnamed",descendants:2,id:14191333,kids:[14197296],score:29,time:1493103250,title:"Modern Hieroglyphs: Binary Logic Behind the Universal \u201cPower Symbol\u201d",type:"story",url:"http://99percentinvisible.org/article/modern-hieroglyphics-binary-logic-behind-universal-power-symbol/"},
{by:"LaFolle",descendants:92,id:14191681,kids:[14192477,14194490,14192316,14193364,14192065,14193499,14194324,14192622,14192020,14195866,14192496,14196391,14192138,14192714,14195151,14195094,14192110,14192155],score:138,time:1493108371,title:"Feynman Algorithm (2014)",type:"story",url:"http://wiki.c2.com/?FeynmanAlgorithm"},{by:"Thevet",descendants:18,id:14190736,kids:[14197744,14195753,14197880,14197735,14195874,14197023,14196660],score:81,time:1493093860,title:"The legend of the Legion",type:"story",
url:"https://aeon.co/essays/why-young-men-queue-up-to-die-in-the-french-foreign-legion"},{by:"bufordsharkley",descendants:92,id:14197013,kids:[14197983,14197168,14197701,14198239,14197514,14198064,14197476,14198489,14197761,14197080,14198905,14198068,14198579],score:69,time:1493147532,title:"Cracking the Mystery of Labor's Falling Share of GDP",type:"story",url:"https://www.bloomberg.com/view/articles/2017-04-24/cracking-the-mystery-of-labor-s-falling-share-of-gdp"},{by:"rbanffy",descendants:27,id:14198470,
kids:[14199443,14201987,14199461,14199729,14201519,14198762,14199524],score:52,time:1493157378,title:"How the Internet Gave Mail-Order Brides the Power",type:"story",url:"https://backchannel.com/how-the-internet-gave-mail-order-brides-the-power-1af8c8a40562"}]}),sa);console.timeEnd("Render")});
