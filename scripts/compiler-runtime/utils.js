"use strict";

const ROOT_ATTRIBUTE_NAME = "data-reactroot";
const uppercasePattern = /([A-Z])/g;
const msPattern = /^ms-/;
const reactElementSymbol = Symbol.for("react.element");
const isArray = Array.isArray;
const emptyArray = [];

const rxUnescaped = new RegExp(/["'&<>]/);

function escapeText(text) {
  if (typeof text === "string") {
    /* Much faster when there is no unescaped characters */
    if (!rxUnescaped.test(text)) {
      return text;
    }

    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      switch (text.charCodeAt(i)) {
        case 34: // "
          escape = "&quot;";
          break;
        case 39: // '
          escape = "&#x27;";
          break;
        case 38: // &
          escape = "&amp;";
          break;
        case 60: // <
          escape = "&lt;";
          break;
        case 62: // >
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
}

// TODO: enable again
/* eslint-disable-next-line */
function optimizedEscapeText(text) {
  if (typeof text === "string") {
    if (text.indexOf("&") === -1 && text.indexOf("<") === -1 && text.indexOf(">") === -1) {
      return text;
    }

    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      let escape;
      switch (text.charCodeAt(i)) {
        case 38: // &
          escape = "&amp;";
          break;
        case 60: // <
          escape = "&lt;";
          break;
        case 62: // >
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
}

// TODO enable again
/* eslint-disable-next-line */
function optimizedEscapeAttributeValue(text) {
  if (typeof text === "string") {
    if (text.indexOf('"') === -1 && text.indexOf("&") === -1) {
      return text;
    }

    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      let escape;
      switch (text.charCodeAt(i)) {
        case 34: // "
          escape = "&quot;";
          break;
        case 38: // &
          escape = "&amp;";
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
}

function createMarkupForRoot() {
  return ROOT_ATTRIBUTE_NAME + '=""';
}

function hyphenateStyleName(name) {
  return name
    .replace(uppercasePattern, "-$1")
    .toLowerCase()
    .replace(msPattern, "-ms-");
}

function createElementForTesting(type, props) {
  return {
    $$typeof: reactElementSymbol,
    key: null,
    props,
    ref: null,
    type,
  };
}

function getCurrentContextValue(context, state) {
  const contextValueStack = state.contextValueStack.get(context);

  if (contextValueStack === undefined) {
    return context._currentValue;
  } else {
    return contextValueStack[contextValueStack.length - 1];
  }
}

function pushCurrentContextValue(context, value, state) {
  const contextValueStack = state.contextValueStack.get(context);

  if (contextValueStack === undefined) {
    state.contextValueStack.set(context, [value]);
  } else {
    contextValueStack.push(value);
  }
}

function popCurrentContextValue(context, state) {
  const contextValueStack = state.contextValueStack.get(context);

  if (contextValueStack !== undefined) {
    contextValueStack.pop();
    if (contextValueStack.length === 0) {
      state.contextValueStack.set(context, undefined);
    }
  }
}

function convertRootPropsToPropsArray(rootProps, rootPropsShape) {
  const props = [];
  if (rootPropsShape !== null) {
    for (let i = 0, length = rootPropsShape.length; i < length; i++) {
      let propShape = rootPropsShape[i];
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
    props,
    usesHooks,
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
    styleRenderString: "",
  };
}

function cloneState(state) {
  const clonedState = createState(null);
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
module.exports = {
  applyState,
  cloneState,
  convertRootPropsToPropsArray,
  createComponent,
  createElementForTesting,
  createMarkupForRoot,
  createRootComponent,
  createState,
  emptyArray,
  escapeText,
  getCurrentContextValue,
  hyphenateStyleName,
  isArray,
  isReactNode,
  popCurrentContextValue,
  pushCurrentContextValue,
  reactElementSymbol,
};
