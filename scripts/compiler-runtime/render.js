import { currentDispatcher } from "./index";
import { Dispatcher, callComputeFunctionWithHooks } from "./dom-dispatcher";
import {
  appendChild,
  callComputeFunctionWithArray,
  convertRootPropsToPropsArray,
  insertFiber,
  isUnitlessNumber,
  createElement,
  createPlaceholder,
  createTextNode,
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
export const REFERENCE_COMPONENT = 11;
export const VNODE = 12;
export const REFERENCE_VNODE = 13;
export const MULTI_RETURN_CONDITIONAL = 14;
export const VNODE_COLLECTION = 15;
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
export const IS_STATIC = 1 << 15;
export const IS_SVG = 1 << 16;
export const IS_VOID = 1 << 17;

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

const rootFibers = new Map();

function mountFunctionComponentTemplate(
  isRoot,
  templateTypeAndFlags,
  componentTemplate,
  parentDOMNode,
  values,
  currentFiber,
) {
  const templateFlags = templateTypeAndFlags & ~0x3f;

  if ((templateFlags & IS_STATIC) === 0) {
    let componentProps = null;
    let computeFunction;
    let childTemplateNode;

    if (isRoot === true) {
      const rootComponentPropsShape = componentTemplate[1];
      computeFunction = componentTemplate[2];
      childTemplateNode = componentTemplate[3];
      if (rootComponentPropsShape !== 0) {
        componentProps = convertRootPropsToPropsArray(currentFiber.memoizedProps, rootComponentPropsShape);
      }
    } else {
      // This always means that the parent was a reference component template node
      componentProps = values;
      computeFunction = componentTemplate[1];
      childTemplateNode = componentTemplate[2];
    }
    const hasHooks = (templateFlags & HAS_HOOKS) !== 0;
    let componentValues;

    if (hasHooks === true) {
      // TODO
    } else {
      componentValues = callComputeFunctionWithArray(computeFunction, componentProps);
    }
    const componentFiber = createFiber(componentTemplate, componentValues);
    insertFiber(currentFiber, componentFiber);
    if (componentValues === null) {
      const placeholder = createPlaceholder();
      componentFiber.hostNode = placeholder;
      return placeholder;
    }
    const hostNode = mountTemplateNode(childTemplateNode, parentDOMNode, componentValues, componentFiber);
    componentFiber.hostNode = hostNode;
    return hostNode;
  }
  const childTemplateNode = componentTemplate[1];
  return mountTemplateNode(childTemplateNode, parentDOMNode, values, currentFiber);
}

function renderPropValue(propFlags, value) {
  if (value === null) {
    return;
  }
  if ((propFlags & PROP_IS_BOOLEAN) !== 0 && typeof value !== "boolean") {
    return;
  } else if ((propFlags & PROP_IS_POSITIVE_NUMBER) !== 0) {
    if (isNaN(value) || value < 1) {
      return;
    }
  }
  return value;
}

function mountPropValue(DOMNode, propFlags, propName, propValue) {
  if (propName === "className") {
    DOMNode.className = propValue;
  } else if ((propFlags & PROP_IS_EVENT) !== 0) {
    // TODO make events work
  } else {
    DOMNode.setAttribute(propName, propValue);
  }
}

function mountHostComponentTemplate(templateTypeAndFlags, hostComponentTemplate, parentDOMNode, values, currentFiber) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const tagName = hostComponentTemplate[1];
  const DOMNode = createElement(tagName);
  let DOMNodeStyle;
  let childrenTemplateIndex = 2;

  if ((templateFlags & HAS_STATIC_PROPS) !== 0) {
    const staticProps = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = staticProps.length; i < length; i += 3) {
      const propName = staticProps[i];
      const staticPropFlags = staticProps[i + 1];
      const staticPropValue = renderPropValue(staticPropFlags, staticProps[i + 2]);
      if (staticPropValue === undefined) {
        continue;
      }
      mountPropValue(DOMNode, staticPropFlags, propName, staticPropValue);
    }
  }
  if ((templateFlags & HAS_STATIC_STYLES) !== 0) {
    if (DOMNodeStyle === undefined) {
      DOMNodeStyle = DOMNode.style;
    }
    const staticStyles = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = staticStyles.length; i < length; i += 2) {
      const styleName = staticStyles[i];
      const staticStyleValue = staticStyles[i + 1];
      DOMNodeStyle.setProperty(styleName, staticStyleValue);
    }
  }
  if ((templateFlags & HAS_DYNAMIC_PROPS) !== 0) {
    const dynamicProps = hostComponentTemplate[childrenTemplateIndex++];

    for (let i = 0, length = dynamicProps.length; i < length; i += 3) {
      const propName = dynamicProps[i];
      const dynamicPropFlags = dynamicProps[i + 1];
      const dynamicPropValueIndex = dynamicProps[i + 2];
      const dynamicPropValue = renderPropValue(dynamicPropFlags, values[dynamicPropValueIndex]);

      if (dynamicPropValue === undefined) {
        continue;
      }
      mountPropValue(DOMNode, dynamicPropFlags, propName, dynamicPropValue);
    }
  }
  if ((templateFlags & HAS_DYNAMIC_STYLES) !== 0) {
    if (DOMNodeStyle === undefined) {
      DOMNodeStyle = DOMNode.style;
    }
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
      DOMNodeStyle.setProperty(styleName, dynamicStyleValue);
    }
  }

  if ((templateFlags & HAS_DYNAMIC_TEXT_CONTENT) !== 0) {
    const textContentValueIndex = hostComponentTemplate[childrenTemplateIndex];
    const text = values[textContentValueIndex];
    if (text !== undefined && text !== null && text !== "") {
      DOMNode.textContent = text;
    }
  } else if ((templateFlags & HAS_STATIC_TEXT_CONTENT) !== 0) {
    DOMNode.textContent = hostComponentTemplate[childrenTemplateIndex];
  } else if ((templateFlags & HAS_CHILD) !== 0) {
    const child = hostComponentTemplate[childrenTemplateIndex];
    mountTemplateNode(child, DOMNode, values, currentFiber);
  } else if ((templateFlags & HAS_CHILDREN) !== 0) {
    const childrenTemplateNodes = hostComponentTemplate[childrenTemplateIndex];
    for (let i = 0, length = childrenTemplateNodes.length; i < length; ++i) {
      mountTemplateNode(childrenTemplateNodes[i], DOMNode, values, currentFiber);
    }
  }

  if (parentDOMNode !== null) {
    appendChild(parentDOMNode, DOMNode);
  }
  return DOMNode;
}

function mountTextTemplate(templateTypeAndFlags, textTemplate, parentDOMNode, values, currentFiber) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_STATIC) !== 0;
  let text = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  const textDOMNode = createTextNode(text);
  if (parentDOMNode !== null) {
    appendChild(parentDOMNode, textDOMNode);
  }
  return textDOMNode;
}

function mountMultiConditionalTemplate(multiConditionalTemplate, parentDOMNode, values, currentFiber) {
  const conditions = multiConditionalTemplate[1];
  const conditionalFiber = createFiber(multiConditionalTemplate, 0);
  insertFiber(currentFiber, conditionalFiber);

  for (let i = 0, length = conditions.length; i < length; i += 2) {
    const conditionValueIndexOrNull = conditions[i];

    if (conditionValueIndexOrNull === null) {
      conditionalFiber.values = i;
      const conditionTemplateNode = conditions[i + 1];
      return mountTemplateNode(conditionTemplateNode, parentDOMNode, values, conditionalFiber);
    }
    const conditionValue = values[conditionValueIndexOrNull];

    if (conditionValue) {
      conditionalFiber.values = i;
      const conditionTemplateNode = conditions[i + 1];
      return mountTemplateNode(conditionTemplateNode, parentDOMNode, values, conditionalFiber);
    }
  }
}

function mountTemplateNode(templateNode, parentDOMNode, values, currentFiber) {
  const templateTypeAndFlags = templateNode[0];
  const templateType = templateTypeAndFlags & 0x3f;

  switch (templateType) {
    case ROOT_COMPONENT:
      return mountFunctionComponentTemplate(
        true,
        templateTypeAndFlags,
        templateNode,
        parentDOMNode,
        values,
        currentFiber,
      );
    case HOST_COMPONENT:
      return mountHostComponentTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case TEXT:
      return mountTextTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case MULTI_CONDITIONAL:
      return mountMultiConditionalTemplate(templateNode, parentDOMNode, values, currentFiber);
    default:
      throw new Error("Should never happen");
  }
}

function renderNodeToRootContainer(node, DOMContainer) {
  let rootFiber = rootFibers.get(DOMContainer);

  if (node === null || node === undefined) {
    if (rootFiber !== undefined) {
      // unmountRoot(DOMContainer, rootState);
    }
  } else if (node.$$typeof === reactElementSymbol) {
    const templateNode = node.type;
    const rootProps = node.props;

    if (rootFiber === undefined) {
      rootFiber = createFiber(templateNode, null);
      rootFiber.memoizedProps = rootProps;
      rootFiber.hostNode = DOMContainer;
      rootFibers.set(DOMContainer, rootFiber);
      mountTemplateNode(templateNode, DOMContainer, null, rootFiber);
    } else {
      // TODO
    }
  } else {
    throw new Error("render() expects a ReactElement as the first argument");
  }
}

function createFiber(templateNode, values) {
  return {
    children: null,
    hostNode: null,
    memoizedProps: null,
    memoizedState: null,
    parent: null,
    pendingProps: null,
    pendingState: null,
    slots: null,
    templateNode,
    values,
  };
}

export function render(node, DOMContainer) {
  const prevDispatcher = currentDispatcher.current;
  currentDispatcher.current = Dispatcher;
  const returnNode = renderNodeToRootContainer(node, DOMContainer);
  currentDispatcher.current = prevDispatcher;
  return returnNode;
}
