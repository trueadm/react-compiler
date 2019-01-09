"use strict";
// This renderToString implementation is for testing React compiled output.

const { finishHooks, prepareToUseHooks, useHooksDispatcher } = require("./dispatcher");
const {
  applyState,
  cloneState,
  createComponent,
  createElementForTesting,
  createMarkupForRoot,
  createRootComponent,
  createState,
  emptyArray,
  escapeText,
  getCurrentContextValue,
  isArray,
  isReactNode,
  popCurrentContextValue,
  pushCurrentContextValue,
  reactElementSymbol,
} = require("./utils");

const ReactElementNode = Symbol();

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

const opcodeRenderFuncs = [
  renderComponent, // COMPONENT: 0,
  renderComponentWithHooks, // COMPONENT_WITH_HOOKS: 1,
  renderRootStaticValue, // STATIC_VALUE: 2,
  renderRootDynamicValue, // DYNAMIC_VALUE: 3,
  noOp, // EMPTY 4
  noOp, // EMPTY 5
  renderOpenElement, // OPEN_ELEMENT: 6,
  renderOpenVoidElement, // OPEN_VOID_ELEMENT: 7,
  renderOpenDivElement, // OPEN_ELEMENT_DIV: 8,
  renderOpenSpanElement, // OPEN_ELEMENT_SPAN: 9,
  renderCloseElement, // CLOSE_ELEMENT: 10,
  renderCloseVoidElement, // CLOSE_ELEMENT: 11,
  renderOpenFragment, // OPEN_FRAGMENT: 12,
  renderCloseFragment, // CLOSE_FRAGMENT: 13,
  renderOpenContextProvider, // OPEN_CONTEXT_PROVIDER: 14,
  renderCloseContextProvider, // CLOSE_CONTEXT_PROVIDER: 15,
  renderOpenPropStyle, // OPEN_PROP_STYLE: 16,
  renderClosePropStyle, // CLOSE_PROP_STYLE: 17,
  noOp, // EMPTY 18
  noOp, // EMPTY 19
  renderUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  renderConditionalTemplate, // CONDITIONAL_TEMPLATE: 21,
  renderTemplate, // TEMPLATE: 22,
  renderTemplateFromFunctionCall, // TEMPLATE_FROM_FUNC_CALL: 23,
  renderReactNodeTemplateFromFunctionCall, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  renderMultiConditional, // MULTI_CONDITIONAL: 25,
  renderContextConsumerUnconditionalTemplate, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  renderContextConsumerConditionalTemplate, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  renderContextConsumerTemplate, // CONTEXT_CONSUMER_TEMPLATE: 28,
  renderRefComponent, // REF_COMPONENT: 29,
  renderConditional, // CONDITIONAL: 30,
  renderLogicalOr, // LOGICAL_OR: 31,
  renderLogicalAnd, // LOGICAL_AND: 32,
  noOp, // EMPTY 33
  noOp, // EMPTY 34
  noOp, // EMPTY 35
  noOp, // EMPTY 36
  noOp, // EMPTY 37
  noOp, // EMPTY 38
  noOp, // EMPTY 39
  renderStaticChildValue, // ELEMENT_STATIC_CHILD_VALUE: 40,
  renderStaticChildrenValue, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  renderDynamicChildValue, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  renderDynamicChildrenValue, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  renderDynamicChildTemplateFromFunctionCall, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  renderDynamicChildrenTemplateFromFunctionCall, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  renderDynamicChildrenArrayMapTemplate, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  renderDynamicChildReactNodeTemplate, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  renderDynamicChildrenReactNodeTemplate, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  renderDynamicFunctionChild, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
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
  renderStaticProp, // STATIC_PROP: 60,
  renderDynamicProp, // DYNAMIC_PROP: 61,
  renderStaticClassNameProp, // STATIC_PROP_CLASS_NAME: 62,
  renderDynamicClassNameProp, // DYNAMIC_PROP_CLASS_NAME: 63,
  renderStaticPropValue, // STATIC_PROP_VALUE: 64,
  renderDynamicPropValue, // DYNAMIC_PROP_VALUE: 65,
  renderStaticPropStyle, // STATIC_PROP_STYLE: 66,
  renderDynamicPropStyle, // DYNAMIC_PROP_STYLE: 67,
  renderStaticPropUnitlessStyle, // STATIC_PROP_UNITLESS_STYLE: 68,
  renderDynamicPropUnitlessStyle, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  noOp, // STATIC_PROP_KEY: 70,
  renderDynamicPropKeyOrRef, // DYNAMIC_PROP_KEY: 71,
  renderDynamicPropKeyOrRef, // DYNAMIC_PROP_REF: 72,
];

const PropFlagPartialTemplate = 1;
const PropFlagReactEvent = 1 << 1; // starts with on
// TODO support the below flags:
// const PropFlagReserved = 1 << 2;
// const PropFlagString = 1 << 3;
// const PropFlagBooleanishString = 1 << 4;
// const PropFlagBoolean = 1 << 5;
// const PropFlagOverloadedBoolean = 1 << 6;
// const PropFlagNumeric = 1 << 6;
// const PropFlagPositiveNumeric = 1 << 7;
// const PropFlagXlinkNamespace = 1 << 8;
// const PropFlagXmlNamespace = 1 << 9;

function noOp(index, opcodes, runtimeValues, state) {
  return index + 1;
}

function renderDynamicPropKeyOrRef(index, opcodes, runtimeValues, state) {
  return index + 2;
}

function renderReactNodeToString(node, isChild, runtimeValues, state) {
  if (node === null || node === undefined || typeof node === "boolean") {
    return;
  }
  if (typeof node === "string" || typeof node === "number") {
    if (isChild) {
      if (state.lastChildWasTextNode === true) {
        state.renderString += "<!-- -->";
      }
      state.lastChildWasTextNode = true;
    }
    state.renderString += escapeText(node);
  } else if (isReactNode(node)) {
    state.lastChildWasTextNode = false;
    const templateOpcodes = node.t;
    let templateRuntimeValues = node.v;
    renderOpcodesToString(templateOpcodes, templateRuntimeValues, state);
  } else if (isArray(node)) {
    for (let i = 0, length = node.length; i < length; ++i) {
      const elementNode = node[i];
      renderReactNodeToString(elementNode, isChild, runtimeValues, state);
    }
  }
}

function renderValueToString(value, state, isChild) {
  if (isArray(value)) {
    const childrenTextArrayLength = value.length;
    for (let i = 0; i < childrenTextArrayLength; ++i) {
      const childText = value[i];
      if (childText !== null && childText !== undefined && typeof childText !== "boolean") {
        if ((isChild === true && state.lastChildWasTextNode === true) || i !== 0) {
          state.renderString += "<!-- -->";
        }
        state.renderString += escapeText(childText);
      }
    }
  } else if (value !== null && value !== undefined && typeof value !== "boolean") {
    if (isChild === true) {
      if (state.lastChildWasTextNode === true) {
        state.renderString += "<!-- -->";
      }
      state.lastChildWasTextNode = true;
    }
    state.renderString += escapeText(value);
  }
}

function renderDynamicAttributeValue(propName, propInformation, value) {
  if (propInformation & PropFlagReactEvent) {
    return "";
  }
  return ` ${propName}="${value}"`;
}

function renderReactNodeTemplateFromFunctionCall(index, opcodes, runtimeValues, state) {
  const reactNodePointer = opcodes[++index];
  const reactNode = runtimeValues[reactNodePointer];
  renderReactNodeToString(reactNode, false, runtimeValues, state);
  return index;
}

function renderDynamicChildTemplateFromFunctionCall(index, opcodes, runtimeValues, state) {
  const templateOpcodes = opcodes[++index];
  const computeValuesPointer = opcodes[++index];
  const computeValues = runtimeValues[computeValuesPointer];
  renderOpcodesToString(templateOpcodes, computeValues, state);
  const currentValue = state.currentValue;

  if (
    currentValue !== null &&
    currentValue !== undefined &&
    typeof currentValue !== "boolean" &&
    currentValue !== ReactElementNode
  ) {
    if (state.lastChildWasTextNode === true) {
      state.renderString += "<!-- -->";
    }
    state.renderString += escapeText(currentValue);
    state.lastChildWasTextNode = true;
  }
  return index;
}

function renderDynamicChildrenTemplateFromFunctionCall(index, opcodes, runtimeValues, state) {
  const templateOpcodes = opcodes[++index];
  const computeValuesPointer = opcodes[++index];
  const computeValues = runtimeValues[computeValuesPointer];
  renderOpcodesToString(templateOpcodes, computeValues, state);
  const currentValue = state.currentValue;

  state.lastChildWasTextNode = false;
  if (
    currentValue !== null &&
    currentValue !== undefined &&
    typeof currentValue !== "boolean" &&
    currentValue !== ReactElementNode
  ) {
    state.renderString += escapeText(currentValue);
  }
  return index;
}

function renderDynamicFunctionChild(index, opcodes, runtimeValues, state) {
  throw new Error("TODO renderElementDynamicFunctionChild");
}

function renderDynamicChildrenArrayMapTemplate(index, opcodes, runtimeValues, state) {
  const arrayPointer = opcodes[++index];
  const array = runtimeValues[arrayPointer];
  const arrayMapOpcodes = opcodes[++index];
  const arrayMapComputeFunctionPointer = opcodes[++index];
  const arrayMapComputeFunction =
    arrayMapComputeFunctionPointer === null ? null : runtimeValues[arrayMapComputeFunctionPointer];

  const arrayLength = array.length;
  for (let i = 0; i < arrayLength; ++i) {
    const element = array[i];
    let templateRuntimeValues = runtimeValues;

    if (arrayMapComputeFunction !== null) {
      templateRuntimeValues = arrayMapComputeFunction(element, i, array);
    }
    renderOpcodesToString(arrayMapOpcodes, templateRuntimeValues, state);
  }
  return index;
}

function renderContextConsumerUnconditionalTemplate(index, opcodes, runtimeValues, state) {
  const reactContextObjectPointer = opcodes[++index];
  const templateOpcodes = opcodes[++index];
  const computeFunctionPointer = opcodes[++index];
  let templateRuntimeValues = runtimeValues;
  if (computeFunctionPointer !== null) {
    const reactContextObject = runtimeValues[reactContextObjectPointer];
    const contextValue = getCurrentContextValue(reactContextObject, state);
    const computeFunction = runtimeValues[computeFunctionPointer];
    templateRuntimeValues = computeFunction(contextValue);
  }
  renderOpcodesToString(templateOpcodes, templateRuntimeValues, state);
  return index;
}

function renderElementCloseRenderString(state) {
  if (state.currentElementTagIsOpen === true) {
    state.renderString += state.elementCloseRenderString;
    state.currentElementTagIsOpen = false;
  }
}

function renderContextConsumerConditionalTemplate(index, opcodes, runtimeValues, state) {
  throw new Error("TODO renderContextConsumerConditionalTemplate");
}

function renderContextConsumerTemplate(index, opcodes, runtimeValues, state) {
  throw new Error("TODO renderContextConsumerTemplate");
}

function renderOpenContextProvider(index, opcodes, runtimeValues, state) {
  if (state.currentElementTag !== "") {
    state.elementTagStack.push(state.currentElementTag);
  }
  renderElementCloseRenderString(state);
  state.elementCloseRenderString = "";
  state.currentElementTagIsOpen = true;
  state.lastChildWasTextNode = false;
  if (state.hasMarkedRootElement === false) {
    state.hasMarkedRootElement = true;
  }
  const reactContextObjectPointer = opcodes[++index];
  const reactContextObject = runtimeValues[reactContextObjectPointer];
  pushCurrentContextValue(reactContextObject, undefined, state);
  state.currentElementTag = reactContextObject;
  return index;
}

function renderCloseContextProvider(index, opcodes, runtimeValues, state) {
  popCurrentContextValue(state.currentElementTag, state);
  return index;
}

function renderTemplateFromFunctionCall(index, opcodes, runtimeValues, state) {
  const templateOpcodes = opcodes[++index];
  const computeValuesPointer = opcodes[++index];
  const computeValues = runtimeValues[computeValuesPointer];
  renderOpcodesToString(templateOpcodes, computeValues, state);
  return index;
}

function renderTemplate(index, opcodes, runtimeValues, state) {
  const templateOpcodes = opcodes[++index];
  const computeFunction = opcodes[++index];
  let templateRuntimeValuesOrNull;
  // TODO try passing individual props if array is small enough, using array spread?
  // Array.prototype.apply is not as fast as normal function calls typically.
  if (computeFunction !== null) {
    const computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    if (computeFunctionUsesHooks === true) {
      prepareToUseHooks(state.currentComponent);
    }
    templateRuntimeValuesOrNull = computeFunction.apply(null, state.currentComponent.props);
    if (computeFunctionUsesHooks === true) {
      finishHooks();
      state.computeFunctionUsesHooks = false;
    }
  }
  if (templateRuntimeValuesOrNull === null) {
    return null;
  }
  return renderOpcodesToString(templateOpcodes, templateRuntimeValuesOrNull, state);
}

function renderConditionalTemplate(index, opcodes, runtimeValues, state) {
  const computeFunction = opcodes[++index];
  const conditionBranchOpcodes = opcodes[++index];
  let templateRuntimeValues = runtimeValues;
  // TODO try passing individual props if array is small enough, using array spread?
  // Array.prototype.apply is not as fast as normal function calls typically.
  if (computeFunction !== null) {
    const computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    if (computeFunctionUsesHooks === true) {
      prepareToUseHooks(state.currentComponent);
    }
    templateRuntimeValues = computeFunction.apply(null, state.currentComponent.props);
    if (computeFunctionUsesHooks === true) {
      finishHooks();
      state.computeFunctionUsesHooks = false;
    }
    if (templateRuntimeValues === null) {
      return null;
    }
  }
  const conditionBranchOpcodesLength = conditionBranchOpcodes.length;
  const conditionBranchToUseKey = templateRuntimeValues[0];
  let branchIndex = 0;

  while (branchIndex < conditionBranchOpcodesLength) {
    const branchConditionKey = conditionBranchOpcodes[branchIndex];
    if (branchConditionKey === conditionBranchToUseKey) {
      const templateOpcodes = conditionBranchOpcodes[++branchIndex];
      return renderOpcodesToString(templateOpcodes, templateRuntimeValues, state);
    }
    branchIndex += 2;
  }
  return null;
}

function renderStyleValue(styleName, styleValue, state) {
  let delimiter = "";
  if (state.lastChildWasStyle === true) {
    delimiter = ";";
  } else {
    state.lastChildWasStyle = true;
  }
  state.styleRenderString += `${delimiter}${styleName}:${styleValue}`;
}

function renderStaticPropStyle(index, opcodes, runtimeValues, state) {
  const styleName = opcodes[++index];
  let styleValue = opcodes[++index];

  if (styleValue == null || styleValue === undefined) {
    return index;
  }
  if (typeof styleValue === "number") {
    styleValue = `${styleValue}px`;
  }
  renderStyleValue(styleName, styleValue, state);
  return index;
}

function renderDynamicPropStyle(index, opcodes, runtimeValues, state) {
  const styleName = opcodes[++index];
  const styleValuePointer = opcodes[++index];
  let styleValue = runtimeValues[styleValuePointer];

  if (styleValue == null || styleValue === undefined) {
    return index;
  }
  if (typeof styleValue === "number") {
    styleValue = `${styleValue}px`;
  }
  renderStyleValue(styleName, styleValue, state);
  return index;
}

function renderStaticPropUnitlessStyle(index, opcodes, runtimeValues, state) {
  const styleName = opcodes[++index];
  const styleValue = opcodes[++index];

  if (styleValue == null || styleValue === undefined) {
    return index;
  }
  renderStyleValue(styleName, styleValue, state);
  return index;
}

function renderDynamicPropUnitlessStyle(index, opcodes, runtimeValues, state) {
  const styleName = opcodes[++index];
  const styleValuePointer = opcodes[++index];
  const styleValue = runtimeValues[styleValuePointer];

  if (styleValue == null || styleValue === undefined) {
    return index;
  }
  renderStyleValue(styleName, styleValue, state);
  return index;
}

function renderStaticPropValue(index, opcodes, runtimeValues, state) {
  const staticValueProp = opcodes[++index];
  if (typeof state.currentElementTag !== "string") {
    pushCurrentContextValue(state.currentElementTag, staticValueProp, state);
  } else if (staticValueProp !== null && staticValueProp !== undefined) {
    state.renderString += ` value="${staticValueProp}"`;
  }
  return index;
}

function renderDynamicPropValue(index, opcodes, runtimeValues, state) {
  throw new Error("TODO");
}

function renderOpenPropStyle(index, opcodes, runtimeValues, state) {
  state.styleRenderString = "";
  state.lastChildWasStyle = false;
  return index;
}

function renderClosePropStyle(index, opcodes, runtimeValues, state) {
  if (state.styleRenderString !== "") {
    state.renderString += ` style="${state.styleRenderString}"`;
  }
  return index;
}

function renderConditional(index, opcodes, runtimeValues, state) {
  const conditionValuePointer = opcodes[++index];
  const conditionValue = runtimeValues[conditionValuePointer];
  const consequentOpcodes = opcodes[++index];

  if (conditionValue) {
    if (consequentOpcodes !== null) {
      renderOpcodesToString(consequentOpcodes, runtimeValues, state);
    }
    return index + 1;
  }
  const alternateOpcodes = opcodes[++index];
  if (alternateOpcodes !== null) {
    renderOpcodesToString(alternateOpcodes, runtimeValues, state);
  }
  return index;
}

function renderLogicalOr(index, opcodes, runtimeValues, state) {
  const leftOpcodes = opcodes[++index];
  const rightOpcodes = opcodes[++index];

  state.currentValue = undefined;
  renderOpcodesToString(leftOpcodes, runtimeValues, state);
  if (state.currentValue === undefined) {
    renderOpcodesToString(rightOpcodes, runtimeValues, state);
  }
  return index;
}

function renderLogicalAnd(index, opcodes, runtimeValues, state) {
  const leftOpcodes = opcodes[++index];
  const rightOpcodes = opcodes[++index];

  state.currentValue = undefined;
  const clonedState = cloneState(state);
  renderOpcodesToString(leftOpcodes, runtimeValues, state);
  if (state.currentValue !== undefined) {
    applyState(state, clonedState);
    renderOpcodesToString(rightOpcodes, runtimeValues, state);
  }
  return index;
}

function renderRootStaticValue(index, opcodes, runtimeValues, state) {
  const staticValue = opcodes[++index];
  state.currentValue = staticValue;
}

function renderRootDynamicValue(index, opcodes, runtimeValues, state) {
  const dynamicValuePointer = opcodes[++index];
  let value = runtimeValues[dynamicValuePointer];
  if (isReactNode(value)) {
    value = renderReactNodeToString(value, false, runtimeValues, state);
  } else {
    state.currentValue = value;
  }
}

function renderDynamicChildReactNodeTemplate(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  const reactNodeOrArrayPointer = opcodes[++index];
  const reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
  renderReactNodeToString(reactNodeOrArray, true, runtimeValues, state);
  return index;
}

function renderDynamicChildrenReactNodeTemplate(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  const reactNodeOrArrayPointer = opcodes[++index];
  const reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
  state.lastChildWasTextNode = false;
  renderReactNodeToString(reactNodeOrArray, false, runtimeValues, state);
  return index;
}

function renderRefComponent(index, opcodes, runtimeValues, state) {
  const componentOpcodesFunction = opcodes[++index];
  const componentOpcodeCache = state.componentOpcodeCache;
  let componentOpcodes = componentOpcodeCache.get(componentOpcodesFunction);
  if (componentOpcodes === undefined) {
    componentOpcodes = componentOpcodesFunction();
    componentOpcodeCache.set(componentOpcodesFunction, componentOpcodes);
  } else {
    componentOpcodes = componentOpcodeCache.get(componentOpcodesFunction);
  }
  const propsArrayValuePointerOrValue = opcodes[++index];
  let propsArrayValue = null;
  if (isArray(propsArrayValuePointerOrValue)) {
    propsArrayValue = propsArrayValuePointerOrValue;
  } else if (propsArrayValuePointerOrValue !== null) {
    propsArrayValue = runtimeValues[propsArrayValuePointerOrValue];
  }
  state.propsArray = propsArrayValue;
  renderOpcodesToString(componentOpcodes, runtimeValues, state);
  return index;
}

function renderOpenFragment(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  state.elementCloseRenderString = "";
  state.lastChildWasTextNode = false;
  if (state.hasMarkedRootElement === false) {
    state.hasMarkedRootElement = true;
  }
  return index;
}

function renderCloseFragment(index, opcodes, runtimeValues, state) {
  return index;
}

function renderMultiConditional(index, opcodes, runtimeValues, state) {
  const conditionalSize = opcodes[++index];
  const startingIndex = index;
  const conditionalDefaultIndex = conditionalSize - 1;
  for (let conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
    if (conditionalIndex === conditionalDefaultIndex) {
      const defaultCaseOpcodes = opcodes[++index];
      if (defaultCaseOpcodes !== null) {
        renderOpcodesToString(defaultCaseOpcodes, runtimeValues, state);
      }
    } else {
      const caseConditionPointer = opcodes[++index];
      const caseConditionValue = runtimeValues[caseConditionPointer];
      if (caseConditionValue) {
        const caseOpcodes = opcodes[++index];
        if (caseOpcodes !== null) {
          renderOpcodesToString(caseOpcodes, runtimeValues, state);
        }
        break;
      }
      ++index;
    }
  }
  return startingIndex + (conditionalSize - 1) * 2 + 1;
}

function renderStaticProp(index, opcodes, runtimeValues, state) {
  const propName = opcodes[++index];
  const staticPropValue = opcodes[++index];

  if (staticPropValue !== null && staticPropValue !== undefined) {
    state.renderString += ` ${propName}="${staticPropValue}"`;
  }
  return index;
}

function renderDynamicProp(index, opcodes, runtimeValues, state) {
  const propName = opcodes[++index];
  const propInformation = opcodes[++index];
  const dynamicPropValuePointer = opcodes[++index];
  const dynamicPropValueOrPartialTemplate = runtimeValues[dynamicPropValuePointer];

  if (propInformation & PropFlagPartialTemplate) {
    throw new Error("TODO renderStaticProp");
  } else if (dynamicPropValueOrPartialTemplate !== null && dynamicPropValueOrPartialTemplate !== undefined) {
    state.renderString += renderDynamicAttributeValue(propName, propInformation, dynamicPropValueOrPartialTemplate);
  }
  return index;
}

function renderStaticClassNameProp(index, opcodes, runtimeValues, state) {
  const staticClassName = opcodes[++index];
  if (staticClassName !== null && staticClassName !== undefined) {
    state.renderString += ` class="${staticClassName}"`;
  }
  return index;
}

function renderDynamicClassNameProp(index, opcodes, runtimeValues, state) {
  const propInformation = opcodes[++index];
  const dynamicClassNamePointer = opcodes[++index];
  const dynamicClassName = runtimeValues[dynamicClassNamePointer];

  if (propInformation & PropFlagPartialTemplate) {
    throw new Error("TODO renderDynamicClassNameProp");
  } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
    state.renderString += ` class="${escapeText(dynamicClassName)}"`;
  }
  return index;
}

function renderUnconditionalTemplate(index, opcodes, runtimeValues, state) {
  const templateOpcodes = opcodes[++index];
  const computeFunction = opcodes[++index];
  let templateRuntimeValues = runtimeValues;
  // TODO try passing individual props if array is small enough, using array spread?
  // Array.prototype.apply is not as fast as normal function calls typically.
  if (computeFunction !== null) {
    const computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    if (computeFunctionUsesHooks === true) {
      prepareToUseHooks(state.currentComponent);
    }
    templateRuntimeValues = computeFunction.apply(null, state.currentComponent.props);
    if (computeFunctionUsesHooks === true) {
      finishHooks();
      state.computeFunctionUsesHooks = false;
    }
  }
  renderOpcodesToString(templateOpcodes, templateRuntimeValues, state);
}

function renderComponent(index, opcodes, runtimeValues, state) {
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
  renderOpcodesToString(creationOpcodes, runtimeValues, state);
  const currentValue = state.currentValue;
  if (currentValue !== null && currentValue !== undefined && currentValue !== ReactElementNode) {
    state.renderString += escapeText(currentValue);
  }
  state.currentValue = previousValue;
  state.currentComponent = previousComponent;
}

function renderComponentWithHooks(index, opcodes, runtimeValues, state) {
  let currentComponent = state.currentComponent;

  state.computeFunctionUsesHooks = true;
  const previousComponent = state.currentComponent;
  if (currentComponent === null) {
    const rootPropsShape = opcodes[++index];
    currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
  } else {
    state.currentComponent = createComponent(state.propsArray, true);
  }
  const templateNode = opcodes[++index];
  const creationOpcodes = templateNode.c;
  const previousValue = state.currentValue;
  state.currentValue = undefined;
  renderOpcodesToString(creationOpcodes, runtimeValues, state);
  const currentValue = state.currentValue;
  if (currentValue === undefined || currentValue === null) {
    // NO-OP
  } else if (currentValue !== undefined && currentValue !== null && isReactNode(currentValue)) {
    renderReactNodeToString(currentValue, false, runtimeValues, state);
  } else if (currentValue !== ReactElementNode) {
    state.renderString += escapeText(currentValue);
  }
  state.currentValue = previousValue;
  state.currentComponent = previousComponent;
}

function renderStaticChildrenValue(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  const staticTextContent = opcodes[++index];
  state.renderString += staticTextContent;
  return index;
}

function renderStaticChildValue(index, opcodes, runtimeValues, state) {
  if (state.lastChildWasTextNode === true) {
    state.renderString += "<!-- -->";
  }
  renderElementCloseRenderString(state);
  const staticTextChild = opcodes[++index];
  state.renderString += staticTextChild;
  state.lastChildWasTextNode = true;
  return index;
}

function renderDynamicChildrenValue(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  state.lastChildWasTextNode = false;
  const dynamicTextContentPointer = opcodes[++index];
  const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
  renderValueToString(dynamicTextContent, state, false);
  return index;
}

function renderDynamicChildValue(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  const dynamicTextChildPointer = opcodes[++index];
  const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
  renderValueToString(dynamicTextChild, state, true);
  return index;
}

function renderOpenElement(index, opcodes, runtimeValues, state) {
  if (state.currentElementTag !== "") {
    state.elementTagStack[state.elementTagStackIndex++] = state.currentElementTag;
  }
  renderElementCloseRenderString(state);
  state.elementCloseRenderString = "";
  const currentElementTag = (state.currentElementTag = opcodes[++index]);
  state.renderString += `<${currentElementTag}`;
  state.currentValue = ReactElementNode;
  state.currentElementTagIsOpen = true;
  state.lastChildWasTextNode = false;
  if (state.hasMarkedRootElement === false) {
    state.hasMarkedRootElement = true;
    state.elementCloseRenderString += ` ${createMarkupForRoot()}`;
  }
  state.elementCloseRenderString += ">";
  return index;
}

function renderOpenVoidElement(index, opcodes, runtimeValues, state) {
  if (state.currentElementTag !== "") {
    state.elementTagStack[state.elementTagStackIndex++] = state.currentElementTag;
  }
  renderElementCloseRenderString(state);
  state.elementCloseRenderString = "";
  const currentElementTag = (state.currentElementTag = opcodes[++index]);
  state.renderString += `<${currentElementTag}`;
  state.currentValue = ReactElementNode;
  state.currentElementTagIsOpen = true;
  state.lastChildWasTextNode = false;
  if (state.hasMarkedRootElement === false) {
    state.hasMarkedRootElement = true;
    state.elementCloseRenderString += ` ${createMarkupForRoot()}`;
  }
  state.elementCloseRenderString += "/>";
  return index;
}

function renderOpenDivElement(index, opcodes, runtimeValues, state) {
  if (state.currentElementTag !== "") {
    state.elementTagStack[state.elementTagStackIndex++] = state.currentElementTag;
  }
  renderElementCloseRenderString(state);
  state.elementCloseRenderString = "";
  state.renderString += "<div";
  state.currentElementTag = "div";
  state.currentValue = ReactElementNode;
  state.currentElementTagIsOpen = true;
  state.lastChildWasTextNode = false;
  if (state.hasMarkedRootElement === false) {
    state.hasMarkedRootElement = true;
    state.elementCloseRenderString += ` ${createMarkupForRoot()}`;
  }
  state.elementCloseRenderString += ">";
  return index;
}

function renderOpenSpanElement(index, opcodes, runtimeValues, state) {
  if (state.currentElementTag !== "") {
    state.elementTagStack[state.elementTagStackIndex++] = state.currentElementTag;
  }
  renderElementCloseRenderString(state);
  state.elementCloseRenderString = "";
  state.renderString += "<span";
  state.currentElementTag = "span";
  state.currentValue = ReactElementNode;
  state.currentElementTagIsOpen = true;
  state.lastChildWasTextNode = false;
  if (state.hasMarkedRootElement === false) {
    state.hasMarkedRootElement = true;
    state.elementCloseRenderString += ` ${createMarkupForRoot()}`;
  }
  state.elementCloseRenderString += ">";
  return index;
}

function renderCloseElement(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  state.lastChildWasTextNode = false;
  state.renderString += `</${state.currentElementTag}>`;
  const elementTagStack = state.elementTagStack;
  const elementTagStackIndex = --state.elementTagStackIndex;
  state.currentElementTag = elementTagStack[elementTagStackIndex];
  elementTagStack[elementTagStackIndex] = null;
  return index;
}

function renderCloseVoidElement(index, opcodes, runtimeValues, state) {
  renderElementCloseRenderString(state);
  const elementTagStack = state.elementTagStack;
  const elementTagStackIndex = --state.elementTagStackIndex;
  state.currentElementTag = elementTagStack[elementTagStackIndex];
  elementTagStack[elementTagStackIndex] = null;
  return index;
}

function renderOpcodesToString(opcodes, runtimeValues, state) {
  const opcodesLength = opcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = opcodes[index];
    const renderOpcode = opcodeRenderFuncs[opcode];
    const shouldTerminate = doesOpcodeFuncTerminate[opcode];
    if (shouldTerminate === 1) {
      renderOpcode(index, opcodes, runtimeValues, state);
      return;
    } else {
      index = renderOpcode(index, opcodes, runtimeValues, state) + 1;
    }
  }
}

function renderNode(node) {
  if (node === null || node === undefined) {
    return "";
  } else if (node.$$typeof === reactElementSymbol) {
    const { props, type } = node;
    // We use a constructor for better hidden-class performance
    const state = createState(props);
    renderOpcodesToString(type, emptyArray, state);
    const currentValue = state.currentValue;
    if (currentValue !== null && currentValue !== undefined && currentValue !== ReactElementNode) {
      state.renderString += escapeText(currentValue);
    }
    return state.renderString;
  } else {
    throw new Error("renderToString() expects a ReactElement as the only argument");
  }
}

function renderToString(node) {
  return useHooksDispatcher(() => renderNode(node));
}

/* eslint-disable-next-line */
module.exports = {
  createElementForTesting,
  renderToString,
};
