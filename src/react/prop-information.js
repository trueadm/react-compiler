export const PROP_IS_EVENT = 1;
export const PROP_IS_BOOLEAN = 1 << 1;
export const PROP_IS_POSITIVE_NUMBER = 1 << 2;
export const PROP_IS_NUMERIC = 1 << 3;
export const PROP_IS_OVERLOADED_BOOLEAN = 1 << 4;
export const PROP_IS_BOOLEANISH_STRING = 1 << 5;
export const PROP_IS_RESERVED = 1 << 6;
export const PROP_IS_PROPEPRTY = 1 << 7;

const reservedProps = new Set([
  "children",
  "dangerouslySetInnerHTML",
  "defaultValue",
  "defaultChecked",
  "innerHTML",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "style",
]);
const booleanishStringProps = new Set([
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
  "contentEditable",
  "draggable",
  "spellCheck",
  "value",
]);
const mustUsePropertyProps = new Set(["checked", "multiple", "muted", "selected"]);
const booleanProps = new Set([
  "allowFullScreen",
  "async",
  "autoFocus",
  "autoPlay",
  "controls",
  "default",
  "defer",
  "disabled",
  "formNoValidate",
  "hidden",
  "loop",
  "noModule",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "scoped",
  "seamless",
  "checked",
  "multiple",
  "muted",
  "selected",
]);
const overloadedBooleanProps = new Set(["capture", "download"]);
const stringProps = new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["tabIndex", "tabindex"],
]);
const lowerCaseProps = new Set([
  "allowFullScreen",
  "async",
  "autoFocus",
  "autoPlay",
  "controls",
  "default",
  "defer",
  "disabled",
  "formNoValidate",
  "hidden",
  "loop",
  "noModule",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "scoped",
  "seamless",
  "itemScope",
  "rowSpan",
  "start",
  "contentEditable",
  "draggable",
  "spellCheck",
  "value",
]);
const svgStringProps = new Set([
  "accent-height",
  "alignment-baseline",
  "arabic-form",
  "baseline-shift",
  "cap-height",
  "clip-path",
  "clip-rule",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "dominant-baseline",
  "enable-background",
  "fill-opacity",
  "fill-rule",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "glyph-name",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "horiz-adv-x",
  "horiz-origin-x",
  "image-rendering",
  "letter-spacing",
  "lighting-color",
  "marker-end",
  "marker-mid",
  "marker-start",
  "overline-position",
  "overline-thickness",
  "paint-order",
  "panose-1",
  "pointer-events",
  "rendering-intent",
  "shape-rendering",
  "stop-color",
  "stop-opacity",
  "strikethrough-position",
  "strikethrough-thickness",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "underline-position",
  "underline-thickness",
  "unicode-bidi",
  "unicode-range",
  "units-per-em",
  "v-alphabetic",
  "v-hanging",
  "v-ideographic",
  "v-mathematical",
  "vector-effect",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "word-spacing",
  "writing-mode",
  "xmlns:xlink",
  "x-height",
]);
const positiveNumericProps = new Set(["cols", "rows", "size", "span"]);
const numericProps = new Set(["rowSpan", "start"]);

export const isUnitlessNumber = new Set([
  "animationIterationCount",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "columns",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "gridArea",
  "gridRow",
  "gridRowEnd",
  "gridRowSpan",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnSpan",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",

  // SVG-related properties
  "fillOpacity",
  "floodOpacity",
  "stopOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
]);

const eventPropsToEventNames = new Map([
  [
    "onClick",
    {
      catpuredEvent: false,
      propNameToUse: "click",
      // eventInformationFlag: EventFlagBubbles | EventFlagTwoPhase,
    },
  ],
  [
    "onClickCapture",
    {
      catpuredEvent: true,
      propNameToUse: "click",
      // eventInformationFlag: EventFlagBubbles | EventFlagTwoPhase,
    },
  ],
]);

function isReactEvent(name) {
  if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
    return true;
  }
  return false;
}

export function getPropInformation(propName) {
  let propInformationFlag = 0;
  let propNameToUse = propName;

  if (isReactEvent(propName)) {
    const propData = eventPropsToEventNames.get(propNameToUse);

    propInformationFlag = propInformationFlag | PROP_IS_EVENT;
    if (propData !== undefined) {
      // const eventInformationFlag = propData.eventInformationFlag || 0;
      propNameToUse = propData.propNameToUse;
      if (propData.catpuredEvent) {
        // propInformationFlag = propInformationFlag | PropFlagReactCapturedEvent | eventInformationFlag;
      }
    } else {
      propNameToUse = propName;
    }
  }
  if (reservedProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_RESERVED;
  }
  if (mustUsePropertyProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_PROPEPRTY;
  }
  if (booleanishStringProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_BOOLEANISH_STRING;
  }
  if (booleanProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_BOOLEAN;
  }
  if (overloadedBooleanProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_OVERLOADED_BOOLEAN;
  }
  if (numericProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_NUMERIC;
  }
  if (positiveNumericProps.has(propName)) {
    propInformationFlag = propInformationFlag | PROP_IS_POSITIVE_NUMBER;
  }
  if (stringProps.has(propName)) {
    propNameToUse = stringProps.get(propName);
    // propInformationFlag = propInformationFlag | PropFlagString;
  }
  if (svgStringProps.has(propName)) {
    //propInformationFlag = propInformationFlag | PropFlagString;
  }
  if (lowerCaseProps.has(propName)) {
    propNameToUse = propName.toLowerCase();
  }

  return [propNameToUse, propInformationFlag];
}

function shouldRemoveAttributeWithWarning(name, value, propInformation, isCustomComponentTag) {
  if (propInformation & PROP_IS_RESERVED) {
    return false;
  }
  switch (typeof value) {
    case "function":
    case "symbol":
      return true;
    case "boolean": {
      if (isCustomComponentTag) {
        return false;
      }
      if (propInformation !== 0) {
        return (
          (propInformation & PROP_IS_BOOLEANISH_STRING) !== 0 &&
          (propInformation & PROP_IS_BOOLEAN) !== 0 &&
          (propInformation & PROP_IS_OVERLOADED_BOOLEAN) !== 0
        );
      } else {
        const prefix = name.toLowerCase().slice(0, 5);
        return prefix !== "data-" && prefix !== "aria-";
      }
    }
    default:
      return false;
  }
}

function shouldRemoveAttribute(name, value, propInformation, isCustomComponentTag) {
  if (value === null || typeof value === "undefined") {
    return true;
  }
  if (shouldRemoveAttributeWithWarning(name, value, propInformation, isCustomComponentTag)) {
    return true;
  }
  if (isCustomComponentTag) {
    return false;
  }
  if (propInformation & PROP_IS_BOOLEAN) {
    return !value;
  }
  if (propInformation & PROP_IS_OVERLOADED_BOOLEAN) {
    return value === false;
  }
  if (propInformation & PROP_IS_NUMERIC) {
    return isNaN(value);
  }
  if (propInformation & PROP_IS_POSITIVE_NUMBER) {
    return isNaN(value) || value < 1;
  }
  return false;
}

export function filterStaticPropValue(name, propInformation, value) {
  if (value === null || value === undefined) {
    return;
  }
  if (shouldRemoveAttribute(name, value, propInformation, false)) {
    return;
  }
  return value;
}
