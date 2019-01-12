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

const COMPONENT = 0;
const OPEN_ELEMENT = 6;
const OPEN_VOID_ELEMENT = 7;
const OPEN_ELEMENT_DIV = 8;
const OPEN_ELEMENT_SPAN = 9;
const CLOSE_ELEMENT = 10;
const UNCONDITIONAL_TEMPLATE = 20;
const MULTI_CONDITIONAL = 25;
const CONDITIONAL = 30;
const ELEMENT_STATIC_CHILD_VALUE = 40;
const ELEMENT_STATIC_CHILDREN_VALUE = 41;
const ELEMENT_DYNAMIC_CHILD_VALUE = 42;
const ELEMENT_DYNAMIC_CHILDREN_VALUE = 43;
const ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL = 45;
const STATIC_PROP = 60;
const DYNAMIC_PROP = 61;
const STATIC_PROP_CLASS_NAME = 62;
const DYNAMIC_PROP_CLASS_NAME = 63;

const PropFlagPartialTemplate = 1;

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

function openElement(elem, elemValuePointer, state, workInProgress) {
  if (workInProgress.hostNode === null) {
    workInProgress.hostNode = elem;
  }
  workInProgress.values[elemValuePointer] = elem;
  const stackIndex = state.currentHostNodeStackIndex++;
  state.currentHostNodeStack[stackIndex] = state.currentHostNode;
  state.currentHostNode = elem;
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

    switch (opcode) {
      case STATIC_PROP_CLASS_NAME: {
        const staticClassName = mountOpcodes[++index];
        state.currentHostNode.className = staticClassName;
        break;
      }
      case DYNAMIC_PROP_CLASS_NAME: {
        const propInformation = mountOpcodes[++index];
        const dynamicClassNamePointer = mountOpcodes[++index];
        const dynamicClassName = runtimeValues[dynamicClassNamePointer];

        if (propInformation & PropFlagPartialTemplate) {
          throw new Error("TODO renderMountDynamicClassNameProp");
        } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
          state.currentHostNode.className = dynamicClassName;
        }
        break;
      }
      case STATIC_PROP: {
        const propName = mountOpcodes[++index];
        const staticPropValue = mountOpcodes[++index];
        state.currentHostNode.setAttribute(propName, staticPropValue);
        break;
      }
      case DYNAMIC_PROP: {
        const propName = mountOpcodes[++index];
        const propInformation = mountOpcodes[++index];
        const dynamicPropValuePointer = mountOpcodes[++index];
        const dynamicPropValue = runtimeValues[dynamicPropValuePointer];

        if (propInformation & PropFlagPartialTemplate) {
          throw new Error("TODO renderStaticProp");
        } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
          state.currentHostNode.setAttribute(propName, dynamicPropValue);
        }
        break;
      }
      case ELEMENT_STATIC_CHILD_VALUE: {
        const staticTextChild = mountOpcodes[++index];
        const textNode = createTextNode(staticTextChild);
        const currentHostNode = state.currentHostNode;

        if (currentHostNode === null) {
          state.currentHostNode = textNode;
        } else {
          appendChild(currentHostNode, textNode);
        }
        break;
      }
      case ELEMENT_STATIC_CHILDREN_VALUE: {
        const staticTextContent = mountOpcodes[++index];
        state.currentHostNode.textContent = staticTextContent;
        break;
      }
      case ELEMENT_DYNAMIC_CHILD_VALUE: {
        const dynamicTextChildPointer = mountOpcodes[++index];
        const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
        const textNode = createTextNode(dynamicTextChild);
        const currentHostNode = state.currentHostNode;

        if (currentHostNode === null) {
          state.currentHostNode = textNode;
        } else {
          appendChild(currentHostNode, textNode);
        }
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_VALUE: {
        const dynamicTextContentPointer = mountOpcodes[++index];
        const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
        state.currentHostNode.textContent = dynamicTextContent;
        break;
      }
      case OPEN_ELEMENT_DIV: {
        const elem = createElement("div");
        const elemValuePointer = mountOpcodes[++index];
        if (shouldCreateOpcodes === true) {
          unmountOpcodes.push(9, elemValuePointer);
        }
        openElement(elem, elemValuePointer, state, workInProgress);
        break;
      }
      case OPEN_ELEMENT_SPAN: {
        const elem = createElement("span");
        const elemValuePointer = mountOpcodes[++index];
        if (shouldCreateOpcodes === true) {
          unmountOpcodes.push(9, elemValuePointer);
        }
        openElement(elem, elemValuePointer, state, workInProgress);
        break;
      }
      case OPEN_ELEMENT: {
        const elementTag = mountOpcodes[++index];
        const elemValuePointer = mountOpcodes[++index];
        const elem = createElement(elementTag);
        if (shouldCreateOpcodes === true) {
          unmountOpcodes.push(9, elemValuePointer);
        }
        openElement(elem, elemValuePointer, state, workInProgress);
        break;
      }
      case CLOSE_ELEMENT: {
        let stackIndex = state.currentHostNodeStackIndex;
        state.currentHostNodeStack[stackIndex] = null;
        stackIndex = --state.currentHostNodeStackIndex;
        const parent = state.currentHostNodeStack[stackIndex];
        appendChild(parent, state.currentHostNode);
        state.currentHostNode = parent;
        break;
      }
      case OPEN_VOID_ELEMENT: {
        const elementTag = mountOpcodes[++index];
        const elemValuePointer = mountOpcodes[++index];
        const elem = createElement(elementTag);
        if (shouldCreateOpcodes === true) {
          unmountOpcodes.push(9, elemValuePointer);
        }
        workInProgress.values[elemValuePointer] = elem;
        elem._parentNode = state.currentHostNode;
        state.currentHostNode = elem;
        state.currentHostNodeIsVoidElement = true;
        break;
      }
      case ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: {
        const templateOpcodes = mountOpcodes[++index];
        const computeValuesPointer = mountOpcodes[++index];
        const computeValues = runtimeValues[computeValuesPointer];
        renderMountOpcodes(templateOpcodes, computeValues, state, workInProgress);
        break;
      }
      case CONDITIONAL: {
        const conditionValuePointer = mountOpcodes[++index];
        const conditionValue = runtimeValues[conditionValuePointer];
        const consequentMountOpcodes = mountOpcodes[++index];
        const alternateMountOpcodes = mountOpcodes[++index];

        if (shouldCreateOpcodes === true) {
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
          const [
            alternateUpdateOpcodes,
            alternateUnmountOpcodes,
            shouldCreateAlternateOpcodes,
          ] = getOpcodesFromMountOpcodes(alternateMountOpcodes);
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
        break;
      }
      case UNCONDITIONAL_TEMPLATE: {
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
        return;
      }
      case MULTI_CONDITIONAL: {
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
        index = startingIndex + (conditionalSize - 1) * 2 + 1;
        break;
      }
      case COMPONENT: {
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
        const [
          componentUpdateOpcodes,
          componentUnmountOpcodes,
          shouldCreateComponentOpcodes,
        ] = getOpcodesFromMountOpcodes(componentMountOpcodes);
        const componentFiber = createOpcodeFiber(null, []);
        if (shouldCreateComponentOpcodes) {
          updateOpcodes.push(0);
          if (rootPropsShape !== undefined) {
            updateOpcodes.push(rootPropsShape);
          }
          updateOpcodes.push(componentUpdateOpcodes);
          unmountOpcodes.push(0, componentUnmountOpcodes);
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
        return;
      }
      default:
        ++index;
    }
    ++index;
  }
}

function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
  const opcodesLength = updateOpcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = updateOpcodes[index];

    switch (opcode) {
      case CONDITIONAL: {
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
                renderUnmountOpcodes(alternateUnmountOpcodes, state, workInProgress, false);
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
          const [
            alternateUpdateOpcodes,
            alternateUnmountOpcodes,
            shouldCreateAlternateOpcodes,
          ] = getOpcodesFromMountOpcodes(alternateMountOpcodes);
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
        break;
      }
      case UNCONDITIONAL_TEMPLATE: {
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
        return;
      }
      case COMPONENT: {
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
        return;
      }
      default:
        ++index;
    }
    ++index;
  }
}

function renderUnmountOpcodes(unmountOpcodes, state, workInProgress, skipHostNodeRemoval) {
  const opcodesLength = unmountOpcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = unmountOpcodes[index];

    switch (opcode) {
      case UNCONDITIONAL_TEMPLATE: {
        return;
      }
      case COMPONENT: {
        let currentComponent = state.currentComponent;
        let componentFiber;
        const previousComponent = currentComponent;
        if (workInProgress === null) {
          componentFiber = state.fiber;
        }
        const component = componentFiber.values[0];
        const componentUnmountOpcodes = unmountOpcodes[++index];
        state.currentComponent = currentComponent = component;
        renderUnmountOpcodes(componentUnmountOpcodes, state, componentFiber, skipHostNodeRemoval);
        state.currentComponent = previousComponent;
        return;
      }
      default:
        ++index;
    }
    ++index;
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

function unmountRoot(rootState) {
  const [, unmountOpcodes] = getOpcodesFromMountOpcodes(rootState.reactElement.type);
  renderUnmountOpcodes(unmountOpcodes, rootState, null, true);
  removeChild(rootState.currentHostNode, rootState.fiber.hostNode);
  rootState.fiber = null;
}

function getOpcodesFromMountOpcodes(mountOpcodes) {
  return [emptyArray, emptyArray, false];
}

function createState(rootPropsObject, currentHostNode, reactElement) {
  return {
    currentComponent: null,
    currentHostNode,
    currentHostNodeIsVoidElement: false,
    currentHostNodeStack: [],
    currentHostNodeStackIndex: 0,
    fiber: null,
    propsArray: emptyArray,
    reactElement,
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
      unmountRoot(rootState);
    }
  } else if (node.$$typeof === reactElementSymbol) {
    if (rootState === undefined) {
      rootState = createState(node.props, DOMContainer, node);
      rootStates.set(DOMContainer, rootState);
    } else {
      rootState.reactElement = node;
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
