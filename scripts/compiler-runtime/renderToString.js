import { currentDispatcher } from "./index";
import { Dispatcher, finishHooks, prepareToUseHooks } from "./ssr-dispatcher";
import {
  callComputeFunctionWithArray,
  convertRootPropsToPropsArray,
  escapeText,
  getCurrentContextValue,
  isArray,
  isUnitlessNumber,
  pushCurrentContextValue,
  reactElementSymbol,
} from "./utils";

export const ROOT_COMPONENT = 0;
export const COMPONENT = 1;
export const HOST_COMPONENT = 2;
export const TEXT = 3;
export const VALUE = 4;
export const FRAGMENT = 5;
export const CONDITIONAL = 6;
export const LOGICAL = 7;
export const TEMPLATE_FUNCTION_CALL = 8;
export const MULTI_CONDITIONAL = 9;
export const TEXT_ARRAY = 10;
export const VNODE_ARRAY = 11;
export const REFERENCE_COMPONENT = 12;
export const REFERENCE_REACT_NODE = 13;
export const MULTI_RETURN_CONDITIONAL = 14;
export const VNODE = 15;
export const CONTEXT_PROVIDER = 16;
export const CONTEXT_CONSUMER = 17;

// Elements/Components/Context
export const HAS_STATIC_PROPS = 1 << 6;
export const HAS_DYNAMIC_PROPS = 1 << 7;
export const HAS_STATIC_STYLES = 1 << 8;
export const HAS_DYNAMIC_STYLES = 1 << 9;
export const HAS_CHILD = 1 << 10;
export const HAS_CHILDREN = 1 << 11;
export const HAS_STATIC_TEXT_CONTENT = 1 << 12;
export const HAS_DYNAMIC_TEXT_CONTENT = 1 << 13;
export const HAS_DYNAMIC_TEXT_ARRAY_CONTENT = 1 << 14;
export const IS_SHALLOW_STATIC = 1 << 15;
export const IS_DEEP_STATIC = 1 << 16;
export const IS_SVG = 1 << 17;
export const IS_VOID = 1 << 18;

// Components
export const HAS_HOOKS = 1 << 6;

// Collection
export const HAS_KEYS = 1 << 6;

// Logical
export const LOGICAL_AND = 1 << 6;
export const LOGICAL_OR = 1 << 7;

export const PROP_IS_EVENT = 1;
export const PROP_IS_BOOLEAN = 1 << 1;
export const PROP_IS_POSITIVE_NUMBER = 1 << 2;
export const PROP_IS_NUMERIC = 1 << 3;
export const PROP_IS_OVERLOADED_BOOLEAN = 1 << 4;
export const PROP_IS_BOOLEANISH_STRING = 1 << 5;
export const PROP_IS_RESERVED = 1 << 6;

const componentTemplateCache = new Map();

function renderFunctionComponentTemplateToString(
  isRoot,
  templateTypeAndFlags,
  componentTemplate,
  values,
  isOnlyChild,
  state,
) {
  const templateFlags = templateTypeAndFlags & ~0x3f;

  if ((templateFlags & IS_SHALLOW_STATIC) === 0) {
    let componentProps = null;
    let computeFunction;
    let childTemplateNode;

    if (isRoot === true) {
      const rootComponentPropsShape = componentTemplate[1];
      computeFunction = componentTemplate[2];
      childTemplateNode = componentTemplate[3];
      if (rootComponentPropsShape !== 0) {
        componentProps = convertRootPropsToPropsArray(state.rootProps, rootComponentPropsShape);
      }
    } else {
      // This always means that the parent was a reference component template node
      componentProps = values;
      computeFunction = componentTemplate[1];
      childTemplateNode = componentTemplate[2];
    }
    const hasHooks = (templateFlags & HAS_HOOKS) !== 0;

    if (hasHooks === true) {
      prepareToUseHooks(computeFunction);
    }
    const componentValues = callComputeFunctionWithArray(computeFunction, componentProps);
    if (hasHooks === true) {
      finishHooks(computeFunction);
    }
    if (componentValues === null) {
      return "";
    }
    return renderTemplateToString(childTemplateNode, componentValues, isOnlyChild, state);
  }
  const childTemplateNode = componentTemplate[1];
  return renderTemplateToString(childTemplateNode, values, isOnlyChild, state);
}

function renderTextArrayToString(textArray, state) {
  const childrenTextArrayLength = textArray.length;
  let renderString = "";
  for (let i = 0; i < childrenTextArrayLength; ++i) {
    const childText = textArray[i];
    if (childText !== null && childText !== undefined && typeof childText !== "boolean") {
      const lastChildWasText = state.lastChildWasText;
      state.lastChildWasText = true;
      if (lastChildWasText === true) {
        renderString += `<!-- -->${escapeText(childText)}`;
      } else {
        renderString += escapeText(childText);
      }
    }
  }
  return renderString;
}

function renderReferenceComponentTemplateToString(
  templateTypeAndFlags,
  referenceComponentTemplate,
  values,
  isOnlyChild,
  state,
) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const componentTemplateNodeOrFunc = referenceComponentTemplate[1];
  let componentTemplateNode = componentTemplateNodeOrFunc;
  if (typeof componentTemplateNodeOrFunc === "function") {
    componentTemplateNode = componentTemplateCache.get(componentTemplateNodeOrFunc);

    if (componentTemplateNode === undefined) {
      componentTemplateNode = componentTemplateNodeOrFunc();
      componentTemplateCache.set(componentTemplateNodeOrFunc, componentTemplateNode);
    }
  }
  let props;

  if ((templateFlags & HAS_STATIC_PROPS) !== 0) {
    props = referenceComponentTemplate[2];
  } else {
    const propsValueIndex = referenceComponentTemplate[2];
    props = values[propsValueIndex];
  }
  return renderTemplateToString(componentTemplateNode, props, isOnlyChild, state);
}

function filterPropValue(propFlags, value) {
  if (value === null) {
    return;
  }
  if ((propFlags & PROP_IS_BOOLEAN) !== 0) {
    if (value === true) {
      return "";
    } else {
      return;
    }
  } else if ((propFlags & PROP_IS_POSITIVE_NUMBER) !== 0) {
    if (isNaN(value) || value < 1) {
      return;
    }
  } else if ((propFlags & PROP_IS_EVENT) !== 0) {
    return;
  }
  return value;
}

function renderHostComponentTemplateToString(templateTypeAndFlags, hostComponentTemplate, values, isOnlyChild, state) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const tagName = hostComponentTemplate[1];

  let childrenTemplateIndex = 2;
  let inner = "";
  let styles = "";
  let children = "";
  let lastChildWasStyle = false;

  if ((templateFlags & HAS_STATIC_PROPS) !== 0) {
    const staticProps = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = staticProps.length; i < length; i += 3) {
      let propName = staticProps[i];
      const propFlags = staticProps[i + 1];
      let staticPropValue = staticProps[i + 2];
      if ((propFlags & PROP_IS_EVENT) !== 0 || (propFlags & PROP_IS_RESERVED) !== 0) {
        continue;
      }
      if (
        (propFlags & PROP_IS_BOOLEAN) !== 0 ||
        ((propFlags & PROP_IS_OVERLOADED_BOOLEAN) !== 0 && staticPropValue === true)
      ) {
        staticPropValue = "";
      }
      if (propName === "className") {
        propName = "class";
      }
      inner += ` ${propName}="${staticPropValue}"`;
    }
  }
  if ((templateFlags & HAS_STATIC_STYLES) !== 0) {
    const staticStyles = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = staticStyles.length; i < length; i += 2) {
      const styleName = staticStyles[i];
      const staticStyleValue = staticStyles[i + 1];
      styles += `${lastChildWasStyle ? ";" : ""}${styleName}:${staticStyleValue}`;
      lastChildWasStyle = true;
    }
  }
  if ((templateFlags & HAS_DYNAMIC_PROPS) !== 0) {
    const dynamicProps = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = dynamicProps.length; i < length; i += 3) {
      let propName = dynamicProps[i];
      const dynamicPropFlags = dynamicProps[i + 1];
      const dynamicPropValueIndex = dynamicProps[i + 2];
      const dynamicPropValue = filterPropValue(dynamicPropFlags, values[dynamicPropValueIndex]);

      if (dynamicPropValue === undefined) {
        continue;
      }
      if (propName === "className") {
        propName = "class";
      }
      inner += ` ${propName}="${escapeText(dynamicPropValue)}"`;
    }
  }
  if ((templateFlags & HAS_DYNAMIC_STYLES) !== 0) {
    const dynamicStyles = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = dynamicStyles.length; i < length; i += 2) {
      let styleName = dynamicStyles[i];
      const dynamicStyleValueIndex = dynamicStyles[i + 1];
      let dynamicStyleValue = values[dynamicStyleValueIndex];

      if (dynamicStyleValue === null || dynamicStyleValue === undefined) {
        continue;
      }
      if (typeof dynamicStyleValue === "boolean") {
        dynamicStyleValue = "";
      }
      if (typeof dynamicStyleValue === "number" && dynamicStyleValue !== 0 && !isUnitlessNumber.has(styleName)) {
        dynamicStyleValue = `${dynamicStyleValue}px`;
      }
      styles += `${lastChildWasStyle ? ";" : ""}${styleName}:${dynamicStyleValue}`;
      lastChildWasStyle = true;
    }
  }
  if (styles !== "") {
    styles = ` style="${styles}"`;
  }
  if (state.hasCreatedMarkupForRoot === false) {
    state.hasCreatedMarkupForRoot = true;
    inner += ' data-reactroot=""';
  }
  state.lastChildWasText = false;
  if ((templateFlags & IS_VOID) !== 0) {
    return `<${tagName}${styles}${inner}/>`;
  }

  if ((templateFlags & HAS_DYNAMIC_TEXT_CONTENT) !== 0) {
    const textContentValueIndex = hostComponentTemplate[childrenTemplateIndex];
    const text = values[textContentValueIndex];
    if (text !== undefined && text !== null) {
      children = escapeText(text);
    }
  } else if ((templateFlags & HAS_STATIC_TEXT_CONTENT) !== 0) {
    children = hostComponentTemplate[childrenTemplateIndex];
  } else if ((templateFlags & HAS_CHILD) !== 0) {
    const child = hostComponentTemplate[childrenTemplateIndex];
    children += renderTemplateToString(child, values, true, state);
  } else if ((templateFlags & HAS_CHILDREN) !== 0) {
    const childrenTemplateNodes = hostComponentTemplate[childrenTemplateIndex];
    for (let i = 0, length = childrenTemplateNodes.length; i < length; ++i) {
      children += renderTemplateToString(childrenTemplateNodes[i], values, false, state);
    }
  } else if ((templateFlags & HAS_DYNAMIC_TEXT_ARRAY_CONTENT) !== 0) {
    const textChildrenArrayValueIndex = hostComponentTemplate[childrenTemplateIndex];
    const textChildrenArray = values[textChildrenArrayValueIndex];
    children += renderTextArrayToString(textChildrenArray, state);
  }
  return `<${tagName}${styles}${inner}>${children}</${tagName}>`;
}

function renderContextProviderTemplateToString(
  templateTypeAndFlags,
  contextProviderTemplate,
  values,
  isOnlyChild,
  state,
) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const contextObjectValueIndex = contextProviderTemplate[1];
  const contextObject = values[contextObjectValueIndex];
  let childrenTemplateIndex = 2;

  if ((templateFlags & HAS_STATIC_PROPS) !== 0) {
    childrenTemplateIndex = 3;
    const contextValue = contextProviderTemplate[2];
    pushCurrentContextValue(contextObject, contextValue, state);
  } else {
    pushCurrentContextValue(contextObject, undefined, state);
  }
  state.hasCreatedMarkupForRoot = true;

  if ((templateFlags & HAS_CHILD) !== 0) {
    const child = contextProviderTemplate[childrenTemplateIndex];
    return renderTemplateToString(child, values, true, state);
  } else if ((templateFlags & HAS_CHILDREN) !== 0) {
    let children = "";
    const childrenTemplateNodes = contextProviderTemplate[childrenTemplateIndex];
    for (let i = 0, length = childrenTemplateNodes.length; i < length; ++i) {
      children += renderTemplateToString(childrenTemplateNodes[i], values, false, state);
    }
    return children;
  }
  return "";
}

function renderContextConsumerTemplateToString(contextConsumerTemplate, values, isOnlyChild, state) {
  const contextObjectValueIndex = contextConsumerTemplate[1];
  const computeFunctionValueIndex = contextConsumerTemplate[2];
  const contextConsumerTemplateNode = contextConsumerTemplate[3];
  const contextObject = values[contextObjectValueIndex];
  const computeFunction = values[computeFunctionValueIndex];
  const contextValue = getCurrentContextValue(contextObject, state);
  const contextConsumerValues = computeFunction(contextValue);
  if (contextConsumerValues === null) {
    return "";
  }
  return renderTemplateToString(contextConsumerTemplateNode, contextConsumerValues, isOnlyChild, state);
}

function renderTextTemplateToString(templateTypeAndFlags, textTemplate, values, isOnlyChild, state) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_SHALLOW_STATIC) !== 0;
  let text = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  const lastChildWasText = state.lastChildWasText;

  if (text === null || text === undefined) {
    return "";
  }
  if (isStatic === false) {
    text = escapeText(text);
  }
  if (isOnlyChild === false) {
    state.lastChildWasText = true;
    if (lastChildWasText === true) {
      return `<!-- -->${text}`;
    }
  }
  return text;
}

function renderValueTemplateToString(templateTypeAndFlags, textTemplate, values, isOnlyChild, state) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_SHALLOW_STATIC) !== 0;
  const value = isStatic === true ? textTemplate[1] : escapeText(values[textTemplate[1]]);

  if (value === null || value === undefined || typeof value === "boolean") {
    return "";
  } else if (typeof value === "string" || typeof value === "number") {
    const lastChildWasText = state.lastChildWasText;

    if (isOnlyChild === false) {
      state.lastChildWasText = true;
      if (lastChildWasText === true) {
        return `<!-- -->${value}`;
      }
    }
    return value + "";
  }
  throw new Error("TODO renderValueTemplateToString");
}

function renderTextArrayTemplateToString(templateTypeAndFlags, textTemplate, values, isOnlyChild, state) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_SHALLOW_STATIC) !== 0;
  const textArray = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  return renderTextArrayToString(textArray, state);
}

function renderVNodeCollectionTemplateToString(vNodeCollectionTemplate, values, isOnlyChild, state) {
  const vNodeCollectionValueIndex = vNodeCollectionTemplate[1];
  const vNodeCollection = values[vNodeCollectionValueIndex];
  const vNodeCollectionLength = vNodeCollection.length;

  let collectionString = "";
  for (let i = 0; i < vNodeCollectionLength; ++i) {
    collectionString += renderReactNodeToString(vNodeCollection[i], false, state);
  }
  return collectionString;
}

function renderMultiConditionalTemplateToString(multiConditionalTemplate, values, isOnlyChild, state) {
  const conditions = multiConditionalTemplate[1];

  for (let i = 0, length = conditions.length; i < length; i += 2) {
    const conditionValueIndexOrNull = conditions[i];

    if (conditionValueIndexOrNull === null) {
      const conditionTemplateNode = conditions[i + 1];
      return renderTemplateToString(conditionTemplateNode, values, isOnlyChild, state);
    }
    const conditionValue = values[conditionValueIndexOrNull];

    if (conditionValue) {
      const conditionTemplateNode = conditions[i + 1];
      return renderTemplateToString(conditionTemplateNode, values, isOnlyChild, state);
    }
  }
}

function renderConditionalTemplateToString(conditionalTemplate, values, isOnlyChild, state) {
  const conditionalValueIndex = conditionalTemplate[1];
  const conditionalValue = values[conditionalValueIndex];

  if (conditionalValue) {
    const consequentTemplate = conditionalTemplate[2];
    if (consequentTemplate !== null) {
      return renderTemplateToString(consequentTemplate, values, isOnlyChild, state);
    }
  } else {
    const alternateTemplate = conditionalTemplate[3];
    if (alternateTemplate !== null) {
      return renderTemplateToString(alternateTemplate, values, isOnlyChild, state);
    }
  }
  throw new Error("This shouldn\t happen?");
}

function renderLogicalTemplateToString(templateTypeAndFlags, logicalTemplate, values, isOnlyChild, state) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const leftTemplateNode = logicalTemplate[1];
  const leftTemplateValue = renderTemplateToString(leftTemplateNode, values, isOnlyChild, state);

  if ((templateFlags & LOGICAL_OR) !== 0) {
    if (leftTemplateValue !== undefined) {
      return leftTemplateValue;
    }
    const rightTemplateNode = logicalTemplate[2];
    return renderTemplateToString(rightTemplateNode, values, isOnlyChild, state);
  } else if ((templateFlags & LOGICAL_AND) !== 0) {
    if (leftTemplateValue === undefined) {
      return "";
    }
    const rightTemplateNode = logicalTemplate[2];
    return renderTemplateToString(rightTemplateNode, values, isOnlyChild, state);
  }
}

function renderTemplateFunctionCallTemplateToString(templateFunctionCallTemplate, values, isOnlyChild, state) {
  const functionCallTemplateNode = templateFunctionCallTemplate[1];
  const functionCallValuesIndex = templateFunctionCallTemplate[2];
  const functionCallValues = values[functionCallValuesIndex];
  if (functionCallValues === null) {
    return "";
  }
  return renderTemplateToString(functionCallTemplateNode, functionCallValues, isOnlyChild, state);
}

function renderReferenceReactNodeTemplateToString(referenceReactNodeTemplateNode, values, isOnlyChild, state) {
  const reactNodeValueIndex = referenceReactNodeTemplateNode[1];
  const reactNode = values[reactNodeValueIndex];
  return renderReactNodeToString(reactNode, isOnlyChild, state);
}

function renderFragmentTemplateToString(fragmentTemplate, values, isOnlyChild, state) {
  const fragment = fragmentTemplate[1];
  let fragmentString = "";

  if (state.hasCreatedMarkupForRoot === false) {
    state.hasCreatedMarkupForRoot = true;
  }
  for (let i = 0, length = fragment.length; i < length; ++i) {
    fragmentString += renderTemplateToString(fragment[i], values, false, state);
  }
  return fragmentString;
}

function renderReactNodeToString(reactNode, isOnlyChild, state) {
  if (reactNode === undefined || reactNode === null || typeof reactNode === "boolean") {
    return "";
  }
  if (typeof reactNode === "string" || typeof reactNode === "number") {
    if (isOnlyChild) {
      const lastChildWasText = state.lastChildWasText;
      state.lastChildWasText = true;
      if (lastChildWasText === true) {
        return `<!-- -->${escapeText(reactNode)}`;
      }
    }
    return escapeText(reactNode);
  }
  if (isArray(reactNode)) {
    let str = "";
    for (let i = 0, length = reactNode.length; i < length; ++i) {
      str += renderReactNodeToString(reactNode[i], true, state);
    }
    return str;
  }
  // Otherwise ReactNode is a vNode
  return renderVNodeToString(reactNode, isOnlyChild, state);
}

function renderVNodeToString(vNode, isOnlyChild, state) {
  const templateNode = vNode.t;
  let values = vNode.v;
  if (values !== null) {
    // TODO
  }
  return renderTemplateToString(templateNode, values, isOnlyChild, state);
}

function renderMultiReturnConditionalTemplateToString(multiReturnTemplateNode, values, isOnlyChild, state) {
  const conditionBranchToUseKey = values[0];

  for (let i = 1; i < multiReturnTemplateNode.length; i += 2) {
    const branchIndex = multiReturnTemplateNode[i];

    if (branchIndex === conditionBranchToUseKey) {
      const branchTemplateNode = multiReturnTemplateNode[i + 1];
      return renderTemplateToString(branchTemplateNode, values, isOnlyChild, state);
    }
  }
}

function renderTemplateToString(templateNode, values, isOnlyChild, state) {
  const templateTypeAndFlags = templateNode[0];
  const templateType = templateTypeAndFlags & 0x3f;

  switch (templateType) {
    case ROOT_COMPONENT:
      return renderFunctionComponentTemplateToString(
        true,
        templateTypeAndFlags,
        templateNode,
        values,
        isOnlyChild,
        state,
      );
    case COMPONENT:
      return renderFunctionComponentTemplateToString(
        false,
        templateTypeAndFlags,
        templateNode,
        values,
        isOnlyChild,
        state,
      );
    case HOST_COMPONENT:
      return renderHostComponentTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case TEXT:
      return renderTextTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case VALUE:
      return renderValueTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case FRAGMENT:
      return renderFragmentTemplateToString(templateNode, values, isOnlyChild, state);
    case CONDITIONAL:
      return renderConditionalTemplateToString(templateNode, values, isOnlyChild, state);
    case LOGICAL:
      return renderLogicalTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case TEMPLATE_FUNCTION_CALL:
      return renderTemplateFunctionCallTemplateToString(templateNode, values, isOnlyChild, state);
    case MULTI_CONDITIONAL:
      return renderMultiConditionalTemplateToString(templateNode, values, isOnlyChild, state);
    case TEXT_ARRAY:
      return renderTextArrayTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case VNODE_ARRAY:
      return renderVNodeCollectionTemplateToString(templateNode, values, isOnlyChild, state);
    case REFERENCE_COMPONENT:
      return renderReferenceComponentTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case REFERENCE_REACT_NODE:
      return renderReferenceReactNodeTemplateToString(templateNode, values, isOnlyChild, state);
    case MULTI_RETURN_CONDITIONAL:
      return renderMultiReturnConditionalTemplateToString(templateNode, values, isOnlyChild, state);
    case VNODE:
      throw new Error("TODO");
    case CONTEXT_PROVIDER:
      return renderContextProviderTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case CONTEXT_CONSUMER:
      return renderContextConsumerTemplateToString(templateNode, values, isOnlyChild, state);
    default:
      throw new Error("Should never happen");
  }
}

function createState(rootProps) {
  return {
    contextValueStack: new Map(),
    hasCreatedMarkupForRoot: false,
    lastChildWasText: false,
    rootProps,
  };
}

function renderNode(input) {
  if (input === null || input === undefined) {
    return "";
  } else if (input.$$typeof === reactElementSymbol) {
    const templateNode = input.type;
    const state = createState(input.props);
    return renderTemplateToString(templateNode, null, true, state);
  } else {
    throw new Error("renderToString() expects a ReactElement as the only argument");
  }
}

export function renderToString(node) {
  const prevDispatcher = currentDispatcher.current;
  currentDispatcher.current = Dispatcher;
  const string = renderNode(node);
  currentDispatcher.current = prevDispatcher;
  return string;
}
