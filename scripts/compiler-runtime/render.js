"use strict";

const {
  convertRootPropsToPropsArray,
  createComponent,
  createRootComponent,
  emptyArray,
  isArray,
  reactElementSymbol,
} = require("./utils");
const rootStates = new Map();
const updateAndUnmountOpcodesFromMountOpcodes = new Map();

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
  renderMountConditional, // CONDITIONAL: 30,
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

const updateOpcodeRenderFuncs = [
  renderUpdateComponent, // COMPONENT: 0,
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
  renderUpdateUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  noOp, // CONDITIONAL_TEMPLATE: 21,
  noOp, // TEMPLATE: 22,
  noOp, // TEMPLATE_FROM_FUNC_CALL: 23,
  noOp, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  renderMountMultiConditional, // MULTI_CONDITIONAL: 25,
  noOp, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  noOp, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  noOp, // CONTEXT_CONSUMER_TEMPLATE: 28,
  noOp, // REF_COMPONENT: 29,
  renderUpdateConditional, // CONDITIONAL: 30,
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

const unmountOpcodeRenderFuncs = [
  renderUpdateComponent, // COMPONENT: 0,
  noOp, // COMPONENT_WITH_HOOKS: 1,
  noOp, // STATIC_VALUE: 2,
  noOp, // DYNAMIC_VALUE: 3,
  noOp, // EMPTY 4
  noOp, // EMPTY 5
  renderMountOpenElement, // OPEN_ELEMENT: 6,
  renderMountOpenVoidElement, // OPEN_VOID_ELEMENT: 7,
  renderMountOpenDivElement, // OPEN_ELEMENT_DIV: 8,
  renderUnmountOpenSpanElement, // OPEN_ELEMENT_SPAN: 9,
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
  renderUpdateUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  noOp, // CONDITIONAL_TEMPLATE: 21,
  noOp, // TEMPLATE: 22,
  noOp, // TEMPLATE_FROM_FUNC_CALL: 23,
  noOp, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  renderMountMultiConditional, // MULTI_CONDITIONAL: 25,
  noOp, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  noOp, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  noOp, // CONTEXT_CONSUMER_TEMPLATE: 28,
  noOp, // REF_COMPONENT: 29,
  renderUpdateConditional, // CONDITIONAL: 30,
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

function removeChild(parent, child) {
  parent.removeChild(child);
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
  if (state.currentHostNodeIsVoidElement === true) {
    state.currentHostNodeIsVoidElement = false;
    popNodeOrFragment(state, workInProgress);
  }
  const currentHostNode = state.currentHostNode;
  if (currentHostNode !== null) {
    state.hostNodeStack[state.hostNodeStackIndex++] = currentHostNode;
  }
  state.currentHostNode = nextNodeOrFragment;
}

function popNodeOrFragment(state, workInProgress) {
  if (state.currentHostNodeIsVoidElement === true) {
    state.currentHostNodeIsVoidElement = false;
    popNodeOrFragment(state, workInProgress);
  }
  let hostNodeStackIndex = state.hostNodeStackIndex;

  if (hostNodeStackIndex === 0) {
    state.currentHostNode = null;
  } else {
    const hostNodeStack = state.hostNodeStack;
    const childNode = state.currentHostNode;
    hostNodeStackIndex = --state.hostNodeStackIndex;
    const parentNode = hostNodeStack[hostNodeStackIndex];
    state.currentHostNode = parentNode;
    appendChild(parentNode, childNode);
    hostNodeStack[hostNodeStackIndex] = null;
  }
}

function renderMountConditional(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const conditionValuePointer = mountOpcodes[++index];
  const conditionValue = runtimeValues[conditionValuePointer];
  const consequentMountOpcodes = mountOpcodes[++index];
  const alternateMountOpcodes = mountOpcodes[++index];

  if (shouldCreateOpcodes) {
    updateOpcodes.push(30, conditionValuePointer, consequentMountOpcodes, alternateMountOpcodes);
  }

  if (conditionValue) {
    if (consequentMountOpcodes !== null) {
      const [
        consequentUpdateOpcodes,
        consequentUnmountOpcodes,
        shouldCreateConsequentOpcodes,
      ] = getOpcodesFromMountOpcodes(consequentMountOpcodes);
      renderMountOpcodes(
        consequentMountOpcodes,
        consequentUpdateOpcodes,
        consequentUnmountOpcodes,
        shouldCreateConsequentOpcodes,
        runtimeValues,
        state,
        workInProgress,
      );
    }
    return index;
  }
  if (alternateMountOpcodes !== null) {
    const [alternateUpdateOpcodes, alternateUnmountOpcodes, shouldCreateAlternateOpcodes] = getOpcodesFromMountOpcodes(
      alternateMountOpcodes,
    );
    renderMountOpcodes(
      alternateMountOpcodes,
      alternateUpdateOpcodes,
      alternateUnmountOpcodes,
      shouldCreateAlternateOpcodes,
      runtimeValues,
      state,
      workInProgress,
    );
  }
  return index;
}

function renderUpdateConditional(
  index,
  updateOpcodes,
  previousRuntimeValues,
  nextRuntimeValues,
  state,
  workInProgress,
) {
  const conditionValuePointer = updateOpcodes[++index];
  const previousConditionValue = previousRuntimeValues[conditionValuePointer];
  const nextConditionValue = nextRuntimeValues[conditionValuePointer];
  const consequentMountOpcodes = updateOpcodes[++index];
  const alternateMountOpcodes = updateOpcodes[++index];
  const shouldUpdate = previousConditionValue === nextConditionValue;

  if (nextConditionValue) {
    if (consequentMountOpcodes !== null) {
      const [
        consequentUpdateOpcodes,
        consequentUnmountpcodes,
        shouldCreateConsequentOpcodes,
      ] = getOpcodesFromMountOpcodes(consequentMountOpcodes);
      if (shouldUpdate) {
        // debugger;
      } else {
        if (alternateMountOpcodes !== null) {
          const [, alternateUnmountOpcodes] = getOpcodesFromMountOpcodes(alternateMountOpcodes);
          renderUnmountOpcodes(alternateUnmountOpcodes, state, workInProgress);
        }
        renderMountOpcodes(
          consequentMountOpcodes,
          consequentUpdateOpcodes,
          consequentUnmountpcodes,
          shouldCreateConsequentOpcodes,
          nextRuntimeValues,
          state,
          workInProgress,
        );
      }
    }
    return index;
  }
  if (alternateMountOpcodes !== null) {
    const [alternateUpdateOpcodes, alternateUnmountOpcodes, shouldCreateAlternateOpcodes] = getOpcodesFromMountOpcodes(
      alternateMountOpcodes,
    );
    if (shouldUpdate) {
      // debugger;
    } else {
      // debugger;
      renderMountOpcodes(
        alternateMountOpcodes,
        alternateUpdateOpcodes,
        alternateUnmountOpcodes,
        shouldCreateAlternateOpcodes,
        nextRuntimeValues,
        state,
        workInProgress,
      );
    }
  }
  return index;
}

function renderMountDynamicChildrenTemplateFromFunctionCall(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const templateOpcodes = mountOpcodes[++index];
  const computeValuesPointer = mountOpcodes[++index];
  const computeValues = runtimeValues[computeValuesPointer];
  renderMountOpcodes(templateOpcodes, computeValues, state, workInProgress);
  return index;
}

function renderMountMultiConditional(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const conditionalSize = mountOpcodes[++index];
  const startingIndex = index;
  const conditionalDefaultIndex = conditionalSize - 1;
  for (let conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
    if (conditionalIndex === conditionalDefaultIndex) {
      const defaultCaseOpcodes = mountOpcodes[++index];
      if (defaultCaseOpcodes !== null) {
        renderMountOpcodes(defaultCaseOpcodes, runtimeValues, state, workInProgress);
      }
    } else {
      const caseConditionPointer = mountOpcodes[++index];
      const caseConditionValue = runtimeValues[caseConditionPointer];
      if (caseConditionValue) {
        const caseOpcodes = mountOpcodes[++index];
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

function renderMountStaticProp(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const propName = mountOpcodes[++index];
  const staticPropValue = mountOpcodes[++index];

  state.currentHostNode.setAttribute(propName, staticPropValue);
  return index;
}

function renderMountDynamicProp(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const propName = mountOpcodes[++index];
  const propInformation = mountOpcodes[++index];
  const dynamicPropValuePointer = mountOpcodes[++index];
  const dynamicPropValue = runtimeValues[dynamicPropValuePointer];

  if (propInformation & PropFlagPartialTemplate) {
    throw new Error("TODO renderStaticProp");
  } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
    state.currentHostNode.setAttribute(propName, dynamicPropValue);
  }
  return index;
}

function renderMountStaticClassNameProp(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const staticClassName = mountOpcodes[++index];
  state.currentHostNode.className = staticClassName;
  return index;
}

function renderMountDynamicClassNameProp(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const propInformation = mountOpcodes[++index];
  const dynamicClassNamePointer = mountOpcodes[++index];
  const dynamicClassName = runtimeValues[dynamicClassNamePointer];

  if (propInformation & PropFlagPartialTemplate) {
    throw new Error("TODO renderMountDynamicClassNameProp");
  } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
    state.currentHostNode.className = dynamicClassName;
  }
  return index;
}

function renderMountOpenFragment(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  pushNodeOrFragment(state, [], workInProgress);
  return index;
}

function renderMountCloseFragment(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  popNodeOrFragment(state, workInProgress);
  return index;
}

function renderMountOpenElement(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const elementTag = mountOpcodes[++index];
  const elemValuePointer = mountOpcodes[++index];
  const elem = createElement(elementTag);
  if (shouldCreateOpcodes) {
    unmountOpcodes.push(9, elemValuePointer);
  }
  workInProgress.values[elemValuePointer] = elem;
  pushNodeOrFragment(state, elem, workInProgress);
  return index;
}

function renderMountOpenVoidElement(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const elementTag = mountOpcodes[++index];
  const elemValuePointer = mountOpcodes[++index];
  const elem = createElement(elementTag);
  if (shouldCreateOpcodes) {
    unmountOpcodes.push(9, elemValuePointer);
  }
  workInProgress.values[elemValuePointer] = elem;
  pushNodeOrFragment(state, elem, workInProgress);
  state.currentHostNodeIsVoidElement = true;
  return index;
}

function renderMountOpenDivElement(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const elem = createElement("div");
  const elemValuePointer = mountOpcodes[++index];
  if (shouldCreateOpcodes) {
    unmountOpcodes.push(9, elemValuePointer);
  }
  workInProgress.values[elemValuePointer] = elem;
  pushNodeOrFragment(state, elem, workInProgress);
  return index;
}

function renderMountOpenSpanElement(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const elem = createElement("span");
  const elemValuePointer = mountOpcodes[++index];
  if (shouldCreateOpcodes) {
    unmountOpcodes.push(9, elemValuePointer);
  }
  workInProgress.values[elemValuePointer] = elem;
  pushNodeOrFragment(state, elem, workInProgress);
  return index;
}

function renderUnmountOpenSpanElement(index, unmountOpcodes, state, workInProgress) {
  const elemValuePointer = unmountOpcodes[++index];
  const elem = workInProgress.values[elemValuePointer];
  removeChild(elem.parentNode, elem);
  return index;
}

function renderMountCloseElement(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  popNodeOrFragment(state, workInProgress);
  return index;
}

function renderMountStaticChildrenValue(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const staticTextContent = mountOpcodes[++index];
  state.currentHostNode.textContent = staticTextContent;
  return index;
}

function renderMountDynamicChildrenValue(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const dynamicTextContentPointer = mountOpcodes[++index];
  const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
  state.currentHostNode.textContent = dynamicTextContent;
  return index;
}

function renderMountStaticChildValue(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const staticTextChild = mountOpcodes[++index];
  const textNode = createTextNode(staticTextChild);
  const currentHostNode = state.currentHostNode;

  if (currentHostNode === null) {
    state.currentHostNode = textNode;
  } else {
    appendChild(currentHostNode, textNode);
  }
  return index;
}

function renderMountDynamicChildValue(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const dynamicTextChildPointer = mountOpcodes[++index];
  const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
  const textNode = createTextNode(dynamicTextChild);
  const currentHostNode = state.currentHostNode;

  if (currentHostNode === null) {
    state.currentHostNode = textNode;
  } else {
    appendChild(currentHostNode, textNode);
  }
  return index;
}

function renderMountComponent(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  let currentComponent = state.currentComponent;
  let rootPropsShape;
  const previousComponent = currentComponent;
  if (currentComponent === null) {
    rootPropsShape = mountOpcodes[++index];
    currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
  } else {
    state.currentComponent = createComponent(state.propsArray, false);
  }
  const componentMountOpcodes = mountOpcodes[++index];
  const [componentUpdateOpcodes, componentUnmountOpcodes, shouldCreateComponentOpcodes] = getOpcodesFromMountOpcodes(
    componentMountOpcodes,
  );
  const componentFiber = createOpcodeFiber(null, runtimeValues);
  if (shouldCreateComponentOpcodes) {
    updateOpcodes.push(0);
    if (rootPropsShape !== undefined) {
      updateOpcodes.push(rootPropsShape);
    }
    updateOpcodes.push(componentUpdateOpcodes);
  }
  componentFiber.values[0] = currentComponent;
  if (workInProgress === null) {
    // Root
    state.fiber = componentFiber;
  } else {
    insertChildFiberIntoParentFiber(workInProgress, componentFiber);
  }
  const previousValue = state.currentValue;
  state.currentValue = undefined;
  renderMountOpcodes(
    componentMountOpcodes,
    componentUpdateOpcodes,
    componentUnmountOpcodes,
    shouldCreateComponentOpcodes,
    runtimeValues,
    state,
    componentFiber,
  );
  state.currentValue = previousValue;
  state.currentComponent = previousComponent;
}

function renderUpdateComponent(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
  let currentComponent = state.currentComponent;
  let componentFiber;
  const previousComponent = currentComponent;
  if (workInProgress === null) {
    componentFiber = state.fiber;
  }
  let component = componentFiber.values[0];
  let nextPropsArray;

  if (currentComponent === null) {
    const rootPropsShape = updateOpcodes[++index];
    nextPropsArray = convertRootPropsToPropsArray(state.rootPropsObject, rootPropsShape);
  } else {
    nextPropsArray = state.propsArray;
  }
  component.props = nextPropsArray;
  const componentUpdateOpcodes = updateOpcodes[++index];
  state.currentComponent = currentComponent = component;
  renderUpdateOpcodes(componentUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, componentFiber);
  state.currentComponent = previousComponent;
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

function renderMountUnconditionalTemplate(
  index,
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const templateMountOpcodes = mountOpcodes[++index];
  const [templateUpdateOpcodes, templateUnmountOpcodes, shouldCreateTemplateOpcodes] = getOpcodesFromMountOpcodes(
    templateMountOpcodes,
  );
  const computeFunction = mountOpcodes[++index];
  let templateValuesPointerIndex;

  if (shouldCreateTemplateOpcodes) {
    templateValuesPointerIndex = workInProgress.values.length;
    updateOpcodes.push(20, templateValuesPointerIndex, templateUpdateOpcodes, computeFunction);
  } else {
    templateValuesPointerIndex = templateUpdateOpcodes[0];
  }

  let templateRuntimeValues = runtimeValues;
  if (computeFunction !== null) {
    const computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    if (computeFunctionUsesHooks === true) {
      // prepareToUseHooks(state.currentComponent);
    }
    templateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);
    if (computeFunctionUsesHooks === true) {
      // finishHooks();
      state.computeFunctionUsesHooks = false;
    }
  }
  workInProgress.values[templateValuesPointerIndex] = templateRuntimeValues;
  renderMountOpcodes(
    templateMountOpcodes,
    templateUpdateOpcodes,
    templateUnmountOpcodes,
    shouldCreateTemplateOpcodes,
    templateRuntimeValues,
    state,
    workInProgress,
  );
}

function renderUpdateUnconditionalTemplate(
  index,
  updateOpcodes,
  previousRuntimeValues,
  nextRuntimeValues,
  state,
  workInProgress,
) {
  const templateValuesPointerIndex = updateOpcodes[++index];
  const templateUpdateOpcodes = updateOpcodes[++index];
  const computeFunction = updateOpcodes[++index];
  const previousTemplateRuntimeValues = workInProgress.values[templateValuesPointerIndex];
  let nextTemplateRuntimeValues = nextRuntimeValues;
  if (computeFunction !== null) {
    const computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    if (computeFunctionUsesHooks === true) {
      // prepareToUseHooks(state.currentComponent);
    }
    nextTemplateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);
    if (computeFunctionUsesHooks === true) {
      // finishHooks();
      state.computeFunctionUsesHooks = false;
    }
  }
  workInProgress.values[templateValuesPointerIndex] = nextRuntimeValues;
  renderUpdateOpcodes(
    templateUpdateOpcodes,
    previousTemplateRuntimeValues,
    nextTemplateRuntimeValues,
    state,
    workInProgress,
  );
}

function renderMountOpcodes(
  mountOpcodes,
  updateOpcodes,
  unmountOpcodes,
  shouldCreateOpcodes,
  runtimeValues,
  state,
  workInProgress,
) {
  const opcodesLength = mountOpcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = mountOpcodes[index];
    const renderOpcode = mountOpcodeRenderFuncs[opcode];
    const shouldTerminate = doesOpcodeFuncTerminate[opcode];
    if (shouldTerminate === 1) {
      renderOpcode(
        index,
        mountOpcodes,
        updateOpcodes,
        unmountOpcodes,
        shouldCreateOpcodes,
        runtimeValues,
        state,
        workInProgress,
      );
      return;
    } else {
      index =
        renderOpcode(
          index,
          mountOpcodes,
          updateOpcodes,
          unmountOpcodes,
          shouldCreateOpcodes,
          runtimeValues,
          state,
          workInProgress,
        ) + 1;
    }
  }
}

function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
  const opcodesLength = updateOpcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = updateOpcodes[index];
    const renderOpcode = updateOpcodeRenderFuncs[opcode];
    const shouldTerminate = doesOpcodeFuncTerminate[opcode];
    if (shouldTerminate === 1) {
      renderOpcode(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress);
      return;
    } else {
      index = renderOpcode(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) + 1;
    }
  }
}

function renderUnmountOpcodes(unmountOpcodes, state, workInProgress) {
  const opcodesLength = unmountOpcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = unmountOpcodes[index];
    const renderOpcode = unmountOpcodeRenderFuncs[opcode];
    const shouldTerminate = doesOpcodeFuncTerminate[opcode];
    if (shouldTerminate === 1) {
      renderOpcode(index, unmountOpcodes, state, workInProgress);
      return;
    } else {
      index = renderOpcode(index, unmountOpcodes, state, workInProgress) + 1;
    }
  }
}

function renderRoot(rootState, mountOpcodes) {
  const [updateOpcodes, unmountOpcodes, shouldCreateOpcodes] = getOpcodesFromMountOpcodes(mountOpcodes);

  if (rootState.fiber === null) {
    // Mount
    renderMountOpcodes(mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, emptyArray, rootState, null);
  } else {
    // Update
    renderUpdateOpcodes(updateOpcodes, emptyArray, emptyArray, rootState, null);
  }
}

function getOpcodesFromMountOpcodes(mountOpcodes) {
  let shouldCreateOpcodes = false;
  let updateAndUnmountOpcodes = updateAndUnmountOpcodesFromMountOpcodes.get(mountOpcodes);

  if (updateAndUnmountOpcodes === undefined) {
    updateAndUnmountOpcodes = [[], []];
    shouldCreateOpcodes = true;
    updateAndUnmountOpcodesFromMountOpcodes.set(mountOpcodes, updateAndUnmountOpcodes);
  }

  return [updateAndUnmountOpcodes[0], updateAndUnmountOpcodes[1], shouldCreateOpcodes];
}

function createState(rootPropsObject, currentHostNode) {
  return {
    currentComponent: null,
    currentHostNode,
    currentHostNodeIsVoidElement: false,
    fiber: null,
    hostNodeStack: [],
    hostNodeStackIndex: 0,
    propsArray: emptyArray,
    rootPropsObject,
  };
}

function createOpcodeFiber(hostNode, values) {
  return {
    child: null,
    hostNode,
    key: null,
    sibling: null,
    parent: null,
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
  let rootState = rootStates.get(DOMContainer);

  if (node === null || node === undefined) {
    if (rootState !== undefined) {
      // Unmount
    }
  } else if (node.$$typeof === reactElementSymbol) {
    if (rootState === undefined) {
      rootState = createState(node.props, DOMContainer);
      rootStates.set(DOMContainer, rootState);
    } else {
      rootState.rootPropsObject = node.props;
    }
    return renderRoot(rootState, node.type);
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
