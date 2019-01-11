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
  renderMountMultiConditional, // MULTI_CONDITIONAL: 25,
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
  renderMountDynamicChildValue, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  renderMountDynamicChildrenValue, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  noOp, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  renderMountDynamicChildrenTemplateFromFunctionCall, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
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
  renderMountDynamicProp, // DYNAMIC_PROP: 61,
  renderMountStaticClassNameProp, // STATIC_PROP_CLASS_NAME: 62,
  renderMountDynamicClassNameProp, // DYNAMIC_PROP_CLASS_NAME: 63,
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

const PropFlagPartialTemplate = 1;

function noOp(index, opcodes, runtimeValues, state) {
  return index + 1;
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

function pushNodeOrFragment(state, nextNodeOrFragment, workInProgress) {
  if (state.currentNodeIsVoidElement === true) {
    state.currentNodeIsVoidElement = false;
    popNodeOrFragment(state, workInProgress);
  }
  const currentNode = state.currentNode;
  if (currentNode !== null) {
    state.nodeStack[state.nodeStackIndex++] = currentNode;
  }
  state.currentNode = nextNodeOrFragment;
}

function popNodeOrFragment(state, workInProgress) {
  if (state.currentNodeIsVoidElement === true) {
    state.currentNodeIsVoidElement = false;
    popNodeOrFragment(state, workInProgress);
  }
  let nodeStackIndex = state.nodeStackIndex;

  if (nodeStackIndex === 0) {
    state.currentNode = null;
  } else {
    const nodeStack = state.nodeStack;
    const childNode = state.currentNode;
    nodeStackIndex = --state.nodeStackIndex;
    const parentNode = nodeStack[nodeStackIndex];
    state.currentNode = parentNode;
    appendChild(parentNode, childNode);
    nodeStack[nodeStackIndex] = null;
  }
}

function renderMountDynamicChildrenTemplateFromFunctionCall(index, opcodes, runtimeValues, state, workInProgress) {
  const templateOpcodes = opcodes[++index];
  const computeValuesPointer = opcodes[++index];
  const computeValues = runtimeValues[computeValuesPointer];
  renderMountOpcodes(templateOpcodes, computeValues, state, workInProgress);
  return index;
}

function renderMountMultiConditional(index, opcodes, runtimeValues, state, workInProgress) {
  const conditionalSize = opcodes[++index];
  const startingIndex = index;
  const conditionalDefaultIndex = conditionalSize - 1;
  for (let conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
    if (conditionalIndex === conditionalDefaultIndex) {
      const defaultCaseOpcodes = opcodes[++index];
      if (defaultCaseOpcodes !== null) {
        renderMountOpcodes(defaultCaseOpcodes, runtimeValues, state, workInProgress);
      }
    } else {
      const caseConditionPointer = opcodes[++index];
      const caseConditionValue = runtimeValues[caseConditionPointer];
      if (caseConditionValue) {
        const caseOpcodes = opcodes[++index];
        if (caseOpcodes !== null) {
          renderMountOpcodes(caseOpcodes, runtimeValues, state, workInProgress);
        }
        break;
      }
      ++index;
    }
  }
  return startingIndex + (conditionalSize - 1) * 2 + 1;
}

function renderMountStaticProp(index, opcodes, runtimeValues, state) {
  const propName = opcodes[++index];
  const staticPropValue = opcodes[++index];

  state.currentNode.setAttribute(propName, staticPropValue);
  return index;
}

function renderMountDynamicProp(index, opcodes, runtimeValues, state) {
  const propName = opcodes[++index];
  const propInformation = opcodes[++index];
  const dynamicPropValuePointer = opcodes[++index];
  const dynamicPropValue = runtimeValues[dynamicPropValuePointer];

  if (propInformation & PropFlagPartialTemplate) {
    throw new Error("TODO renderStaticProp");
  } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
    state.currentNode.setAttribute(propName, dynamicPropValue);
  }
  return index;
}

function renderMountStaticClassNameProp(index, opcodes, runtimeValues, state) {
  const staticClassName = opcodes[++index];
  state.currentNode.className = staticClassName;
  return index;
}

function renderMountDynamicClassNameProp(index, opcodes, runtimeValues, state) {
  const propInformation = opcodes[++index];
  const dynamicClassNamePointer = opcodes[++index];
  const dynamicClassName = runtimeValues[dynamicClassNamePointer];

  if (propInformation & PropFlagPartialTemplate) {
    throw new Error("TODO renderMountDynamicClassNameProp");
  } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
    state.currentNode.className = dynamicClassName;
  }
  return index;
}

function renderMountOpenFragment(index, opcodes, runtimeValues, state, workInProgress) {
  pushNodeOrFragment(state, [], workInProgress);
  return index;
}

function renderMountCloseFragment(index, opcodes, runtimeValues, state, workInProgress) {
  popNodeOrFragment(state, workInProgress);
  return index;
}

function renderMountOpenElement(index, opcodes, runtimeValues, state, workInProgress) {
  const elementTag = opcodes[++index];
  const elem = createElement(elementTag);
  pushNodeOrFragment(state, elem, workInProgress);
  return index;
}

function renderMountOpenVoidElement(index, opcodes, runtimeValues, state, workInProgress) {
  const elementTag = opcodes[++index];
  const elem = createElement(elementTag);
  pushNodeOrFragment(state, elem, workInProgress);
  state.currentNodeIsVoidElement = true;
  return index;
}

function renderMountOpenDivElement(index, opcodes, runtimeValues, state, workInProgress) {
  const elem = createElement("div");
  pushNodeOrFragment(state, elem, workInProgress);
  return index;
}

function renderMountOpenSpanElement(index, opcodes, runtimeValues, state, workInProgress) {
  const elem = createElement("span");
  pushNodeOrFragment(state, elem, workInProgress);
  return index;
}

function renderMountCloseElement(index, opcodes, runtimeValues, state, workInProgress) {
  popNodeOrFragment(state, workInProgress);
  return index;
}

function renderMountStaticChildrenValue(index, opcodes, runtimeValues, state) {
  const staticTextContent = opcodes[++index];
  state.currentNode.textContent = staticTextContent;
  return index;
}

function renderMountDynamicChildrenValue(index, opcodes, runtimeValues, state) {
  const dynamicTextContentPointer = opcodes[++index];
  const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
  state.currentNode.textContent = dynamicTextContent;
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

function renderMountDynamicChildValue(index, opcodes, runtimeValues, state) {
  const dynamicTextChildPointer = opcodes[++index];
  const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
  const textNode = createTextNode(dynamicTextChild);
  const currentNode = state.currentNode;

  if (currentNode === null) {
    state.currentNode = textNode;
  } else {
    appendChild(currentNode, textNode);
  }
  return index;
}

function renderMountComponent(index, opcodes, runtimeValues, state, workInProgress) {
  let currentComponent = state.currentComponent;
  const previousComponent = currentComponent;
  if (currentComponent === null) {
    const rootPropsShape = opcodes[++index];
    currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
  } else {
    state.currentComponent = createComponent(state.propsArray, false);
  }
  const creationOpcodes = opcodes[++index];
  const componentFiber = createOpcodeFiber(currentComponent, runtimeValues);
  insertChildFiberIntoParentFiber(workInProgress, componentFiber);
  const previousValue = state.currentValue;
  state.currentValue = undefined;
  renderMountOpcodes(creationOpcodes, runtimeValues, state, componentFiber);
  state.currentValue = previousValue;
  state.currentComponent = previousComponent;
}

function renderMountUnconditionalTemplate(index, opcodes, runtimeValues, state, workInProgress) {
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
  const templateFiber = createOpcodeFiber(null, templateRuntimeValues);
  insertChildFiberIntoParentFiber(workInProgress, templateFiber);
  renderMountOpcodes(templateOpcodes, templateRuntimeValues, state, templateFiber);
  templateFiber.stateNode = state.currentNode;
}

function renderMountOpcodes(opcodes, runtimeValues, state, workInProgress) {
  const opcodesLength = opcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = opcodes[index];
    const renderOpcode = mountOpcodeRenderFuncs[opcode];
    const shouldTerminate = doesOpcodeFuncTerminate[opcode];
    if (shouldTerminate === 1) {
      renderOpcode(index, opcodes, runtimeValues, state, workInProgress);
      return;
    } else {
      index = renderOpcode(index, opcodes, runtimeValues, state, workInProgress) + 1;
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

function appendFiberStateNodes(DOMContainer, fiber) {
  while (fiber !== null) {
    const sibling = fiber.sibling;
    if (sibling !== null) {
      appendFiberStateNodes(DOMContainer, sibling);
    }
    const stateNode = fiber.stateNode;
    if (stateNode !== null && (isArray(stateNode) || stateNode.parentNode !== undefined)) {
      appendChild(DOMContainer, stateNode);
      return;
    }
    fiber = fiber.child;
  }
}

function renderRootFiber(rootFiber, creationOpcodes, DOMContainer, props) {
  if (rootFiber.child === null) {
    // Mount
    const state = createState(props);
    renderMountOpcodes(creationOpcodes, emptyArray, state, rootFiber);
    appendFiberStateNodes(DOMContainer, rootFiber);
  } else {
    // Update
  }
}

function createOpcodeFiber(stateNode, values) {
  return {
    child: null,
    sibling: null,
    parent: null,
    stateNode,
    values,
  };
}

function insertChildFiberIntoParentFiber(parent, child) {
  child.parent = parent;
  if (parent.child === null) {
    parent.child = child;
  } else {
    // TODO
  }
}

function renderNodeToRootContainer(node, DOMContainer) {
  let rootFiber = rootFibers.get(DOMContainer);

  if (node === null || node === undefined) {
    if (rootFiber !== undefined) {
      // Unmount
    }
  } else if (node.$$typeof === reactElementSymbol) {
    if (rootFiber === undefined) {
      rootFiber = createOpcodeFiber(null, null);
      rootFibers.set(DOMContainer, rootFiber);
    }
    return renderRootFiber(rootFiber, node.type, DOMContainer, node.props);
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
