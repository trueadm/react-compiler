import { currentDispatcher } from "./index";
import { Dispatcher, callComputeFunctionWithHooks } from "./dom-dispatcher";
import {
  appendChild,
  callComputeFunctionWithArray,
  convertRootPropsToPropsArray,
  insertFiber,
  isArray,
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
export const PROP_IS_PROPEPRTY = 1 << 7;

const componentTemplateCache = new Map();
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

  if ((templateFlags & IS_SHALLOW_STATIC) === 0) {
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

function mountPropValue(DOMNode, propFlags, propName, propValue) {
  if (propName === "className") {
    DOMNode.className = propValue;
  } else if ((propFlags & PROP_IS_EVENT) !== 0) {
    // TODO make events work
  } else if ((propFlags & PROP_IS_BOOLEAN) !== 0) {
    DOMNode[propName] = propValue;
  } else if ((propFlags & PROP_IS_POSITIVE_NUMBER) !== 0) {
    DOMNode[propName] = propValue;
  } else {
    DOMNode.setAttribute(propName, propValue);
  }
}

function mountTextArray(textArray, parentDOMNode) {
  const childrenTextArrayLength = textArray.length;
  let hostNode;

  for (let i = 0; i < childrenTextArrayLength; ++i) {
    const childText = textArray[i];
    if (childText !== null && childText !== undefined && typeof childText !== "boolean") {
      hostNode = createTextNode(childText);
      if (parentDOMNode !== null) {
        parentDOMNode.appendChild(hostNode);
      }
    } else {
      hostNode = createPlaceholder();
    }
    if (parentDOMNode !== null) {
      parentDOMNode.appendChild(hostNode);
    }
  }
  // TODO
  return null;
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
      const propFlags = staticProps[i + 1];
      if ((propFlags & PROP_IS_RESERVED) !== 0) {
        continue;
      } else if ((propFlags & PROP_IS_EVENT) !== 0) {
        // TODO
        continue;
      }
      let staticPropValue = staticProps[i + 2];
      if (propName === "className") {
        DOMNode.className = staticPropValue;
      } else if ((propFlags & PROP_IS_PROPEPRTY) !== 0) {
        DOMNode[propName] = staticPropValue;
      } else {
        if ((propFlags & PROP_IS_BOOLEAN) !== 0) {
          staticPropValue = "";
        }
        DOMNode.setAttribute(propName, staticPropValue);
      }
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
      const dynamicPropValue = values[dynamicPropValueIndex];

      if (dynamicPropValue === undefined || dynamicPropValue === null) {
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
  } else if ((templateFlags & HAS_DYNAMIC_TEXT_ARRAY_CONTENT) !== 0) {
    const textChildrenArrayValueIndex = hostComponentTemplate[childrenTemplateIndex];
    const textChildrenArray = values[textChildrenArrayValueIndex];
    mountTextArray(textChildrenArray, DOMNode);
  }

  if (parentDOMNode !== null) {
    appendChild(parentDOMNode, DOMNode);
  }
  return DOMNode;
}

function mountTextTemplate(templateTypeAndFlags, textTemplate, parentDOMNode, values, currentFiber) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_SHALLOW_STATIC) !== 0;
  let text = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  const textDOMNode = createTextNode(text);
  if (parentDOMNode !== null) {
    appendChild(parentDOMNode, textDOMNode);
  }
  return textDOMNode;
}

function mountMultiConditionalTemplate(multiConditionalTemplate, parentDOMNode, values, currentFiber) {
  const conditions = multiConditionalTemplate[1];
  const conditionalFiber = createFiber(multiConditionalTemplate, values);
  insertFiber(currentFiber, conditionalFiber);

  for (let i = 0, length = conditions.length; i < length; i += 2) {
    const conditionValueIndexOrNull = conditions[i];

    if (conditionValueIndexOrNull === null) {
      pushSlotValue(currentFiber, i);
      const conditionTemplateNode = conditions[i + 1];
      const hostNode = mountTemplateNode(conditionTemplateNode, parentDOMNode, values, conditionalFiber);
      conditionalFiber.hostNode = hostNode;
      return hostNode;
    }
    const conditionValue = values[conditionValueIndexOrNull];

    if (conditionValue) {
      pushSlotValue(currentFiber, i);
      const conditionTemplateNode = conditions[i + 1];
      const hostNode = mountTemplateNode(conditionTemplateNode, parentDOMNode, values, conditionalFiber);
      conditionalFiber.hostNode = hostNode;
      return hostNode;
    }
  }
}

function mountReferenceComponentTemplate(
  templateTypeAndFlags,
  referenceComponentTemplate,
  parentDOMNode,
  values,
  currentFiber,
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
  return mountTemplateNode(componentTemplateNode, parentDOMNode, props, currentFiber);
}

function mountMultiReturnConditionalTemplate(multiReturnTemplateNode, parentDOMNode, values, currentFiber) {
  const conditionBranchToUseKey = values[0];
  const conditionalFiber = createFiber(multiReturnTemplateNode, values);
  insertFiber(currentFiber, conditionalFiber);

  for (let i = 1; i < multiReturnTemplateNode.length; i += 2) {
    const branchIndex = multiReturnTemplateNode[i];

    if (branchIndex === conditionBranchToUseKey) {
      pushSlotValue(currentFiber, i);
      const branchTemplateNode = multiReturnTemplateNode[i + 1];
      return mountTemplateNode(branchTemplateNode, parentDOMNode, values, conditionalFiber);
    }
  }
}

function mountReferenceReactNodeTemplate(referenceReactNodeTemplateNode, parentDOMNode, values, currentFiber) {
  const reactNodeValueIndex = referenceReactNodeTemplateNode[1];
  const reactNode = values[reactNodeValueIndex];
  return mountReactNode(reactNode, parentDOMNode, currentFiber);
}

function mountReactNode(reactNode, parentDOMNode, currentFiber) {
  if (reactNode === undefined || reactNode === null || typeof reactNode === "boolean") {
    const reactNodeFiber = createFiber(null, reactNode);
    insertFiber(currentFiber, reactNodeFiber);
    const hostNode = createPlaceholder();
    reactNodeFiber.hostNode = hostNode;
    if (parentDOMNode !== null) {
      appendChild(parentDOMNode, hostNode);
    }
    return hostNode;
  }
  if (typeof reactNode === "string" || typeof reactNode === "number") {
    const reactNodeFiber = createFiber(null, reactNode);
    insertFiber(currentFiber, reactNodeFiber);
    const hostNode = createTextNode(reactNode);
    reactNodeFiber.hostNode = hostNode;
    if (parentDOMNode !== null) {
      appendChild(parentDOMNode, hostNode);
    }
    return hostNode;
  }
  if (isArray(reactNode)) {
    const vNodeArrayFiber = createFiber(null, reactNode);
    insertFiber(currentFiber, vNodeArrayFiber);
    let hostNodes = [];
    for (let i = 0, length = reactNode.length; i < length; ++i) {
      hostNodes.push(mountReactNode(reactNode[i], parentDOMNode, vNodeArrayFiber));
    }
    vNodeArrayFiber.hostNode = hostNodes;
    pushSlotValue(currentFiber, hostNodes);
    return hostNodes;
  }
  return mountVNode(reactNode, parentDOMNode, currentFiber);
}

function mountVNode(vNode, parentDOMNode, currentFiber) {
  const vNodeFiber = createFiber(vNode.t, vNode.v);
  insertFiber(currentFiber, vNodeFiber);
  vNode.f = vNodeFiber;
  const templateNode = vNode.t;
  let values = vNode.v;
  if (values !== null) {
    // TODO
  }
  const hostNode = mountTemplateNode(templateNode, parentDOMNode, values, vNodeFiber);
  vNodeFiber.hostNode = hostNode;
  return hostNode;
}

function mountConditionalTemplate(conditionalTemplate, parentDOMNode, values, currentFiber) {
  const conditionalValueIndex = conditionalTemplate[1];
  const conditionalFiber = createFiber(conditionalTemplate, values);
  insertFiber(currentFiber, conditionalFiber);
  const conditionalValue = values[conditionalValueIndex];
  let hostNode;

  if (conditionalValue) {
    const consequentTemplate = conditionalTemplate[2];
    if (consequentTemplate !== null) {
      hostNode = mountTemplateNode(consequentTemplate, parentDOMNode, values, conditionalFiber);
    } else {
      hostNode = createPlaceholder();
    }
  } else {
    const alternateTemplate = conditionalTemplate[3];
    if (alternateTemplate !== null) {
      hostNode = mountTemplateNode(alternateTemplate, parentDOMNode, values, conditionalFiber);
    } else {
      hostNode = createPlaceholder();
    }
  }
  conditionalFiber.hostNode = hostNode;
  return hostNode;
}

function mountValue(templateTypeAndFlags, textTemplate, parentDOMNode, values, currentFiber) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_SHALLOW_STATIC) !== 0;
  const value = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  let hostNode;

  if (value === null || value === undefined || typeof value === "boolean") {
    hostNode = createPlaceholder();
  } else if (typeof value === "string" || typeof value === "number") {
    hostNode = createTextNode(value);
  } else {
    throw new Error("TODO mountValue");
  }
  pushSlotValue(currentFiber, hostNode);
  if (parentDOMNode !== null) {
    appendChild(parentDOMNode, hostNode);
  }
  return hostNode;
}

function mountVNodeArrayTemplate(templateTypeAndFlags, vNodeArrayTemplate, parentDOMNode, values, currentFiber) {
  const vNodeArrayValueIndex = vNodeArrayTemplate[1];
  const vNodeArray = values[vNodeArrayValueIndex];
  const vNodeArrayLength = vNodeArray.length;
  const vNodeArrayFiber = createFiber(vNodeArrayTemplate, vNodeArray);
  insertFiber(currentFiber, vNodeArrayFiber);

  for (let i = 0; i < vNodeArrayLength; ++i) {
    mountVNode(vNodeArray[i], parentDOMNode, vNodeArrayFiber);
  }
  // TODO
  return null;
}

function mountFragmentTemplate(fragmentTemplate, parentDOMNode, values, currentFiber) {
  const fragment = fragmentTemplate[1];

  for (let i = 0, length = fragment.length; i < length; ++i) {
    mountTemplateNode(fragment[i], parentDOMNode, values, currentFiber);
  }
  // TODO
  return null;
}

function mountTextArrayTemplate(templateTypeAndFlags, textTemplate, parentDOMNode, values, currentFiber) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_SHALLOW_STATIC) !== 0;
  const textArray = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  return mountTextArray(textArray, parentDOMNode);
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
    case COMPONENT:
      return mountFunctionComponentTemplate(
        false,
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
    case VALUE:
      return mountValue(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case FRAGMENT:
      return mountFragmentTemplate(templateNode, parentDOMNode, values, currentFiber);
    case CONDITIONAL:
      return mountConditionalTemplate(templateNode, parentDOMNode, values, currentFiber);
    case LOGICAL:
      throw new Error("TODO");
    case TEMPLATE_FUNCTION_CALL:
      throw new Error("TODO");
    case MULTI_CONDITIONAL:
      return mountMultiConditionalTemplate(templateNode, parentDOMNode, values, currentFiber);
    case TEXT_ARRAY:
      return mountTextArrayTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case VNODE_ARRAY:
      return mountVNodeArrayTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case REFERENCE_COMPONENT:
      return mountReferenceComponentTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case REFERENCE_REACT_NODE:
      return mountReferenceReactNodeTemplate(templateNode, parentDOMNode, values, currentFiber);
    case MULTI_RETURN_CONDITIONAL:
      return mountMultiReturnConditionalTemplate(templateNode, parentDOMNode, values, currentFiber);
    case CONTEXT_PROVIDER:
      throw new Error("TODO");
    case CONTEXT_CONSUMER:
      throw new Error("TODO");
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

function pushSlotValue(fiber, value) {
  let slots = fiber.slots;

  if (slots === null) {
    slots = fiber.slots = [];
  }
  slots.push(value);
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
