import { currentDispatcher } from "./index";
import { Dispatcher, callComputeFunctionWithHooks } from "./dom-dispatcher";
import { appendChild, createElement, convertRootPropsToPropsArray, reactElementSymbol } from "./utils";

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

function mountFunctionComponent(isRoot, templateTypeAndFlags, componentTemplate, parentDOMNode, values, currentFiber) {
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

    debugger;
    // if (hasHooks === true) {
    //   prepareToUseHooks(computeFunction);
    // }
    // const componentValues = callComputeFunctionWithArray(computeFunction, componentProps);
    // if (hasHooks === true) {
    //   finishHooks(computeFunction);
    // }
    // if (componentValues === null) {
    //   return "";
    // }
    // return renderTemplateToString(childTemplateNode, componentValues, isOnlyChild, state);
  }
  const childTemplateNode = componentTemplate[1];
  return mountTemplateNode(childTemplateNode, parentDOMNode, values, currentFiber);
}

function mountHostComponent(templateTypeAndFlags, hostComponentTemplate, parentDOMNode, values, currentFiber) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const tagName = hostComponentTemplate[1];
  const DOMNode = createElement(tagName);
  let childrenTemplateIndex = 2;

  if ((templateFlags & HAS_DYNAMIC_TEXT_CONTENT) !== 0) {
    const textContentValueIndex = hostComponentTemplate[childrenTemplateIndex];
    const text = values[textContentValueIndex];
    if (text !== undefined && text !== null && text !== "") {
      DOMNode.textContent = text;
    }
  } else if ((templateFlags & HAS_STATIC_TEXT_CONTENT) !== 0) {
    DOMNode.textContent = hostComponentTemplate[childrenTemplateIndex];
  }

  if (parentDOMNode !== null) {
    appendChild(parentDOMNode, DOMNode);
  }
}

function mountTemplateNode(templateNode, parentDOMNode, values, currentFiber) {
  const templateTypeAndFlags = templateNode[0];
  const templateType = templateTypeAndFlags & 0x3f;

  switch (templateType) {
    case ROOT_COMPONENT:
      return mountFunctionComponent(true, templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
    case HOST_COMPONENT:
      return mountHostComponent(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);
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
