import { currentDispatcher } from "./index";
import { Dispatcher, finishHooks, prepareToUseHooks } from "./ssr-dispatcher";
import {
  callComputeFunctionWithArray,
  convertRootPropsToPropsArray,
  createMarkupForRoot,
  emptyArray,
  escapeText,
  getCurrentContextValue,
  insertChildFiberIntoParentFiber,
  isArray,
  isReactNode,
  isUnitlessNumber,
  popCurrentContextValue,
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
export const REFERENCE_COMPONENT = 11;
export const VNODE = 12;
export const REFERENCE_VNODE = 13;
export const MULTI_RETURN_CONDITIONAL = 14;
export const VNODE_COLLECTION = 15;

// Elements
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

const componentTemplateCache = new Map();

function renderReactNodeToString(node, isChild, runtimeValues, state, currentFiber) {
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
    if (templateRuntimeValues === null) {
      templateRuntimeValues = emptyArray;
    }
    renderOpcodesToString(templateOpcodes, templateRuntimeValues, state, currentFiber);
  } else if (isArray(node)) {
    for (let i = 0, length = node.length; i < length; ++i) {
      const elementNode = node[i];
      renderReactNodeToString(elementNode, isChild, runtimeValues, state, currentFiber);
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

function renderOpcodesToString(opcodes, runtimeValues, state, currentFiber) {
  const opcodesLength = opcodes.length;
  let index = 0;

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
        const propsValuePointerOrValue = opcodes[++index];
        let propsValue = null;
        if (isArray(propsValuePointerOrValue)) {
          propsValue = propsValuePointerOrValue;
        } else if (propsValuePointerOrValue !== null) {
          propsValue = runtimeValues[propsValuePointerOrValue];
        }
        state.props = propsValue;
        renderOpcodesToString(componentOpcodes, runtimeValues, state, currentFiber);
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
        } else if (propInformation & PropFlagReactEvent) {
          ++index; // Event data
          state.renderString += "";
        } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
          state.renderString += ` ${propName}="${dynamicPropValue}"`;
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
        ++index; // Host node pointer index
        const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
        renderValueToString(dynamicTextChild, state, true);
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_VALUE: {
        renderElementCloseRenderString(state);
        state.lastChildWasTextNode = false;
        const dynamicTextContentPointer = opcodes[++index];
        ++index; // Host node pointer index
        const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
        renderValueToString(dynamicTextContent, state, false);
        break;
      }
      case ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: {
        const templateOpcodes = opcodes[++index];
        const computeValuesPointer = opcodes[++index];
        ++index; // Host node pointer index
        const computeValues = runtimeValues[computeValuesPointer];
        if (computeValues !== null) {
          renderOpcodesToString(templateOpcodes, computeValues, state, currentFiber);
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
        }
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: {
        const templateOpcodes = opcodes[++index];
        const computeValuesPointer = opcodes[++index];
        ++index; // Host node pointer index
        const computeValues = runtimeValues[computeValuesPointer];
        if (computeValues !== null) {
          renderOpcodesToString(templateOpcodes, computeValues, state, currentFiber);
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
        }
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: {
        const arrayPointer = opcodes[++index];
        const arrayMapOpcodes = opcodes[++index];
        const arrayMapComputeFunctionPointer = opcodes[++index];
        const array = runtimeValues[arrayPointer];
        const arrayMapComputeFunction =
          arrayMapComputeFunctionPointer === 0 ? null : runtimeValues[arrayMapComputeFunctionPointer];

        const arrayLength = array.length;
        for (let i = 0; i < arrayLength; ++i) {
          const element = array[i];
          let templateRuntimeValues = runtimeValues;

          if (arrayMapComputeFunction !== null) {
            templateRuntimeValues = arrayMapComputeFunction(element, i, array);
          }
          renderOpcodesToString(arrayMapOpcodes, templateRuntimeValues, state, currentFiber);
        }
        break;
      }
      case ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: {
        renderElementCloseRenderString(state);
        const reactNodeOrArrayPointer = opcodes[++index];
        ++index; // Host node pointer index
        const reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
        renderReactNodeToString(reactNodeOrArray, true, runtimeValues, state, currentFiber);
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: {
        renderElementCloseRenderString(state);
        const reactNodeOrArrayPointer = opcodes[++index];
        ++index; // Host node pointer index
        const reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
        state.lastChildWasTextNode = false;
        renderReactNodeToString(reactNodeOrArray, false, runtimeValues, state, currentFiber);
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
      case OPEN_ELEMENT_DIV_WITH_POINTER:
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
        if (opcode === OPEN_ELEMENT_DIV_WITH_POINTER) {
          ++index;
        }
        break;
      }
      case OPEN_ELEMENT_SPAN_WITH_POINTER:
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
        if (opcode === OPEN_ELEMENT_SPAN_WITH_POINTER) {
          ++index;
        }
        break;
      }
      case OPEN_ELEMENT_WITH_POINTER:
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
        if (opcode === OPEN_ELEMENT_WITH_POINTER) {
          ++index;
        }
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
      case OPEN_VOID_ELEMENT_WITH_POINTER:
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
        if (opcode === OPEN_VOID_ELEMENT_WITH_POINTER) {
          ++index;
        }
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
        ++index; // hostNodeValuePointer
        const conditionValuePointer = opcodes[++index];
        const conditionValue = runtimeValues[conditionValuePointer];
        const consequentOpcodes = opcodes[++index];

        if (conditionValue) {
          if (consequentOpcodes !== 0) {
            renderOpcodesToString(consequentOpcodes, runtimeValues, state, currentFiber);
          }
          ++index;
          break;
        }
        const alternateOpcodes = opcodes[++index];
        if (alternateOpcodes !== 0) {
          renderOpcodesToString(alternateOpcodes, runtimeValues, state, currentFiber);
        }
        break;
      }
      case LOGICAL_OR: {
        const leftOpcodes = opcodes[++index];
        const rightOpcodes = opcodes[++index];

        state.currentValue = undefined;
        renderOpcodesToString(leftOpcodes, runtimeValues, state, currentFiber);
        if (state.currentValue === undefined) {
          renderOpcodesToString(rightOpcodes, runtimeValues, state, currentFiber);
        }
        break;
      }
      case LOGICAL_AND: {
        const leftOpcodes = opcodes[++index];
        const rightOpcodes = opcodes[++index];

        state.currentValue = undefined;
        const clonedState = cloneState(state);
        renderOpcodesToString(leftOpcodes, runtimeValues, state, currentFiber);
        if (state.currentValue !== undefined) {
          applyState(state, clonedState);
          renderOpcodesToString(rightOpcodes, runtimeValues, state, currentFiber);
        }
        break;
      }
      case TEMPLATE_FROM_FUNC_CALL: {
        const templateOpcodes = opcodes[++index];
        const computeValuesPointer = opcodes[++index];
        const computeValues = runtimeValues[computeValuesPointer];
        renderOpcodesToString(templateOpcodes, computeValues, state, currentFiber);
        break;
      }
      case REACT_NODE_TEMPLATE_FROM_FUNC_CALL: {
        const reactNodePointer = opcodes[++index];
        const reactNode = runtimeValues[reactNodePointer];
        renderReactNodeToString(reactNode, false, runtimeValues, state, currentFiber);
        break;
      }
      case CONTEXT_CONSUMER: {
        const reactContextObjectPointer = opcodes[++index];
        const computeFunctionPointer = opcodes[++index];
        const contextConsumerOpcodes = opcodes[++index];
        const computeFunction = runtimeValues[computeFunctionPointer];
        const reactContextObject = runtimeValues[reactContextObjectPointer];
        const contextValue = getCurrentContextValue(reactContextObject, state);
        const contextConsumerRuntimeValues = computeFunction(contextValue);
        renderOpcodesToString(contextConsumerOpcodes, contextConsumerRuntimeValues, state, currentFiber);
        break;
      }
      case CONDITIONAL_TEMPLATE: {
        ++index; // Host node pointer index
        ++index; // Branch opcodes pointer index
        const conditionBranchOpcodes = opcodes[++index];
        if (runtimeValues === null) {
          break;
        }
        let templateRuntimeValues = runtimeValues;
        let branchIndex = 0;
        const conditionBranchOpcodesLength = conditionBranchOpcodes.length;
        const conditionBranchToUseKey = templateRuntimeValues[0];

        while (branchIndex < conditionBranchOpcodesLength) {
          const branchConditionKey = conditionBranchOpcodes[branchIndex];
          if (branchConditionKey === conditionBranchToUseKey) {
            const templateOpcodes = conditionBranchOpcodes[++branchIndex];
            renderOpcodesToString(templateOpcodes, templateRuntimeValues, state, currentFiber);
            break;
          }
          branchIndex += 2;
        }
        break;
      }
      case MULTI_CONDITIONAL: {
        const conditionalSize = opcodes[++index];
        ++index; // Value pointer index
        ++index; // Case pointer index
        const startingIndex = index;
        const conditionalDefaultIndex = conditionalSize - 1;
        for (let conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
          if (conditionalIndex === conditionalDefaultIndex) {
            const defaultCaseOpcodes = opcodes[++index];
            if (defaultCaseOpcodes !== null) {
              renderOpcodesToString(defaultCaseOpcodes, runtimeValues, state, currentFiber);
            }
          } else {
            const caseConditionPointer = opcodes[++index];
            const caseConditionValue = runtimeValues[caseConditionPointer];
            if (caseConditionValue) {
              const caseOpcodes = opcodes[++index];
              if (caseOpcodes !== null) {
                renderOpcodesToString(caseOpcodes, runtimeValues, state, currentFiber);
              }
              break;
            }
            ++index;
          }
        }
        index = startingIndex + (conditionalSize - 1) * 2 + 1;
        break;
      }
      case COMPONENT: {
        const usesHooks = opcodes[++index];
        let props;

        // Handle root component props
        if (currentFiber === null) {
          const rootPropsShape = opcodes[++index];
          props = convertRootPropsToPropsArray(state.rootPropsObject, rootPropsShape);
        } else {
          props = state.props;
        }
        const computeFunction = opcodes[++index];
        const componentFiber = createOpcodeFiber(null, props, null);
        let componentRuntimeValues = runtimeValues;
        if (computeFunction !== 0) {
          if (usesHooks === 1) {
            prepareToUseHooks(componentFiber);
          }
          componentRuntimeValues = computeFunction.apply(null, props);
          if (usesHooks === 1) {
            finishHooks(componentFiber);
          }
        }
        if (currentFiber === null) {
          // Root
          state.fiber = componentFiber;
        } else {
          insertChildFiberIntoParentFiber(currentFiber, componentFiber);
        }
        if (componentRuntimeValues !== null) {
          const creationOpcodes = opcodes[++index];
          const previousValue = state.currentValue;
          state.currentValue = undefined;
          renderOpcodesToString(creationOpcodes, componentRuntimeValues, state, componentFiber);
          const currentValue = state.currentValue;
          if (currentValue !== null && currentValue !== undefined && currentValue !== ReactElementNode) {
            state.renderString += escapeText(currentValue);
          }
          state.currentValue = previousValue;
        }
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
      case ROOT_STATIC_VALUE: {
        const staticValue = opcodes[++index];
        state.currentValue = staticValue;
        return;
      }
      case ROOT_DYNAMIC_VALUE: {
        const dynamicValuePointer = opcodes[++index];
        let value = runtimeValues[dynamicValuePointer];
        if (isReactNode(value)) {
          value = renderReactNodeToString(value, false, runtimeValues, state, currentFiber);
        } else {
          state.currentValue = value;
        }
        return;
      }
      case DYNAMIC_PROP_REF:
      default: {
        index += 3;
        continue;
      }
    }
    ++index;
  }
}

function renderFunctionComponentTemplateToString(
  isRoot,
  templateTypeAndFlags,
  componentTemplate,
  values,
  isOnlyChild,
  state,
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

function renderPropValue(propFlags, value) {
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
      const staticPropFlags = staticProps[i + 1];
      const staticPropValue = renderPropValue(staticPropFlags, staticProps[i + 2]);
      if (staticPropValue === undefined) {
        continue;
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
      let styleName = staticStyles[i];
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
      const dynamicPropValue = renderPropValue(dynamicPropFlags, values[dynamicPropValueIndex]);

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
    children = escapeText(values[textContentValueIndex]);
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

function renderTextTemplateToString(templateTypeAndFlags, textTemplate, values, isOnlyChild, state) {
  const templateFlags = templateTypeAndFlags & ~0x3f;
  const isStatic = (templateFlags & IS_STATIC) !== 0;
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
  const isStatic = (templateFlags & IS_STATIC) !== 0;
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
  const isStatic = (templateFlags & IS_STATIC) !== 0;
  const textArray = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
  return renderTextArrayToString(textArray, state);
}

function renderVNodeCollectionTemplateToString(vNodeCollectionTemplate, values, isOnlyChild, state) {
  const vNodeCollectionValueIndex = vNodeCollectionTemplate[1];
  const vNodeCollection = values[vNodeCollectionValueIndex];
  const vNodeCollectionLength = vNodeCollection.length;

  let collectionString = "";
  for (let i = 0; i < vNodeCollectionLength; ++i) {
    collectionString += renderVNodeToString(vNodeCollection[i], false, state);
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

function renderReferenceVNodeTemplateToString(referenceVNode, values, isOnlyChild, state) {
  const vNodeValueIndex = referenceVNode[1];
  const vNode = values[vNodeValueIndex];
  return renderVNodeToString(vNode, isOnlyChild, state);
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

function renderVNodeToString(vNode, isOnlyChild, state) {
  if (vNode === undefined || vNode === null || typeof vNode === "boolean") {
    return "";
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    if (isOnlyChild) {
      const lastChildWasText = state.lastChildWasText;
      state.lastChildWasText = true;
      if (lastChildWasText === true) {
        return `<!-- -->${escapeText(vNode)}`;
      }
    }
    return escapeText(vNode);
  }
  if (isArray(vNode)) {
    let str = "";
    for (let i = 0, length = vNode.length; i < length; ++i) {
      str += renderVNodeToString(vNode[i], true, state);
    }
    return str;
  } else {
    const templateNode = vNode.t;
    let values = vNode.v;
    if (values !== null) {
      // TODO
    }
    return renderTemplateToString(templateNode, values, isOnlyChild, state);
  }
}

function renderMultiReturnConditionalTemplateToString(templateNode, values, isOnlyChild, state) {
  const conditionBranchToUseKey = values[0];

  for (let i = 1; i < templateNode.length; i += 2) {
    const branchIndex = templateNode[i];

    if (branchIndex === conditionBranchToUseKey) {
      const branchTemplateNode = templateNode[i + 1];
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
    case REFERENCE_COMPONENT:
      return renderReferenceComponentTemplateToString(templateTypeAndFlags, templateNode, values, isOnlyChild, state);
    case REFERENCE_VNODE:
      return renderReferenceVNodeTemplateToString(templateNode, values, isOnlyChild, state);
    case MULTI_RETURN_CONDITIONAL:
      return renderMultiReturnConditionalTemplateToString(templateNode, values, isOnlyChild, state);
    case VNODE_COLLECTION:
      return renderVNodeCollectionTemplateToString(templateNode, values, isOnlyChild, state);
    default:
      throw new Error("Should never happen");
  }
}

function createState(rootProps) {
  return {
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
