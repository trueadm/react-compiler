(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var currentDispatcher = {
    current: null
  };

  function resolveDispatcher() {
    var dispatcher = currentDispatcher.current;

    if (dispatcher === null) {
      throw new Error("Hooks can only be called inside the body of a function component.");
    }

    return dispatcher;
  }

  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }

  function Component_ComputeFunction() {
    var __cached__0;

    var _useState = useState(0),
        count = _useState[0],
        updateCount = _useState[1];

    __cached__0 = function increment() {
      updateCount(count + 1);
    };

    return [count, __cached__0];
  }

  var Component = // Component OPCODES
  [10 // COMPONENT
  , 1 // USES_HOOKS
  , 0 // ROOT_PROPS_SHAPE
  , [13 // UNCONDITIONAL_TEMPLATE
  , [2 // OPEN_ELEMENT_DIV
  , 0 // OPEN_ELEMENT
  , "h1", 33 // ELEMENT_STATIC_CHILDREN_VALUE
  , "This is a counter!", 8 // CLOSE_ELEMENT
  , 2 // OPEN_ELEMENT_DIV
  , 0 // OPEN_ELEMENT
  , "p", 32 // ELEMENT_STATIC_CHILD_VALUE
  , "The counter is currently at ", 34 // ELEMENT_DYNAMIC_CHILD_VALUE
  , 0, 1 // HOST_NODE_VALUE_POINTER_INDEX
  , 8 // CLOSE_ELEMENT
  , 1 // OPEN_ELEMENT_WITH_POINTER
  , "button", 2 // HOST_NODE_VALUE_POINTER_INDEX
  , 43 // DYNAMIC_PROP
  , "click", 2, 3, 1, 33 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Increase count", 8 // CLOSE_ELEMENT
  , 8 // CLOSE_ELEMENT
  , 8 // CLOSE_ELEMENT
  ], Component_ComputeFunction // COMPUTE_FUNCTION
  , 3 // VALUE_POINTER_INDEX
  ]];

  var NoWork = 0; // These are set right before calling the component.

  var renderExpirationTime = NoWork; // The work-in-progress fiber. I've named it differently to distinguish it from
  // the work-in-progress hook.

  var currentlyRenderingFiber = null; // Hooks are stored as a linked list on the fiber's memoizedState field. The
  // current hook list is the list that belongs to the current fiber. The
  // work-in-progress hook list is a new list that will be added to the
  // work-in-progress fiber.

  var firstCurrentHook = null;
  var currentHook = null;
  var firstWorkInProgressHook = null;
  var workInProgressHook = null;
  // end of the current pass. We can't store these updates on the normal queue,
  // because if the work is aborted, they should be discarded. Because this is
  // a relatively rare case, we also don't want to add an additional field to
  // either the hook or queue object types. So we store them in a lazily create
  // map of queue -> render-phase updates, which are discarded once the component
  // completes without re-rendering.
  // Whether the work-in-progress hook is a re-rendered hook

  var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

  var renderPhaseUpdates = null; // Counter to prevent infinite loops.
  function prepareToUseHooks(workInProgress, nextRenderExpirationTime) {
    renderExpirationTime = nextRenderExpirationTime;
    currentlyRenderingFiber = workInProgress;
    firstCurrentHook = workInProgress.memoizedState;
  }
  function finishHooks() {
    renderExpirationTime = NoWork;
    currentlyRenderingFiber = null;
    firstCurrentHook = null;
    currentHook = null;
    firstWorkInProgressHook = null;
    workInProgressHook = null;
  }

  function resolveCurrentlyRenderingFiber() {
    if (currentlyRenderingFiber === null) {
      throw new Error("Hooks can only be called inside the body of a function component.");
    }

    return currentlyRenderingFiber;
  }

  function createHook() {
    return {
      memoizedState: null,
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    };
  }

  function cloneHook(hook) {
    return {
      memoizedState: hook.memoizedState,
      baseState: hook.baseState,
      queue: hook.queue,
      baseUpdate: hook.baseUpdate,
      next: null
    };
  }

  function createWorkInProgressHook() {
    if (workInProgressHook === null) {
      // This is the first hook in the list
      if (firstWorkInProgressHook === null) {
        isReRender = false;
        currentHook = firstCurrentHook;

        if (currentHook === null) {
          // This is a newly mounted hook
          workInProgressHook = createHook();
        } else {
          // Clone the current hook.
          workInProgressHook = cloneHook(currentHook);
        }

        firstWorkInProgressHook = workInProgressHook;
      } else {
        // There's already a work-in-progress. Reuse it.
        isReRender = true;
        currentHook = firstCurrentHook;
        workInProgressHook = firstWorkInProgressHook;
      }
    } else {
      if (workInProgressHook.next === null) {
        isReRender = false;
        var hook;

        if (currentHook === null) {
          // This is a newly mounted hook
          hook = createHook();
        } else {
          currentHook = currentHook.next;

          if (currentHook === null) {
            // This is a newly mounted hook
            hook = createHook();
          } else {
            // Clone the current hook.
            hook = cloneHook(currentHook);
          }
        } // Append to the end of the list


        workInProgressHook = workInProgressHook.next = hook;
      } else {
        // There's already a work-in-progress. Reuse it.
        isReRender = true;
        workInProgressHook = workInProgressHook.next;
        currentHook = currentHook !== null ? currentHook.next : null;
      }
    }

    return workInProgressHook;
  }

  function basicStateReducer(state, action) {
    return typeof action === "function" ? action(state) : action;
  }

  function useReducer$1(reducer, initialState, initialAction) {
    currentlyRenderingFiber = resolveCurrentlyRenderingFiber();
    workInProgressHook = createWorkInProgressHook();
    var queue = workInProgressHook.queue;

    if (queue !== null) {
      // Already have a queue, so this is an update.
      if (isReRender) {
        // This is a re-render. Apply the new render phase updates to the previous
        var _dispatch2 = queue.dispatch;

        if (renderPhaseUpdates !== null) {
          // Render phase updates are stored in a map of queue -> linked list
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

          if (firstRenderPhaseUpdate !== undefined) {
            renderPhaseUpdates.delete(queue);
            var newState = workInProgressHook.memoizedState;
            var update = firstRenderPhaseUpdate;

            do {
              // Process this render phase update. We don't have to check the
              // priority because it will always be the same as the current
              // render's.
              var action = update.action;
              newState = reducer(newState, action);
              update = update.next;
            } while (update !== null);

            workInProgressHook.memoizedState = newState; // Don't persist the state accumlated from the render phase updates to
            // the base state unless the queue is empty.
            // TODO: Not sure if this is the desired semantics, but it's what we
            // do for gDSFP. I can't remember why.

            if (workInProgressHook.baseUpdate === queue.last) {
              workInProgressHook.baseState = newState;
            }

            return [newState, _dispatch2];
          }
        }

        return [workInProgressHook.memoizedState, _dispatch2];
      } // The last update in the entire queue


      var last = queue.last; // The last update that is part of the base state.

      var baseUpdate = workInProgressHook.baseUpdate; // Find the first unprocessed update.

      var first;

      if (baseUpdate !== null) {
        if (last !== null) {
          // For the first update, the queue is a circular linked list where
          // `queue.last.next = queue.first`. Once the first update commits, and
          // the `baseUpdate` is no longer empty, we can unravel the list.
          last.next = null;
        }

        first = baseUpdate.next;
      } else {
        first = last !== null ? last.next : null;
      }

      if (first !== null) {
        var _newState = workInProgressHook.baseState;
        var newBaseState = null;
        var newBaseUpdate = null;
        var prevUpdate = baseUpdate;
        var _update = first;
        var didSkip = false;

        do {
          var updateExpirationTime = _update.expirationTime;

          if (updateExpirationTime < renderExpirationTime) {
            // Priority is insufficient. Skip this update. If this is the first
            // skipped update, the previous update/state is the new base
            // update/state.
            if (!didSkip) {
              didSkip = true;
              newBaseUpdate = prevUpdate;
              newBaseState = _newState;
            } // Update the remaining priority in the queue.
          } else {
            // Process this update.
            var _action = _update.action;
            _newState = reducer(_newState, _action);
          }

          prevUpdate = _update;
          _update = _update.next;
        } while (_update !== null && _update !== first);

        if (!didSkip) {
          newBaseUpdate = prevUpdate;
          newBaseState = _newState;
        }

        workInProgressHook.memoizedState = _newState;
        workInProgressHook.baseUpdate = newBaseUpdate;
        workInProgressHook.baseState = newBaseState;
      }

      var _dispatch = queue.dispatch;
      return [workInProgressHook.memoizedState, _dispatch];
    } // There's no existing queue, so this is the initial render.


    if (reducer === basicStateReducer) {
      // Special case for `useState`.
      if (typeof initialState === "function") {
        initialState = initialState();
      }
    } else if (initialAction !== undefined && initialAction !== null) {
      initialState = reducer(initialState, initialAction);
    }

    workInProgressHook.memoizedState = workInProgressHook.baseState = initialState;
    queue = workInProgressHook.queue = {
      last: null,
      dispatch: null
    };
    var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
    return [workInProgressHook.memoizedState, dispatch];
  }

  function useState$1(initialState) {
    return useReducer$1(basicStateReducer, // useReducer has a special case to support lazy useState initializers
    initialState);
  }

  function requestCurrentTime() {// TODO
  }

  function computeExpirationForFiber() {// TODO
  }

  function dispatchAction(fiber, queue, action) {

    var alternate = fiber.alternate;

    if (fiber === currentlyRenderingFiber || alternate !== null && alternate === currentlyRenderingFiber) {
      var update = {
        expirationTime: renderExpirationTime,
        action: action,
        next: null
      };

      if (renderPhaseUpdates === null) {
        renderPhaseUpdates = new Map();
      }

      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

      if (firstRenderPhaseUpdate === undefined) {
        renderPhaseUpdates.set(queue, update);
      } else {
        // Append the update to the end of the list.
        var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

        while (lastRenderPhaseUpdate.next !== null) {
          lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
        }

        lastRenderPhaseUpdate.next = update;
      }
    } else {
      var currentTime = requestCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime, fiber);
      var _update2 = {
        expirationTime: expirationTime,
        action: action,
        next: null
      };

      var last = queue.last;

      if (last === null) {
        // This is the first update. Create a circular list.
        _update2.next = _update2;
      } else {
        var first = last.next;

        if (first !== null) {
          // Still circular.
          _update2.next = first;
        }

        last.next = _update2;
      }

      queue.last = _update2;
    }
  }

  var Dispatcher = {
    useReducer: useReducer$1,
    useState: useState$1
  };

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
  function isReactNode(node) {
    return node !== null && node.t !== undefined && node.v !== undefined;
  }

  var rootStates = new Map();
  var mountOpcodesToUpdateOpcodes = new Map();
  var mountOpcodesToUnmountOpcodes = new Map();
  var componentOpcodeCache = new Map(); // const ELEMENT_NODE = 1;

  var TEXT_NODE = 3; // const COMMENT_NODE = 8;
  // const DOCUMENT_NODE = 9;
  // const DOCUMENT_FRAGMENT_NODE = 11;

  var OPEN_ELEMENT = 0;
  var OPEN_ELEMENT_WITH_POINTER = 1;
  var OPEN_ELEMENT_DIV = 2;
  var OPEN_ELEMENT_DIV_WITH_POINTER = 3;
  var OPEN_ELEMENT_SPAN = 4;
  var OPEN_ELEMENT_SPAN_WITH_POINTER = 5;
  var OPEN_VOID_ELEMENT = 6;
  var OPEN_VOID_ELEMENT_WITH_POINTER = 7;
  var CLOSE_ELEMENT = 8;
  var CLOSE_VOID_ELEMENT = 9;
  var COMPONENT = 10;
  var ROOT_STATIC_VALUE = 11;
  var ROOT_DYNAMIC_VALUE = 12;
  var UNCONDITIONAL_TEMPLATE = 13;
  var CONDITIONAL_TEMPLATE = 14;
  var MULTI_CONDITIONAL = 15;
  var CONDITIONAL = 16;
  var OPEN_FRAGMENT = 17;
  var CLOSE_FRAGMENT = 18; // const OPEN_CONTEXT_PROVIDER = 19;
  // const CLOSE_CONTEXT_PROVIDER = 20;

  var OPEN_PROP_STYLE = 21;
  var CLOSE_PROP_STYLE = 22;
  var TEMPLATE = 23;
  var TEMPLATE_FROM_FUNC_CALL = 24;
  var REACT_NODE_TEMPLATE_FROM_FUNC_CALL = 25; // const CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE = 26;
  // const CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE = 27;
  // const CONTEXT_CONSUMER_TEMPLATE = 28;

  var REF_COMPONENT = 29; // const LOGICAL_OR = 30;
  // const LOGICAL_AND = 31;

  var ELEMENT_STATIC_CHILD_VALUE = 32;
  var ELEMENT_STATIC_CHILDREN_VALUE = 33;
  var ELEMENT_DYNAMIC_CHILD_VALUE = 34;
  var ELEMENT_DYNAMIC_CHILDREN_VALUE = 35; // const ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL = 36;

  var ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL = 37;
  var ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE = 38;
  var ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE = 39;
  var ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE = 40; // const ELEMENT_DYNAMIC_FUNCTION_CHILD = 41;

  var STATIC_PROP = 42;
  var DYNAMIC_PROP = 43;
  var STATIC_PROP_CLASS_NAME = 44;
  var DYNAMIC_PROP_CLASS_NAME = 45;
  var STATIC_PROP_VALUE = 46; // const DYNAMIC_PROP_VALUE = 47;

  var STATIC_PROP_STYLE = 48;
  var DYNAMIC_PROP_STYLE = 49;
  var STATIC_PROP_UNITLESS_STYLE = 50; // const DYNAMIC_PROP_UNITLESS_STYLE = 51;

  var DYNAMIC_PROP_REF = 52;
  var PropFlagPartialTemplate = 1;
  var PropFlagReactEvent = 1 << 1; // starts with on

  var PropFlagReactCapturedEvent = 1 << 2;
  var EventFlagBubbles = 1;
  var EventFlagTwoPhase = 1 << 1;
  var hostNodeEventListeners = new WeakMap();
  var hostNodeRegisteredEventCallbacks = new WeakMap();

  function createPlaceholderNode() {
    return document.createTextNode("");
  }

  function createElement(tagName) {
    return document.createElement(tagName);
  }

  function createTextNode(text) {
    return document.createTextNode(text);
  }

  function getEventTarget(nativeEvent) {
    // Fallback to nativeEvent.srcElement for IE9
    // https://github.com/facebook/react/issues/12506
    var target = nativeEvent.target || nativeEvent.srcElement || window; // Normalize SVG <use> element events #4963

    if (target.correspondingUseElement) {
      target = target.correspondingUseElement;
    } // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
    // @see http://www.quirksmode.org/js/events_properties.html


    return target.nodeType === TEXT_NODE ? target.parentNode : target;
  }

  function listenToEvent(state, eventName, eventInformation) {
    var rootHostNode = state.fiber.hostNode;
    var registeredEvents = hostNodeEventListeners.get(rootHostNode);

    if (registeredEvents === undefined) {
      registeredEvents = new Map();
      hostNodeEventListeners.set(rootHostNode, registeredEvents);
    }

    rootHostNode.addEventListener(eventName, proxyEvent.bind(null, eventName, eventInformation), eventInformation & EventFlagBubbles);
  }

  function proxyEvent(eventName, eventInformation, nativeEvent) {
    var eventTarget = getEventTarget(nativeEvent);
    var path = [];
    var domNode = eventTarget;

    while (domNode !== null) {
      if (hostNodeRegisteredEventCallbacks.has(domNode)) {
        path.push(domNode);
      }

      domNode = domNode.parentNode;
    }

    var pathLength = path.length;

    if (pathLength > 0 && eventInformation & EventFlagTwoPhase) {
      var i; // eslint-disable-next-line space-in-parens

      for (i = pathLength; i-- > 0;) {
        dispatchEventCallback(eventName + "-captured", path[i], nativeEvent);
      }

      for (i = 0; i < pathLength; i++) {
        dispatchEventCallback(eventName, path[i], nativeEvent);
      }
    }
  }

  function dispatchEventCallback(dispatchEventName, domNode, nativeEvent) {
    var registeredEventCallbacks = hostNodeRegisteredEventCallbacks.get(domNode);
    var eventCallback = registeredEventCallbacks.get(dispatchEventName);

    if (eventCallback !== undefined) {
      eventCallback(nativeEvent);
    }
  }

  function registerEventCallbackForHostNode(hostNode, eventName, eventCallback, capturedEvent) {
    var registeredEventCallbacks = hostNodeRegisteredEventCallbacks.get(hostNode);

    if (registeredEventCallbacks === undefined) {
      registeredEventCallbacks = new Map();
      hostNodeRegisteredEventCallbacks.set(hostNode, registeredEventCallbacks);
    }

    registeredEventCallbacks.set(capturedEvent ? eventName + "-captured" : eventName, eventCallback);
  }

  function removeChild(parent, child) {
    if (isArray(child)) {
      for (var i = 0, length = child.length; i < length; i++) {
        removeChild(parent, child[i]);
      }
    } else {
      parent.removeChild(child);
    }
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
    var currentHostNode = state.currentHostNode;

    if (workInProgress.hostNode === null) {
      workInProgress.hostNode = elem;
    }

    if (currentHostNode !== null) {
      var stackIndex = state.currentHostNodeStackIndex++;
      state.currentHostNodeStack[stackIndex] = state.currentHostNode;
    }

    state.currentHostNode = elem;
  }

  function renderMountReactNode(node, state, workInProgress) {
    if (node === null || node === undefined || typeof node === "boolean") {
      return;
    }

    if (typeof node === "string" || typeof node === "number") ; else if (isReactNode(node)) {
      var templateOpcodes = node.t;
      var templateRuntimeValues = node.v;
      return renderMountOpcodes(templateOpcodes, templateRuntimeValues, state, workInProgress);
    } else if (isArray(node)) {
      var arr = [];

      for (var i = 0, length = node.length; i < length; ++i) {
        var elementNode = node[i];
        var hostNode = renderMountReactNode(elementNode, state, workInProgress);

        if (hostNode !== undefined) {
          arr.push(hostNode);
        }
      }

      return arr;
    }
  }

  function renderMountOpcodes(mountOpcodes, runtimeValues, state, workInProgress) {
    var opcodesLength = mountOpcodes.length;
    var updateOpcodes = mountOpcodesToUpdateOpcodes.get(mountOpcodes);
    var unmountOpcodes = mountOpcodesToUnmountOpcodes.get(mountOpcodes);
    var topHostNode;
    var shouldCreateOpcodes = updateOpcodes === undefined;
    var values = workInProgress === null ? null : workInProgress.values;

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
        case REF_COMPONENT:
          {
            var componentOpcodesFunction = mountOpcodes[++index];
            var propsArrayValuePointerOrValue = mountOpcodes[++index];
            var componentMountOpcodes = componentOpcodeCache.get(componentOpcodesFunction);

            if (componentMountOpcodes === undefined) {
              componentMountOpcodes = componentOpcodesFunction();
              componentOpcodeCache.set(componentOpcodesFunction, componentMountOpcodes);
            } else {
              componentMountOpcodes = componentOpcodeCache.get(componentOpcodesFunction);
            }

            var propsArrayValue = null;

            if (isArray(propsArrayValuePointerOrValue)) {
              propsArrayValue = propsArrayValuePointerOrValue;
            } else if (propsArrayValuePointerOrValue !== null) {
              propsArrayValue = runtimeValues[propsArrayValuePointerOrValue];
            }

            state.propsArray = propsArrayValue;
            topHostNode = renderMountOpcodes(componentMountOpcodes, runtimeValues, state, workInProgress);

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(componentMountOpcodes, propsArrayValuePointerOrValue);
            }

            break;
          }

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
              throw new Error("TODO DYNAMIC_PROP_CLASS_NAME");
            } else {
              state.currentHostNode.className = dynamicClassName;
            }

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(DYNAMIC_PROP_CLASS_NAME, propInformation, dynamicClassNamePointer);
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
            var eventInformation = void 0;

            if (_propInformation & PropFlagReactEvent) {
              eventInformation = mountOpcodes[++index];
            }

            var dynamicPropValuePointer = mountOpcodes[++index];
            var dynamicPropValue = runtimeValues[dynamicPropValuePointer];

            if (_propInformation & PropFlagPartialTemplate) {
              throw new Error("TODO DYNAMIC_PROP");
            } else if (eventInformation !== undefined) {
              listenToEvent(state, _propName, eventInformation);
              registerEventCallbackForHostNode(state.currentHostNode, _propName, dynamicPropValue, _propInformation & PropFlagReactCapturedEvent);
            } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
              state.currentHostNode.setAttribute(_propName, dynamicPropValue);
            }

            break;
          }

        case STATIC_PROP_VALUE:
          {
            var staticValueProp = mountOpcodes[++index];

            if (typeof staticValueProp === "string") {
              state.currentHostNode.value = staticValueProp;
            } else {
              state.currentHostNode.setAttribute("value", staticValueProp);
            }

            break;
          }

        case ELEMENT_STATIC_CHILD_VALUE:
          {
            var staticTextChild = mountOpcodes[++index];
            var textNode = createTextNode(staticTextChild);
            var _currentHostNode = state.currentHostNode;
            appendChild(_currentHostNode, textNode);
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
            var hostNodeValuePointer = mountOpcodes[++index];
            var dynamicTextChild = runtimeValues[dynamicTextChildPointer];

            var _textNode = createTextNode(dynamicTextChild);

            var _currentHostNode2 = state.currentHostNode;
            values[hostNodeValuePointer] = _textNode;
            appendChild(_currentHostNode2, _textNode);

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(ELEMENT_DYNAMIC_CHILDREN_VALUE, dynamicTextChildPointer, hostNodeValuePointer);
            }

            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_VALUE:
          {
            var dynamicTextContentPointer = mountOpcodes[++index];
            var _hostNodeValuePointer = mountOpcodes[++index];
            var dynamicTextContent = runtimeValues[dynamicTextContentPointer];
            var _currentHostNode3 = state.currentHostNode;

            var _textNode2 = void 0;

            if (dynamicTextContent === null || dynamicTextContent === undefined || dynamicTextContent === "") {
              _textNode2 = createPlaceholderNode();
            } else {
              _currentHostNode3.textContent = dynamicTextContent;
              _textNode2 = _currentHostNode3.firstChild;
            }

            values[_hostNodeValuePointer] = _textNode2;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(ELEMENT_DYNAMIC_CHILDREN_VALUE, dynamicTextContentPointer, _hostNodeValuePointer);
            }

            break;
          }

        case ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE:
          {
            var reactNodeOrArrayPointer = mountOpcodes[++index];
            var _hostNodeValuePointer2 = mountOpcodes[++index];
            var reactNodeOrArray = runtimeValues[reactNodeOrArrayPointer];
            var hostNode = topHostNode = renderMountReactNode(reactNodeOrArray, state, workInProgress);
            values[_hostNodeValuePointer2] = hostNode;
            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE:
          {
            var _reactNodeOrArrayPointer = mountOpcodes[++index];
            var _hostNodeValuePointer3 = mountOpcodes[++index];
            var _reactNodeOrArray = runtimeValues[_reactNodeOrArrayPointer];
            state.lastChildWasTextNode = false;

            var _hostNode = topHostNode = renderMountReactNode(_reactNodeOrArray, state, workInProgress);

            values[_hostNodeValuePointer3] = _hostNode;
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

        case OPEN_ELEMENT_DIV_WITH_POINTER:
          {
            var _elem3 = createElement("div");

            var elementValuePointer = mountOpcodes[++index];
            openElement(_elem3, state, workInProgress);
            values[elementValuePointer] = _elem3;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(OPEN_ELEMENT_DIV_WITH_POINTER, elementValuePointer);
            }

            break;
          }

        case OPEN_ELEMENT_SPAN_WITH_POINTER:
          {
            var _elem4 = createElement("span");

            var _elementValuePointer = mountOpcodes[++index];
            openElement(_elem4, state, workInProgress);
            values[_elementValuePointer] = _elem4;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(OPEN_ELEMENT_SPAN_WITH_POINTER, _elementValuePointer);
            }

            break;
          }

        case OPEN_ELEMENT_WITH_POINTER:
          {
            var _elementTag = mountOpcodes[++index];
            var _elementValuePointer2 = mountOpcodes[++index];

            var _elem5 = createElement(_elementTag);

            openElement(_elem5, state, workInProgress);
            values[_elementValuePointer2] = _elem5;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(OPEN_ELEMENT_WITH_POINTER, _elementValuePointer2);
            }

            break;
          }

        case CLOSE_FRAGMENT:
        case CLOSE_VOID_ELEMENT:
        case CLOSE_ELEMENT:
          {
            var stackIndex = state.currentHostNodeStackIndex;
            var _currentHostNode4 = state.currentHostNode;

            if (stackIndex === 0) {
              state.currentHostNode = null;
            } else {
              stackIndex = --state.currentHostNodeStackIndex;
              var parent = state.currentHostNodeStack[stackIndex];
              state.currentHostNodeStack[stackIndex] = null;
              appendChild(parent, _currentHostNode4);
              state.currentHostNode = _currentHostNode4 = parent;
            }

            topHostNode = _currentHostNode4;
            break;
          }

        case OPEN_VOID_ELEMENT:
          {
            var _elementTag2 = mountOpcodes[++index];

            var _elem6 = createElement(_elementTag2);

            openElement(_elem6, state, workInProgress);
            break;
          }

        case OPEN_VOID_ELEMENT_WITH_POINTER:
          {
            var _elementTag3 = mountOpcodes[++index];
            var _elementValuePointer3 = mountOpcodes[++index];

            var _elem7 = createElement(_elementTag3);

            openElement(_elem7, state, workInProgress);
            values[_elementValuePointer3] = _elem7;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(OPEN_VOID_ELEMENT_WITH_POINTER, _elementValuePointer3);
            }

            break;
          }

        case OPEN_FRAGMENT:
          {
            var _hostNode2 = [];
            openElement(_hostNode2, state, workInProgress);
            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL:
          {
            var templateOpcodes = mountOpcodes[++index];
            var computeValuesPointer = mountOpcodes[++index];
            var _hostNodeValuePointer4 = mountOpcodes[++index];
            var computeValues = runtimeValues[computeValuesPointer];

            var _hostNode3 = renderMountOpcodes(templateOpcodes, computeValues, state, workInProgress);

            values[_hostNodeValuePointer4] = _hostNode3;
            break;
          }

        case STATIC_PROP_STYLE:
          {
            var styleName = mountOpcodes[++index];
            var styleValue = mountOpcodes[++index];

            if (styleValue == null || styleValue === undefined) {
              break;
            }

            if (typeof styleValue === "number") {
              styleValue = styleValue + "px";
            }

            state.currentHostNode.style.setProperty(styleName, styleValue);
            break;
          }

        case DYNAMIC_PROP_STYLE:
          {
            var _styleName = mountOpcodes[++index];
            var styleValuePointer = mountOpcodes[++index];
            var _styleValue = runtimeValues[styleValuePointer];

            if (_styleValue == null || _styleValue === undefined) {
              break;
            }

            if (typeof _styleValue === "number") {
              _styleValue = _styleValue + "px";
            }

            state.currentHostNode.style.setProperty(_styleName, _styleValue);
            break;
          }

        case STATIC_PROP_UNITLESS_STYLE:
          {
            var _styleName2 = mountOpcodes[++index];
            var _styleValue2 = mountOpcodes[++index];

            if (_styleValue2 == null || _styleValue2 === undefined) {
              break;
            }

            state.currentHostNode.style.setProperty(_styleName2, _styleValue2);
            break;
          }

        case CONDITIONAL:
          {
            var _hostNodeValuePointer5 = mountOpcodes[++index];
            var conditionValuePointer = mountOpcodes[++index];
            var conditionValue = runtimeValues[conditionValuePointer];
            var consequentMountOpcodes = mountOpcodes[++index];
            var alternateMountOpcodes = mountOpcodes[++index];

            var _hostNode4 = void 0;

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(CONDITIONAL, _hostNodeValuePointer5, conditionValuePointer, consequentMountOpcodes, alternateMountOpcodes);
            }

            if (conditionValue) {
              if (consequentMountOpcodes !== 0) {
                _hostNode4 = renderMountOpcodes(consequentMountOpcodes, runtimeValues, state, workInProgress);
              }
            } else {
              if (alternateMountOpcodes !== 0) {
                _hostNode4 = renderMountOpcodes(alternateMountOpcodes, runtimeValues, state, workInProgress);
              }
            }

            topHostNode = values[_hostNodeValuePointer5] = _hostNode4;
            break;
          }

        case MULTI_CONDITIONAL:
          {
            var conditionalSize = mountOpcodes[++index];
            var _hostNodeValuePointer6 = mountOpcodes[++index];
            var caseValuePointer = mountOpcodes[++index];
            var startingIndex = index;
            var conditionalDefaultIndex = conditionalSize - 1;

            if (shouldCreateOpcodes === true) {
              var _updateOpcodes;

              var sliceFrom = startingIndex + 1;
              var sliceTo = sliceFrom + (conditionalSize - 1) * 2 + 1;

              (_updateOpcodes = updateOpcodes).push.apply(_updateOpcodes, [MULTI_CONDITIONAL, conditionalSize, _hostNodeValuePointer6, caseValuePointer].concat(mountOpcodes.slice(sliceFrom, sliceTo)));
            }

            var _hostNode5 = void 0;

            var conditionalIndex = 0;

            for (; conditionalIndex < conditionalSize; conditionalIndex++) {
              if (conditionalIndex === conditionalDefaultIndex) {
                var defaultCaseMountOpcodes = mountOpcodes[++index];

                if (defaultCaseMountOpcodes !== null) {
                  _hostNode5 = renderMountOpcodes(defaultCaseMountOpcodes, runtimeValues, state, workInProgress);
                }
              } else {
                var caseConditionPointer = mountOpcodes[++index];
                var caseConditionValue = runtimeValues[caseConditionPointer];

                if (caseConditionValue === true) {
                  var caseMountOpcodes = mountOpcodes[++index];

                  if (caseMountOpcodes !== null) {
                    _hostNode5 = renderMountOpcodes(caseMountOpcodes, runtimeValues, state, workInProgress);
                  }

                  break;
                }

                ++index;
              }
            }

            values[caseValuePointer] = conditionalIndex - 1;
            topHostNode = values[_hostNodeValuePointer6] = _hostNode5;
            index = startingIndex + (conditionalSize - 1) * 2 + 1;
            break;
          }

        case TEMPLATE_FROM_FUNC_CALL:
          {
            var templateMountOpcodes = mountOpcodes[++index];
            var _computeValuesPointer = mountOpcodes[++index];
            var _computeValues = runtimeValues[_computeValuesPointer];
            topHostNode = renderMountOpcodes(templateMountOpcodes, _computeValues, state, workInProgress);
            break;
          }

        case REACT_NODE_TEMPLATE_FROM_FUNC_CALL:
          {
            var reactNodePointer = mountOpcodes[++index];
            var reactNode = runtimeValues[reactNodePointer];
            topHostNode = renderMountReactNode(reactNode, state, workInProgress);
            break;
          }

        case ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE:
          {
            var arrayPointer = mountOpcodes[++index];
            var arrayMapOpcodes = mountOpcodes[++index];
            var arrayMapComputeFunctionPointer = mountOpcodes[++index];
            var array = runtimeValues[arrayPointer];
            var arrayMapComputeFunction = arrayMapComputeFunctionPointer === 0 ? null : runtimeValues[arrayMapComputeFunctionPointer];
            var arrayLength = array.length;

            for (var i = 0; i < arrayLength; ++i) {
              var element = array[i];
              var templateRuntimeValues = runtimeValues;

              if (arrayMapComputeFunction !== null) {
                templateRuntimeValues = arrayMapComputeFunction(element, i, array);
              }

              renderMountOpcodes(arrayMapOpcodes, templateRuntimeValues, state, workInProgress);
            }

            break;
          }

        case UNCONDITIONAL_TEMPLATE:
          {
            var _templateMountOpcodes = mountOpcodes[++index];
            var computeFunction = mountOpcodes[++index];
            var _templateRuntimeValues = runtimeValues;
            var templateValuesPointerIndex = void 0;

            if (computeFunction !== 0) {
              templateValuesPointerIndex = mountOpcodes[++index];
              _templateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);
              values[templateValuesPointerIndex] = _templateRuntimeValues;
            }

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(UNCONDITIONAL_TEMPLATE, _templateMountOpcodes, computeFunction);

              if (templateValuesPointerIndex !== undefined) {
                updateOpcodes.push(templateValuesPointerIndex);
              }
            }

            return renderMountOpcodes(_templateMountOpcodes, _templateRuntimeValues, state, workInProgress);
          }

        case TEMPLATE:
          {
            var _templateMountOpcodes2 = mountOpcodes[++index];
            var _computeFunction = mountOpcodes[++index];
            var templateRuntimeValuesOrNull = void 0;

            if (_computeFunction !== 0) {
              templateRuntimeValuesOrNull = callComputeFunctionWithArray(_computeFunction, state.currentComponent.props);
            }

            if (templateRuntimeValuesOrNull === null) {
              return createPlaceholderNode();
            }

            return renderMountOpcodes(_templateMountOpcodes2, templateRuntimeValuesOrNull, state, workInProgress);
          }

        case CONDITIONAL_TEMPLATE:
          {
            var _hostNodeValuePointer7 = mountOpcodes[++index];
            var branchMountOpcodesPointer = mountOpcodes[++index];
            var _computeFunction2 = mountOpcodes[++index];
            var _templateRuntimeValues2 = runtimeValues;

            var _templateValuesPointerIndex = void 0;

            var _hostNode6 = void 0;

            var _templateMountOpcodes3 = void 0;

            if (_computeFunction2 !== 0) {
              _templateValuesPointerIndex = mountOpcodes[++index];
              _templateRuntimeValues2 = callComputeFunctionWithArray(_computeFunction2, state.currentComponent.props);
              values[_templateValuesPointerIndex] = _templateRuntimeValues2;

              if (_templateRuntimeValues2 === null) {
                _templateMountOpcodes3 = null;
                _hostNode6 = createPlaceholderNode();
              }
            }

            var conditionBranchOpcodes = void 0;

            if (_hostNode6 === undefined) {
              conditionBranchOpcodes = mountOpcodes[++index];
              var conditionBranchOpcodesLength = conditionBranchOpcodes.length;
              var conditionBranchToUseKey = _templateRuntimeValues2[0];
              var branchIndex = 0;

              while (branchIndex < conditionBranchOpcodesLength) {
                var branchConditionKey = conditionBranchOpcodes[branchIndex];

                if (branchConditionKey === conditionBranchToUseKey) {
                  _templateMountOpcodes3 = conditionBranchOpcodes[++branchIndex];
                  _hostNode6 = renderMountOpcodes(_templateMountOpcodes3, _templateRuntimeValues2, state, workInProgress);
                  break;
                }

                branchIndex += 2;
              }
            }

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(CONDITIONAL_TEMPLATE, _hostNodeValuePointer7, branchMountOpcodesPointer, _computeFunction2);

              if (_templateValuesPointerIndex !== undefined) {
                updateOpcodes.push(_templateValuesPointerIndex);
              }

              if (conditionBranchOpcodes === undefined) {
                conditionBranchOpcodes = mountOpcodes[++index];
              }

              updateOpcodes.push(conditionBranchOpcodes);
            }

            values[branchMountOpcodesPointer] = _templateMountOpcodes3;
            values[_hostNodeValuePointer7] = _hostNode6;
            return _hostNode6;
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
              state.propsArray = null;
            }

            var _componentMountOpcodes = mountOpcodes[++index];
            var componentFiber = createOpcodeFiber(null, []);

            if (shouldCreateOpcodes === true) {
              updateOpcodes.push(COMPONENT, usesHooks, _componentMountOpcodes);

              if (rootPropsShape !== undefined) {
                updateOpcodes.push(rootPropsShape);
              }

              unmountOpcodes.push(COMPONENT, usesHooks, _componentMountOpcodes);
            }

            componentFiber.values[0] = currentComponent;

            if (workInProgress === null) {
              // Root
              state.fiber = componentFiber;
            } else {
              insertChildFiberIntoParentFiber(workInProgress, componentFiber);
            }

            if (usesHooks === 1) {
              prepareToUseHooks(componentFiber);
            }

            var _hostNode7 = renderMountOpcodes(_componentMountOpcodes, runtimeValues, state, componentFiber);

            if (workInProgress !== null && workInProgress.hostNode === null) {
              workInProgress.hostNode = componentFiber.hostNode;
            }

            if (usesHooks === 1) {
              finishHooks();
            }

            state.currentComponent = previousComponent;
            return _hostNode7;
          }

        case ROOT_DYNAMIC_VALUE:
          {
            var dynamicValuePointer = mountOpcodes[++index];
            var value = runtimeValues[dynamicValuePointer];

            if (isReactNode(value)) {
              return renderMountReactNode(value, state, workInProgress);
            }

            return null;
          }

        case ROOT_STATIC_VALUE:
          {
            var staticValue = mountOpcodes[++index];

            var _hostNode8 = void 0;

            if (staticValue === null) {
              _hostNode8 = createPlaceholderNode();
            } else if (typeof staticValue === "string") {
              _hostNode8 = createTextNode(staticValue);
            } else {
              throw new Error("TODO");
            }

            return _hostNode8;
          }

        case OPEN_PROP_STYLE:
        case CLOSE_PROP_STYLE:
          break;

        case DYNAMIC_PROP_REF:
        default:
          index += 3;
          continue;
      }

      ++index;
    }

    return topHostNode;
  }

  function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
    var opcodesLength = updateOpcodes.length;
    var values = workInProgress === null ? null : workInProgress.values;
    var index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      var opcode = updateOpcodes[index];

      switch (opcode) {
        case REF_COMPONENT:
          {
            var componentMountOpcodes = updateOpcodes[++index];
            var componentUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(componentMountOpcodes);
            var propsArrayValuePointerOrValue = updateOpcodes[++index];
            var propsArrayValue = null;

            if (isArray(propsArrayValuePointerOrValue)) {
              propsArrayValue = propsArrayValuePointerOrValue;
            } else if (propsArrayValuePointerOrValue !== null) {
              propsArrayValue = nextRuntimeValues[propsArrayValuePointerOrValue];
            }

            state.propsArray = propsArrayValue;
            renderUpdateOpcodes(componentUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress);
            break;
          }

        case ELEMENT_DYNAMIC_CHILD_VALUE:
        case ELEMENT_DYNAMIC_CHILDREN_VALUE:
          {
            var dynamicTextContentPointer = updateOpcodes[++index];
            var hostNodeValuePointer = updateOpcodes[++index];
            var previousDynamicTextContent = previousRuntimeValues[dynamicTextContentPointer];
            var nextDynamicTextContent = nextRuntimeValues[dynamicTextContentPointer];
            var textNode = values[hostNodeValuePointer];

            if (previousDynamicTextContent !== nextDynamicTextContent) {
              textNode.nodeValue = nextDynamicTextContent;
            }

            break;
          }

        case DYNAMIC_PROP_CLASS_NAME:
          {
            var propInformation = updateOpcodes[++index];
            var dynamicClassNamePointer = updateOpcodes[++index];
            var previousDynamicClassName = previousRuntimeValues[dynamicClassNamePointer];
            var nextDynamicClassName = nextRuntimeValues[dynamicClassNamePointer];

            if (previousDynamicClassName !== nextDynamicClassName) {
              if (propInformation & PropFlagPartialTemplate) {
                throw new Error("TODO DYNAMIC_PROP_CLASS_NAME");
              } else {
                state.currentHostNode.className = nextDynamicClassName;
              }
            }

            break;
          }

        case OPEN_ELEMENT_WITH_POINTER:
        case OPEN_VOID_ELEMENT_WITH_POINTER:
        case OPEN_ELEMENT_DIV_WITH_POINTER:
        case OPEN_ELEMENT_SPAN_WITH_POINTER:
          {
            var elementValuePointer = updateOpcodes[++index];
            state.currentHostNode = values[elementValuePointer];
            break;
          }

        case CONDITIONAL:
          {
            var _hostNodeValuePointer8 = updateOpcodes[++index];
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
              var previousHostNode = values[_hostNodeValuePointer8];
              replaceChild(previousHostNode, nextHostNode);
              values[_hostNodeValuePointer8] = nextHostNode;
            }

            break;
          }

        case MULTI_CONDITIONAL:
          {
            var conditionalSize = updateOpcodes[++index];
            var _hostNodeValuePointer9 = updateOpcodes[++index];
            var caseValuePointer = updateOpcodes[++index];
            var startingIndex = index;
            var conditionalDefaultIndex = conditionalSize - 1;
            var previousConditionalIndex = values[caseValuePointer];
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
              var _previousHostNode = values[_hostNodeValuePointer9];
              replaceChild(_previousHostNode, _nextHostNode);
              values[_hostNodeValuePointer9] = _nextHostNode;
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
              previousTemplateRuntimeValues = values[templateValuesPointerIndex];
              values[templateValuesPointerIndex] = nextRuntimeValues;
            }

            renderUpdateOpcodes(templateUpdateOpcodes, previousTemplateRuntimeValues, nextTemplateRuntimeValues, state, workInProgress);
            return;
          }

        case CONDITIONAL_TEMPLATE:
          {
            var _hostNodeValuePointer10 = updateOpcodes[++index];
            var branchMountOpcodesPointer = updateOpcodes[++index];
            var _computeFunction3 = updateOpcodes[++index];
            var _previousTemplateRuntimeValues = previousRuntimeValues;
            var _nextTemplateRuntimeValues = nextRuntimeValues;

            var _templateValuesPointerIndex2 = void 0;

            var _nextHostNode2 = void 0;

            var branchHasChanged = false;
            var nextTemplateMountOpcodes = void 0;

            if (_computeFunction3 !== 0) {
              _templateValuesPointerIndex2 = updateOpcodes[++index];
              _nextTemplateRuntimeValues = callComputeFunctionWithArray(_computeFunction3, state.currentComponent.props);
              _previousTemplateRuntimeValues = values[_templateValuesPointerIndex2];
              values[_templateValuesPointerIndex2] = _nextTemplateRuntimeValues;

              if (_nextTemplateRuntimeValues === null && _previousTemplateRuntimeValues !== null) {
                branchHasChanged = true;
                nextTemplateMountOpcodes = null;
                _nextHostNode2 = createPlaceholderNode();
              }
            }

            if (_nextHostNode2 === undefined) {
              var conditionBranchOpcodes = updateOpcodes[++index];
              var conditionBranchOpcodesLength = conditionBranchOpcodes.length;
              var previousConditionBranchToUseKey = _previousTemplateRuntimeValues === null ? null : _previousTemplateRuntimeValues[0];
              var nextConditionBranchToUseKey = _nextTemplateRuntimeValues[0];
              var branchIndex = 0;

              while (branchIndex < conditionBranchOpcodesLength) {
                var branchConditionKey = conditionBranchOpcodes[branchIndex];

                if (branchConditionKey === nextConditionBranchToUseKey) {
                  if (branchConditionKey !== previousConditionBranchToUseKey) {
                    branchHasChanged = true;
                  }

                  nextTemplateMountOpcodes = conditionBranchOpcodes[++branchIndex];

                  if (branchHasChanged) {
                    _nextHostNode2 = renderMountOpcodes(nextTemplateMountOpcodes, _nextTemplateRuntimeValues, state, workInProgress);
                  } else {
                    var _templateUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(nextTemplateMountOpcodes);

                    renderUpdateOpcodes(_templateUpdateOpcodes, _previousTemplateRuntimeValues, _nextTemplateRuntimeValues, state, workInProgress);
                  }

                  break;
                }

                branchIndex += 2;
              }
            }

            if (branchHasChanged === true) {
              var previousTemplateMountOpcodes = values[branchMountOpcodesPointer];

              if (previousTemplateMountOpcodes !== null) {
                var previousBranchUnmountOpcodes = mountOpcodesToUnmountOpcodes.get(previousTemplateMountOpcodes);
                renderUnmountOpcodes(previousBranchUnmountOpcodes, state, workInProgress, true);
              }

              values[branchMountOpcodesPointer] = nextTemplateMountOpcodes;
            }

            if (_nextHostNode2 !== undefined) {
              var _previousHostNode2 = values[_hostNodeValuePointer10];
              replaceChild(_previousHostNode2, _nextHostNode2);
              values[_hostNodeValuePointer10] = _nextHostNode2;
            }

            return _nextHostNode2;
          }

        case COMPONENT:
          {
            var usesHooks = updateOpcodes[++index];
            var _componentMountOpcodes2 = updateOpcodes[++index];

            var _componentUpdateOpcodes = mountOpcodesToUpdateOpcodes.get(_componentMountOpcodes2);

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

            if (usesHooks === 1) {
              prepareToUseHooks(componentFiber);
            }

            renderUpdateOpcodes(_componentUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, componentFiber);

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

  function createOpcodeFiber(hostNode, values) {
    return {
      child: null,
      hostNode: null,
      key: null,
      memoizedState: null,
      sibling: null,
      parent: null,
      values: values
    };
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
    var prevDispatcher = currentDispatcher.current;
    currentDispatcher.current = Dispatcher;
    var returnNode = renderNodeToRootContainer(node, DOMContainer);
    currentDispatcher.current = prevDispatcher;
    return returnNode;
  }

  // DO NOT MODIFY
  var React = {
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
  var props = {};
  console.time("Render");
  render(React.createElement(Component, props), root);
  console.timeEnd("Render");

}));
