const uppercasePattern = /([A-Z])/g;
const msPattern = /^ms-/;
export const reactElementSymbol = Symbol.for("react.element");
export const isArray = Array.isArray;
export const emptyArray = [];

const rxUnescaped = new RegExp(/["'&<>]/);

export function escapeText(text) {
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

export function hyphenateStyleName(name) {
  return name
    .replace(uppercasePattern, "-$1")
    .toLowerCase()
    .replace(msPattern, "-ms-");
}

export function createElementForTesting(type, props) {
  return {
    $$typeof: reactElementSymbol,
    key: null,
    props,
    ref: null,
    type,
  };
}

export function getCurrentContextValue(context, state) {
  const contextValueStack = state.contextValueStack.get(context);

  if (contextValueStack === undefined) {
    return context._currentValue;
  } else {
    return contextValueStack[contextValueStack.length - 1];
  }
}

export function pushCurrentContextValue(context, value, state) {
  const contextValueStack = state.contextValueStack.get(context);

  if (contextValueStack === undefined) {
    state.contextValueStack.set(context, [value]);
  } else {
    contextValueStack.push(value);
  }
}

export function popCurrentContextValue(context, state) {
  const contextValueStack = state.contextValueStack.get(context);

  if (contextValueStack !== undefined) {
    contextValueStack.pop();
    if (contextValueStack.length === 0) {
      state.contextValueStack.set(context, undefined);
    }
  }
}

export function convertRootPropsToPropsArray(rootProps, rootPropsShape) {
  const props = [];
  if (rootPropsShape !== 0) {
    for (let i = 0, length = rootPropsShape.length; i < length; i++) {
      let propShape = rootPropsShape[i];
      props.push(rootProps[propShape]);
    }
  }
  return props;
}

export function callComputeFunctionWithArray(computeFunction, arr) {
  if (arr === null) {
    return computeFunction();
  }
  switch (arr.length) {
    case 0:
      return computeFunction();
    case 1:
      return computeFunction(arr[0]);
    case 2:
      return computeFunction(arr[0], arr[1]);
    case 3:
      return computeFunction(arr[0], arr[1], arr[2]);
    case 4:
      return computeFunction(arr[0], arr[1], arr[2], arr[3]);
    case 7:
      return computeFunction(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
    default:
      return computeFunction.apply(null, arr);
  }
}

export const isUnitlessNumber = new Set([
  "animation-iteration-count",
  "border-image-outset",
  "border-image-slice",
  "border-image-width",
  "box-flex",
  "box-flex-group",
  "box-ordinal-group",
  "column-count",
  "columns",
  "flex",
  "flex-grow",
  "flex-positive",
  "flex-shrink",
  "flex-negative",
  "flex-order",
  "grid-area",
  "grid-row",
  "grid-row-end",
  "grid-row-span",
  "grid-row-start",
  "grid-column",
  "grid-column-end",
  "grid-column-span",
  "grid-column-start",
  "font-weight",
  "line-clamp",
  "line-height",
  "opacity",
  "order",
  "orphans",
  "tab-size",
  "widows",
  "z-index",
  "zoom",

  // SVG-related properties
  "fill-opacity",
  "flood-opacity",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
]);
