'use strict';(function(A){"function"===typeof define&&define.amd?define(A):A()})(function(){function A(a,c){var b=c.time;b=((new Date).getTime()/1E3-b)/60;b=60>b?Math.round(b)+" minutes ago":Math.round(b/60)+" hours ago";var e=(c.url+"").replace("https://","").replace("http://","").split("/")[0];return[a+".",c.title,c.url,e,c.score+" points",c.by,b,(c.descendants||0)+" comments"]}function fa(){return[10,0,A,[16,0,"tr",40,"athing",0,"td",21,44,"vertical-align","top",44,"text-align","right",22,40,"title",
4,40,"rank",31,0,0,8,8,0,"td",40,"votelinks",21,44,"vertical-align","top",22,0,"center",0,"a",38,"href","#",2,40,"votearrow",38,"title","upvote",8,8,8,8,0,"td",40,"title",0,"a",38,"href","#",40,"storylink",31,1,1,8,15,2,2,[4,40,"sitebit comhead",28," (",0,"a",38,"href","#",31,3,3,8,28,")",8],0,8,8,0,"tr",0,"td",38,"colSpan",2,8,0,"td",40,"subtext",4,40,"score",31,4,4,8,28," by ",0,"a",38,"href","#",40,"hnuser",31,5,5,8,28," ",4,40,"age",0,"a",38,"href","#",31,6,6,8,8,28," | ",0,"a",38,"href","#",
29,"hide",8,28," | ",0,"a",38,"href","#",31,7,7,8,8,8,0,"tr",21,44,"height","5px",22,40,"spacer",8,17]]}function ha(a){return[a,function(a,b){return[[++b,a]]}]}function Ea(a,c){var b=[];if(0!==c)for(var e=0,g=c.length;e<g;e++)b.push(a[c[e]]);return b}function sb(a,c,b){var e=b.target||b.srcElement||window;e.correspondingUseElement&&(e=e.correspondingUseElement);var g=[];for(e=3===e.nodeType?e.parentNode:e;null!==e;)H.has(e)&&g.push(e),e=e.parentNode;e=g.length;if(0<e&&c&2){for(c=e;0<c--;){var h=a+
"-captured",m=b;h=H.get(g[c]).get(h);void 0!==h&&h(m)}for(c=0;c<e;c++)h=a,m=b,h=H.get(g[c]).get(h),void 0!==h&&h(m)}}function I(a,c){if(y(c))for(var b=0,e=c.length;b<e;b++)I(a,c[b]);else a.removeChild(c)}function J(a,c){if(y(a))a.push(c);else if(y(c))for(var b=0,e=c.length;b<e;b++)J(a,c[b]);else a.appendChild(c)}function Fa(a,c){if(null===c)return a();switch(c.length){case 0:return a();case 1:return a(c[0]);case 2:return a(c[0],c[1]);case 3:return a(c[0],c[1],c[2]);case 4:return a(c[0],c[1],c[2],
c[3]);case 7:return a(c[0],c[1],c[2],c[3],c[4],c[5],c[6]);default:return a.apply(null,c)}}function w(a,c,b){var e=c.currentHostNode;null===b.hostNode&&(b.hostNode=a,b=b.parent,null!==b&&null===b.hostNode&&(b.hostNode=a));null!==e&&(e=c.currentHostNodeStackIndex++,c.currentHostNodeStack[e]=c.currentHostNode);c.currentHostNode=a}function Ga(a){return null===a||void 0===a||""===a||"boolean"===typeof a}function Ha(a){for(var c="",b=a.length,e=0;e<b;++e){var g=a[e];null!==g&&void 0!==g&&"boolean"!==typeof g&&
(c+=g)}return c}function K(a,c,b){if(null!==a&&void 0!==a&&"boolean"!==typeof a&&"string"!==typeof a&&"number"!==typeof a){if(null!==a&&void 0!==a.t&&void 0!==a.v)return r(a.t,a.v,c,b);if(y(a)){for(var e=[],g=0,h=a.length;g<h;++g){var m=K(a[g],c,b);void 0!==m&&e.push(m)}return e}}}function r(a,c,b,e){var g=a.length,h=z.get(a),m=B.get(a),f=void 0===h,k=null===e?null:e.values;!0===f&&(h=[],m=[],z.set(a,h),B.set(a,m));for(var d=0;d<g;){switch(a[d]){case 25:var l=a[++d],p=a[++d],n=ia.get(l);void 0===
n?(n=l(),ia.set(l,n)):n=ia.get(l);var t=null;y(p)?t=p:null!==p&&(t=c[p]);b.props=t;var q=r(n,c,b,e);!0===f&&h.push(n,p);break;case 40:var u=a[++d];b.currentHostNode.className=u;break;case 41:var v=a[++d],x=a[++d],F=c[x];if(v&1)throw Error("TODO DYNAMIC_PROP_CLASS_NAME");b.currentHostNode.className=F;!0===f&&h.push(41,v,x);break;case 38:var A=a[++d],G=a[++d],I=b.currentHostNode;"id"===A?I.id=G:I.setAttribute(A,G);break;case 39:var ja=a[++d],ka=a[++d],la=void 0;ka&2&&(la=a[++d]);var ea=a[++d],R=c[ea];
if(ka&1)throw Error("TODO DYNAMIC_PROP");if(void 0!==la){var P=ja,Q=la,ma=Ia.get(document);void 0===ma&&(ma=new Map,Ia.set(document,ma));document.addEventListener(P,sb.bind(null,P,Q),Q&1);var Ja=b.currentHostNode,Ka=ja,fa=R,ha=ka&4,S=H.get(Ja);void 0===S&&(S=new Map,H.set(Ja,S));S.set(ha?Ka+"-captured":Ka,fa)}else null!==R&&void 0!==R&&b.currentHostNode.setAttribute(ja,R);break;case 42:var na=a[++d];"string"===typeof na?b.currentHostNode.value=na:b.currentHostNode.setAttribute("value",na);break;case 28:var Ca=
a[++d],Da=document.createTextNode(Ca);J(b.currentHostNode,Da);break;case 29:var tb=a[++d];b.currentHostNode.textContent=tb;break;case 30:var La=a[++d],Ma=a[++d],C=c[La],L=void 0;"string"!==typeof C&&"number"!==typeof C&&(Ga(C)?L=document.createTextNode(""):y(C)&&(C=Ha(C)));void 0===L&&(L=document.createTextNode(C));var ub=b.currentHostNode;k[Ma]=L;J(ub,L);!0===f&&h.push(31,La,Ma);break;case 31:var Na=a[++d],Oa=a[++d],Pa=b.currentHostNode,D=c[Na],T=void 0;"string"!==typeof D&&"number"!==typeof D&&
(Ga(D)?T=document.createTextNode(""):y(D)&&(D=Ha(D)));void 0===T&&(Pa.textContent=D,T=Pa.firstChild);k[Oa]=T;!0===f&&h.push(31,Na,Oa);break;case 35:var vb=a[++d],wb=a[++d],xb=q=K(c[vb],b,e);k[wb]=xb;break;case 36:var yb=a[++d],zb=a[++d],Ab=c[yb];b.lastChildWasTextNode=!1;var Bb=q=K(Ab,b,e);k[zb]=Bb;break;case 2:var Cb=document.createElement("div");w(Cb,b,e);break;case 4:var Db=document.createElement("span");w(Db,b,e);break;case 0:var Eb=a[++d],Fb=document.createElement(Eb);w(Fb,b,e);break;case 3:var Qa=
document.createElement("div"),Ra=a[++d];w(Qa,b,e);k[Ra]=Qa;!0===f&&h.push(3,Ra);break;case 5:var Sa=document.createElement("span"),Ta=a[++d];w(Sa,b,e);k[Ta]=Sa;!0===f&&h.push(5,Ta);break;case 1:var Gb=a[++d],Ua=a[++d],Va=document.createElement(Gb);w(Va,b,e);k[Ua]=Va;!0===f&&h.push(1,Ua);break;case 17:case 9:case 8:var U=b.currentHostNodeStackIndex,oa=b.currentHostNode;if(0===U)b.currentHostNode=null;else{U=--b.currentHostNodeStackIndex;var Wa=b.currentHostNodeStack[U];b.currentHostNodeStack[U]=null;
J(Wa,oa);b.currentHostNode=oa=Wa}q=oa;break;case 6:var Hb=a[++d],Ib=document.createElement(Hb);w(Ib,b,e);break;case 7:var Jb=a[++d],Xa=a[++d],Ya=document.createElement(Jb);w(Ya,b,e);k[Xa]=Ya;!0===f&&h.push(7,Xa);break;case 16:w([],b,e);break;case 33:var Kb=a[++d],Lb=a[++d],Mb=a[++d],Za=c[Lb],$a=void 0;$a=null!==Za?r(Kb,Za,b,e):document.createTextNode("");k[Mb]=$a;break;case 44:var Nb=a[++d],M=a[++d];if(null==M||void 0===M)break;"number"===typeof M&&(M+="px");b.currentHostNode.style.setProperty(Nb,
M);break;case 45:var Ob=a[++d],Pb=a[++d],N=c[Pb];if(null==N||void 0===N)break;"number"===typeof N&&(N+="px");b.currentHostNode.style.setProperty(Ob,N);break;case 46:var Qb=a[++d],pa=a[++d];if(null==pa||void 0===pa)break;b.currentHostNode.style.setProperty(Qb,pa);break;case 15:var ab=a[++d],bb=a[++d],Rb=c[bb],qa=a[++d],ra=a[++d],sa=void 0;!0===f&&h.push(15,ab,bb,qa,ra);Rb?0!==qa&&(sa=r(qa,c,b,e)):0!==ra&&(sa=r(ra,c,b,e));q=k[ab]=sa;break;case 14:var O=a[++d],cb=a[++d],db=a[++d],eb=d,Sb=O-1;if(!0===
f){var fb,gb=eb+1,Tb=gb+2*(O-1)+1;(fb=h).push.apply(fb,[14,O,cb,db].concat(a.slice(gb,Tb)))}for(var ta=void 0,V=0;V<O;V++)if(V===Sb){var hb=a[++d];null!==hb&&(ta=r(hb,c,b,e))}else{var Ub=a[++d];if(!0===c[Ub]){var ib=a[++d];null!==ib&&(ta=r(ib,c,b,e));break}++d}k[db]=V-1;q=k[cb]=ta;d=eb+2*(O-1)+1;break;case 23:var Vb=a[++d],Wb=a[++d];q=r(Vb,c[Wb],b,e);break;case 24:var Xb=a[++d];q=K(c[Xb],b,e);break;case 34:for(var Yb=a[++d],Zb=a[++d],jb=a[++d],ua=c[Yb],kb=0===jb?null:c[jb],$b=ua.length,W=0;W<$b;++W){var ac=
ua[W],lb=c;null!==kb&&(lb=kb(ac,W,ua));r(Zb,lb,b,e)}break;case 13:var mb=a[++d],nb=a[++d],ob=c,va=void 0,wa=void 0,E=void 0;if(void 0===va){E=a[++d];for(var bc=E.length,cc=ob[0],X=0;X<bc;){if(E[X]===cc){wa=E[++X];va=r(wa,ob,b,e);break}X+=2}}!0===f&&(h.push(13,mb,nb),void 0===E&&(E=a[++d]),h.push(E));k[nb]=wa;q=k[mb]=va;break;case 10:var xa=a[++d],Y=void 0,Z=void 0;null===e?(Y=a[++d],Z=Ea(b.rootPropsObject,Y)):Z=b.props;var pb=a[++d],qb=[null],aa={alternate:null,child:null,hostNode:null,key:null,memoizedProps:Z,
memoizedState:null,sibling:null,parent:null,values:qb},ba=c;0!==pb&&(ba=!0===xa?void 0:Fa(pb,Z),qb[0]=ba);var ya=a[++d];!0===f&&(h.push(10,xa,ya),void 0!==Y&&h.push(Y),m.push(10,xa,ya));if(null===e)b.fiber=aa;else{var za=e,rb=aa;rb.parent=za;null===za.child&&(za.child=rb)}var ca=void 0;null!==ba?ca=r(ya,ba,b,aa):(ca=document.createTextNode(""),aa.hostNode=ca);return ca;case 12:var dc=a[++d],da=c[dc];return null!==da&&void 0!==da.t&&void 0!==da.v?K(da,b,e):null;case 11:var Aa=a[++d],Ba=void 0;if(null===
Aa)Ba=document.createTextNode("");else if("string"===typeof Aa)Ba=document.createTextNode(Aa);else throw Error("TODO");return Ba;case 21:case 22:break;default:d+=3;continue}++d}return q}function F(a,c,b,e,g){for(var h=a.length,m=null===g?null:g.values,f=0;f<h;){switch(a[f]){case 25:var k=a[++f];k=z.get(k);var d=a[++f],l=null;"number"===typeof d?l=b[d]:y(d)&&(l=d);e.propsArray=l;F(k,c,b,e,g);break;case 30:case 31:k=a[++f];l=a[++f];d=b[k];l=m[l];c[k]!==d&&(l.nodeValue=d);break;case 41:k=a[++f];d=a[++f];
l=b[d];if(c[d]!==l){if(k&1)throw Error("TODO DYNAMIC_PROP_CLASS_NAME");e.currentHostNode.className=l}break;case 1:case 7:case 3:case 5:k=a[++f];e.currentHostNode=m[k];break;case 15:k=a[++f];d=a[++f];var p=c[d],n=b[d];d=a[++f];l=a[++f];var t=p===n;p=void 0;n?null===d||t||(null!==l&&(l=B.get(l),x(l,e,g,!0)),p=r(d,b,e,g)):null===l||t||(null!==d&&(d=B.get(d),x(d,e,g,!0)),p=r(l,b,e,g));void 0!==p&&(d=m[k],d.parentNode.replaceChild(p,d),m[k]=p);break;case 14:d=a[++f];k=a[++f];n=a[++f];l=f;p=d-1;t=m[n];
var q=!1;n=void 0;for(var u=0;u<d;++u)if(u===p){var v=a[++f];t!==u&&(q=!0);null!==v&&(!0===q?n=r(v,b,e,g):(v=z.get(v),F(v,c,b,e,g)))}else{v=a[++f];if(!0===b[v]){f=a[++f];t!==u&&(q=!0);null!==f&&(!0===q?n=r(f,b,e,g):(f=z.get(f),F(f,c,b,e,g)));break}++f}!0===q&&(f=B.get(a[t===p?l+1+2*t:l+2+2*t]),x(f,e,g,!0));f=l+2*(d-1)+1;void 0!==n&&(d=m[k],d.parentNode.replaceChild(n,d),m[k]=n);break;case 13:h=a[++f];k=a[++f];p=a[++f];d=c;l=b;b=void 0;n=!1;c=void 0;0!==p&&(t=a[++f],l=Fa(p,e.currentComponent.props),
d=m[t],m[t]=l,null===l&&null!==d&&(n=!0,c=null,b=document.createTextNode("")));if(void 0===b)for(a=a[++f],f=a.length,p=null===d?null:d[0],t=l[0],q=0;q<f;){u=a[q];if(u===t){u!==p&&(n=!0);c=a[++q];n?b=r(c,l,e,g):(a=z.get(c),F(a,d,l,e,g));break}q+=2}!0===n&&(a=m[k],null!==a&&(a=B.get(a),x(a,e,g,!0)),m[k]=c);void 0!==b&&(e=m[h],e.parentNode.replaceChild(b,e),m[h]=b);return b;case 10:++f;m=a[++f];z.get(m);b=e.currentComponent;c=void 0;m=b;null===g&&(c=e.fiber);g=c.values[0];null===b?(a=a[++f],a=Ea(e.rootPropsObject,
a)):a=e.propsArray;g.props=a;e.currentComponent=g;e.currentComponent=m;return;default:++f}++f}}function x(a,c,b,e){for(var g=a.length,h=0;h<g;){switch(a[h]){case 10:++h;g=void 0;var m=c.currentComponent;null===b&&(g=c.fiber);b=g.values[0];a=a[++h];c.currentComponent=b;x(a,c,g,e);c.currentComponent=m;return;default:++h}++h}}function ea(a,c){var b=B.get(c.mountOpcodes);x(b,c,null,!0);I(a,c.fiber.hostNode);c.fiber=null}var P=Symbol.for("react.element"),y=Array.isArray,G=[],Q=new Map,z=new Map,B=new Map,
ia=new Map,Ia=new WeakMap,H=new WeakMap,Ca=document.getElementById("root"),Da=performance.now();(function(a,c){var b=Q.get(c);if(null===a||void 0===a)void 0!==b&&ea(c,b);else if(a.$$typeof===P){var e=a.type,g=!1;void 0===b?(b={currentHostNode:null,currentHostNodeStack:[],currentHostNodeStackIndex:0,fiber:null,mountOpcodes:e,propsArray:null,rootPropsObject:null},Q.set(c,b)):null!==b.fiber&&(b.mountOpcodes===e?g=!0:ea(c,b));b.mountOpcodes=e;b.rootPropsObject=a.props;!0===g?(c=z.get(e),F(c,G,G,b,null)):
(b=r(e,G,b,null),J(c,b))}else throw Error("render() expects a ReactElement as the first argument");})(function(a,c){return{$$typeof:P,key:null,props:c,ref:null,type:a}}([10,0,["stories"],function(a){return[[a]]},[0,"center",0,"table",38,"id","hnmain",38,"border",0,38,"cellPadding",0,38,"cellSpacing",0,38,"width","85%",21,44,"background-color","#f6f6ef",22,0,"tbody",25,function(){return[10,0,0,[0,"tr",21,44,"background-color","#222",22,0,"table",21,44,"padding","4px",22,38,"width","100%",38,"cellSpacing",
0,38,"cellPadding",0,0,"tbody",0,"tr",0,"td",21,44,"width","18px",44,"padding-right","4px",22,0,"a",38,"href","#",6,"img",38,"src","logo.png",38,"width",16,38,"height",16,21,44,"border","1px solid #00d8ff",22,9,8,8,0,"td",21,46,"line-height","12pt",22,38,"height",10,4,40,"pagetop",0,"b",40,"hnname",29,"React HN Benchmark",8,0,"a",38,"href","#",29,"new",8,28," | ",0,"a",38,"href","#",29,"comments",8,28," | ",0,"a",38,"href","#",29,"show",8,28," | ",0,"a",38,"href","#",29,"ask",8,28," | ",0,"a",38,
"href","#",29,"jobs",8,28," | ",0,"a",38,"href","#",29,"submit",8,8,8,8,8,8,8]]},null,0,"tr",38,"height",10,8,25,function(){return[10,0,ha,[0,"tr",0,"td",0,"table",38,"cellPadding",0,38,"cellSpacing",0,38,"classList","itemlist",1,"tbody",0,34,0,[25,fa,0],1,8,8,8,8]]},0,8,8,8]],{stories:[{by:"rendx",descendants:49,id:14201562,kids:[14201704,14202297,14202233,14201771,14201765,14201897,14201750,14201913,14201854,14201667,14201759,14202073],score:186,time:1493197629,title:"Postal: Open source mail delivery platform, alternative to Mailgun or Sendgrid",
type:"story",url:"https://github.com/atech/postal"},{by:"rabyss",descendants:4,id:14202124,kids:[14202293,14202249],score:16,time:1493205989,title:"Show HN: BreakLock \u2013 A hybrid of Mastermind and the Android pattern lock",type:"story",url:"https://maxwellito.github.io/breaklock/"},{by:"morid1n",descendants:137,id:14200563,kids:[14201274,14200711,14201147,14201365,14201499,14200618,14201169,14200911,14200734,14201083,14200706,14200785,14201032],score:178,time:1493183234,title:"My Hackintosh Hardware Spec \u2013 clean, based on a 2013 iMac",
type:"story",url:"https://infinitediaries.net/my-exact-hackintosh-spec/"},{by:"robertwiblin",descendants:203,id:14196731,kids:[14201298,14201838,14201381,14197574,14201398,14199764,14198491,14197E3,14198224,14200614,14201983,14200697,14199252,14201214,14198923,14200224,14197509,14200859,14200064,14200114,14197256,14197220,14200653,14197186,14199258,14197155,14197344,14198361,14197969,14199813,14197259,14197503],score:562,time:1493145853,title:"Evidence-based advice we've found on how to be successful in a job",
type:"story",url:"https://80000hours.org/career-guide/how-to-be-successful/"},{by:"ryan_j_naughton",descendants:565,id:14196812,kids:[14198306,14197339,14200899,14198165,14198750,14202199,14201432,14197619,14197471,14201113,14202214,14202043,14197313,14197751,14197332,14198050,14201616,14197404,14199730,14198007,14197358,14197283,14200959,14197891,14198203,14197312,14200796,14201528,14197249,14198271,14197989,14198842,14197205,14199148,14197458,14200457,14197330,14199993,14197855,14200102,14197378,
14199315,14198240,14198397,14199326,14200159,14198798,14201296,14198173,14197323,14197383,14197459,14197275,14198305,14198005,14198015,14199380,14199079,14198413,14197334,14197327,14197234],score:385,time:1493146342,title:"Is Every Speed Limit Too Low?",type:"story",url:"https://priceonomics.com/is-every-speed-limit-too-low/"},{by:"monort",descendants:63,id:14196322,kids:[14197628,14200026,14197457,14197486,14202126,14201266,14197227,14199404,14199338,14196382,14200598,14197377,14199689,14198538,
14196905,14200404,14198781,14197278,14197888,14197742,14197764],score:316,time:1493143464,title:"Experimental Nighttime Photography with Nexus and Pixel",type:"story",url:"https://research.googleblog.com/2017/04/experimental-nighttime-photography-with.html"},{by:"networked",descendants:9,id:14199028,kids:[14201588,14200361,14200314,14200338],score:121,time:1493161601,title:"JPEG Huffman Coding Tutorial",type:"story",url:"http://www.impulseadventure.com/photo/jpeg-huffman-coding.html"},{by:"jasontan",
id:14202227,score:1,time:1493207865,title:"Are you adept at understanding concurrency problems? Sift Science is hiring",type:"job",url:"https://boards.greenhouse.io/siftscience/jobs/550699#.WPUZhlMrLfY"},{by:"pouwerkerk",descendants:80,id:14196077,kids:[14199434,14196279,14196604,14197440,14201734,14200922,14200452,14197115,14199837,14199894,14196596,14198243,14196565,14197400,14197049,14197686,14198545,14198475],score:717,time:1493142008,title:"Painting with Code: Introducing our new open source library React Sketch.app",
type:"story",url:"http://airbnb.design/painting-with-code/"},{by:"mromnia",descendants:16,id:14201670,kids:[14201835,14202115,14202176,14201890,14202325,14201859,14202158,14201763,14201902],score:62,time:1493198949,title:"How to mod a Porsche 911 to run Doom [video]",type:"story",url:"https://www.youtube.com/watch?v=NRMpNA86e8Q"},{by:"rbanffy",descendants:16,id:14192383,kids:[14197494,14201805,14197484],score:194,time:1493118160,title:"Go programming language secure coding practices guide",type:"story",
url:"https://github.com/Checkmarx/Go-SCP"},{by:"intous",descendants:0,id:14200446,score:39,time:1493181245,title:"Building Functional Chatbot for Messenger with Ruby on Rails",type:"story",url:"https://tutorials.botsfloor.com/chatbot-development-tutorial-how-to-build-a-fully-functional-weather-bot-on-facebook-messenger-c94ac7c59185"},{by:"nanospeck",descendants:23,id:14201207,kids:[14202252,14201646,14201620,14202076,14201511,14201324,14201940,14201425,14201505,14201304,14201435,14201287,14201739,
14202031,14202018],score:57,text:"This question was asked on both 2015 &amp; 2016 in HN. I would like to ask it again today to know what are the newest options for this.<p>Q: What would you recommend as a reasonably priced (sub 150$) quad-copter&#x2F;drone, that has a camera, the ability to be programmed (so that I can process video&#x2F;write my own stability algorithms for it), good range, and reasonable flying time?\nIn the event nothing fits that price point, any pointers on what the state of the art is?<p>Thanks!",
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
kids:[14199443,14201987,14199461,14199729,14201519,14198762,14199524],score:52,time:1493157378,title:"How the Internet Gave Mail-Order Brides the Power",type:"story",url:"https://backchannel.com/how-the-internet-gave-mail-order-brides-the-power-1af8c8a40562"}]}),Ca);alert(performance.now()-Da)});
