(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var React = require("react");

  var SharedReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var ReactCurrentDispatcher = SharedReactInternals.ReactCurrentDispatcher;
  debugger;
  /* eslint-disable-next-line */


  var reactCompilerRuntime = {
    createReactNode: function createReactNode(t, v) {
      return {
        t: t,
        v: v || null
      };
    },
    useState: function useState() {// TODO
    }
  };

  var useState = reactCompilerRuntime["useState"];

  function Component_ComputeFunction() {
    var _useState = useState("Hello world"),
        value = _useState[0];

    return [value];
  }

  var Component = // Component OPCODES
  [0 // COMPONENT
  , 1 // USES_HOOKS
  , 0 // ROOT_PROPS_SHAPE
  , [20 // UNCONDITIONAL_TEMPLATE
  , [8 // OPEN_ELEMENT_DIV
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  ], Component_ComputeFunction // COMPUTE_FUNCTION
  , 1 // VALUE_POINTER_INDEX
  ]];

  var reactElementSymbol = Symbol.for("react.element");
  var isArray = Array.isArray;
  var emptyArray = [];
  function convertRootPropsToPropsArray(rootProps, rootPropsShape) {
    var props = [];

    if (rootPropsShape !== 0) {
      for (var i = 0, length = rootPropsShape.length; i < length; i++) {
        var propShape = rootPropsShape[i];
        props.push(rootProps[propShape]);
      }
    }

    return props;
  }
  function createRootComponent(rootProps, rootPropsShape, usesHooks) {
    return createComponent(convertRootPropsToPropsArray(rootProps, rootPropsShape), usesHooks);
  }
  function createComponent(props, usesHooks) {
    return {
      props: props,
      usesHooks: usesHooks
    };
  }

  var rootStates = new Map();
  var mountOpcodesToUpdateOpcodes = new Map();
  var mountOpcodesToUnmountOpcodes = new Map();
  var COMPONENT = 0;
  var OPEN_ELEMENT = 6;
  var OPEN_VOID_ELEMENT = 7;
  var OPEN_ELEMENT_DIV = 8;
  var OPEN_ELEMENT_SPAN = 9;
  var CLOSE_ELEMENT = 10;
  var UNCONDITIONAL_TEMPLATE = 20;
  var MULTI_CONDITIONAL = 25;
  var CONDITIONAL = 30;
  var ELEMENT_STATIC_CHILD_VALUE = 40;
  var ELEMENT_STATIC_CHILDREN_VALUE = 41;
  var ELEMENT_DYNAMIC_CHILD_VALUE = 42;
  var ELEMENT_DYNAMIC_CHILDREN_VALUE = 43;
  var ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL = 45;
  var STATIC_PROP = 60;
  var DYNAMIC_PROP = 61;
  var STATIC_PROP_CLASS_NAME = 62;
  var DYNAMIC_PROP_CLASS_NAME = 63;
  var PropFlagPartialTemplate = 1;

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
      for (var i = 0, length = element.length; i < length; i++) {
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

    var currentHostNode = state.currentHostNode;

    if (currentHostNode !== null) {
      var stackIndex = state.currentHostNodeStackIndex++;
      state.currentHostNodeStack[stackIndex] = state.currentHostNode;
    }

    state.currentHostNode = elem;
  }

  function renderMountOpcodes(mountOpcodes, runtimeValues, state, workInProgress) {
    var opcodesLength = mountOpcodes.length;
    var updateOpcodes = mountOpcodesToUpdateOpcodes.get(mountOpcodes);
    var unmountOpcodes = mountOpcodesToUnmountOpcodes.get(mountOpcodes);
    var topHostNode;
    var shouldCreateOpcodes = updateOpcodes === undefined;

    if (shouldCreateOpcodes === true) {
      updateOpcodes = [];
      unmountOpcodes = [];
      mountOpcodesToUpdateOpcodes.set(mountOpcodes, updateOpcodes);
      mountOpcodesToUnmountOpcodes.set(mountOpcodes, unmountOpcodes);
    }

    var index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = mountOpcodes[index];

      switch (opcode) {
        case STATIC_PROP_CLASS_NAME:
          {
            var staticClassName = mountOpcodes[++index];
            state.currentHostNode.className = staticClassName;
            break;
          }

        case DYNAMIC_PROP_CLASS_NAME:
          {
            var propInformation = mountOpcodes[++index];
            var dynamicClassNamePointer = mountOpcodes[++index];
            var dynamicClassName = runtimeValues[dynamicClassNamePointer];

            if (propInformation & PropFlagPartialTemplate) {
              throw new Error("TODO renderMountDynamicClassNameProp");
            } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
              state.currentHostNode.className = dynamicClassName;
            }

            break;
          }

        case STATIC_PROP:
          {
            var propName = mountOpcodes[++index];
            var staticPropValue = mountOpcodes[++index];
            var currentHostNode = state.currentHostNode;

            if (propName === "id") {
              currentHostNode.id = staticPropValue;
            } else {
              currentHostNode.setAttribute(propName, staticPropValue);
            }

            break;
          }

        case DYNAMIC_PROP:
          {
            var _propName = mountOpcodes[++index];
            var _propInformation = mountOpcodes[++index];
            var dynamicPropValuePointer = mountOpcodes[++index];
            var dynamicPropValue = runtimeValues[dynamicPropValuePointer];

            if (_propInformation & PropFlagPartialTemplate) {
              throw new Error("TODO renderStaticProp");
            } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
              state.currentHostNode.setAttribute(_propName, dynamicPropValue);
            }

            break;
          }

        case ELEMENT_STATIC_CHILD_VALUE:
          {
            var staticTextChild = mountOpcodes[++index];
            var textNode = createTextNode(staticTextChild);
            var _currentHostNode = state.currentHostNode;

            if (_currentHostNode === null) {
              state.currentHostNode = textNode;
            } else {
              appendChild(_currentHostNode, textNode);
            }

            break;
          }

        case ELEMENT_STATIC_CHILDREN_VALUE:
          {
            var staticTextContent = mountOpcodes[++index];
            state.currentHostNode.textContent = staticTextContent;
            break;
          }

        case ELEMENT_DYNAMIC_CHILD_VALUE:
          {
            var dynamicTextChildPointer = mountOpcodes[++index];
            var dynamicTextChild = runtimeValues[dynamicTextChildPointer];

            var _textNode = createTextNode(dynamicTextChild);

            var _currentHostNode2 = state.currentHostNode;

            if (_currentHostNode2 === null) {
              state.currentHostNode = _textNode;
            } else {
              appendChild(_currentHostNode2, _textNode);
            }

            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_VALUE:
          {
            var dynamicTextContentPointer = mountOpcodes[++index];
            var dynamicTextContent = runtimeValues[dynamicTextContentPointer];
            state.currentHostNode.textContent = dynamicTextContent;
            break;
          }

        case OPEN_ELEMENT_DIV:
          {
            var elem = createElement("div");
            openElement(elem, state, workInProgress);
            break;
          }

        case OPEN_ELEMENT_SPAN:
          {
            var _elem = createElement("span");

            openElement(_elem, state, workInProgress);
            break;
          }

        case OPEN_ELEMENT:
          {
            var elementTag = mountOpcodes[++index];

            var _elem2 = createElement(elementTag);

            openElement(_elem2, state, workInProgress);
            break;
          }

        case CLOSE_ELEMENT:
          {
            var stackIndex = state.currentHostNodeStackIndex;
            var _currentHostNode3 = state.currentHostNode;
            topHostNode = _currentHostNode3;

            if (stackIndex === 0) {
              state.currentHostNode = null;
            } else {
              stackIndex = --state.currentHostNodeStackIndex;
              var parent = state.currentHostNodeStack[stackIndex];
              state.currentHostNodeStack[stackIndex] = null;
              appendChild(parent, _currentHostNode3);
              state.currentHostNode = parent;
            }

            break;
          }

        case OPEN_VOID_ELEMENT:
          {
            var _elementTag = mountOpcodes[++index];

            var _elem3 = createElement(_elementTag);

            openElement(_elem3, state, workInProgress);
            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL:
          {
            var templateOpcodes = mountOpcodes[++index];
            var computeValuesPointer = mountOpcodes[++index];
            var computeValues = runtimeValues[computeValuesPointer];
            renderMountOpcodes(templateOpcodes, computeValues, state, workInProgress);
            break;
          }

        case CONDITIONAL:
          {
            var hostNodeValuePointer = mountOpcodes[++index];
            var conditionValuePointer = mountOpcodes[++index];
            var conditionValue = runtimeValues[conditionValuePointer];
            var consequentMountOpcodes = mountOpcodes[++index];
            var alternateMountOpcodes = mountOpcodes[++index];
            var hostNode = void 0;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(CONDITIONAL, hostNodeValuePointer, conditionValuePointer, consequentMountOpcodes, alternateMountOpcodes);
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

        case UNCONDITIONAL_TEMPLATE:
          {
            var templateMountOpcodes = mountOpcodes[++index];
            var computeFunction = mountOpcodes[++index];
            var templateRuntimeValues = runtimeValues;
            var templateValuesPointerIndex = void 0;

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

        case MULTI_CONDITIONAL:
          {
            var conditionalSize = mountOpcodes[++index];
            var _hostNodeValuePointer = mountOpcodes[++index];
            var caseValuePointer = mountOpcodes[++index];
            var startingIndex = index;
            var conditionalDefaultIndex = conditionalSize - 1;

            if (shouldCreateOpcodes === true) {
              var _updateOpcodes;

              var sliceFrom = startingIndex + 1;
              var sliceTo = sliceFrom + (conditionalSize - 1) * 2 + 1;

              (_updateOpcodes = updateOpcodes).push.apply(_updateOpcodes, [MULTI_CONDITIONAL, conditionalSize, _hostNodeValuePointer, caseValuePointer].concat(mountOpcodes.slice(sliceFrom, sliceTo)));
            }

            var _hostNode = void 0;

            var conditionalIndex = 0;

            for (; conditionalIndex < conditionalSize; conditionalIndex++) {
              if (conditionalIndex === conditionalDefaultIndex) {
                var defaultCaseMountOpcodes = mountOpcodes[++index];

                if (defaultCaseMountOpcodes !== null) {
                  _hostNode = renderMountOpcodes(defaultCaseMountOpcodes, runtimeValues, state, workInProgress);
                }
              } else {
                var caseConditionPointer = mountOpcodes[++index];
                var caseConditionValue = runtimeValues[caseConditionPointer];

                if (caseConditionValue === true) {
                  var caseMountOpcodes = mountOpcodes[++index];

                  if (caseMountOpcodes !== null) {
                    _hostNode = renderMountOpcodes(caseMountOpcodes, runtimeValues, state, workInProgress);
                  }

                  break;
                }

                ++index;
              }
            }

            workInProgress.values[caseValuePointer] = conditionalIndex - 1;

            if (_hostNode !== undefined) {
              workInProgress.values[_hostNodeValuePointer] = _hostNode;
            }

            index = startingIndex + (conditionalSize - 1) * 2 + 1;
            break;
          }

        case COMPONENT:
          {
            var usesHooks = mountOpcodes[++index];
            var currentComponent = state.currentComponent;
            var rootPropsShape = void 0;
            var previousComponent = currentComponent;

            if (currentComponent === null) {
              rootPropsShape = mountOpcodes[++index];
              currentComponent = state.currentComponent = createRootComponent(state.rootPropsObject, rootPropsShape, false);
            } else {
              state.currentComponent = createComponent(state.propsArray, false);
            }

            var componentMountOpcodes = mountOpcodes[++index];
            var componentFiber = new OpcodeFiber(null, []);

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

            var previousValue = state.currentValue;
            state.currentValue = undefined;

            var _hostNode2 = renderMountOpcodes(componentMountOpcodes, runtimeValues, state, componentFiber);

            state.currentValue = previousValue;
            state.currentComponent = previousComponent;
            return _hostNode2;
          }

        default:
          ++index;
      }

      ++index;
    }

    return topHostNode;
  }

  function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
    var opcodesLength = updateOpcodes.length;
    var index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = updateOpcodes[index];

      switch (opcode) {
        case CONDITIONAL:
          {
            var hostNodeValuePointer = updateOpcodes[++index];
            var conditionValuePointer = updateOpcodes[++index];
            var previousConditionValue = previousRuntimeValues[conditionValuePointer];
            var nextConditionValue = nextRuntimeValues[conditionValuePointer];
            var consequentMountOpcodes = updateOpcodes[++index];
            var alternateMountOpcodes = updateOpcodes[++index];
            var shouldUpdate = previousConditionValue === nextConditionValue;
            var nextHostNode = void 0;

            if (nextConditionValue) {
              if (consequentMountOpcodes !== null) {
                if (shouldUpdate) ; else {
                  if (alternateMountOpcodes !== null) {
                    var alternateUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(alternateMountOpcodes);
                    renderUnmountOpcodes(alternateUnmountOpcodes, state, workInProgress, true);
                  }

                  nextHostNode = renderMountOpcodes(consequentMountOpcodes, nextRuntimeValues, state, workInProgress);
                }
              }
            } else {
              if (alternateMountOpcodes !== null) {
                if (shouldUpdate) ; else {
                  if (consequentMountOpcodes !== null) {
                    var consequentUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(consequentMountOpcodes);
                    renderUnmountOpcodes(consequentUnmountOpcodes, state, workInProgress, true);
                  }

                  nextHostNode = renderMountOpcodes(alternateMountOpcodes, nextRuntimeValues, state, workInProgress);
                }
              }
            }

            if (nextHostNode !== undefined) {
              var previousHostNode = workInProgress.values[hostNodeValuePointer];
              replaceChild(previousHostNode, nextHostNode);
              workInProgress.values[hostNodeValuePointer] = nextHostNode;
            }

            break;
          }

        case MULTI_CONDITIONAL:
          {
            var conditionalSize = updateOpcodes[++index];
            var _hostNodeValuePointer2 = updateOpcodes[++index];
            var caseValuePointer = updateOpcodes[++index];
            var startingIndex = index;
            var conditionalDefaultIndex = conditionalSize - 1;
            var previousConditionalIndex = workInProgress.values[caseValuePointer];
            var caseHasChanged = false;

            var _nextHostNode = void 0;

            for (var conditionalIndex = 0; conditionalIndex < conditionalSize; ++conditionalIndex) {
              if (conditionalIndex === conditionalDefaultIndex) {
                var defaultCaseMountOpcodes = updateOpcodes[++index];

                if (previousConditionalIndex !== conditionalIndex) {
                  caseHasChanged = true;
                }

                if (defaultCaseMountOpcodes !== null) {
                  if (caseHasChanged === true) {
                    _nextHostNode = renderMountOpcodes(defaultCaseMountOpcodes, nextRuntimeValues, state, workInProgress);
                  } else {
                    var defaultCaseUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(defaultCaseMountOpcodes);
                    renderUpdateOpcodes(defaultCaseUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress);
                  }
                }
              } else {
                var caseConditionPointer = updateOpcodes[++index];
                var caseConditionValue = nextRuntimeValues[caseConditionPointer];

                if (caseConditionValue === true) {
                  var caseMountOpcodes = updateOpcodes[++index];

                  if (previousConditionalIndex !== conditionalIndex) {
                    caseHasChanged = true;
                  }

                  if (caseMountOpcodes !== null) {
                    if (caseHasChanged === true) {
                      _nextHostNode = renderMountOpcodes(caseMountOpcodes, nextRuntimeValues, state, workInProgress);
                    } else {
                      var caseUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(caseMountOpcodes);
                      renderUpdateOpcodes(caseUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress);
                    }
                  }

                  break;
                }

                ++index;
              }
            }

            if (caseHasChanged === true) {
              var previousMountOpcodesPointer = previousConditionalIndex === conditionalDefaultIndex ? startingIndex + 1 + previousConditionalIndex * 2 : startingIndex + 2 + previousConditionalIndex * 2;
              var previousCaseMountOpcodes = updateOpcodes[previousMountOpcodesPointer];
              var previousCaseUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(previousCaseMountOpcodes);
              renderUnmountOpcodes(previousCaseUnmountOpcodes, state, workInProgress, true);
            }

            index = startingIndex + (conditionalSize - 1) * 2 + 1;

            if (_nextHostNode !== undefined) {
              var _previousHostNode = workInProgress.values[_hostNodeValuePointer2];
              replaceChild(_previousHostNode, _nextHostNode);
              workInProgress.values[_hostNodeValuePointer2] = _nextHostNode;
            }

            break;
          }

        case UNCONDITIONAL_TEMPLATE:
          {
            var templateMountOpcodes = updateOpcodes[++index];
            var templateUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(templateMountOpcodes);
            var computeFunction = updateOpcodes[++index];
            var previousTemplateRuntimeValues = previousRuntimeValues;
            var nextTemplateRuntimeValues = nextRuntimeValues;

            if (computeFunction !== 0) {
              var templateValuesPointerIndex = updateOpcodes[++index];
              nextTemplateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);
              previousTemplateRuntimeValues = workInProgress.values[templateValuesPointerIndex];
              workInProgress.values[templateValuesPointerIndex] = nextRuntimeValues;
            }

            renderUpdateOpcodes(templateUpdateOpcodes, previousTemplateRuntimeValues, nextTemplateRuntimeValues, state, workInProgress);
            return;
          }

        case COMPONENT:
          {
            var usesHooks = updateOpcodes[++index];
            var componentMountOpcodes = updateOpcodes[++index];
            var componentUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(componentMountOpcodes);
            var currentComponent = state.currentComponent;
            var componentFiber = void 0;
            var previousComponent = currentComponent;

            if (workInProgress === null) {
              componentFiber = state.fiber;
            }

            var component = componentFiber.values[0];
            var nextPropsArray = void 0;

            if (currentComponent === null) {
              var rootPropsShape = updateOpcodes[++index];
              nextPropsArray = convertRootPropsToPropsArray(state.rootPropsObject, rootPropsShape);
            } else {
              nextPropsArray = state.propsArray;
            }

            component.props = nextPropsArray;
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
    var opcodesLength = unmountOpcodes.length;
    var index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = unmountOpcodes[index];

      switch (opcode) {
        case UNCONDITIONAL_TEMPLATE:
          {
            return;
          }

        case COMPONENT:
          {
            var usesHooks = unmountOpcodes[++index];

            var currentComponent = state.currentComponent;
            var componentFiber = void 0;
            var previousComponent = currentComponent;

            if (workInProgress === null) {
              componentFiber = state.fiber;
            }

            var component = componentFiber.values[0];
            var componentUnmountOpcodes = unmountOpcodes[++index];
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
    var unmountOpcodes = mountOpcodesToUnmountOpcodes.get(rootState.mountOpcodes);
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
    }
  }

  function renderNodeToRootContainer(node, DOMContainer) {
    var rootState = rootStates.get(DOMContainer);

    if (node === null || node === undefined) {
      if (rootState !== undefined) {
        unmountRoot(DOMContainer, rootState);
      }
    } else if (node.$$typeof === reactElementSymbol) {
      var mountOpcodes = node.type;
      var shouldUpdate = false;

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
        var updateOpcodes = mountOpcodesToUpdateOpcodes.get(mountOpcodes);
        renderUpdateOpcodes(updateOpcodes, emptyArray, emptyArray, rootState, null);
      } else {
        var hostNode = renderMountOpcodes(mountOpcodes, emptyArray, rootState, null);
        appendChild(DOMContainer, hostNode);
      }
    } else {
      throw new Error("render() expects a ReactElement as the first argument");
    }
  }

  function render(node, DOMContainer) {
    return renderNodeToRootContainer(node, DOMContainer);
  }

  // DO NOT MODIFY
  var React$1 = {
    createElement: function createElement(type, props) {
      return {
        $$typeof: reactElementSymbol,
        key: null,
        props: props,
        ref: null,
        type: type
      };
    }
  };
  var root = document.getElementById("root");
  var props = {
    cond: false,
    defaultClassName: "default-item"
  };
  console.time("Render");
  render(React$1.createElement(Component, props), root); // render(<Component {...updateProps} />, root);
  // render(<Component {...props} />, root);

  console.timeEnd("Render"); // const props = {val1: "val1", val2: "val2", val3: "val3", val4: "val4", val5: "val5", val6: "val6", val7: "val7"};
  // console.time("Render");
  // for (let i = 0; i < 1000; i++) {
  //   render(null, root);
  //   render(<Component {...props} />, root);
  // }
  // console.timeEnd("Render");

}));
