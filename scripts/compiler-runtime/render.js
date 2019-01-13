"use strict";

import { finishHooks, prepareToUseHooks, useHooksDispatcher } from "./dom-dispatcher";
import {
  convertRootPropsToPropsArray,
  createComponent,
  createRootComponent,
  emptyArray,
  isArray,
  reactElementSymbol,
} from "./utils";

const rootStates = new Map();
const mountOpcodesToUpdateOpcodes = new Map();
const mountOpcodesToUnmountOpcodes = new Map();

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

function replaceChild(originalNode, replaceNode) {
  originalNode.parentNode.replaceChild(replaceNode, originalNode);
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
  } else if (arr.length === 7) {
    return computeFunction(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
  }
  return computeFunction.apply(null, arr);
}

function openElement(elem, state, workInProgress) {
  if (workInProgress.hostNode === null) {
    workInProgress.hostNode = elem;
  }
  const currentHostNode = state.currentHostNode;
  if (currentHostNode !== null) {
    const stackIndex = state.currentHostNodeStackIndex++;
    state.currentHostNodeStack[stackIndex] = state.currentHostNode;
  }
  state.currentHostNode = elem;
}

function renderMountOpcodes(mountOpcodes, runtimeValues, state, workInProgress) {
  const opcodesLength = mountOpcodes.length;
  let updateOpcodes = mountOpcodesToUpdateOpcodes.get(mountOpcodes);
  let unmountOpcodes = mountOpcodesToUnmountOpcodes.get(mountOpcodes);
  let topHostNode;
  const shouldCreateOpcodes = updateOpcodes === undefined;

  if (shouldCreateOpcodes === true) {
    updateOpcodes = [];
    unmountOpcodes = [];
    mountOpcodesToUpdateOpcodes.set(mountOpcodes, updateOpcodes);
    mountOpcodesToUnmountOpcodes.set(mountOpcodes, unmountOpcodes);
  }
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
        const currentHostNode = state.currentHostNode;
        if (propName === "id") {
          currentHostNode.id = staticPropValue;
        } else {
          currentHostNode.setAttribute(propName, staticPropValue);
        }
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
        openElement(elem, state, workInProgress);
        break;
      }
      case OPEN_ELEMENT_SPAN: {
        const elem = createElement("span");
        openElement(elem, state, workInProgress);
        break;
      }
      case OPEN_ELEMENT: {
        const elementTag = mountOpcodes[++index];
        const elem = createElement(elementTag);
        openElement(elem, state, workInProgress);
        break;
      }
      case CLOSE_ELEMENT: {
        let stackIndex = state.currentHostNodeStackIndex;
        const currentHostNode = state.currentHostNode;
        topHostNode = currentHostNode;
        if (stackIndex === 0) {
          state.currentHostNode = null;
        } else {
          stackIndex = --state.currentHostNodeStackIndex;
          const parent = state.currentHostNodeStack[stackIndex];
          state.currentHostNodeStack[stackIndex] = null;
          appendChild(parent, currentHostNode);
          state.currentHostNode = parent;
        }
        break;
      }
      case OPEN_VOID_ELEMENT: {
        const elementTag = mountOpcodes[++index];
        const elem = createElement(elementTag);
        openElement(elem, state, workInProgress);
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
        const hostNodeValuePointer = mountOpcodes[++index];
        const conditionValuePointer = mountOpcodes[++index];
        const conditionValue = runtimeValues[conditionValuePointer];
        const consequentMountOpcodes = mountOpcodes[++index];
        const alternateMountOpcodes = mountOpcodes[++index];
        let hostNode;

        if (shouldCreateOpcodes === true) {
          updateOpcodes.push(
            CONDITIONAL,
            hostNodeValuePointer,
            conditionValuePointer,
            consequentMountOpcodes,
            alternateMountOpcodes,
          );
        }

        if (conditionValue) {
          if (consequentMountOpcodes !== null) {
            hostNode = renderMountOpcodes(consequentMountOpcodes, runtimeValues, state, workInProgress);
          }
        } else {
          if (alternateMountOpcodes !== null) {
            hostNode = renderMountOpcodes(alternateMountOpcodes, runtimeValues, state, workInProgress);
          }
        }
        workInProgress.values[hostNodeValuePointer] = hostNode;
        break;
      }
      case UNCONDITIONAL_TEMPLATE: {
        const templateMountOpcodes = mountOpcodes[++index];
        const computeFunction = mountOpcodes[++index];
        let templateRuntimeValues = runtimeValues;
        let templateValuesPointerIndex;

        if (computeFunction !== null) {
          templateValuesPointerIndex = mountOpcodes[++index];
          templateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);
          workInProgress.values[templateValuesPointerIndex] = templateRuntimeValues;
        }
        if (shouldCreateOpcodes === true) {
          updateOpcodes.push(UNCONDITIONAL_TEMPLATE, templateMountOpcodes, computeFunction);
          if (templateValuesPointerIndex !== undefined) {
            updateOpcodes.push(templateValuesPointerIndex);
          }
        }
        return renderMountOpcodes(templateMountOpcodes, templateRuntimeValues, state, workInProgress);
      }
      case MULTI_CONDITIONAL: {
        const conditionalSize = mountOpcodes[++index];
        const hostNodeValuePointer = mountOpcodes[++index];
        const caseValuePointer = mountOpcodes[++index];
        const startingIndex = index;
        const conditionalDefaultIndex = conditionalSize - 1;
        if (shouldCreateOpcodes === true) {
          const sliceFrom = startingIndex + 1;
          const sliceTo = sliceFrom + (conditionalSize - 1) * 2 + 1;
          updateOpcodes.push(
            MULTI_CONDITIONAL,
            conditionalSize,
            hostNodeValuePointer,
            caseValuePointer,
            ...mountOpcodes.slice(sliceFrom, sliceTo),
          );
        }
        let hostNode;
        let conditionalIndex = 0;
        for (; conditionalIndex < conditionalSize; conditionalIndex++) {
          if (conditionalIndex === conditionalDefaultIndex) {
            const defaultCaseMountOpcodes = mountOpcodes[++index];

            if (defaultCaseMountOpcodes !== null) {
              hostNode = renderMountOpcodes(defaultCaseMountOpcodes, runtimeValues, state, workInProgress);
            }
          } else {
            const caseConditionPointer = mountOpcodes[++index];
            const caseConditionValue = runtimeValues[caseConditionPointer];

            if (caseConditionValue === true) {
              const caseMountOpcodes = mountOpcodes[++index];
              if (caseMountOpcodes !== null) {
                hostNode = renderMountOpcodes(caseMountOpcodes, runtimeValues, state, workInProgress);
              }
              break;
            }
            ++index;
          }
        }
        workInProgress.values[caseValuePointer] = conditionalIndex - 1;
        if (hostNode !== undefined) {
          workInProgress.values[hostNodeValuePointer] = hostNode;
        }
        index = startingIndex + (conditionalSize - 1) * 2 + 1;
        break;
      }
      case COMPONENT: {
        const usesHooks = mountOpcodes[++index];
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
        const componentFiber = new OpcodeFiber(null, []);
        if (shouldCreateOpcodes) {
          updateOpcodes.push(COMPONENT, usesHooks, componentMountOpcodes);
          if (rootPropsShape !== undefined) {
            updateOpcodes.push(rootPropsShape);
          }
          unmountOpcodes.push(COMPONENT, usesHooks, componentMountOpcodes);
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
        if (usesHooks === 1) {
          prepareToUseHooks(currentComponent);
        }
        const hostNode = renderMountOpcodes(componentMountOpcodes, runtimeValues, state, componentFiber);
        if (usesHooks === 1) {
          finishHooks();
        }
        state.currentValue = previousValue;
        state.currentComponent = previousComponent;
        return hostNode;
      }
      default:
        ++index;
    }
    ++index;
  }
  return topHostNode;
}

function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
  const opcodesLength = updateOpcodes.length;
  let index = 0;

  // Render opcodes from the opcode jump-table
  while (index < opcodesLength) {
    const opcode = updateOpcodes[index];

    switch (opcode) {
      case CONDITIONAL: {
        const hostNodeValuePointer = updateOpcodes[++index];
        const conditionValuePointer = updateOpcodes[++index];
        const previousConditionValue = previousRuntimeValues[conditionValuePointer];
        const nextConditionValue = nextRuntimeValues[conditionValuePointer];
        const consequentMountOpcodes = updateOpcodes[++index];
        const alternateMountOpcodes = updateOpcodes[++index];
        const shouldUpdate = previousConditionValue === nextConditionValue;
        let nextHostNode;

        if (nextConditionValue) {
          if (consequentMountOpcodes !== null) {
            if (shouldUpdate) {
              // debugger;
            } else {
              if (alternateMountOpcodes !== null) {
                let alternateUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(alternateMountOpcodes);
                renderUnmountOpcodes(alternateUnmountOpcodes, state, workInProgress, true);
              }
              nextHostNode = renderMountOpcodes(consequentMountOpcodes, nextRuntimeValues, state, workInProgress);
            }
          }
        } else {
          if (alternateMountOpcodes !== null) {
            if (shouldUpdate) {
              // debugger;
            } else {
              if (consequentMountOpcodes !== null) {
                let consequentUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(consequentMountOpcodes);
                renderUnmountOpcodes(consequentUnmountOpcodes, state, workInProgress, true);
              }
              nextHostNode = renderMountOpcodes(alternateMountOpcodes, nextRuntimeValues, state, workInProgress);
            }
          }
        }
        if (nextHostNode !== undefined) {
          const previousHostNode = workInProgress.values[hostNodeValuePointer];
          replaceChild(previousHostNode, nextHostNode);
          workInProgress.values[hostNodeValuePointer] = nextHostNode;
        }
        break;
      }
      case MULTI_CONDITIONAL: {
        const conditionalSize = updateOpcodes[++index];
        const hostNodeValuePointer = updateOpcodes[++index];
        const caseValuePointer = updateOpcodes[++index];
        const startingIndex = index;
        const conditionalDefaultIndex = conditionalSize - 1;
        const previousConditionalIndex = workInProgress.values[caseValuePointer];
        let caseHasChanged = false;
        let nextHostNode;

        for (let conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
          if (conditionalIndex === conditionalDefaultIndex) {
            const defaultCaseMountOpcodes = updateOpcodes[++index];

            if (previousConditionalIndex !== conditionalIndex) {
              caseHasChanged = true;
            }
            if (defaultCaseMountOpcodes !== null) {
              if (caseHasChanged === true) {
                nextHostNode = renderMountOpcodes(defaultCaseMountOpcodes, nextRuntimeValues, state, workInProgress);
              } else {
                const defaultCaseUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(defaultCaseMountOpcodes);
                renderUpdateOpcodes(
                  defaultCaseUpdateOpcodes,
                  previousRuntimeValues,
                  nextRuntimeValues,
                  state,
                  workInProgress,
                );
              }
            }
          } else {
            const caseConditionPointer = updateOpcodes[++index];
            const caseConditionValue = nextRuntimeValues[caseConditionPointer];

            if (caseConditionValue === true) {
              const caseMountOpcodes = updateOpcodes[++index];
              if (previousConditionalIndex !== conditionalIndex) {
                caseHasChanged = true;
              }
              if (caseMountOpcodes !== null) {
                if (caseHasChanged === true) {
                  nextHostNode = renderMountOpcodes(caseMountOpcodes, nextRuntimeValues, state, workInProgress);
                } else {
                  const caseUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(caseMountOpcodes);
                  renderUpdateOpcodes(
                    caseUpdateOpcodes,
                    previousRuntimeValues,
                    nextRuntimeValues,
                    state,
                    workInProgress,
                  );
                }
              }
              break;
            }
            ++index;
          }
        }
        if (caseHasChanged === true) {
          const previousMountOpcodesPointer =
            previousConditionalIndex === conditionalDefaultIndex
              ? startingIndex + 1 + previousConditionalIndex * 2
              : startingIndex + 2 + previousConditionalIndex * 2;
          const previousCaseMountOpcodes = updateOpcodes[previousMountOpcodesPointer];
          const previousCaseUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(previousCaseMountOpcodes);
          renderUnmountOpcodes(previousCaseUnmountOpcodes, state, workInProgress, true);
        }
        index = startingIndex + (conditionalSize - 1) * 2 + 1;
        if (nextHostNode !== undefined) {
          const previousHostNode = workInProgress.values[hostNodeValuePointer];
          replaceChild(previousHostNode, nextHostNode);
          workInProgress.values[hostNodeValuePointer] = nextHostNode;
        }
        break;
      }
      case UNCONDITIONAL_TEMPLATE: {
        const templateMountOpcodes = updateOpcodes[++index];
        const templateUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(templateMountOpcodes);
        const computeFunction = updateOpcodes[++index];
        let previousTemplateRuntimeValues = previousRuntimeValues;
        let nextTemplateRuntimeValues = nextRuntimeValues;
        if (computeFunction !== 0) {
          const templateValuesPointerIndex = updateOpcodes[++index];
          nextTemplateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);
          previousTemplateRuntimeValues = workInProgress.values[templateValuesPointerIndex];
          workInProgress.values[templateValuesPointerIndex] = nextRuntimeValues;
        }
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
        const usesHooks = updateOpcodes[++index];
        const componentMountOpcodes = updateOpcodes[++index];
        const componentUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(componentMountOpcodes);
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
        state.currentComponent = currentComponent = component;
        if (usesHooks === 1) {
          prepareToUseHooks(currentComponent);
        }
        renderUpdateOpcodes(componentUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, componentFiber);
        if (usesHooks === 1) {
          finishHooks(currentComponent);
        }
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
        const usesHooks = unmountOpcodes[++index];
        usesHooks; // TODO
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

function unmountRoot(DOMContainer, rootState) {
  const unmountOpcodes = mountOpcodesToUnmountOpcodes.get(rootState.mountOpcodes);
  renderUnmountOpcodes(unmountOpcodes, rootState, null, true);
  removeChild(DOMContainer, rootState.fiber.hostNode);
  rootState.fiber = null;
}

function State(mountOpcodes) {
  this.currentComponent = null;
  this.currentHostNode = null;
  this.currentHostNodeStack = [];
  this.currentHostNodeStackIndex = 0;
  this.fiber = null;
  this.mountOpcodes = mountOpcodes;
  this.propsArray = emptyArray;
  this.rootPropsObject = null;
}

function OpcodeFiber(hostNode, values) {
  this.child = null;
  this.hostNode = null;
  this.key = null;
  this.sibling = null;
  this.parent = null;
  this.values = values;
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
      unmountRoot(DOMContainer, rootState);
    }
  } else if (node.$$typeof === reactElementSymbol) {
    const mountOpcodes = node.type;
    let shouldUpdate = false;

    if (rootState === undefined) {
      rootState = new State(mountOpcodes);
      rootStates.set(DOMContainer, rootState);
    } else {
      if (rootState.fiber !== null) {
        if (rootState.mountOpcodes === mountOpcodes) {
          shouldUpdate = true;
        } else {
          unmountRoot(DOMContainer, rootState);
        }
      }
    }
    rootState.mountOpcodes = mountOpcodes;
    rootState.rootPropsObject = node.props;
    if (shouldUpdate === true) {
      const updateOpcodes = mountOpcodesToUpdateOpcodes.get(mountOpcodes);
      renderUpdateOpcodes(updateOpcodes, emptyArray, emptyArray, rootState, null);
    } else {
      const hostNode = renderMountOpcodes(mountOpcodes, emptyArray, rootState, null);
      appendChild(DOMContainer, hostNode);
    }
  } else {
    throw new Error("render() expects a ReactElement as the first argument");
  }
}

export function render(node, DOMContainer) {
  return renderNodeToRootContainer(node, DOMContainer);
}
