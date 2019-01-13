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

const COMPONENT = 0;
const COMPONENT_WITH_HOOKS = 1;
const STATIC_VALUE = 2;
const DYNAMIC_VALUE = 3;
const OPEN_ELEMENT = 6;
const OPEN_VOID_ELEMENT = 7;
const OPEN_ELEMENT_DIV = 8;
const OPEN_ELEMENT_SPAN = 9;
const CLOSE_ELEMENT = 10;
const CLOSE_VOID_ELEMENT = 11;
const OPEN_FRAGMENT = 12;
const CLOSE_FRAGMENT = 13;
const OPEN_CONTEXT_PROVIDER = 14;
const CLOSE_CONTEXT_PROVIDER = 15;
const OPEN_PROP_STYLE = 16;
const CLOSE_PROP_STYLE = 17;
const UNCONDITIONAL_TEMPLATE = 20;
const CONDITIONAL_TEMPLATE = 21;
const TEMPLATE = 22;
const TEMPLATE_FROM_FUNC_CALL = 23;
const REACT_NODE_TEMPLATE_FROM_FUNC_CALL = 24;
const MULTI_CONDITIONAL = 25;
const CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE = 26;
const CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE = 27;
const CONTEXT_CONSUMER_TEMPLATE = 28;
const REF_COMPONENT = 29;
const CONDITIONAL = 30;
const LOGICAL_OR = 31;
const LOGICAL_AND = 32;
const ELEMENT_STATIC_CHILD_VALUE = 40;
const ELEMENT_STATIC_CHILDREN_VALUE = 41;
const ELEMENT_DYNAMIC_CHILD_VALUE = 42;
const ELEMENT_DYNAMIC_CHILDREN_VALUE = 43;
const ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL = 44;
const ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL = 45;
const ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE = 46;
const ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE = 47;
const ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE = 48;
const ELEMENT_DYNAMIC_FUNCTION_CHILD = 49;
const STATIC_PROP = 60;
const DYNAMIC_PROP = 61;
const STATIC_PROP_CLASS_NAME = 62;
const DYNAMIC_PROP_CLASS_NAME = 63;
const STATIC_PROP_VALUE = 64;
const DYNAMIC_PROP_VALUE = 65;
const STATIC_PROP_STYLE = 66;
const DYNAMIC_PROP_STYLE = 67;
const STATIC_PROP_UNITLESS_STYLE = 68;
const DYNAMIC_PROP_UNITLESS_STYLE = 69;
const STATIC_PROP_KEY = 70;
const DYNAMIC_PROP_KEY = 71;
const DYNAMIC_PROP_REF = 72;

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

function renderElementCloseRenderString(state) {
  if (state.currentElementTagIsOpen === true) {
    state.renderString += state.elementCloseRenderString;
    state.currentElementTagIsOpen = false;
  }
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

function renderOpcodesToString(opcodes, runtimeValues, state) {
  const opcodesLength = opcodes.length;
  let index = 2;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = opcodes[index];

    switch (opcode) {
      case REF_COMPONENT: {
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
        break;
      }
      case STATIC_PROP: {
        const propName = opcodes[++index];
        const staticPropValue = opcodes[++index];

        if (staticPropValue !== null && staticPropValue !== undefined) {
          state.renderString += ` ${propName}="${staticPropValue}"`;
        }
        break;
      }
      case DYNAMIC_PROP: {
        const propName = opcodes[++index];
        const propInformation = opcodes[++index];
        const dynamicPropValuePointer = opcodes[++index];
        const dynamicPropValue = runtimeValues[dynamicPropValuePointer];

        if (propInformation & PropFlagPartialTemplate) {
          throw new Error("TODO renderStaticProp");
        } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
          state.renderString += renderDynamicAttributeValue(propName, propInformation, dynamicPropValue);
        }
        break;
      }
      case STATIC_PROP_CLASS_NAME: {
        const staticClassName = opcodes[++index];
        if (staticClassName !== null && staticClassName !== undefined) {
          state.renderString += ` class="${staticClassName}"`;
        }
        break;
      }
      case DYNAMIC_PROP_CLASS_NAME: {
        const propInformation = opcodes[++index];
        const dynamicClassNamePointer = opcodes[++index];
        const dynamicClassName = runtimeValues[dynamicClassNamePointer];

        if (propInformation & PropFlagPartialTemplate) {
          throw new Error("TODO renderDynamicClassNameProp");
        } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
          state.renderString += ` class="${escapeText(dynamicClassName)}"`;
        }
        break;
      }
      case STATIC_PROP_VALUE: {
        const staticValueProp = opcodes[++index];
        if (typeof state.currentElementTag !== "string") {
          pushCurrentContextValue(state.currentElementTag, staticValueProp, state);
        } else if (staticValueProp !== null && staticValueProp !== undefined) {
          state.renderString += ` value="${staticValueProp}"`;
        }
        break;
      }
      case DYNAMIC_PROP_VALUE: {
        throw new Error("TODO DYNAMIC_PROP_VALUE");
        break;
      }
      case STATIC_PROP_STYLE: {
        const styleName = opcodes[++index];
        let styleValue = opcodes[++index];

        if (styleValue == null || styleValue === undefined) {
          break;
        }
        if (typeof styleValue === "number") {
          styleValue = `${styleValue}px`;
        }
        renderStyleValue(styleName, styleValue, state);
        break;
      }
      case DYNAMIC_PROP_STYLE: {
        const styleName = opcodes[++index];
        const styleValuePointer = opcodes[++index];
        let styleValue = runtimeValues[styleValuePointer];

        if (styleValue == null || styleValue === undefined) {
          break;
        }
        if (typeof styleValue === "number") {
          styleValue = `${styleValue}px`;
        }
        renderStyleValue(styleName, styleValue, state);
        break;
      }
      case STATIC_PROP_UNITLESS_STYLE: {
        const styleName = opcodes[++index];
        const styleValue = opcodes[++index];

        if (styleValue == null || styleValue === undefined) {
          break;
        }
        renderStyleValue(styleName, styleValue, state);
        break;
      }
      case DYNAMIC_PROP_UNITLESS_STYLE: {
        const styleName = opcodes[++index];
        const styleValuePointer = opcodes[++index];
        const styleValue = runtimeValues[styleValuePointer];

        if (styleValue == null || styleValue === undefined) {
          break;
        }
        renderStyleValue(styleName, styleValue, state);
        break;
      }
      case ELEMENT_STATIC_CHILD_VALUE: {
        if (state.lastChildWasTextNode === true) {
          state.renderString += "<!-- -->";
        }
        renderElementCloseRenderString(state);
        const staticTextChild = opcodes[++index];
        state.renderString += staticTextChild;
        state.lastChildWasTextNode = true;
        break;
      }
      case ELEMENT_STATIC_CHILDREN_VALUE: {
        renderElementCloseRenderString(state);
        const staticTextContent = opcodes[++index];
        state.renderString += staticTextContent;
        break;
      }
      case ELEMENT_DYNAMIC_CHILD_VALUE: {
        renderElementCloseRenderString(state);
        const dynamicTextChildPointer = opcodes[++index];
        const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
        renderValueToString(dynamicTextChild, state, true);
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_VALUE: {
        renderElementCloseRenderString(state);
        state.lastChildWasTextNode = false;
        const dynamicTextContentPointer = opcodes[++index];
        const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
        renderValueToString(dynamicTextContent, state, false);
        break;
      }
      case ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: {
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
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: {
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
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: {
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
        break;
      }
      case ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: {
        renderElementCloseRenderString(state);
        const reactNodeOrArrayPointer = opcodes[++index];
        const reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
        renderReactNodeToString(reactNodeOrArray, true, runtimeValues, state);
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: {
        renderElementCloseRenderString(state);
        const reactNodeOrArrayPointer = opcodes[++index];
        const reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
        state.lastChildWasTextNode = false;
        renderReactNodeToString(reactNodeOrArray, false, runtimeValues, state);
        break;
      }
      case ELEMENT_DYNAMIC_FUNCTION_CHILD: {
        throw new Error("TODO ELEMENT_DYNAMIC_FUNCTION_CHILD");
        break;
      }
      case OPEN_PROP_STYLE: {
        state.styleRenderString = "";
        state.lastChildWasStyle = false;
        break;
      }
      case CLOSE_PROP_STYLE: {
        if (state.styleRenderString !== "") {
          state.renderString += ` style="${state.styleRenderString}"`;
        }
        break;
      }
      case OPEN_ELEMENT_DIV: {
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
        ++index;
        break;
      }
      case OPEN_ELEMENT_SPAN: {
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
        ++index;
        break;
      }
      case OPEN_ELEMENT: {
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
        ++index;
        break;
      }
      case CLOSE_ELEMENT: {
        renderElementCloseRenderString(state);
        state.lastChildWasTextNode = false;
        state.renderString += `</${state.currentElementTag}>`;
        const elementTagStack = state.elementTagStack;
        const elementTagStackIndex = --state.elementTagStackIndex;
        state.currentElementTag = elementTagStack[elementTagStackIndex];
        elementTagStack[elementTagStackIndex] = null;
        break;
      }
      case OPEN_FRAGMENT: {
        renderElementCloseRenderString(state);
        state.elementCloseRenderString = "";
        state.lastChildWasTextNode = false;
        if (state.hasMarkedRootElement === false) {
          state.hasMarkedRootElement = true;
        }
        break;
      }
      case CLOSE_FRAGMENT: {
        break;
      }
      case OPEN_VOID_ELEMENT: {
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
        ++index;
        break;
      }
      case CLOSE_VOID_ELEMENT: {
        renderElementCloseRenderString(state);
        const elementTagStack = state.elementTagStack;
        const elementTagStackIndex = --state.elementTagStackIndex;
        state.currentElementTag = elementTagStack[elementTagStackIndex];
        elementTagStack[elementTagStackIndex] = null;
        break;
      }
      case CONDITIONAL: {
        const conditionValuePointer = opcodes[++index];
        const conditionValue = runtimeValues[conditionValuePointer];
        const consequentOpcodes = opcodes[++index];

        if (conditionValue) {
          if (consequentOpcodes !== null) {
            renderOpcodesToString(consequentOpcodes, runtimeValues, state);
          }
          ++index;
          break;
        }
        const alternateOpcodes = opcodes[++index];
        if (alternateOpcodes !== null) {
          renderOpcodesToString(alternateOpcodes, runtimeValues, state);
        }
        break;
      }
      case LOGICAL_OR: {
        const leftOpcodes = opcodes[++index];
        const rightOpcodes = opcodes[++index];

        state.currentValue = undefined;
        renderOpcodesToString(leftOpcodes, runtimeValues, state);
        if (state.currentValue === undefined) {
          renderOpcodesToString(rightOpcodes, runtimeValues, state);
        }
        break;
      }
      case LOGICAL_AND: {
        const leftOpcodes = opcodes[++index];
        const rightOpcodes = opcodes[++index];

        state.currentValue = undefined;
        const clonedState = cloneState(state);
        renderOpcodesToString(leftOpcodes, runtimeValues, state);
        if (state.currentValue !== undefined) {
          applyState(state, clonedState);
          renderOpcodesToString(rightOpcodes, runtimeValues, state);
        }
        break;
      }
      case UNCONDITIONAL_TEMPLATE: {
        const templateOpcodes = opcodes[++index];
        // Values pointer index
        ++index;
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
        return;
      }
      case TEMPLATE_FROM_FUNC_CALL: {
        const templateOpcodes = opcodes[++index];
        const computeValuesPointer = opcodes[++index];
        const computeValues = runtimeValues[computeValuesPointer];
        renderOpcodesToString(templateOpcodes, computeValues, state);
        break;
      }
      case REACT_NODE_TEMPLATE_FROM_FUNC_CALL: {
        const reactNodePointer = opcodes[++index];
        const reactNode = runtimeValues[reactNodePointer];
        renderReactNodeToString(reactNode, false, runtimeValues, state);
        break;
      }
      case CONDITIONAL_TEMPLATE: {
        // Values pointer index
        ++index;
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
      case MULTI_CONDITIONAL: {
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
        index = startingIndex + (conditionalSize - 1) * 2 + 1;
        break;
      }
      case TEMPLATE: {
        const templateOpcodes = opcodes[++index];
        // Value pointers index
        ++index;
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
      case COMPONENT: {
        let currentComponent = state.currentComponent;
        const previousComponent = currentComponent;
        if (currentComponent === null) {
          const rootPropsShape = opcodes[++index];
          currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
        } else {
          state.currentComponent = createComponent(state.propsArray, false);
        }
        const creationOpcodes = opcodes[++index];
        const previousValue = state.currentValue;
        state.currentValue = undefined;
        renderOpcodesToString(creationOpcodes, runtimeValues, state);
        const currentValue = state.currentValue;
        if (currentValue !== null && currentValue !== undefined && currentValue !== ReactElementNode) {
          state.renderString += escapeText(currentValue);
        }
        state.currentValue = previousValue;
        state.currentComponent = previousComponent;
        return;
      }
      case COMPONENT_WITH_HOOKS: {
        let currentComponent = state.currentComponent;

        state.computeFunctionUsesHooks = true;
        const previousComponent = state.currentComponent;
        if (currentComponent === null) {
          const rootPropsShape = opcodes[++index];
          currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
        } else {
          state.currentComponent = createComponent(state.propsArray, true);
        }
        const creationOpcodes = opcodes[++index];
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
        return;
      }
      case CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: {
        const reactContextObjectPointer = opcodes[++index];
        const templateOpcodes = opcodes[++index];
        // Values pointer index
        ++index;
        const computeFunctionPointer = opcodes[++index];
        let templateRuntimeValues = runtimeValues;
        if (computeFunctionPointer !== null) {
          const reactContextObject = runtimeValues[reactContextObjectPointer];
          const contextValue = getCurrentContextValue(reactContextObject, state);
          const computeFunction = runtimeValues[computeFunctionPointer];
          templateRuntimeValues = computeFunction(contextValue);
        }
        renderOpcodesToString(templateOpcodes, templateRuntimeValues, state);
        break;
      }
      case CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: {
        throw new Error("TODO CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE");
        break;
      }
      case CONTEXT_CONSUMER_TEMPLATE: {
        throw new Error("TODO CONTEXT_CONSUMER_TEMPLATE");
        break;
      }
      case OPEN_CONTEXT_PROVIDER: {
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
        break;
      }
      case CLOSE_CONTEXT_PROVIDER: {
        popCurrentContextValue(state.currentElementTag, state);
        break;
      }
      case STATIC_VALUE: {
        const staticValue = opcodes[++index];
        state.currentValue = staticValue;
        return;
      }
      case DYNAMIC_VALUE: {
        const dynamicValuePointer = opcodes[++index];
        let value = runtimeValues[dynamicValuePointer];
        if (isReactNode(value)) {
          value = renderReactNodeToString(value, false, runtimeValues, state);
        } else {
          state.currentValue = value;
        }
        return;
      }
      case STATIC_PROP_KEY: {
        ++index;
        break;
      }
      case DYNAMIC_PROP_KEY:
      case DYNAMIC_PROP_REF:
      default: {
        index += 3;
        continue;
      }
    }
    ++index;
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
