(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function Component_ComputeFunction(cond, val) {
    return [cond];
  }

  var Component = // Component OPCODES
  [0, 0, 0 // COMPONENT
  , ["cond", "val"] // ROOT_PROPS_SHAPE
  , [0, 0, 20 // UNCONDITIONAL_TEMPLATE
  , [0, 0, 8 // OPEN_ELEMENT_DIV
  , 0 // VALUE_POINTER_INDEX
  , 30 // CONDITIONAL
  , 0, [0, 0, 9 // OPEN_ELEMENT_SPAN
  , 1 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "123", 10 // CLOSE_ELEMENT
  ] // CONDITIONAL_CONSEQUENT
  , [0, 0, 9 // OPEN_ELEMENT_SPAN
  , 2 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "456", 10 // CLOSE_ELEMENT
  ] // CONDITIONAL_ALTERNATE
  , 10 // CLOSE_ELEMENT
  ], 0 // VALUE_POINTER_INDEX
  , Component_ComputeFunction // COMPUTE_FUNCTION
  ]];

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  var n = "function" === typeof Symbol && Symbol.for,
      p = n ? Symbol.for("react.element") : 60103,
      q = n ? Symbol.for("react.portal") : 60106,
      r = n ? Symbol.for("react.fragment") : 60107,
      t = n ? Symbol.for("react.strict_mode") : 60108,
      u = n ? Symbol.for("react.profiler") : 60114,
      v = n ? Symbol.for("react.provider") : 60109,
      w = n ? Symbol.for("react.context") : 60110,
      x = n ? Symbol.for("react.concurrent_mode") : 60111,
      y = n ? Symbol.for("react.forward_ref") : 60112,
      z = n ? Symbol.for("react.suspense") : 60113,
      A = n ? Symbol.for("react.memo") : 60115,
      B = n ? Symbol.for("react.lazy") : 60116,
      C = "function" === typeof Symbol && Symbol.iterator;

  function aa(a, b, e, c, d, g, h, f) {
    if (!a) {
      a = void 0;
      if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
        var l = [e, c, d, g, h, f],
            m = 0;
        a = Error(b.replace(/%s/g, function () {
          return l[m++];
        }));
        a.name = "Invariant Violation";
      }
      a.framesToPop = 1;
      throw a;
    }
  }

  function D(a) {
    for (var b = arguments.length - 1, e = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) {
      e += "&args[]=" + encodeURIComponent(arguments[c + 1]);
    }

    aa(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
  }

  var E = {
    isMounted: function isMounted() {
      return !1;
    },
    enqueueForceUpdate: function enqueueForceUpdate() {},
    enqueueReplaceState: function enqueueReplaceState() {},
    enqueueSetState: function enqueueSetState() {}
  },
      F = {};

  function G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = F;
    this.updater = e || E;
  }

  G.prototype.isReactComponent = {};

  G.prototype.setState = function (a, b) {
    "object" !== typeof a && "function" !== typeof a && null != a ? D("85") : void 0;
    this.updater.enqueueSetState(this, a, b, "setState");
  };

  G.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };

  function H() {}

  H.prototype = G.prototype;

  function I(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = F;
    this.updater = e || E;
  }

  var J = I.prototype = new H();
  J.constructor = I;
  objectAssign(J, G.prototype);
  J.isPureReactComponent = !0;
  var K = {
    current: null,
    currentDispatcher: null
  },
      L = Object.prototype.hasOwnProperty,
      M = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

  function N(a, b, e) {
    var c = void 0,
        d = {},
        g = null,
        h = null;
    if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
      L.call(b, c) && !M.hasOwnProperty(c) && (d[c] = b[c]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;else if (1 < f) {
      for (var l = Array(f), m = 0; m < f; m++) {
        l[m] = arguments[m + 2];
      }

      d.children = l;
    }
    if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
      void 0 === d[c] && (d[c] = f[c]);
    }
    return {
      $$typeof: p,
      type: a,
      key: g,
      ref: h,
      props: d,
      _owner: K.current
    };
  }

  function ba(a, b) {
    return {
      $$typeof: p,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner
    };
  }

  function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === p;
  }

  function escape$1(a) {
    var b = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + ("" + a).replace(/[=:]/g, function (a) {
      return b[a];
    });
  }

  var P = /\/+/g,
      Q = [];

  function R(a, b, e, c) {
    if (Q.length) {
      var d = Q.pop();
      d.result = a;
      d.keyPrefix = b;
      d.func = e;
      d.context = c;
      d.count = 0;
      return d;
    }

    return {
      result: a,
      keyPrefix: b,
      func: e,
      context: c,
      count: 0
    };
  }

  function S(a) {
    a.result = null;
    a.keyPrefix = null;
    a.func = null;
    a.context = null;
    a.count = 0;
    10 > Q.length && Q.push(a);
  }

  function T(a, b, e, c) {
    var d = typeof a;
    if ("undefined" === d || "boolean" === d) a = null;
    var g = !1;
    if (null === a) g = !0;else switch (d) {
      case "string":
      case "number":
        g = !0;
        break;

      case "object":
        switch (a.$$typeof) {
          case p:
          case q:
            g = !0;
        }

    }
    if (g) return e(c, a, "" === b ? "." + U(a, 0) : b), 1;
    g = 0;
    b = "" === b ? "." : b + ":";
    if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
      d = a[h];
      var f = b + U(d, h);
      g += T(d, f, e, c);
    } else if (null === a || "object" !== typeof a ? f = null : (f = C && a[C] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) {
      d = d.value, f = b + U(d, h++), g += T(d, f, e, c);
    } else "object" === d && (e = "" + a, D("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
    return g;
  }

  function V(a, b, e) {
    return null == a ? 0 : T(a, "", b, e);
  }

  function U(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
  }

  function ca(a, b) {
    a.func.call(a.context, b, a.count++);
  }

  function da(a, b, e) {
    var c = a.result,
        d = a.keyPrefix;
    a = a.func.call(a.context, b, a.count++);
    Array.isArray(a) ? W(a, c, e, function (a) {
      return a;
    }) : null != a && (O(a) && (a = ba(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + e)), c.push(a));
  }

  function W(a, b, e, c, d) {
    var g = "";
    null != e && (g = ("" + e).replace(P, "$&/") + "/");
    b = R(b, g, c, d);
    V(a, da, b);
    S(b);
  }

  var X = {
    Children: {
      map: function map(a, b, e) {
        if (null == a) return a;
        var c = [];
        W(a, c, null, b, e);
        return c;
      },
      forEach: function forEach(a, b, e) {
        if (null == a) return a;
        b = R(null, null, b, e);
        V(a, ca, b);
        S(b);
      },
      count: function count(a) {
        return V(a, function () {
          return null;
        }, null);
      },
      toArray: function toArray(a) {
        var b = [];
        W(a, b, null, function (a) {
          return a;
        });
        return b;
      },
      only: function only(a) {
        O(a) ? void 0 : D("143");
        return a;
      }
    },
    createRef: function createRef() {
      return {
        current: null
      };
    },
    Component: G,
    PureComponent: I,
    createContext: function createContext(a, b) {
      void 0 === b && (b = null);
      a = {
        $$typeof: w,
        _calculateChangedBits: b,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      a.Provider = {
        $$typeof: v,
        _context: a
      };
      return a.Consumer = a;
    },
    forwardRef: function forwardRef(a) {
      return {
        $$typeof: y,
        render: a
      };
    },
    lazy: function lazy(a) {
      return {
        $$typeof: B,
        _ctor: a,
        _status: -1,
        _result: null
      };
    },
    memo: function memo(a, b) {
      return {
        $$typeof: A,
        type: a,
        compare: void 0 === b ? null : b
      };
    },
    Fragment: r,
    StrictMode: t,
    Suspense: z,
    createElement: N,
    cloneElement: function cloneElement(a, b, e) {
      null === a || void 0 === a ? D("267", a) : void 0;
      var c = void 0,
          d = objectAssign({}, a.props),
          g = a.key,
          h = a.ref,
          f = a._owner;

      if (null != b) {
        void 0 !== b.ref && (h = b.ref, f = K.current);
        void 0 !== b.key && (g = "" + b.key);
        var l = void 0;
        a.type && a.type.defaultProps && (l = a.type.defaultProps);

        for (c in b) {
          L.call(b, c) && !M.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
        }
      }

      c = arguments.length - 2;
      if (1 === c) d.children = e;else if (1 < c) {
        l = Array(c);

        for (var m = 0; m < c; m++) {
          l[m] = arguments[m + 2];
        }

        d.children = l;
      }
      return {
        $$typeof: p,
        type: a.type,
        key: g,
        ref: h,
        props: d,
        _owner: f
      };
    },
    createFactory: function createFactory(a) {
      var b = N.bind(null, a);
      b.type = a;
      return b;
    },
    isValidElement: O,
    version: "16.7.0",
    unstable_ConcurrentMode: x,
    unstable_Profiler: u,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentOwner: K,
      assign: objectAssign
    }
  },
      Y = {
    default: X
  },
      Z = Y && X || Y;
  var react_production_min = Z.default || Z;

  var react = createCommonjsModule(function (module) {

  {
    module.exports = react_production_min;
  }
  });

  var ROOT_ATTRIBUTE_NAME = "data-reactroot";
  var uppercasePattern = /([A-Z])/g;
  var msPattern = /^ms-/;
  var reactElementSymbol = Symbol.for("react.element");
  var isArray = Array.isArray;
  var emptyArray = [];
  var rxUnescaped = new RegExp(/["'&<>]/);

  function escapeText(text) {
    if (typeof text === "string") {
      /* Much faster when there is no unescaped characters */
      if (!rxUnescaped.test(text)) {
        return text;
      }

      var result = text;
      var start = 0;
      var i = 0;

      for (; i < text.length; ++i) {
        switch (text.charCodeAt(i)) {
          case 34:
            // "
            escape = "&quot;";
            break;

          case 39:
            // '
            escape = "&#x27;";
            break;

          case 38:
            // &
            escape = "&amp;";
            break;

          case 60:
            // <
            escape = "&lt;";
            break;

          case 62:
            // >
            escape = "&gt;";
            break;

          default:
            continue;
        }

        if (i > start) {
          escape = text.slice(start, i) + escape;
        }

        result = start > 0 ? result + escape : escape;
        start = i + 1;
      }

      if (i !== start) {
        return result + text.slice(start, i);
      }

      return result;
    }

    return text.toString();
  } // TODO: enable again

  function createMarkupForRoot() {
    return ROOT_ATTRIBUTE_NAME + '=""';
  }

  function hyphenateStyleName(name) {
    return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
  }

  function createElementForTesting(type, props) {
    return {
      $$typeof: reactElementSymbol,
      key: null,
      props: props,
      ref: null,
      type: type
    };
  }

  function getCurrentContextValue(context, state) {
    var contextValueStack = state.contextValueStack.get(context);

    if (contextValueStack === undefined) {
      return context._currentValue;
    } else {
      return contextValueStack[contextValueStack.length - 1];
    }
  }

  function pushCurrentContextValue(context, value, state) {
    var contextValueStack = state.contextValueStack.get(context);

    if (contextValueStack === undefined) {
      state.contextValueStack.set(context, [value]);
    } else {
      contextValueStack.push(value);
    }
  }

  function popCurrentContextValue(context, state) {
    var contextValueStack = state.contextValueStack.get(context);

    if (contextValueStack !== undefined) {
      contextValueStack.pop();

      if (contextValueStack.length === 0) {
        state.contextValueStack.set(context, undefined);
      }
    }
  }

  function convertRootPropsToPropsArray(rootProps, rootPropsShape) {
    var props = [];

    if (rootPropsShape !== null) {
      for (var i = 0, length = rootPropsShape.length; i < length; i++) {
        var propShape = rootPropsShape[i];
        props.push(rootProps[propShape]);
      }
    }

    return props;
  }

  function createRootComponent(rootProps, rootPropsShape, usesHooks) {
    return createComponent(convertRootPropsToPropsArray(rootProps, rootPropsShape), usesHooks);
  }

  function createComponent(props, usesHooks) {
    return {
      props: props,
      usesHooks: usesHooks
    };
  }

  function createState(props) {
    return {
      componentOpcodeCache: new Map(),
      computeFunctionUsesHooks: false,
      contextValueStack: new Map(),
      currentComponent: null,
      currentElementTag: "",
      currentElementTagIsOpen: false,
      currentValue: undefined,
      elementCloseRenderString: "",
      elementTagStack: [],
      elementTagStackIndex: 0,
      hasMarkedRootElement: false,
      lastChildWasStyle: false,
      lastChildWasTextNode: false,
      propsArray: emptyArray,
      renderString: "",
      rootPropsObject: props,
      styleRenderString: ""
    };
  }

  function cloneState(state) {
    var clonedState = createState(null);
    clonedState.componentOpcodeCache = state.componentOpcodeCache;
    clonedState.computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    clonedState.contextValueStack = state.contextValueStack;
    clonedState.currentComponent = state.currentComponent;
    clonedState.currentElementTag = state.currentElementTag;
    clonedState.currentElementTagIsOpen = state.currentElementTagIsOpen;
    clonedState.currentValue = state.currentValue;
    clonedState.elementCloseRenderString = state.elementCloseRenderString;
    clonedState.elementTagStack = state.elementTagStack;
    clonedState.elementTagStackIndex = state.elementTagStackIndex;
    clonedState.hasMarkedRootElement = state.hasMarkedRootElement;
    clonedState.lastChildWasStyle = state.lastChildWasStyle;
    clonedState.lastChildWasTextNode = state.lastChildWasTextNode;
    clonedState.propsArray = state.propsArray;
    clonedState.renderString = state.renderString;
    return clonedState;
  }

  function applyState(targetState, state) {
    targetState.componentOpcodeCache = state.componentOpcodeCache;
    targetState.computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    targetState.contextValueStack = state.contextValueStack;
    targetState.currentComponent = state.currentComponent;
    targetState.currentElementTag = state.currentElementTag;
    targetState.currentElementTagIsOpen = state.currentElementTagIsOpen;
    targetState.currentValue = state.currentValue;
    targetState.elementCloseRenderString = state.elementCloseRenderString;
    targetState.elementTagStack = state.elementTagStack;
    targetState.elementTagStackIndex = state.elementTagStackIndex;
    targetState.hasMarkedRootElement = state.hasMarkedRootElement;
    targetState.lastChildWasStyle = state.lastChildWasStyle;
    targetState.lastChildWasTextNode = state.lastChildWasTextNode;
    targetState.propsArray = state.propsArray;
    targetState.renderString = state.renderString;
  }

  function isReactNode(node) {
    return node !== null && node.t !== undefined && node.v !== undefined;
  }
  /* eslint-disable-next-line */


  var utils = {
    applyState: applyState,
    cloneState: cloneState,
    convertRootPropsToPropsArray: convertRootPropsToPropsArray,
    createComponent: createComponent,
    createElementForTesting: createElementForTesting,
    createMarkupForRoot: createMarkupForRoot,
    createRootComponent: createRootComponent,
    createState: createState,
    emptyArray: emptyArray,
    escapeText: escapeText,
    getCurrentContextValue: getCurrentContextValue,
    hyphenateStyleName: hyphenateStyleName,
    isArray: isArray,
    isReactNode: isReactNode,
    popCurrentContextValue: popCurrentContextValue,
    pushCurrentContextValue: pushCurrentContextValue,
    reactElementSymbol: reactElementSymbol
  };

  var convertRootPropsToPropsArray$1 = utils.convertRootPropsToPropsArray,
      createComponent$1 = utils.createComponent,
      createRootComponent$1 = utils.createRootComponent,
      emptyArray$1 = utils.emptyArray,
      isArray$1 = utils.isArray,
      reactElementSymbol$1 = utils.reactElementSymbol;

  var rootStates = new Map();
  var COMPONENT = 0;
  var OPEN_ELEMENT = 6;
  var OPEN_VOID_ELEMENT = 7;
  var OPEN_ELEMENT_DIV = 8;
  var OPEN_ELEMENT_SPAN = 9;
  var CLOSE_ELEMENT = 10;
  var UNCONDITIONAL_TEMPLATE = 20;
  var MULTI_CONDITIONAL = 25;
  var CONDITIONAL = 30;
  var ELEMENT_STATIC_CHILD_VALUE = 40;
  var ELEMENT_STATIC_CHILDREN_VALUE = 41;
  var ELEMENT_DYNAMIC_CHILD_VALUE = 42;
  var ELEMENT_DYNAMIC_CHILDREN_VALUE = 43;
  var ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL = 45;
  var STATIC_PROP = 60;
  var DYNAMIC_PROP = 61;
  var STATIC_PROP_CLASS_NAME = 62;
  var DYNAMIC_PROP_CLASS_NAME = 63;
  var PropFlagPartialTemplate = 1;

  function createElement(tagName) {
    return document.createElement(tagName);
  }

  function createTextNode(text) {
    return document.createTextNode(text);
  }

  function removeChild(parent, child) {
    parent.removeChild(child);
  }

  function appendChild(parentElementOrFragment, element) {
    if (isArray$1(parentElementOrFragment)) {
      parentElementOrFragment.push(element);
    } else if (isArray$1(element)) {
      for (var i = 0, length = element.length; i < length; i++) {
        appendChild(parentElementOrFragment, element[i]);
      }
    } else {
      parentElementOrFragment.appendChild(element);
    }
  }

  function callComputeFunctionWithArray(computeFunction, arr) {
    if (arr.length === 0) {
      return computeFunction();
    } else if (arr.length === 1) {
      return computeFunction(arr[0]);
    } else if (arr.length === 2) {
      return computeFunction(arr[0], arr[1]);
    } else if (arr.length === 3) {
      return computeFunction(arr[0], arr[1], arr[2]);
    } else if (arr.length === 4) {
      return computeFunction(arr[0], arr[1], arr[2], arr[3]);
    }

    return computeFunction.apply(null, arr);
  }

  function openElement(elem, elemValuePointer, state, workInProgress) {
    if (workInProgress.hostNode === null) {
      workInProgress.hostNode = elem;
    }

    workInProgress.values[elemValuePointer] = elem;
    var stackIndex = state.currentHostNodeStackIndex++;
    state.currentHostNodeStack[stackIndex] = state.currentHostNode;
    state.currentHostNode = elem;
  }

  function renderMountOpcodes(mountOpcodes, parentMountOpcodes, runtimeValues, state, workInProgress) {
    var opcodesLength = mountOpcodes.length;
    var updateOpcodes = mountOpcodes[0];
    var unmountOpcodes = mountOpcodes[1];
    var shouldCreateOpcodes = updateOpcodes === 0;

    if (shouldCreateOpcodes === true) {
      updateOpcodes = mountOpcodes[0] = [];
      unmountOpcodes = mountOpcodes[1] = [];

      if (parentMountOpcodes !== null) {
        var parentUpdateOpcodes = parentMountOpcodes[0];
        var parentUnmountOpcodes = parentMountOpcodes[1];
        parentUpdateOpcodes.push(updateOpcodes);
        parentUnmountOpcodes.push(unmountOpcodes);
      }
    }

    var index = 2; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = mountOpcodes[index];

      switch (opcode) {
        case STATIC_PROP_CLASS_NAME:
          {
            var staticClassName = mountOpcodes[++index];
            state.currentHostNode.className = staticClassName;
            break;
          }

        case DYNAMIC_PROP_CLASS_NAME:
          {
            var propInformation = mountOpcodes[++index];
            var dynamicClassNamePointer = mountOpcodes[++index];
            var dynamicClassName = runtimeValues[dynamicClassNamePointer];

            if (propInformation & PropFlagPartialTemplate) {
              throw new Error("TODO renderMountDynamicClassNameProp");
            } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
              state.currentHostNode.className = dynamicClassName;
            }

            break;
          }

        case STATIC_PROP:
          {
            var propName = mountOpcodes[++index];
            var staticPropValue = mountOpcodes[++index];
            state.currentHostNode.setAttribute(propName, staticPropValue);
            break;
          }

        case DYNAMIC_PROP:
          {
            var _propName = mountOpcodes[++index];
            var _propInformation = mountOpcodes[++index];
            var dynamicPropValuePointer = mountOpcodes[++index];
            var dynamicPropValue = runtimeValues[dynamicPropValuePointer];

            if (_propInformation & PropFlagPartialTemplate) {
              throw new Error("TODO renderStaticProp");
            } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
              state.currentHostNode.setAttribute(_propName, dynamicPropValue);
            }

            break;
          }

        case ELEMENT_STATIC_CHILD_VALUE:
          {
            var staticTextChild = mountOpcodes[++index];
            var textNode = createTextNode(staticTextChild);
            var currentHostNode = state.currentHostNode;

            if (currentHostNode === null) {
              state.currentHostNode = textNode;
            } else {
              appendChild(currentHostNode, textNode);
            }

            break;
          }

        case ELEMENT_STATIC_CHILDREN_VALUE:
          {
            var staticTextContent = mountOpcodes[++index];
            state.currentHostNode.textContent = staticTextContent;
            break;
          }

        case ELEMENT_DYNAMIC_CHILD_VALUE:
          {
            var dynamicTextChildPointer = mountOpcodes[++index];
            var dynamicTextChild = runtimeValues[dynamicTextChildPointer];

            var _textNode = createTextNode(dynamicTextChild);

            var _currentHostNode = state.currentHostNode;

            if (_currentHostNode === null) {
              state.currentHostNode = _textNode;
            } else {
              appendChild(_currentHostNode, _textNode);
            }

            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_VALUE:
          {
            var dynamicTextContentPointer = mountOpcodes[++index];
            var dynamicTextContent = runtimeValues[dynamicTextContentPointer];
            state.currentHostNode.textContent = dynamicTextContent;
            break;
          }

        case OPEN_ELEMENT_DIV:
          {
            var elem = createElement("div");
            var elemValuePointer = mountOpcodes[++index];

            if (shouldCreateOpcodes === true) {
              unmountOpcodes.push(9, elemValuePointer);
            }

            openElement(elem, elemValuePointer, state, workInProgress);
            break;
          }

        case OPEN_ELEMENT_SPAN:
          {
            var _elem = createElement("span");

            var _elemValuePointer = mountOpcodes[++index];

            if (shouldCreateOpcodes === true) {
              unmountOpcodes.push(9, _elemValuePointer);
            }

            openElement(_elem, _elemValuePointer, state, workInProgress);
            break;
          }

        case OPEN_ELEMENT:
          {
            var elementTag = mountOpcodes[++index];
            var _elemValuePointer2 = mountOpcodes[++index];

            var _elem2 = createElement(elementTag);

            if (shouldCreateOpcodes === true) {
              unmountOpcodes.push(9, _elemValuePointer2);
            }

            openElement(_elem2, _elemValuePointer2, state, workInProgress);
            break;
          }

        case CLOSE_ELEMENT:
          {
            var stackIndex = state.currentHostNodeStackIndex;
            state.currentHostNodeStack[stackIndex] = null;
            stackIndex = --state.currentHostNodeStackIndex;
            var parent = state.currentHostNodeStack[stackIndex];
            appendChild(parent, state.currentHostNode);
            state.currentHostNode = parent;
            break;
          }

        case OPEN_VOID_ELEMENT:
          {
            var _elementTag = mountOpcodes[++index];
            var _elemValuePointer3 = mountOpcodes[++index];

            var _elem3 = createElement(_elementTag);

            if (shouldCreateOpcodes === true) {
              unmountOpcodes.push(9, _elemValuePointer3);
            }

            workInProgress.values[_elemValuePointer3] = _elem3;
            _elem3._parentNode = state.currentHostNode;
            state.currentHostNode = _elem3;
            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL:
          {
            var templateOpcodes = mountOpcodes[++index];
            var computeValuesPointer = mountOpcodes[++index];
            var computeValues = runtimeValues[computeValuesPointer];
            renderMountOpcodes(templateOpcodes, mountOpcodes, computeValues, state, workInProgress);
            break;
          }

        case CONDITIONAL:
          {
            var conditionValuePointer = mountOpcodes[++index];
            var conditionValue = runtimeValues[conditionValuePointer];
            var consequentMountOpcodes = mountOpcodes[++index];
            var alternateMountOpcodes = mountOpcodes[++index];

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(30, conditionValuePointer, consequentMountOpcodes, alternateMountOpcodes);
            }

            if (conditionValue) {
              if (consequentMountOpcodes !== null) {
                renderMountOpcodes(consequentMountOpcodes, mountOpcodes, runtimeValues, state, workInProgress);
              }

              return index;
            }

            if (alternateMountOpcodes !== null) {
              renderMountOpcodes(alternateMountOpcodes, mountOpcodes, runtimeValues, state, workInProgress);
            }

            break;
          }

        case UNCONDITIONAL_TEMPLATE:
          {
            var templateMountOpcodes = mountOpcodes[++index];
            var templateValuesPointerIndex = mountOpcodes[++index];
            var computeFunction = mountOpcodes[++index];

            if (shouldCreateOpcodes) {
              updateOpcodes.push(20, templateMountOpcodes, templateValuesPointerIndex, computeFunction);
            }

            var templateRuntimeValues = runtimeValues;

            if (computeFunction !== null) {
              var computeFunctionUsesHooks = state.computeFunctionUsesHooks;

              templateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);

              if (computeFunctionUsesHooks === true) {
                // finishHooks();
                state.computeFunctionUsesHooks = false;
              }
            }

            workInProgress.values[templateValuesPointerIndex] = templateRuntimeValues;
            renderMountOpcodes(templateMountOpcodes, mountOpcodes, templateRuntimeValues, state, workInProgress);
            return;
          }

        case MULTI_CONDITIONAL:
          {
            var conditionalSize = mountOpcodes[++index];
            var startingIndex = index;
            var conditionalDefaultIndex = conditionalSize - 1;

            for (var conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
              if (conditionalIndex === conditionalDefaultIndex) {
                var defaultCaseOpcodes = mountOpcodes[++index];

                if (defaultCaseOpcodes !== null) {
                  renderMountOpcodes(defaultCaseOpcodes, mountOpcodes, runtimeValues, state, workInProgress);
                }
              } else {
                var caseConditionPointer = mountOpcodes[++index];
                var caseConditionValue = runtimeValues[caseConditionPointer];

                if (caseConditionValue) {
                  var caseOpcodes = mountOpcodes[++index];

                  if (caseOpcodes !== null) {
                    renderMountOpcodes(caseOpcodes, mountOpcodes, runtimeValues, state, workInProgress);
                  }

                  break;
                }

                ++index;
              }
            }

            index = startingIndex + (conditionalSize - 1) * 2 + 1;
            break;
          }

        case COMPONENT:
          {
            var currentComponent = state.currentComponent;
            var rootPropsShape = void 0;
            var previousComponent = currentComponent;

            if (currentComponent === null) {
              rootPropsShape = mountOpcodes[++index];
              currentComponent = state.currentComponent = createRootComponent$1(state.rootPropsObject, rootPropsShape, false);
            } else {
              state.currentComponent = createComponent$1(state.propsArray, false);
            }

            var componentMountOpcodes = mountOpcodes[++index];
            var componentFiber = createOpcodeFiber(null, []);

            if (shouldCreateOpcodes) {
              updateOpcodes.push(0);

              if (rootPropsShape !== undefined) {
                updateOpcodes.push(rootPropsShape);
              }

              unmountOpcodes.push(0);
            }

            componentFiber.values[0] = currentComponent;

            if (workInProgress === null) {
              // Root
              state.fiber = componentFiber;
            } else {
              insertChildFiberIntoParentFiber(workInProgress, componentFiber);
            }

            var previousValue = state.currentValue;
            state.currentValue = undefined;
            renderMountOpcodes(componentMountOpcodes, mountOpcodes, runtimeValues, state, componentFiber);
            state.currentValue = previousValue;
            state.currentComponent = previousComponent;
            return;
          }

        default:
          ++index;
      }

      ++index;
    }
  }

  function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
    var opcodesLength = updateOpcodes.length;
    var index = 0;
    debugger; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = updateOpcodes[index];

      switch (opcode) {
        case CONDITIONAL:
          {
            var conditionValuePointer = updateOpcodes[++index];
            var previousConditionValue = previousRuntimeValues[conditionValuePointer];
            var nextConditionValue = nextRuntimeValues[conditionValuePointer];
            var consequentMountOpcodes = updateOpcodes[++index];
            var alternateMountOpcodes = updateOpcodes[++index];
            var shouldUpdate = previousConditionValue === nextConditionValue;

            if (nextConditionValue) {
              if (consequentMountOpcodes !== null) {
                if (shouldUpdate) ; else {
                  if (alternateMountOpcodes !== null) {
                    var alternateUnmountOpcodes = alternateMountOpcodes[1];
                    renderUnmountOpcodes(alternateUnmountOpcodes, state, workInProgress, false);
                  }

                  renderMountOpcodes(consequentMountOpcodes, nextRuntimeValues, state, workInProgress);
                }
              }

              return index;
            }

            if (alternateMountOpcodes !== null) {
              if (shouldUpdate) ; else {
                // debugger;
                renderMountOpcodes(alternateMountOpcodes, nextRuntimeValues, state, workInProgress);
              }
            }

            break;
          }

        case UNCONDITIONAL_TEMPLATE:
          {
            var templateUpdateOpcodes = updateOpcodes[++index];
            var templateValuesPointerIndex = updateOpcodes[++index];
            var computeFunction = updateOpcodes[++index];
            var previousTemplateRuntimeValues = workInProgress.values[templateValuesPointerIndex];
            var nextTemplateRuntimeValues = nextRuntimeValues;

            if (computeFunction !== null) {
              var computeFunctionUsesHooks = state.computeFunctionUsesHooks;

              nextTemplateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);

              if (computeFunctionUsesHooks === true) {
                // finishHooks();
                state.computeFunctionUsesHooks = false;
              }
            }

            workInProgress.values[templateValuesPointerIndex] = nextRuntimeValues;
            renderUpdateOpcodes(templateUpdateOpcodes, previousTemplateRuntimeValues, nextTemplateRuntimeValues, state, workInProgress);
            return;
          }

        case COMPONENT:
          {
            var currentComponent = state.currentComponent;
            var componentFiber = void 0;
            var previousComponent = currentComponent;

            if (workInProgress === null) {
              componentFiber = state.fiber;
            }

            var component = componentFiber.values[0];
            var nextPropsArray = void 0;

            if (currentComponent === null) {
              var rootPropsShape = updateOpcodes[++index];
              nextPropsArray = convertRootPropsToPropsArray$1(state.rootPropsObject, rootPropsShape);
            } else {
              nextPropsArray = state.propsArray;
            }

            component.props = nextPropsArray;
            var componentUpdateOpcodes = updateOpcodes[++index];
            state.currentComponent = currentComponent = component;
            renderUpdateOpcodes(componentUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, componentFiber);
            state.currentComponent = previousComponent;
            return;
          }

        default:
          ++index;
      }

      ++index;
    }
  }

  function renderUnmountOpcodes(unmountOpcodes, state, workInProgress, skipHostNodeRemoval) {
    var opcodesLength = unmountOpcodes.length;
    var index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = unmountOpcodes[index];

      switch (opcode) {
        case UNCONDITIONAL_TEMPLATE:
          {
            return;
          }

        case COMPONENT:
          {
            var currentComponent = state.currentComponent;
            var componentFiber = void 0;
            var previousComponent = currentComponent;

            if (workInProgress === null) {
              componentFiber = state.fiber;
            }

            var component = componentFiber.values[0];
            var componentUnmountOpcodes = unmountOpcodes[++index];
            state.currentComponent = currentComponent = component;
            renderUnmountOpcodes(componentUnmountOpcodes, state, componentFiber, skipHostNodeRemoval);
            state.currentComponent = previousComponent;
            return;
          }

        default:
          ++index;
      }

      ++index;
    }
  }

  function unmountRoot(rootState) {
    var unmountOpcodes = rootState.unmountOpcodes;
    renderUnmountOpcodes(unmountOpcodes, rootState, null, true);
    removeChild(rootState.currentHostNode, rootState.fiber.hostNode);
    rootState.fiber = null;
  }

  function createState$1(currentHostNode, mountOpcodes) {
    return {
      currentComponent: null,
      currentHostNode: currentHostNode,
      currentHostNodeStack: [],
      currentHostNodeStackIndex: 0,
      fiber: null,
      mountOpcodes: mountOpcodes,
      propsArray: emptyArray$1,
      rootPropsObject: null
    };
  }

  function createOpcodeFiber(hostNode, values) {
    return {
      child: null,
      hostNode: hostNode,
      key: null,
      sibling: null,
      parent: null,
      values: values
    };
  }

  function insertChildFiberIntoParentFiber(parent, child) {
    child.parent = parent;

    if (parent.child === null) {
      parent.child = child;
    }
  }

  function renderNodeToRootContainer(node, DOMContainer) {
    var rootState = rootStates.get(DOMContainer);

    if (node === null || node === undefined) {
      if (rootState !== undefined) {
        unmountRoot(rootState);
      }
    } else if (node.$$typeof === reactElementSymbol$1) {
      var mountOpcodes = node.type;
      var shouldUpdate = false;

      if (rootState === undefined) {
        rootState = createState$1(DOMContainer, mountOpcodes);
        rootStates.set(DOMContainer, rootState);
      } else {
        if (rootState.mountOpcodes === mountOpcodes) {
          shouldUpdate = true;
        } else if (rootState.fiber !== null) {
          unmountRoot(rootState);
        }
      }

      rootState.mountOpcodes = mountOpcodes;
      rootState.rootPropsObject = node.props;

      if (shouldUpdate === true) {
        renderUpdateOpcodes(mountOpcodes[0], emptyArray$1, emptyArray$1, rootState, null);
      } else {
        renderMountOpcodes(mountOpcodes, null, emptyArray$1, rootState, null);
      }
    } else {
      throw new Error("render() expects a ReactElement as the first argument");
    }
  }

  function render(node, DOMContainer) {
    return renderNodeToRootContainer(node, DOMContainer);
  }
  /* eslint-disable-next-line */


  var render_1 = {
    render: render
  };
  var render_2 = render_1.render;

  // DO NOT MODIFY
  var root = document.getElementById("root");
  var props = {
    cond: false,
    val: "foo"
  };

  console.time("Render");
  render_2(react.createElement(Component, props), root);
  render_2(react.createElement(Component, props), root);
  console.timeEnd("Render");

}));
