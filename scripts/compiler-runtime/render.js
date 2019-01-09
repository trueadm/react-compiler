"use strict";

const { createComponent, createRootComponent, emptyArray, isArray, reactElementSymbol } = require("./utils");
const rootFibers = new Map();

const mountOpcodeRenderFuncs = [
  renderMountComponent, // COMPONENT: 0,
  noOp, // COMPONENT_WITH_HOOKS: 1,
  noOp, // STATIC_VALUE: 2,
  noOp, // DYNAMIC_VALUE: 3,
  noOp, // EMPTY 4
  noOp, // EMPTY 5
  renderMountOpenElement, // OPEN_ELEMENT: 6,
  renderMountOpenVoidElement, // OPEN_VOID_ELEMENT: 7,
  renderMountOpenDivElement, // OPEN_ELEMENT_DIV: 8,
  renderMountOpenSpanElement, // OPEN_ELEMENT_SPAN: 9,
  renderMountCloseElement, // CLOSE_ELEMENT: 10,
  noOp, // CLOSE_ELEMENT: 11,
  renderMountOpenFragment, // OPEN_FRAGMENT: 12,
  renderMountCloseFragment, // CLOSE_FRAGMENT: 13,
  noOp, // OPEN_CONTEXT_PROVIDER: 14,
  noOp, // CLOSE_CONTEXT_PROVIDER: 15,
  noOp, // OPEN_PROP_STYLE: 16,
  noOp, // CLOSE_PROP_STYLE: 17,
  noOp, // EMPTY 18
  noOp, // EMPTY 19
  renderMountUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  noOp, // CONDITIONAL_TEMPLATE: 21,
  noOp, // TEMPLATE: 22,
  noOp, // TEMPLATE_FROM_FUNC_CALL: 23,
  noOp, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  noOp, // MULTI_CONDITIONAL: 25,
  noOp, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  noOp, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  noOp, // CONTEXT_CONSUMER_TEMPLATE: 28,
  noOp, // REF_COMPONENT: 29,
  noOp, // CONDITIONAL: 30,
  noOp, // LOGICAL_OR: 31,
  noOp, // LOGICAL_AND: 32,
  noOp, // EMPTY 33
  noOp, // EMPTY 34
  noOp, // EMPTY 35
  noOp, // EMPTY 36
  noOp, // EMPTY 37
  noOp, // EMPTY 38
  noOp, // EMPTY 39
  renderMountStaticChildValue, // ELEMENT_STATIC_CHILD_VALUE: 40,
  renderMountStaticChildrenValue, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  noOp, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  noOp, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  noOp, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  noOp, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
  noOp, // EMPTY 50
  noOp, // EMPTY 51
  noOp, // EMPTY 52
  noOp, // EMPTY 53
  noOp, // EMPTY 54
  noOp, // EMPTY 55
  noOp, // EMPTY 56
  noOp, // EMPTY 57
  noOp, // EMPTY 58
  noOp, // EMPTY 59
  renderMountStaticProp, // STATIC_PROP: 60,
  noOp, // DYNAMIC_PROP: 61,
  noOp, // STATIC_PROP_CLASS_NAME: 62,
  noOp, // DYNAMIC_PROP_CLASS_NAME: 63,
  noOp, // STATIC_PROP_VALUE: 64,
  noOp, // DYNAMIC_PROP_VALUE: 65,
  noOp, // STATIC_PROP_STYLE: 66,
  noOp, // DYNAMIC_PROP_STYLE: 67,
  noOp, // STATIC_PROP_UNITLESS_STYLE: 68,
  noOp, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  noOp, // STATIC_PROP_KEY: 70,
  noOp, // DYNAMIC_PROP_KEY: 71,
  noOp, // DYNAMIC_PROP_REF: 72,
];

const doesOpcodeFuncTerminate = [
  1, // COMPONENT: 0,
  1, // COMPONENT_WITH_HOOKS: 1,
  1, // STATIC_VALUE: 2,
  1, // DYNAMIC_VALUE: 3,
  0, // EMPTY 4
  0, // EMPTY 5
  0, // OPEN_ELEMENT: 6,
  0, // OPEN_VOID_ELEMENT: 7,
  0, // OPEN_ELEMENT_DIV: 8,
  0, // OPEN_ELEMENT_SPAN: 9,
  0, // CLOSE_ELEMENT: 10,
  0, // CLOSE_VOID_ELEMENT: 11,
  0, // OPEN_FRAGMENT: 12,
  0, // CLOSE_FRAGMENT: 13,
  0, // OPEN_CONTEXT_PROVIDER: 14,
  0, // CLOSE_CONTEXT_PROVIDER: 15,
  0, // OPEN_PROP_STYLE: 16,
  0, // CLOSE_PROP_STYLE: 17,
  0, // EMPTY 18
  0, // EMPTY 19
  1, // UNCONDITIONAL_TEMPLATE: 20,
  1, // CONDITIONAL_TEMPLATE: 21,
  1, // TEMPLATE: 22,
  0, // TEMPLATE_FROM_FUNC_CALL: 23,
  0, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  0, // MULTI_CONDITIONAL: 25,
  0, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  0, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  0, // CONTEXT_CONSUMER_TEMPLATE: 28,
  0, // REF_COMPONENT: 29,
  0, // CONDITIONAL: 30,
  0, // LOGICAL_OR: 31,
  0, // LOGICAL_AND: 32,
  0, // EMPTY 33
  0, // EMPTY 34
  0, // EMPTY 35
  0, // EMPTY 36
  0, // EMPTY 37
  0, // EMPTY 38
  0, // EMPTY 39
  0, // ELEMENT_STATIC_CHILD_VALUE: 40,
  0, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  0, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  0, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  0, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  0, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  0, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  0, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  0, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  0, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
  0, // EMPTY 50
  0, // EMPTY 51
  0, // EMPTY 52
  0, // EMPTY 53
  0, // EMPTY 54
  0, // EMPTY 55
  0, // EMPTY 56
  0, // EMPTY 57
  0, // EMPTY 58
  0, // EMPTY 59
  0, // STATIC_PROP: 60,
  0, // DYNAMIC_PROP: 61,
  0, // STATIC_PROP_CLASS_NAME: 62,
  0, // DYNAMIC_PROP_CLASS_NAME: 63,
  0, // STATIC_PROP_VALUE: 64,
  0, // DYNAMIC_PROP_VALUE: 65,
  0, // STATIC_PROP_STYLE: 66,
  0, // DYNAMIC_PROP_STYLE: 67,
  0, // STATIC_PROP_UNITLESS_STYLE: 68,
  0, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  0, // STATIC_PROP_KEY: 70,
  0, // DYNAMIC_PROP_KEY: 71,
  0, // DYNAMIC_PROP_REF: 72,
];

function noOp(index, opcodes, runtimeValues, state) {
  return index;
}

function createElement(tagName) {
  return document.createElement(tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function appendChild(parentElementOrFragment, element) {
  if (isArray(parentElementOrFragment)) {
    parentElementOrFragment.push(element);
  } else if (isArray(element)) {
    for (let i = 0, length = element.length; i < length; i++) {
      appendChild(parentElementOrFragment, element[i]);
    }
  } else {
    parentElementOrFragment.appendChild(element);
  }
}

function pushNodeOrFragment(state, nextNodeOrFragment) {
  if (state.currentNodeIsVoidElement === true) {
    state.currentNodeIsVoidElement = false;
    popNodeOrFragment(state);
  }
  const currentNode = state.currentNode;
  if (currentNode !== null) {
    state.nodeStack[state.nodeStackIndex++] = currentNode;
  }
  state.currentNode = nextNodeOrFragment;
}

function popNodeOrFragment(state) {
  if (state.currentNodeIsVoidElement === true) {
    state.currentNodeIsVoidElement = false;
    popNodeOrFragment(state);
  }
  let nodeStackIndex = state.nodeStackIndex;

  if (nodeStackIndex !== 0) {
    const nodeStack = state.nodeStack;
    const childNode = state.currentNode;
    nodeStackIndex = --state.nodeStackIndex;
    const parentNode = nodeStack[nodeStackIndex];
    state.currentNode = parentNode;
    appendChild(parentNode, childNode);
    nodeStack[nodeStackIndex] = null;
  }
}

function renderMountStaticProp(index, opcodes, runtimeValues, state) {
  const propName = opcodes[++index];
  const staticPropValue = opcodes[++index];

  state.currentNode.setAttribute(propName, staticPropValue);
  return index;
}

function renderMountOpenFragment(index, opcodes, runtimeValues, state) {
  pushNodeOrFragment(state, []);
  return index;
}

function renderMountCloseFragment(index, opcodes, runtimeValues, state) {
  popNodeOrFragment(state);
  return index;
}

function renderMountOpenElement(index, opcodes, runtimeValues, state) {
  const elementTag = opcodes[++index];
  const elem = createElement(elementTag);
  pushNodeOrFragment(state, elem);
  return index;
}

function renderMountOpenVoidElement(index, opcodes, runtimeValues, state) {
  const elementTag = opcodes[++index];
  const elem = createElement(elementTag);
  pushNodeOrFragment(state, elem);
  state.currentNodeIsVoidElement = true;
  return index;
}

function renderMountOpenDivElement(index, opcodes, runtimeValues, state) {
  const elem = createElement("div");
  pushNodeOrFragment(state, elem);
  return index;
}

function renderMountOpenSpanElement(index, opcodes, runtimeValues, state) {
  const elem = createElement("span");
  pushNodeOrFragment(state, elem);
  return index;
}

function renderMountCloseElement(index, opcodes, runtimeValues, state) {
  popNodeOrFragment(state);
  return index;
}

function renderMountStaticChildrenValue(index, opcodes, runtimeValues, state) {
  const staticTextContent = opcodes[++index];
  state.currentNode.textContent = staticTextContent;
  return index;
}

function renderMountStaticChildValue(index, opcodes, runtimeValues, state) {
  const staticTextChild = opcodes[++index];
  const textNode = createTextNode(staticTextChild);
  const currentNode = state.currentNode;

  if (currentNode === null) {
    state.currentNode = textNode;
  } else {
    appendChild(currentNode, textNode);
  }
  return index;
}

function renderMountComponent(index, opcodes, runtimeValues, state) {
  let currentComponent = state.currentComponent;
  const previousComponent = currentComponent;
  if (currentComponent === null) {
    const rootPropsShape = opcodes[++index];
    currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
  } else {
    state.currentComponent = createComponent(state.propsArray, false);
  }
  const templateNode = opcodes[++index];
  const creationOpcodes = templateNode.c;
  const previousValue = state.currentValue;
  state.currentValue = undefined;
  renderMountOpcodes(creationOpcodes, runtimeValues, state);
  state.currentValue = previousValue;
  state.currentComponent = previousComponent;
}

function renderMountUnconditionalTemplate(index, opcodes, runtimeValues, state) {
  const templateOpcodes = opcodes[++index];
  const computeFunction = opcodes[++index];
  let templateRuntimeValues = runtimeValues;
  // TODO try passing individual props if array is small enough, using array spread?
  // Array.prototype.apply is not as fast as normal function calls typically.
  if (computeFunction !== null) {
    const computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    if (computeFunctionUsesHooks === true) {
      // prepareToUseHooks(state.currentComponent);
    }
    templateRuntimeValues = computeFunction.apply(null, state.currentComponent.props);
    if (computeFunctionUsesHooks === true) {
      // finishHooks();
      state.computeFunctionUsesHooks = false;
    }
  }
  renderMountOpcodes(templateOpcodes, templateRuntimeValues, state);
}

function renderMountOpcodes(opcodes, runtimeValues, state) {
  const opcodesLength = opcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = opcodes[index];
    const renderOpcode = mountOpcodeRenderFuncs[opcode];
    const shouldTerminate = doesOpcodeFuncTerminate[opcode];
    if (shouldTerminate === 1) {
      renderOpcode(index, opcodes, runtimeValues, state);
      return;
    } else {
      index = renderOpcode(index, opcodes, runtimeValues, state) + 1;
    }
  }
}

function createState(rootPropsObject) {
  return {
    currentComponent: null,
    currentNode: null,
    currentNodeIsVoidElement: false,
    nodeStack: [],
    nodeStackIndex: 0,
    propsArray: emptyArray,
    rootPropsObject,
  };
}

function renderRootFiber(rootFiber, DOMContainer) {
  let { memoizedProps, mountOpcodes, state } = rootFiber;

  if (state === null) {
    // Mount
    state = createState(memoizedProps);
    rootFiber.state = state;
    renderMountOpcodes(mountOpcodes, emptyArray, state);
    appendChild(DOMContainer, state.currentNode);
  } else {
    // Update
  }
}

function createRootFiber(mountOpcodes, memoizedProps) {
  return {
    memoizedProps,
    mountOpcodes,
    state: null,
    unmountOpcodes: [],
    updateOpcodes: [],
  };
}

function renderNodeToRootContainer(node, DOMContainer) {
  let rootFiber = rootFibers.get(DOMContainer);

  if (node === null || node === undefined) {
    if (rootFiber !== undefined) {
      // Unmount
    }
  } else if (node.$$typeof === reactElementSymbol) {
    if (rootFiber === undefined) {
      rootFiber = createRootFiber(node.type, node.props);
      rootFibers.set(DOMContainer, rootFiber);
    }
    return renderRootFiber(rootFiber, DOMContainer);
  } else {
    throw new Error("render() expects a ReactElement as the first argument");
  }
}

function render(node, DOMContainer) {
  return renderNodeToRootContainer(node, DOMContainer);
}

/* eslint-disable-next-line */
module.exports = {
  render,
};
