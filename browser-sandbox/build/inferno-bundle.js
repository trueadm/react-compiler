(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var isArray = Array.isArray;

  function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
  }

  function isNullOrUndef(o) {
    return o === void 0 || o === null;
  }

  function isInvalid(o) {
    return o === null || o === false || o === true || o === void 0;
  }

  function isFunction(o) {
    return typeof o === 'function';
  }

  function isString(o) {
    return typeof o === 'string';
  }

  function isNumber(o) {
    return typeof o === 'number';
  }

  function isNull(o) {
    return o === null;
  }

  function isUndefined(o) {
    return o === void 0;
  }

  function combineFrom(first, second) {
    var out = {};

    if (first) {
      for (var key in first) {
        out[key] = first[key];
      }
    }

    if (second) {
      for (var key$1 in second) {
        out[key$1] = second[key$1];
      }
    }

    return out;
  }


  function isLinkEventObject(o) {
    return !isNull(o) && typeof o === 'object';
  } // We need EMPTY_OBJ defined in one place.
  // Its used for comparison so we cant inline it into shared


  var EMPTY_OBJ = {};

  function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
  }

  function appendChild(parentDOM, dom) {
    parentDOM.appendChild(dom);
  }

  function insertOrAppend(parentDOM, newNode, nextNode) {
    if (isNull(nextNode)) {
      appendChild(parentDOM, newNode);
    } else {
      parentDOM.insertBefore(newNode, nextNode);
    }
  }

  function documentCreateElement(tag, isSVG) {
    if (isSVG) {
      return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }

    return document.createElement(tag);
  }

  function replaceChild(parentDOM, newDom, lastDom) {
    parentDOM.replaceChild(newDom, lastDom);
  }

  function removeChild(parentDOM, childNode) {
    parentDOM.removeChild(childNode);
  }

  function callAll(arrayFn) {
    for (var i = 0; i < arrayFn.length; i++) {
      arrayFn[i]();
    }
  }

  function findChildVNode(vNode, startEdge, flags) {
    var children = vNode.children;

    if (flags & 4
    /* ComponentClass */
    ) {
        return children.$LI;
      }

    if (flags & 8192
    /* Fragment */
    ) {
        return vNode.childFlags === 2
        /* HasVNodeChildren */
        ? children : children[startEdge ? 0 : children.length - 1];
      }

    return children;
  }

  function findDOMfromVNode(vNode, startEdge) {
    var flags;

    while (vNode) {
      flags = vNode.flags;

      if (flags & 2033
      /* DOMRef */
      ) {
          return vNode.dom;
        }

      vNode = findChildVNode(vNode, startEdge, flags);
    }

    return null;
  }

  function removeVNodeDOM(vNode, parentDOM) {
    do {
      var flags = vNode.flags;

      if (flags & 2033
      /* DOMRef */
      ) {
          removeChild(parentDOM, vNode.dom);
          return;
        }

      var children = vNode.children;

      if (flags & 4
      /* ComponentClass */
      ) {
          vNode = children.$LI;
        }

      if (flags & 8
      /* ComponentFunction */
      ) {
          vNode = children;
        }

      if (flags & 8192
      /* Fragment */
      ) {
          if (vNode.childFlags === 2
          /* HasVNodeChildren */
          ) {
              vNode = children;
            } else {
            for (var i = 0, len = children.length; i < len; ++i) {
              removeVNodeDOM(children[i], parentDOM);
            }

            return;
          }
        }
    } while (vNode);
  }

  function moveVNodeDOM(vNode, parentDOM, nextNode) {
    do {
      var flags = vNode.flags;

      if (flags & 2033
      /* DOMRef */
      ) {
          insertOrAppend(parentDOM, vNode.dom, nextNode);
          return;
        }

      var children = vNode.children;

      if (flags & 4
      /* ComponentClass */
      ) {
          vNode = children.$LI;
        }

      if (flags & 8
      /* ComponentFunction */
      ) {
          vNode = children;
        }

      if (flags & 8192
      /* Fragment */
      ) {
          if (vNode.childFlags === 2
          /* HasVNodeChildren */
          ) {
              vNode = children;
            } else {
            for (var i = 0, len = children.length; i < len; ++i) {
              moveVNodeDOM(children[i], parentDOM, nextNode);
            }

            return;
          }
        }
    } while (vNode);
  }

  function createDerivedState(instance, nextProps, state) {
    if (instance.constructor.getDerivedStateFromProps) {
      return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
    }

    return state;
  }
  var options = {
    componentComparator: null,
    createVNode: null,
    renderComplete: null
  };

  function setTextContent(dom, children) {
    dom.textContent = children;
  } // Calling this function assumes, nextValue is linkEvent


  function isLastValueSameLinkEvent(lastValue, nextValue) {
    return isLinkEventObject(lastValue) && lastValue.event === nextValue.event && lastValue.data === nextValue.data;
  }

  function mergeUnsetProperties(to, from) {
    for (var propName in from) {
      if (isUndefined(to[propName])) {
        to[propName] = from[propName];
      }
    }

    return to;
  }

  function safeCall1(method, arg1) {
    return !!isFunction(method) && (method(arg1), true);
  }

  var keyPrefix = '$';

  function V(childFlags, children, className, flags, key, props, ref, type) {
    this.childFlags = childFlags;
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key === void 0 ? null : key;
    this.props = props === void 0 ? null : props;
    this.ref = ref === void 0 ? null : ref;
    this.type = type;
  }

  function createVNode(flags, type, className, children, childFlags, props, key, ref) {
    var childFlag = childFlags === void 0 ? 1
    /* HasInvalidChildren */
    : childFlags;
    var vNode = new V(childFlag, children, className, flags, key, props, ref, type);

    if (childFlag === 0
    /* UnknownChildren */
    ) {
        normalizeChildren(vNode, vNode.children);
      }

    return vNode;
  }

  function mergeDefaultHooks(flags, type, ref) {
    if (flags & 4
    /* ComponentClass */
    ) {
        return ref;
      }

    var defaultHooks = (flags & 32768
    /* ForwardRef */
    ? type.render : type).defaultHooks;

    if (isNullOrUndef(defaultHooks)) {
      return ref;
    }

    if (isNullOrUndef(ref)) {
      return defaultHooks;
    }

    return mergeUnsetProperties(ref, defaultHooks);
  }

  function mergeDefaultProps(flags, type, props) {
    // set default props
    var defaultProps = (flags & 32768
    /* ForwardRef */
    ? type.render : type).defaultProps;

    if (isNullOrUndef(defaultProps)) {
      return props;
    }

    if (isNullOrUndef(props)) {
      return combineFrom(defaultProps, null);
    }

    return mergeUnsetProperties(props, defaultProps);
  }

  function resolveComponentFlags(flags, type) {
    if (flags & 12
    /* ComponentKnown */
    ) {
        return flags;
      }

    if (type.prototype && type.prototype.render) {
      return 4
      /* ComponentClass */
      ;
    }

    if (type.render) {
      return 32776
      /* ForwardRefComponent */
      ;
    }

    return 8
    /* ComponentFunction */
    ;
  }

  function createComponentVNode(flags, type, props, key, ref) {
    flags = resolveComponentFlags(flags, type);
    var vNode = new V(1
    /* HasInvalidChildren */
    , null, null, flags, key, mergeDefaultProps(flags, type, props), mergeDefaultHooks(flags, type, ref), type);

    return vNode;
  }

  function createTextVNode(text, key) {
    return new V(1
    /* HasInvalidChildren */
    , isNullOrUndef(text) || text === true || text === false ? '' : text, null, 16
    /* Text */
    , key, null, null, null);
  }

  function createFragment(children, childFlags, key) {
    var fragment = createVNode(8192
    /* Fragment */
    , 8192
    /* Fragment */
    , null, children, childFlags, null, key, null);

    switch (fragment.childFlags) {
      case 1
      /* HasInvalidChildren */
      :
        fragment.children = createVoidVNode();
        fragment.childFlags = 2
        /* HasVNodeChildren */
        ;
        break;

      case 16
      /* HasTextChildren */
      :
        fragment.children = [createTextVNode(children)];
        fragment.childFlags = 4
        /* HasNonKeyedChildren */
        ;
        break;
    }

    return fragment;
  }

  function normalizeProps(vNode) {
    var props = vNode.props;

    if (props) {
      var flags = vNode.flags;

      if (flags & 481
      /* Element */
      ) {
          if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
            normalizeChildren(vNode, props.children);
          }

          if (props.className !== void 0) {
            vNode.className = props.className || null;
            props.className = undefined;
          }
        }

      if (props.key !== void 0) {
        vNode.key = props.key;
        props.key = undefined;
      }

      if (props.ref !== void 0) {
        if (flags & 8
        /* ComponentFunction */
        ) {
            vNode.ref = combineFrom(vNode.ref, props.ref);
          } else {
          vNode.ref = props.ref;
        }

        props.ref = undefined;
      }
    }

    return vNode;
  }
  /*
   * Fragment is different than normal vNode,
   * because when it needs to be cloned we need to clone its children too
   * But not normalize, because otherwise those possibly get KEY and re-mount
   */


  function cloneFragment(vNodeToClone) {
    var clonedChildren;
    var oldChildren = vNodeToClone.children;
    var childFlags = vNodeToClone.childFlags;

    if (childFlags === 2
    /* HasVNodeChildren */
    ) {
        clonedChildren = directClone(oldChildren);
      } else if (childFlags & 12
    /* MultipleChildren */
    ) {
        clonedChildren = [];

        for (var i = 0, len = oldChildren.length; i < len; ++i) {
          clonedChildren.push(directClone(oldChildren[i]));
        }
      }

    return createFragment(clonedChildren, childFlags, vNodeToClone.key);
  }

  function directClone(vNodeToClone) {
    var flags = vNodeToClone.flags & -16385
    /* ClearInUse */
    ;
    var props = vNodeToClone.props;

    if (flags & 14
    /* Component */
    ) {
        if (!isNull(props)) {
          var propsToClone = props;
          props = {};

          for (var key in propsToClone) {
            props[key] = propsToClone[key];
          }
        }
      }

    if ((flags & 8192
    /* Fragment */
    ) === 0) {
      return new V(vNodeToClone.childFlags, vNodeToClone.children, vNodeToClone.className, flags, vNodeToClone.key, props, vNodeToClone.ref, vNodeToClone.type);
    }

    return cloneFragment(vNodeToClone);
  }

  function createVoidVNode() {
    return createTextVNode('', null);
  }

  function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
      var n = nodes[index];

      if (!isInvalid(n)) {
        var newKey = currentKey + keyPrefix + index;

        if (isArray(n)) {
          _normalizeVNodes(n, result, 0, newKey);
        } else {
          if (isStringOrNumber(n)) {
            n = createTextVNode(n, newKey);
          } else {
            var oldKey = n.key;
            var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;

            if (n.flags & 81920
            /* InUseOrNormalized */
            || isPrefixedKey) {
              n = directClone(n);
            }

            n.flags |= 65536
            /* Normalized */
            ;

            if (!isPrefixedKey) {
              if (isNull(oldKey)) {
                n.key = newKey;
              } else {
                n.key = currentKey + oldKey;
              }
            } else if (oldKey.substring(0, currentKey.length) !== currentKey) {
              n.key = currentKey + oldKey;
            }
          }

          result.push(n);
        }
      }
    }
  }

  function normalizeChildren(vNode, children) {
    var newChildren;
    var newChildFlags = 1
    /* HasInvalidChildren */
    ; // Don't change children to match strict equal (===) true in patching

    if (isInvalid(children)) {
      newChildren = children;
    } else if (isStringOrNumber(children)) {
      newChildFlags = 16
      /* HasTextChildren */
      ;
      newChildren = children;
    } else if (isArray(children)) {
      var len = children.length;

      for (var i = 0; i < len; ++i) {
        var n = children[i];

        if (isInvalid(n) || isArray(n)) {
          newChildren = newChildren || children.slice(0, i);

          _normalizeVNodes(children, newChildren, i, '');

          break;
        } else if (isStringOrNumber(n)) {
          newChildren = newChildren || children.slice(0, i);
          newChildren.push(createTextVNode(n, keyPrefix + i));
        } else {
          var key = n.key;
          var needsCloning = (n.flags & 81920
          /* InUseOrNormalized */
          ) > 0;
          var isNullKey = isNull(key);
          var isPrefixed = isString(key) && key[0] === keyPrefix;

          if (needsCloning || isNullKey || isPrefixed) {
            newChildren = newChildren || children.slice(0, i);

            if (needsCloning || isPrefixed) {
              n = directClone(n);
            }

            if (isNullKey || isPrefixed) {
              n.key = keyPrefix + i;
            }

            newChildren.push(n);
          } else if (newChildren) {
            newChildren.push(n);
          }

          n.flags |= 65536
          /* Normalized */
          ;
        }
      }

      newChildren = newChildren || children;

      if (newChildren.length === 0) {
        newChildFlags = 1
        /* HasInvalidChildren */
        ;
      } else {
        newChildFlags = 8
        /* HasKeyedChildren */
        ;
      }
    } else {
      newChildren = children;
      newChildren.flags |= 65536
      /* Normalized */
      ;

      if (children.flags & 81920
      /* InUseOrNormalized */
      ) {
          newChildren = directClone(children);
        }

      newChildFlags = 2
      /* HasVNodeChildren */
      ;
    }

    vNode.children = newChildren;
    vNode.childFlags = newChildFlags;
    return vNode;
  }

  function normalizeRoot(input) {
    if (isInvalid(input) || isStringOrNumber(input)) {
      return createTextVNode(input, null);
    }

    if (isArray(input)) {
      return createFragment(input, 0
      /* UnknownChildren */
      , null);
    }

    return input.flags & 16384
    /* InUse */
    ? directClone(input) : input;
  }

  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var xmlNS = 'http://www.w3.org/XML/1998/namespace';
  var namespaces = {
    'xlink:actuate': xlinkNS,
    'xlink:arcrole': xlinkNS,
    'xlink:href': xlinkNS,
    'xlink:role': xlinkNS,
    'xlink:show': xlinkNS,
    'xlink:title': xlinkNS,
    'xlink:type': xlinkNS,
    'xml:base': xmlNS,
    'xml:lang': xmlNS,
    'xml:space': xmlNS
  };

  function getDelegatedEventObject(v) {
    return {
      onClick: v,
      onDblClick: v,
      onFocusIn: v,
      onFocusOut: v,
      onKeyDown: v,
      onKeyPress: v,
      onKeyUp: v,
      onMouseDown: v,
      onMouseMove: v,
      onMouseUp: v,
      onTouchEnd: v,
      onTouchMove: v,
      onTouchStart: v
    };
  }

  var attachedEventCounts = getDelegatedEventObject(0);
  var attachedEvents = getDelegatedEventObject(null);
  var syntheticEvents = getDelegatedEventObject(true);

  function updateOrAddSyntheticEvent(name, dom) {
    var eventsObject = dom.$EV;

    if (!eventsObject) {
      eventsObject = dom.$EV = getDelegatedEventObject(null);
    }

    if (!eventsObject[name]) {
      if (++attachedEventCounts[name] === 1) {
        attachedEvents[name] = attachEventToDocument(name);
      }
    }

    return eventsObject;
  }

  function unmountSyntheticEvent(name, dom) {
    var eventsObject = dom.$EV;

    if (eventsObject && eventsObject[name]) {
      if (--attachedEventCounts[name] === 0) {
        document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
        attachedEvents[name] = null;
      }

      eventsObject[name] = null;
    }
  }

  function handleSyntheticEvent(name, lastEvent, nextEvent, dom) {
    if (isFunction(nextEvent)) {
      updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
    } else if (isLinkEventObject(nextEvent)) {
      if (isLastValueSameLinkEvent(lastEvent, nextEvent)) {
        return;
      }

      updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
    } else {
      unmountSyntheticEvent(name, dom);
    }
  } // When browsers fully support event.composedPath we could loop it through instead of using parentNode property


  function getTargetNode(event) {
    return isFunction(event.composedPath) ? event.composedPath()[0] : event.target;
  }

  function dispatchEvents(event, isClick, name, eventData) {
    var dom = getTargetNode(event);

    do {
      // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
      // because the event listener is on document.body
      // Don't process clicks on disabled elements
      if (isClick && dom.disabled) {
        return;
      }

      var eventsObject = dom.$EV;

      if (eventsObject) {
        var currentEvent = eventsObject[name];

        if (currentEvent) {
          // linkEvent object
          eventData.dom = dom;
          currentEvent.event ? currentEvent.event(currentEvent.data, event) : currentEvent(event);

          if (event.cancelBubble) {
            return;
          }
        }
      }

      dom = dom.parentNode;
    } while (!isNull(dom));
  }

  function stopPropagation() {
    this.cancelBubble = true;

    if (!this.immediatePropagationStopped) {
      this.stopImmediatePropagation();
    }
  }

  function isDefaultPrevented() {
    return this.defaultPrevented;
  }

  function isPropagationStopped() {
    return this.cancelBubble;
  }

  function extendEventProperties(event) {
    // Event data needs to be object to save reference to currentTarget getter
    var eventData = {
      dom: document
    };
    event.isDefaultPrevented = isDefaultPrevented;
    event.isPropagationStopped = isPropagationStopped;
    event.stopPropagation = stopPropagation;
    Object.defineProperty(event, 'currentTarget', {
      configurable: true,
      get: function get() {
        return eventData.dom;
      }
    });
    return eventData;
  }

  function rootClickEvent(name) {
    return function (event) {
      if (event.button !== 0) {
        // Firefox incorrectly triggers click event for mid/right mouse buttons.
        // This bug has been active for 17 years.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=184051
        event.stopPropagation();
        return;
      }

      dispatchEvents(event, true, name, extendEventProperties(event));
    };
  }

  function rootEvent(name) {
    return function (event) {
      dispatchEvents(event, false, name, extendEventProperties(event));
    };
  }

  function attachEventToDocument(name) {
    var attachedEvent = name === 'onClick' || name === 'onDblClick' ? rootClickEvent(name) : rootEvent(name);
    document.addEventListener(normalizeEventName(name), attachedEvent);
    return attachedEvent;
  }

  function isSameInnerHTML(dom, innerHTML) {
    var tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
  }

  function triggerEventListener(props, methodName, e) {
    if (props[methodName]) {
      var listener = props[methodName];

      if (listener.event) {
        listener.event(listener.data, e);
      } else {
        listener(e);
      }
    } else {
      var nativeListenerName = methodName.toLowerCase();

      if (props[nativeListenerName]) {
        props[nativeListenerName](e);
      }
    }
  }

  function createWrappedFunction(methodName, applyValue) {
    var fnMethod = function fnMethod(e) {
      var vNode = this.$V; // If vNode is gone by the time event fires, no-op

      if (!vNode) {
        return;
      }

      var props = vNode.props || EMPTY_OBJ;
      var dom = vNode.dom;

      if (isString(methodName)) {
        triggerEventListener(props, methodName, e);
      } else {
        for (var i = 0; i < methodName.length; ++i) {
          triggerEventListener(props, methodName[i], e);
        }
      }

      if (isFunction(applyValue)) {
        var newVNode = this.$V;
        var newProps = newVNode.props || EMPTY_OBJ;
        applyValue(newProps, dom, false, newVNode);
      }
    };

    Object.defineProperty(fnMethod, 'wrapped', {
      configurable: false,
      enumerable: false,
      value: true,
      writable: false
    });
    return fnMethod;
  }

  function attachEvent(dom, eventName, handler) {
    var previousKey = "$" + eventName;
    var previousArgs = dom[previousKey];

    if (previousArgs) {
      if (previousArgs[1].wrapped) {
        return;
      }

      dom.removeEventListener(previousArgs[0], previousArgs[1]);
      dom[previousKey] = null;
    }

    if (isFunction(handler)) {
      dom.addEventListener(eventName, handler);
      dom[previousKey] = [eventName, handler];
    }
  }

  function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
  }

  var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
  var wrappedOnChange = createWrappedFunction(['onClick', 'onChange'], applyValueInput);
  /* tslint:disable-next-line:no-empty */

  function emptywrapper(event) {
    event.stopPropagation();
  }

  emptywrapper.wrapped = true;

  function inputEvents(dom, nextPropsOrEmpty) {
    if (isCheckedType(nextPropsOrEmpty.type)) {
      attachEvent(dom, 'change', wrappedOnChange);
      attachEvent(dom, 'click', emptywrapper);
    } else {
      attachEvent(dom, 'input', onTextInputChange);
    }
  }

  function applyValueInput(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);

    if (type && type !== dom.type) {
      dom.setAttribute('type', type);
    }

    if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
      dom.multiple = multiple;
    }

    if (!isNullOrUndef(defaultValue) && !hasValue) {
      dom.defaultValue = defaultValue + '';
    }

    if (isCheckedType(type)) {
      if (hasValue) {
        dom.value = value;
      }

      if (!isNullOrUndef(checked)) {
        dom.checked = checked;
      }
    } else {
      if (hasValue && dom.value !== value) {
        dom.defaultValue = value;
        dom.value = value;
      } else if (!isNullOrUndef(checked)) {
        dom.checked = checked;
      }
    }
  }

  function updateChildOptions(vNode, value) {
    if (vNode.type === 'option') {
      updateChildOption(vNode, value);
    } else {
      var children = vNode.children;
      var flags = vNode.flags;

      if (flags & 4
      /* ComponentClass */
      ) {
          updateChildOptions(children.$LI, value);
        } else if (flags & 8
      /* ComponentFunction */
      ) {
          updateChildOptions(children, value);
        } else if (vNode.childFlags === 2
      /* HasVNodeChildren */
      ) {
          updateChildOptions(children, value);
        } else if (vNode.childFlags & 12
      /* MultipleChildren */
      ) {
          for (var i = 0, len = children.length; i < len; ++i) {
            updateChildOptions(children[i], value);
          }
        }
    }
  }

  function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom; // we do this as multiple may have changed

    dom.value = props.value;

    if (props.value === value || isArray(value) && value.indexOf(props.value) !== -1) {
      dom.selected = true;
    } else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
      dom.selected = props.selected || false;
    }
  }

  var onSelectChange = createWrappedFunction('onChange', applyValueSelect);

  function selectEvents(dom) {
    attachEvent(dom, 'change', onSelectChange);
  }

  function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
    var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);

    if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
      dom.multiple = multiplePropInBoolean;
    }

    var index = nextPropsOrEmpty.selectedIndex;

    if (index === -1) {
      dom.selectedIndex = -1;
    }

    var childFlags = vNode.childFlags;

    if (childFlags !== 1
    /* HasInvalidChildren */
    ) {
        var value = nextPropsOrEmpty.value;

        if (isNumber(index) && index > -1 && dom.options[index]) {
          value = dom.options[index].value;
        }

        if (mounting && isNullOrUndef(value)) {
          value = nextPropsOrEmpty.defaultValue;
        }

        updateChildOptions(vNode, value);
      }
  }

  var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
  var wrappedOnChange$1 = createWrappedFunction('onChange');

  function textAreaEvents(dom, nextPropsOrEmpty) {
    attachEvent(dom, 'input', onTextareaInputChange);

    if (nextPropsOrEmpty.onChange) {
      attachEvent(dom, 'change', wrappedOnChange$1);
    }
  }

  function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;

    if (isNullOrUndef(value)) {
      if (mounting) {
        var defaultValue = nextPropsOrEmpty.defaultValue;

        if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
          dom.defaultValue = defaultValue;
          dom.value = defaultValue;
        }
      }
    } else if (domValue !== value) {
      /* There is value so keep it controlled */
      dom.defaultValue = value;
      dom.value = value;
    }
  }
  /**
   * There is currently no support for switching same input between controlled and nonControlled
   * If that ever becomes a real issue, then re design controlled elements
   * Currently user must choose either controlled or non-controlled and stick with that
   */


  function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 64
    /* InputElement */
    ) {
        applyValueInput(nextPropsOrEmpty, dom);
      } else if (flags & 256
    /* SelectElement */
    ) {
        applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
      } else if (flags & 128
    /* TextareaElement */
    ) {
        applyValueTextArea(nextPropsOrEmpty, dom, mounting);
      }

    if (isControlled) {
      dom.$V = vNode;
    }
  }

  function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
    if (flags & 64
    /* InputElement */
    ) {
        inputEvents(dom, nextPropsOrEmpty);
      } else if (flags & 256
    /* SelectElement */
    ) {
        selectEvents(dom);
      } else if (flags & 128
    /* TextareaElement */
    ) {
        textAreaEvents(dom, nextPropsOrEmpty);
      }
  }

  function isControlledFormElement(nextPropsOrEmpty) {
    return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
  }

  function unmountRef(ref) {
    if (ref) {
      if (!safeCall1(ref, null) && ref.current) {
        ref.current = null;
      }
    }
  }

  function mountRef(ref, value, lifecycle) {
    if (ref && (isFunction(ref) || ref.current !== void 0)) {
      lifecycle.push(function () {
        if (!safeCall1(ref, value) && ref.current !== void 0) {
          ref.current = value;
        }
      });
    }
  }

  function remove(vNode, parentDOM) {
    unmount(vNode);
    removeVNodeDOM(vNode, parentDOM);
  }

  function unmount(vNode) {
    var flags = vNode.flags;
    var children = vNode.children;
    var ref;

    if (flags & 481
    /* Element */
    ) {
        ref = vNode.ref;
        var props = vNode.props;
        unmountRef(ref);
        var childFlags = vNode.childFlags;

        if (!isNull(props)) {
          var keys = Object.keys(props);

          for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];

            if (syntheticEvents[key]) {
              unmountSyntheticEvent(key, vNode.dom);
            }
          }
        }

        if (childFlags & 12
        /* MultipleChildren */
        ) {
            unmountAllChildren(children);
          } else if (childFlags === 2
        /* HasVNodeChildren */
        ) {
            unmount(children);
          }
      } else if (children) {
      if (flags & 4
      /* ComponentClass */
      ) {
          if (isFunction(children.componentWillUnmount)) {
            children.componentWillUnmount();
          }

          unmountRef(vNode.ref);
          children.$UN = true;
          unmount(children.$LI);
        } else if (flags & 8
      /* ComponentFunction */
      ) {
          ref = vNode.ref;

          if (!isNullOrUndef(ref) && isFunction(ref.onComponentWillUnmount)) {
            ref.onComponentWillUnmount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
          }

          unmount(children);
        } else if (flags & 1024
      /* Portal */
      ) {
          remove(children, vNode.ref);
        } else if (flags & 8192
      /* Fragment */
      ) {
          if (vNode.childFlags & 12
          /* MultipleChildren */
          ) {
              unmountAllChildren(children);
            }
        }
    }
  }

  function unmountAllChildren(children) {
    for (var i = 0, len = children.length; i < len; ++i) {
      unmount(children[i]);
    }
  }

  function clearDOM(dom) {
    // Optimization for clearing dom
    dom.textContent = '';
  }

  function removeAllChildren(dom, vNode, children) {
    unmountAllChildren(children);

    if (vNode.flags & 8192
    /* Fragment */
    ) {
        removeVNodeDOM(vNode, dom);
      } else {
      clearDOM(dom);
    }
  }

  function wrapLinkEvent(nextValue) {
    // This variable makes sure there is no "this" context in callback
    var ev = nextValue.event;
    return function (e) {
      ev(nextValue.data, e);
    };
  }

  function patchEvent(name, lastValue, nextValue, dom) {
    if (isLinkEventObject(nextValue)) {
      if (isLastValueSameLinkEvent(lastValue, nextValue)) {
        return;
      }

      nextValue = wrapLinkEvent(nextValue);
    }

    attachEvent(dom, normalizeEventName(name), nextValue);
  } // We are assuming here that we come from patchProp routine
  // -nextAttrValue cannot be null or undefined


  function patchStyle(lastAttrValue, nextAttrValue, dom) {
    if (isNullOrUndef(nextAttrValue)) {
      dom.removeAttribute('style');
      return;
    }

    var domStyle = dom.style;
    var style;
    var value;

    if (isString(nextAttrValue)) {
      domStyle.cssText = nextAttrValue;
      return;
    }

    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
      for (style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        value = nextAttrValue[style];

        if (value !== lastAttrValue[style]) {
          domStyle.setProperty(style, value);
        }
      }

      for (style in lastAttrValue) {
        if (isNullOrUndef(nextAttrValue[style])) {
          domStyle.removeProperty(style);
        }
      }
    } else {
      for (style in nextAttrValue) {
        value = nextAttrValue[style];
        domStyle.setProperty(style, value);
      }
    }
  }

  function patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom) {
    var lastHtml = lastValue && lastValue.__html || '';
    var nextHtml = nextValue && nextValue.__html || '';

    if (lastHtml !== nextHtml) {
      if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
        if (!isNull(lastVNode)) {
          if (lastVNode.childFlags & 12
          /* MultipleChildren */
          ) {
              unmountAllChildren(lastVNode.children);
            } else if (lastVNode.childFlags === 2
          /* HasVNodeChildren */
          ) {
              unmount(lastVNode.children);
            }

          lastVNode.children = null;
          lastVNode.childFlags = 1
          /* HasInvalidChildren */
          ;
        }

        dom.innerHTML = nextHtml;
      }
    }
  }

  function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
    switch (prop) {
      case 'children':
      case 'childrenType':
      case 'className':
      case 'defaultValue':
      case 'key':
      case 'multiple':
      case 'ref':
      case 'selectedIndex':
        break;

      case 'autoFocus':
        dom.autofocus = !!nextValue;
        break;

      case 'allowfullscreen':
      case 'autoplay':
      case 'capture':
      case 'checked':
      case 'controls':
      case 'default':
      case 'disabled':
      case 'hidden':
      case 'indeterminate':
      case 'loop':
      case 'muted':
      case 'novalidate':
      case 'open':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'selected':
        dom[prop] = !!nextValue;
        break;

      case 'defaultChecked':
      case 'value':
      case 'volume':
        if (hasControlledValue && prop === 'value') {
          break;
        }

        var value = isNullOrUndef(nextValue) ? '' : nextValue;

        if (dom[prop] !== value) {
          dom[prop] = value;
        }

        break;

      case 'style':
        patchStyle(lastValue, nextValue, dom);
        break;

      case 'dangerouslySetInnerHTML':
        patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom);
        break;

      default:
        if (syntheticEvents[prop]) {
          handleSyntheticEvent(prop, lastValue, nextValue, dom);
        } else if (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110) {
          patchEvent(prop, lastValue, nextValue, dom);
        } else if (isNullOrUndef(nextValue)) {
          dom.removeAttribute(prop);
        } else if (isSVG && namespaces[prop]) {
          // We optimize for isSVG being false
          // If we end up in this path we can read property again
          dom.setAttributeNS(namespaces[prop], prop, nextValue);
        } else {
          dom.setAttribute(prop, nextValue);
        }

        break;
    }
  }

  function mountProps(vNode, flags, props, dom, isSVG) {
    var hasControlledValue = false;
    var isFormElement = (flags & 448
    /* FormElement */
    ) > 0;

    if (isFormElement) {
      hasControlledValue = isControlledFormElement(props);

      if (hasControlledValue) {
        addFormElementEventHandlers(flags, dom, props);
      }
    }

    for (var prop in props) {
      // do not add a hasOwnProperty check here, it affects performance
      patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
    }

    if (isFormElement) {
      processElement(flags, vNode, dom, props, true, hasControlledValue);
    }
  }

  function renderNewInput(instance, props, context) {
    var nextInput = normalizeRoot(instance.render(props, instance.state, context));
    var childContext = context;

    if (isFunction(instance.getChildContext)) {
      childContext = combineFrom(context, instance.getChildContext());
    }

    instance.$CX = childContext;
    return nextInput;
  }

  function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    var instance = new Component(props, context);
    var usesNewAPI = instance.$N = Boolean(Component.getDerivedStateFromProps || instance.getSnapshotBeforeUpdate);
    instance.$SVG = isSVG;
    instance.$L = lifecycle;
    vNode.children = instance;
    instance.$BS = false;
    instance.context = context;

    if (instance.props === EMPTY_OBJ) {
      instance.props = props;
    }

    if (!usesNewAPI) {
      if (isFunction(instance.componentWillMount)) {
        instance.$BR = true;
        instance.componentWillMount();
        var pending = instance.$PS;

        if (!isNull(pending)) {
          var state = instance.state;

          if (isNull(state)) {
            instance.state = pending;
          } else {
            for (var key in pending) {
              state[key] = pending[key];
            }
          }

          instance.$PS = null;
        }

        instance.$BR = false;
      }
    } else {
      instance.state = createDerivedState(instance, props, instance.state);
    }

    instance.$LI = renderNewInput(instance, props, context);
    return instance;
  }

  function mount(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = vNode.flags |= 16384
    /* InUse */
    ;

    if (flags & 481
    /* Element */
    ) {
        mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
      } else if (flags & 4
    /* ComponentClass */
    ) {
        mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
      } else if (flags & 8
    /* ComponentFunction */
    ) {
        mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
        mountFunctionalComponentCallbacks(vNode, lifecycle);
      } else if (flags & 512
    /* Void */
    || flags & 16
    /* Text */
    ) {
        mountText(vNode, parentDOM, nextNode);
      } else if (flags & 8192
    /* Fragment */
    ) {
        mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle);
      } else if (flags & 1024
    /* Portal */
    ) {
        mountPortal(vNode, context, parentDOM, nextNode, lifecycle);
      }
  }

  function mountPortal(vNode, context, parentDOM, nextNode, lifecycle) {
    mount(vNode.children, vNode.ref, context, false, null, lifecycle);
    var placeHolderVNode = createVoidVNode();
    mountText(placeHolderVNode, parentDOM, nextNode);
    vNode.dom = placeHolderVNode.dom;
  }

  function mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle) {
    var children = vNode.children;
    var childFlags = vNode.childFlags; // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
    // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements

    if (childFlags & 12
    /* MultipleChildren */
    && children.length === 0) {
      childFlags = vNode.childFlags = 2
      /* HasVNodeChildren */
      ;
      children = vNode.children = createVoidVNode();
    }

    if (childFlags === 2
    /* HasVNodeChildren */
    ) {
        mount(children, parentDOM, nextNode, isSVG, nextNode, lifecycle);
      } else {
      mountArrayChildren(children, parentDOM, context, isSVG, nextNode, lifecycle);
    }
  }

  function mountText(vNode, parentDOM, nextNode) {
    var dom = vNode.dom = document.createTextNode(vNode.children);

    if (!isNull(parentDOM)) {
      insertOrAppend(parentDOM, dom, nextNode);
    }
  }

  function mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = vNode.flags;
    var props = vNode.props;
    var className = vNode.className;
    var children = vNode.children;
    var childFlags = vNode.childFlags;
    var dom = vNode.dom = documentCreateElement(vNode.type, isSVG = isSVG || (flags & 32
    /* SvgElement */
    ) > 0);

    if (!isNullOrUndef(className) && className !== '') {
      if (isSVG) {
        dom.setAttribute('class', className);
      } else {
        dom.className = className;
      }
    }

    if (childFlags === 16
    /* HasTextChildren */
    ) {
        setTextContent(dom, children);
      } else if (childFlags !== 1
    /* HasInvalidChildren */
    ) {
        var childrenIsSVG = isSVG && vNode.type !== 'foreignObject';

        if (childFlags === 2
        /* HasVNodeChildren */
        ) {
            if (children.flags & 16384
            /* InUse */
            ) {
                vNode.children = children = directClone(children);
              }

            mount(children, dom, context, childrenIsSVG, null, lifecycle);
          } else if (childFlags === 8
        /* HasKeyedChildren */
        || childFlags === 4
        /* HasNonKeyedChildren */
        ) {
            mountArrayChildren(children, dom, context, childrenIsSVG, null, lifecycle);
          }
      }

    if (!isNull(parentDOM)) {
      insertOrAppend(parentDOM, dom, nextNode);
    }

    if (!isNull(props)) {
      mountProps(vNode, flags, props, dom, isSVG);
    }

    mountRef(vNode.ref, dom, lifecycle);
  }

  function mountArrayChildren(children, dom, context, isSVG, nextNode, lifecycle) {
    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.flags & 16384
      /* InUse */
      ) {
          children[i] = child = directClone(child);
        }

      mount(child, dom, context, isSVG, nextNode, lifecycle);
    }
  }

  function mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = createClassComponentInstance(vNode, vNode.type, vNode.props || EMPTY_OBJ, context, isSVG, lifecycle);
    mount(instance.$LI, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
    mountClassComponentCallbacks(vNode.ref, instance, lifecycle);
  }

  function renderFunctionalComponent(vNode, context) {
    return vNode.flags & 32768
    /* ForwardRef */
    ? vNode.type.render(vNode.props || EMPTY_OBJ, vNode.ref, context) : vNode.type(vNode.props || EMPTY_OBJ, context);
  }

  function mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    mount(vNode.children = normalizeRoot(renderFunctionalComponent(vNode, context)), parentDOM, context, isSVG, nextNode, lifecycle);
  }

  function createClassMountCallback(instance) {
    return function () {
      instance.componentDidMount();
    };
  }

  function mountClassComponentCallbacks(ref, instance, lifecycle) {
    mountRef(ref, instance, lifecycle);

    if (isFunction(instance.componentDidMount)) {
      lifecycle.push(createClassMountCallback(instance));
    }
  }

  function createOnMountCallback(ref, vNode) {
    return function () {
      ref.onComponentDidMount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
    };
  }

  function mountFunctionalComponentCallbacks(vNode, lifecycle) {
    var ref = vNode.ref;

    if (!isNullOrUndef(ref)) {
      safeCall1(ref.onComponentWillMount, vNode.props || EMPTY_OBJ);

      if (isFunction(ref.onComponentDidMount)) {
        lifecycle.push(createOnMountCallback(ref, vNode));
      }
    }
  }

  function replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    unmount(lastVNode);

    if ((nextVNode.flags & lastVNode.flags & 2033
    /* DOMRef */
    ) !== 0) {
      mount(nextVNode, null, context, isSVG, null, lifecycle); // Single DOM operation, when we have dom references available

      replaceChild(parentDOM, nextVNode.dom, lastVNode.dom);
    } else {
      mount(nextVNode, parentDOM, context, isSVG, findDOMfromVNode(lastVNode, true), lifecycle);
      removeVNodeDOM(lastVNode, parentDOM);
    }
  }

  function patch(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var nextFlags = nextVNode.flags |= 16384
    /* InUse */
    ;

    if (lastVNode.flags !== nextFlags || lastVNode.type !== nextVNode.type || lastVNode.key !== nextVNode.key || nextFlags & 2048
    /* ReCreate */
    ) {
        if (lastVNode.flags & 16384
        /* InUse */
        ) {
            replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
          } else {
          // Last vNode is not in use, it has crashed at application level. Just mount nextVNode and ignore last one
          mount(nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
        }
      } else if (nextFlags & 481
    /* Element */
    ) {
        patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle);
      } else if (nextFlags & 4
    /* ComponentClass */
    ) {
        patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
      } else if (nextFlags & 8
    /* ComponentFunction */
    ) {
        patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
      } else if (nextFlags & 16
    /* Text */
    ) {
        patchText(lastVNode, nextVNode);
      } else if (nextFlags & 512
    /* Void */
    ) {
        nextVNode.dom = lastVNode.dom;
      } else if (nextFlags & 8192
    /* Fragment */
    ) {
        patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
      } else {
      patchPortal(lastVNode, nextVNode, context, lifecycle);
    }
  }

  function patchSingleTextChild(lastChildren, nextChildren, parentDOM) {
    if (lastChildren !== nextChildren) {
      if (lastChildren !== '') {
        parentDOM.firstChild.nodeValue = nextChildren;
      } else {
        setTextContent(parentDOM, nextChildren);
      }
    }
  }

  function patchContentEditableChildren(dom, nextChildren) {
    if (dom.textContent !== nextChildren) {
      dom.textContent = nextChildren;
    }
  }

  function patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    var lastChildren = lastVNode.children;
    var nextChildren = nextVNode.children;
    var lastChildFlags = lastVNode.childFlags;
    var nextChildFlags = nextVNode.childFlags;
    var nextNode = null; // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
    // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements

    if (nextChildFlags & 12
    /* MultipleChildren */
    && nextChildren.length === 0) {
      nextChildFlags = nextVNode.childFlags = 2
      /* HasVNodeChildren */
      ;
      nextChildren = nextVNode.children = createVoidVNode();
    }

    var nextIsSingle = (nextChildFlags & 2
    /* HasVNodeChildren */
    ) !== 0;

    if (lastChildFlags & 12
    /* MultipleChildren */
    ) {
        var lastLen = lastChildren.length; // We need to know Fragment's edge node when

        if ( // It uses keyed algorithm
        lastChildFlags & 8
        /* HasKeyedChildren */
        && nextChildFlags & 8
        /* HasKeyedChildren */
        || // It transforms from many to single
        nextIsSingle || // It will append more nodes
        !nextIsSingle && nextChildren.length > lastLen) {
          // When fragment has multiple children there is always at least one vNode
          nextNode = findDOMfromVNode(lastChildren[lastLen - 1], false).nextSibling;
        }
      }

    patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lastVNode, lifecycle);
  }

  function patchPortal(lastVNode, nextVNode, context, lifecycle) {
    var lastContainer = lastVNode.ref;
    var nextContainer = nextVNode.ref;
    var nextChildren = nextVNode.children;
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false, null, lastVNode, lifecycle);
    nextVNode.dom = lastVNode.dom;

    if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
      var node = nextChildren.dom;
      removeChild(lastContainer, node);
      appendChild(nextContainer, node);
    }
  }

  function patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle) {
    var dom = nextVNode.dom = lastVNode.dom;
    var lastProps = lastVNode.props;
    var nextProps = nextVNode.props;
    var isFormElement = false;
    var hasControlledValue = false;
    var nextPropsOrEmpty;
    isSVG = isSVG || (nextFlags & 32
    /* SvgElement */
    ) > 0; // inlined patchProps  -- starts --

    if (lastProps !== nextProps) {
      var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
      nextPropsOrEmpty = nextProps || EMPTY_OBJ;

      if (nextPropsOrEmpty !== EMPTY_OBJ) {
        isFormElement = (nextFlags & 448
        /* FormElement */
        ) > 0;

        if (isFormElement) {
          hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
        }

        for (var prop in nextPropsOrEmpty) {
          var lastValue = lastPropsOrEmpty[prop];
          var nextValue = nextPropsOrEmpty[prop];

          if (lastValue !== nextValue) {
            patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
          }
        }
      }

      if (lastPropsOrEmpty !== EMPTY_OBJ) {
        for (var prop$1 in lastPropsOrEmpty) {
          if (isNullOrUndef(nextPropsOrEmpty[prop$1]) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
            patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
          }
        }
      }
    }

    var nextChildren = nextVNode.children;
    var nextClassName = nextVNode.className; // inlined patchProps  -- ends --

    if (lastVNode.className !== nextClassName) {
      if (isNullOrUndef(nextClassName)) {
        dom.removeAttribute('class');
      } else if (isSVG) {
        dom.setAttribute('class', nextClassName);
      } else {
        dom.className = nextClassName;
      }
    }

    if (nextFlags & 4096
    /* ContentEditable */
    ) {
        patchContentEditableChildren(dom, nextChildren);
      } else {
      patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, dom, context, isSVG && nextVNode.type !== 'foreignObject', null, lastVNode, lifecycle);
    }

    if (isFormElement) {
      processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
    }

    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;

    if (lastRef !== nextRef) {
      unmountRef(lastRef);
      mountRef(nextRef, dom, lifecycle);
    }
  }

  function replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle) {
    unmount(lastChildren);
    mountArrayChildren(nextChildren, parentDOM, context, isSVG, findDOMfromVNode(lastChildren, true), lifecycle);
    removeVNodeDOM(lastChildren, parentDOM);
  }

  function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, parentVNode, lifecycle) {
    switch (lastChildFlags) {
      case 2
      /* HasVNodeChildren */
      :
        switch (nextChildFlags) {
          case 2
          /* HasVNodeChildren */
          :
            patch(lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;

          case 1
          /* HasInvalidChildren */
          :
            remove(lastChildren, parentDOM);
            break;

          case 16
          /* HasTextChildren */
          :
            unmount(lastChildren);
            setTextContent(parentDOM, nextChildren);
            break;

          default:
            replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle);
            break;
        }

        break;

      case 1
      /* HasInvalidChildren */
      :
        switch (nextChildFlags) {
          case 2
          /* HasVNodeChildren */
          :
            mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;

          case 1
          /* HasInvalidChildren */
          :
            break;

          case 16
          /* HasTextChildren */
          :
            setTextContent(parentDOM, nextChildren);
            break;

          default:
            mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        }

        break;

      case 16
      /* HasTextChildren */
      :
        switch (nextChildFlags) {
          case 16
          /* HasTextChildren */
          :
            patchSingleTextChild(lastChildren, nextChildren, parentDOM);
            break;

          case 2
          /* HasVNodeChildren */
          :
            clearDOM(parentDOM);
            mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;

          case 1
          /* HasInvalidChildren */
          :
            clearDOM(parentDOM);
            break;

          default:
            clearDOM(parentDOM);
            mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        }

        break;

      default:
        switch (nextChildFlags) {
          case 16
          /* HasTextChildren */
          :
            unmountAllChildren(lastChildren);
            setTextContent(parentDOM, nextChildren);
            break;

          case 2
          /* HasVNodeChildren */
          :
            removeAllChildren(parentDOM, parentVNode, lastChildren);
            mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;

          case 1
          /* HasInvalidChildren */
          :
            removeAllChildren(parentDOM, parentVNode, lastChildren);
            break;

          default:
            var lastLength = lastChildren.length | 0;
            var nextLength = nextChildren.length | 0; // Fast path's for both algorithms

            if (lastLength === 0) {
              if (nextLength > 0) {
                mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
              }
            } else if (nextLength === 0) {
              removeAllChildren(parentDOM, parentVNode, lastChildren);
            } else if (nextChildFlags === 8
            /* HasKeyedChildren */
            && lastChildFlags === 8
            /* HasKeyedChildren */
            ) {
                patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, parentVNode, lifecycle);
              } else {
              patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, lifecycle);
            }

            break;
        }

        break;
    }
  }

  function createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle) {
    lifecycle.push(function () {
      instance.componentDidUpdate(lastProps, lastState, snapshot);
    });
  }

  function updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, force, nextNode, lifecycle) {
    var lastState = instance.state;
    var lastProps = instance.props;
    var usesNewAPI = Boolean(instance.$N);
    var hasSCU = isFunction(instance.shouldComponentUpdate);

    if (usesNewAPI) {
      nextState = createDerivedState(instance, nextProps, nextState !== lastState ? combineFrom(lastState, nextState) : nextState);
    }

    if (force || !hasSCU || hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context)) {
      if (!usesNewAPI && isFunction(instance.componentWillUpdate)) {
        instance.componentWillUpdate(nextProps, nextState, context);
      }

      instance.props = nextProps;
      instance.state = nextState;
      instance.context = context;
      var snapshot = null;
      var nextInput = renderNewInput(instance, nextProps, context);

      if (usesNewAPI && isFunction(instance.getSnapshotBeforeUpdate)) {
        snapshot = instance.getSnapshotBeforeUpdate(lastProps, lastState);
      }

      patch(instance.$LI, nextInput, parentDOM, instance.$CX, isSVG, nextNode, lifecycle); // Dont update Last input, until patch has been succesfully executed

      instance.$LI = nextInput;

      if (isFunction(instance.componentDidUpdate)) {
        createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle);
      }
    } else {
      instance.props = nextProps;
      instance.state = nextState;
      instance.context = context;
    }
  }

  function patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = nextVNode.children = lastVNode.children; // If Component has crashed, ignore it to stay functional

    if (isNull(instance)) {
      return;
    }

    instance.$L = lifecycle;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    var nextState = instance.state;

    if (!instance.$N) {
      if (isFunction(instance.componentWillReceiveProps)) {
        instance.$BR = true;
        instance.componentWillReceiveProps(nextProps, context); // If instance component was removed during its own update do nothing.

        if (instance.$UN) {
          return;
        }

        instance.$BR = false;
      }

      if (!isNull(instance.$PS)) {
        nextState = combineFrom(nextState, instance.$PS);
        instance.$PS = null;
      }
    }

    updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, false, nextNode, lifecycle);

    if (lastRef !== nextRef) {
      unmountRef(lastRef);
      mountRef(nextRef, instance, lifecycle);
    }
  }

  function patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var shouldUpdate = true;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastProps = lastVNode.props;
    var nextHooksDefined = !isNullOrUndef(nextRef);
    var lastInput = lastVNode.children;

    if (nextHooksDefined && isFunction(nextRef.onComponentShouldUpdate)) {
      shouldUpdate = nextRef.onComponentShouldUpdate(lastProps, nextProps);
    }

    if (shouldUpdate !== false) {
      if (nextHooksDefined && isFunction(nextRef.onComponentWillUpdate)) {
        nextRef.onComponentWillUpdate(lastProps, nextProps);
      }

      var type = nextVNode.type;
      var nextInput = normalizeRoot(nextVNode.flags & 32768
      /* ForwardRef */
      ? type.render(nextProps, nextRef, context) : type(nextProps, context));
      patch(lastInput, nextInput, parentDOM, context, isSVG, nextNode, lifecycle);
      nextVNode.children = nextInput;

      if (nextHooksDefined && isFunction(nextRef.onComponentDidUpdate)) {
        nextRef.onComponentDidUpdate(lastProps, nextProps);
      }
    } else {
      nextVNode.children = lastInput;
    }
  }

  function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = nextVNode.dom = lastVNode.dom;

    if (nextText !== lastVNode.children) {
      dom.nodeValue = nextText;
    }
  }

  function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength, nextNode, lifecycle) {
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    var nextChild;
    var lastChild;

    for (; i < commonLength; ++i) {
      nextChild = nextChildren[i];
      lastChild = lastChildren[i];

      if (nextChild.flags & 16384
      /* InUse */
      ) {
          nextChild = nextChildren[i] = directClone(nextChild);
        }

      patch(lastChild, nextChild, dom, context, isSVG, nextNode, lifecycle);
      lastChildren[i] = nextChild;
    }

    if (lastChildrenLength < nextChildrenLength) {
      for (i = commonLength; i < nextChildrenLength; ++i) {
        nextChild = nextChildren[i];

        if (nextChild.flags & 16384
        /* InUse */
        ) {
            nextChild = nextChildren[i] = directClone(nextChild);
          }

        mount(nextChild, dom, context, isSVG, nextNode, lifecycle);
      }
    } else if (lastChildrenLength > nextChildrenLength) {
      for (i = commonLength; i < lastChildrenLength; ++i) {
        remove(lastChildren[i], dom);
      }
    }
  }

  function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength, outerEdge, parentVNode, lifecycle) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var j = 0;
    var aNode = a[j];
    var bNode = b[j];
    var nextPos;
    var nextNode; // Step 1
    // tslint:disable-next-line

    outer: {
      // Sync nodes with the same key at the beginning.
      while (aNode.key === bNode.key) {
        if (bNode.flags & 16384
        /* InUse */
        ) {
            b[j] = bNode = directClone(bNode);
          }

        patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
        a[j] = bNode;
        ++j;

        if (j > aEnd || j > bEnd) {
          break outer;
        }

        aNode = a[j];
        bNode = b[j];
      }

      aNode = a[aEnd];
      bNode = b[bEnd]; // Sync nodes with the same key at the end.

      while (aNode.key === bNode.key) {
        if (bNode.flags & 16384
        /* InUse */
        ) {
            b[bEnd] = bNode = directClone(bNode);
          }

        patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
        a[aEnd] = bNode;
        aEnd--;
        bEnd--;

        if (j > aEnd || j > bEnd) {
          break outer;
        }

        aNode = a[aEnd];
        bNode = b[bEnd];
      }
    }

    if (j > aEnd) {
      if (j <= bEnd) {
        nextPos = bEnd + 1;
        nextNode = nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge;

        while (j <= bEnd) {
          bNode = b[j];

          if (bNode.flags & 16384
          /* InUse */
          ) {
              b[j] = bNode = directClone(bNode);
            }

          ++j;
          mount(bNode, dom, context, isSVG, nextNode, lifecycle);
        }
      }
    } else if (j > bEnd) {
      while (j <= aEnd) {
        remove(a[j++], dom);
      }
    } else {
      patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle);
    }
  }

  function patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle) {
    var aNode;
    var bNode;
    var nextPos;
    var i = 0;
    var aStart = j;
    var bStart = j;
    var aLeft = aEnd - j + 1;
    var bLeft = bEnd - j + 1;
    var sources = new Int32Array(bLeft + 1); // Keep track if its possible to remove whole DOM using textContent = '';

    var canRemoveWholeContent = aLeft === aLength;
    var moved = false;
    var pos = 0;
    var patched = 0; // When sizes are small, just loop them through

    if (bLength < 4 || (aLeft | bLeft) < 32) {
      for (i = aStart; i <= aEnd; ++i) {
        aNode = a[i];

        if (patched < bLeft) {
          for (j = bStart; j <= bEnd; j++) {
            bNode = b[j];

            if (aNode.key === bNode.key) {
              sources[j - bStart] = i + 1;

              if (canRemoveWholeContent) {
                canRemoveWholeContent = false;

                while (aStart < i) {
                  remove(a[aStart++], dom);
                }
              }

              if (pos > j) {
                moved = true;
              } else {
                pos = j;
              }

              if (bNode.flags & 16384
              /* InUse */
              ) {
                  b[j] = bNode = directClone(bNode);
                }

              patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
              ++patched;
              break;
            }
          }

          if (!canRemoveWholeContent && j > bEnd) {
            remove(aNode, dom);
          }
        } else if (!canRemoveWholeContent) {
          remove(aNode, dom);
        }
      }
    } else {
      var keyIndex = {}; // Map keys by their index

      for (i = bStart; i <= bEnd; ++i) {
        keyIndex[b[i].key] = i;
      } // Try to patch same keys


      for (i = aStart; i <= aEnd; ++i) {
        aNode = a[i];

        if (patched < bLeft) {
          j = keyIndex[aNode.key];

          if (j !== void 0) {
            if (canRemoveWholeContent) {
              canRemoveWholeContent = false;

              while (i > aStart) {
                remove(a[aStart++], dom);
              }
            }

            sources[j - bStart] = i + 1;

            if (pos > j) {
              moved = true;
            } else {
              pos = j;
            }

            bNode = b[j];

            if (bNode.flags & 16384
            /* InUse */
            ) {
                b[j] = bNode = directClone(bNode);
              }

            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            ++patched;
          } else if (!canRemoveWholeContent) {
            remove(aNode, dom);
          }
        } else if (!canRemoveWholeContent) {
          remove(aNode, dom);
        }
      }
    } // fast-path: if nothing patched remove all old and add all new


    if (canRemoveWholeContent) {
      removeAllChildren(dom, parentVNode, a);
      mountArrayChildren(b, dom, context, isSVG, outerEdge, lifecycle);
    } else if (moved) {
      var seq = lis_algorithm(sources);
      j = seq.length - 1;

      for (i = bLeft - 1; i >= 0; i--) {
        if (sources[i] === 0) {
          pos = i + bStart;
          bNode = b[pos];

          if (bNode.flags & 16384
          /* InUse */
          ) {
              b[pos] = bNode = directClone(bNode);
            }

          nextPos = pos + 1;
          mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
        } else if (j < 0 || i !== seq[j]) {
          pos = i + bStart;
          bNode = b[pos];
          nextPos = pos + 1;
          moveVNodeDOM(bNode, dom, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge);
        } else {
          j--;
        }
      }
    } else if (patched !== bLeft) {
      // when patched count doesn't match b length we need to insert those new ones
      // loop backwards so we can use insertBefore
      for (i = bLeft - 1; i >= 0; i--) {
        if (sources[i] === 0) {
          pos = i + bStart;
          bNode = b[pos];

          if (bNode.flags & 16384
          /* InUse */
          ) {
              b[pos] = bNode = directClone(bNode);
            }

          nextPos = pos + 1;
          mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
        }
      }
    }
  }

  var result;
  var p;
  var maxLen = 0; // https://en.wikipedia.org/wiki/Longest_increasing_subsequence

  function lis_algorithm(arr) {
    var arrI = 0;
    var i = 0;
    var j = 0;
    var k = 0;
    var u = 0;
    var v = 0;
    var c = 0;
    var len = arr.length;

    if (len > maxLen) {
      maxLen = len;
      result = new Int32Array(len);
      p = new Int32Array(len);
    }

    for (; i < len; ++i) {
      arrI = arr[i];

      if (arrI !== 0) {
        j = result[k];

        if (arr[j] < arrI) {
          p[i] = j;
          result[++k] = i;
          continue;
        }

        u = 0;
        v = k;

        while (u < v) {
          c = u + v >> 1;

          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }

        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1];
          }

          result[u] = i;
        }
      }
    }

    u = k + 1;
    var seq = new Int32Array(u);
    v = result[u - 1];

    while (u-- > 0) {
      seq[u] = v;
      v = p[v];
      result[u] = 0;
    }

    return seq;
  }

  var hasDocumentAvailable = typeof document !== 'undefined';

  if (hasDocumentAvailable) {
    /*
     * Defining $EV and $V properties on Node.prototype
     * fixes v8 "wrong map" de-optimization
     */
    if (window.Node) {
      Node.prototype.$EV = null;
      Node.prototype.$V = null;
    }
  }

  function __render(input, parentDOM, callback, context) {
    var lifecycle = [];
    var rootInput = parentDOM.$V;

    if (isNullOrUndef(rootInput)) {
      if (!isNullOrUndef(input)) {
        if (input.flags & 16384
        /* InUse */
        ) {
            input = directClone(input);
          }

        mount(input, parentDOM, context, false, null, lifecycle);
        parentDOM.$V = input;
        rootInput = input;
      }
    } else {
      if (isNullOrUndef(input)) {
        remove(rootInput, parentDOM);
        parentDOM.$V = null;
      } else {
        if (input.flags & 16384
        /* InUse */
        ) {
            input = directClone(input);
          }

        patch(rootInput, input, parentDOM, context, false, null, lifecycle);
        rootInput = parentDOM.$V = input;
      }
    }

    callAll(lifecycle);

    if (isFunction(callback)) {
      callback();
    }

    if (isFunction(options.renderComplete)) {
      options.renderComplete(rootInput, parentDOM);
    }
  }

  function render(input, parentDOM, callback, context) {
    if (callback === void 0) callback = null;
    if (context === void 0) context = EMPTY_OBJ;

    __render(input, parentDOM, callback, context);
  }
  var nextTick = typeof Promise !== 'undefined' ? Promise.resolve().then.bind(Promise.resolve()) : function (a) {
    window.setTimeout(a, 0);
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  var n = "function" === typeof Symbol && Symbol.for,
      p$1 = n ? Symbol.for("react.element") : 60103,
      q = n ? Symbol.for("react.portal") : 60106,
      r = n ? Symbol.for("react.fragment") : 60107,
      t = n ? Symbol.for("react.strict_mode") : 60108,
      u = n ? Symbol.for("react.profiler") : 60114,
      v = n ? Symbol.for("react.provider") : 60109,
      w = n ? Symbol.for("react.context") : 60110,
      x = n ? Symbol.for("react.forward_ref") : 60112,
      y = n ? Symbol.for("react.suspense") : 60113,
      z = n ? Symbol.for("react.memo") : 60115,
      A = n ? Symbol.for("react.lazy") : 60116,
      B = "function" === typeof Symbol && Symbol.iterator;

  function C(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    }

    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }

  var D = {
    isMounted: function isMounted() {
      return !1;
    },
    enqueueForceUpdate: function enqueueForceUpdate() {},
    enqueueReplaceState: function enqueueReplaceState() {},
    enqueueSetState: function enqueueSetState() {}
  },
      E = {};

  function F(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = E;
    this.updater = c || D;
  }

  F.prototype.isReactComponent = {};

  F.prototype.setState = function (a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(C(85));
    this.updater.enqueueSetState(this, a, b, "setState");
  };

  F.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };

  function G() {}

  G.prototype = F.prototype;

  function H(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = E;
    this.updater = c || D;
  }

  var I = H.prototype = new G();
  I.constructor = H;
  objectAssign(I, F.prototype);
  I.isPureReactComponent = !0;
  var J = {
    current: null
  },
      K = Object.prototype.hasOwnProperty,
      L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

  function M(a, b, c) {
    var e,
        d = {},
        g = null,
        k = null;
    if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
      K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = c;else if (1 < f) {
      for (var h = Array(f), m = 0; m < f; m++) {
        h[m] = arguments[m + 2];
      }

      d.children = h;
    }
    if (a && a.defaultProps) for (e in f = a.defaultProps, f) {
      void 0 === d[e] && (d[e] = f[e]);
    }
    return {
      $$typeof: p$1,
      type: a,
      key: g,
      ref: k,
      props: d,
      _owner: J.current
    };
  }

  function N(a, b) {
    return {
      $$typeof: p$1,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner
    };
  }

  function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === p$1;
  }

  function escape(a) {
    var b = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + ("" + a).replace(/[=:]/g, function (a) {
      return b[a];
    });
  }

  var P = /\/+/g,
      Q = [];

  function R(a, b, c, e) {
    if (Q.length) {
      var d = Q.pop();
      d.result = a;
      d.keyPrefix = b;
      d.func = c;
      d.context = e;
      d.count = 0;
      return d;
    }

    return {
      result: a,
      keyPrefix: b,
      func: c,
      context: e,
      count: 0
    };
  }

  function S(a) {
    a.result = null;
    a.keyPrefix = null;
    a.func = null;
    a.context = null;
    a.count = 0;
    10 > Q.length && Q.push(a);
  }

  function T(a, b, c, e) {
    var d = typeof a;
    if ("undefined" === d || "boolean" === d) a = null;
    var g = !1;
    if (null === a) g = !0;else switch (d) {
      case "string":
      case "number":
        g = !0;
        break;

      case "object":
        switch (a.$$typeof) {
          case p$1:
          case q:
            g = !0;
        }

    }
    if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
    g = 0;
    b = "" === b ? "." : b + ":";
    if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
      d = a[k];
      var f = b + U(d, k);
      g += T(d, f, c, e);
    } else if (null === a || "object" !== typeof a ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
      d = d.value, f = b + U(d, k++), g += T(d, f, c, e);
    } else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
    return g;
  }

  function V$1(a, b, c) {
    return null == a ? 0 : T(a, "", b, c);
  }

  function U(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
  }

  function W(a, b) {
    a.func.call(a.context, b, a.count++);
  }

  function aa(a, b, c) {
    var e = a.result,
        d = a.keyPrefix;
    a = a.func.call(a.context, b, a.count++);
    Array.isArray(a) ? X(a, e, c, function (a) {
      return a;
    }) : null != a && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
  }

  function X(a, b, c, e, d) {
    var g = "";
    null != c && (g = ("" + c).replace(P, "$&/") + "/");
    b = R(b, g, e, d);
    V$1(a, aa, b);
    S(b);
  }

  var Y = {
    current: null
  };

  function Z() {
    var a = Y.current;
    if (null === a) throw Error(C(321));
    return a;
  }

  var ba = {
    ReactCurrentDispatcher: Y,
    ReactCurrentBatchConfig: {
      suspense: null
    },
    ReactCurrentOwner: J,
    IsSomeRendererActing: {
      current: !1
    },
    assign: objectAssign
  };
  var Children = {
    map: function map(a, b, c) {
      if (null == a) return a;
      var e = [];
      X(a, e, null, b, c);
      return e;
    },
    forEach: function forEach(a, b, c) {
      if (null == a) return a;
      b = R(null, null, b, c);
      V$1(a, W, b);
      S(b);
    },
    count: function count(a) {
      return V$1(a, function () {
        return null;
      }, null);
    },
    toArray: function toArray(a) {
      var b = [];
      X(a, b, null, function (a) {
        return a;
      });
      return b;
    },
    only: function only(a) {
      if (!O(a)) throw Error(C(143));
      return a;
    }
  };
  var Component$1 = F;
  var Fragment$1 = r;
  var Profiler = u;
  var PureComponent = H;
  var StrictMode = t;
  var Suspense = y;
  var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;

  var cloneElement = function (a, b, c) {
    if (null === a || void 0 === a) throw Error(C(267, a));
    var e = objectAssign({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = J.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (h in b) {
        K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }

    var h = arguments.length - 2;
    if (1 === h) e.children = c;else if (1 < h) {
      f = Array(h);

      for (var m = 0; m < h; m++) {
        f[m] = arguments[m + 2];
      }

      e.children = f;
    }
    return {
      $$typeof: p$1,
      type: a.type,
      key: d,
      ref: g,
      props: e,
      _owner: k
    };
  };

  var createContext = function (a, b) {
    void 0 === b && (b = null);
    a = {
      $$typeof: w,
      _calculateChangedBits: b,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    a.Provider = {
      $$typeof: v,
      _context: a
    };
    return a.Consumer = a;
  };

  var createElement = M;

  var createFactory = function (a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  };

  var createRef$1 = function () {
    return {
      current: null
    };
  };

  var forwardRef$1 = function (a) {
    return {
      $$typeof: x,
      render: a
    };
  };

  var isValidElement = O;

  var lazy = function (a) {
    return {
      $$typeof: A,
      _ctor: a,
      _status: -1,
      _result: null
    };
  };

  var memo = function (a, b) {
    return {
      $$typeof: z,
      type: a,
      compare: void 0 === b ? null : b
    };
  };

  var useCallback = function (a, b) {
    return Z().useCallback(a, b);
  };

  var useContext = function (a, b) {
    return Z().useContext(a, b);
  };

  var useDebugValue = function () {};

  var useEffect = function (a, b) {
    return Z().useEffect(a, b);
  };

  var useImperativeHandle = function (a, b, c) {
    return Z().useImperativeHandle(a, b, c);
  };

  var useLayoutEffect = function (a, b) {
    return Z().useLayoutEffect(a, b);
  };

  var useMemo = function (a, b) {
    return Z().useMemo(a, b);
  };

  var useReducer = function (a, b, c) {
    return Z().useReducer(a, b, c);
  };

  var useRef = function (a) {
    return Z().useRef(a);
  };

  var useState = function (a) {
    return Z().useState(a);
  };

  var version$1 = "16.13.1";

  var react_production_min = {
  	Children: Children,
  	Component: Component$1,
  	Fragment: Fragment$1,
  	Profiler: Profiler,
  	PureComponent: PureComponent,
  	StrictMode: StrictMode,
  	Suspense: Suspense,
  	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  	cloneElement: cloneElement,
  	createContext: createContext,
  	createElement: createElement,
  	createFactory: createFactory,
  	createRef: createRef$1,
  	forwardRef: forwardRef$1,
  	isValidElement: isValidElement,
  	lazy: lazy,
  	memo: memo,
  	useCallback: useCallback,
  	useContext: useContext,
  	useDebugValue: useDebugValue,
  	useEffect: useEffect,
  	useImperativeHandle: useImperativeHandle,
  	useLayoutEffect: useLayoutEffect,
  	useMemo: useMemo,
  	useReducer: useReducer,
  	useRef: useRef,
  	useState: useState,
  	version: version$1
  };

  var react = createCommonjsModule(function (module) {

  {
    module.exports = react_production_min;
  }
  });

  function timeAge(time) {
    var now = new Date().getTime() / 1000;
    var minutes = (now - time) / 60;

    if (minutes < 60) {
      return Math.round(minutes) + " minutes ago";
    }

    return Math.round(minutes / 60) + " hours ago";
  }

  function getHostUrl(url) {
    return (url + "").replace("https://", "").replace("http://", "").split("/")[0];
  }

  function Image(_ref) {
    var src = _ref.src,
        style = _ref.style,
        width = _ref.width,
        height = _ref.height;
    return createVNode(1, "img", null, null, 1, {
      "src": src,
      "width": width,
      "height": height,
      "style": style
    });
  }

  function Link(_ref2) {
    var children = _ref2.children,
        href = _ref2.href,
        className = _ref2.className;
    return createVNode(1, "a", className, children, 0, {
      "href": href || "#"
    });
  }

  function HeaderBar() {
    return createVNode(1, "tr", null, createVNode(1, "td", null, createVNode(1, "table", null, createVNode(1, "tbody", null, createVNode(1, "tr", null, [createVNode(1, "td", null, createComponentVNode(2, Link, {
      children: createComponentVNode(2, Image, {
        "src": "logo.png",
        "width": "16",
        "height": "16",
        "style": {
          border: "1px solid #00d8ff"
        }
      })
    }), 2, {
      "style": {
        width: "18px",
        "padding-right": "4px"
      }
    }), createVNode(1, "td", null, createVNode(1, "span", "pagetop", [createVNode(1, "b", "hnname", "React HN Benchmark", 16), createComponentVNode(2, Link, {
      children: "new"
    }), " | ", createComponentVNode(2, Link, {
      children: "comments"
    }), " | ", createComponentVNode(2, Link, {
      children: "show"
    }), " | ", createComponentVNode(2, Link, {
      children: "ask"
    }), " | ", createComponentVNode(2, Link, {
      children: "jobs"
    }), " | ", createComponentVNode(2, Link, {
      children: "submit"
    })], 0), 2, {
      "style": {
        "line-height": "12pt"
      },
      "height": "10"
    })], 4), 2), 2, {
      "style": {
        padding: "4px"
      },
      "width": "100%",
      "cellSpacing": "0",
      "cellPadding": "0"
    }), 2), 2, {
      "style": {
        "background-color": "#222"
      }
    });
  }

  function Story(_ref3) {
    var story = _ref3.story,
        rank = _ref3.rank;
    return createFragment([createVNode(1, "tr", "athing", [createVNode(1, "td", "title", createVNode(1, "span", "rank", [rank, createTextVNode(".")], 0), 2, {
      "style": {
        "vertical-align": "top",
        "text-align": "right"
      }
    }), createVNode(1, "td", "votelinks", createVNode(1, "center", null, createComponentVNode(2, Link, {
      children: createVNode(1, "div", "votearrow", null, 1, {
        "title": "upvote"
      })
    }), 2), 2, {
      "style": {
        "vertical-align": "top"
      }
    }), createVNode(1, "td", "title", [createComponentVNode(2, Link, {
      "className": "storylink",
      children: story.title
    }), story.url ? createVNode(1, "span", "sitebit comhead", [createTextVNode(" "), createTextVNode("("), createComponentVNode(2, Link, {
      children: getHostUrl(story.url)
    }), createTextVNode(")")], 0) : null], 0)], 4), createVNode(1, "tr", null, [createVNode(1, "td", null, null, 1, {
      "colSpan": "2"
    }), createVNode(1, "td", "subtext", [createVNode(1, "span", "score", [story.score, createTextVNode(" points")], 0), " by ", createComponentVNode(2, Link, {
      "className": "hnuser",
      children: story.by
    }), " ", createVNode(1, "span", "age", createComponentVNode(2, Link, {
      children: timeAge(story.time)
    }), 2), " | ", createComponentVNode(2, Link, {
      children: "hide"
    }), " | ", createComponentVNode(2, Link, {
      children: [story.descendants || 0, " comments"]
    })], 0)], 4), createVNode(1, "tr", "spacer", null, 1, {
      "height": "5"
    })], 4);
  }

  function StoryList(_ref4) {
    var stories = _ref4.stories;
    return createVNode(1, "tr", null, createVNode(1, "td", null, createVNode(1, "table", null, createVNode(1, "tbody", null, stories.map(function (story, i) {
      return createComponentVNode(2, Story, {
        "story": story,
        "rank": ++i
      }, story.id);
    }), 0), 2, {
      "cellPadding": "0",
      "cellSpacing": "0",
      "classList": "itemlist"
    }), 2), 2);
  }

  function Component$2(_ref5) {
    var stories = _ref5.stories;
    return createVNode(1, "center", null, createVNode(1, "table", null, createVNode(1, "tbody", null, [createComponentVNode(2, HeaderBar), createVNode(1, "tr", null, null, 1, {
      "height": "10"
    }), createComponentVNode(2, StoryList, {
      "stories": stories
    })], 4), 2, {
      "id": "hnmain",
      "border": "0",
      "cellPadding": "0",
      "cellSpacing": "0",
      "width": "85%",
      "style": {
        "background-color": "#f6f6ef"
      }
    }), 2);
  }
  Component$2.compileRootComponent = true;

  var root = document.getElementById("root");
  var props = {
    "stories": [{
      "by": "rendx",
      "descendants": 49,
      "id": 14201562,
      "kids": [14201704, 14202297, 14202233, 14201771, 14201765, 14201897, 14201750, 14201913, 14201854, 14201667, 14201759, 14202073],
      "score": 186,
      "time": 1493197629,
      "title": "Postal: Open source mail delivery platform, alternative to Mailgun or Sendgrid",
      "type": "story",
      "url": "https://github.com/atech/postal"
    }, {
      "by": "rabyss",
      "descendants": 4,
      "id": 14202124,
      "kids": [14202293, 14202249],
      "score": 16,
      "time": 1493205989,
      "title": "Show HN: BreakLock – A hybrid of Mastermind and the Android pattern lock",
      "type": "story",
      "url": "https://maxwellito.github.io/breaklock/"
    }, {
      "by": "morid1n",
      "descendants": 137,
      "id": 14200563,
      "kids": [14201274, 14200711, 14201147, 14201365, 14201499, 14200618, 14201169, 14200911, 14200734, 14201083, 14200706, 14200785, 14201032],
      "score": 178,
      "time": 1493183234,
      "title": "My Hackintosh Hardware Spec – clean, based on a 2013 iMac",
      "type": "story",
      "url": "https://infinitediaries.net/my-exact-hackintosh-spec/"
    }, {
      "by": "robertwiblin",
      "descendants": 203,
      "id": 14196731,
      "kids": [14201298, 14201838, 14201381, 14197574, 14201398, 14199764, 14198491, 14197000, 14198224, 14200614, 14201983, 14200697, 14199252, 14201214, 14198923, 14200224, 14197509, 14200859, 14200064, 14200114, 14197256, 14197220, 14200653, 14197186, 14199258, 14197155, 14197344, 14198361, 14197969, 14199813, 14197259, 14197503],
      "score": 562,
      "time": 1493145853,
      "title": "Evidence-based advice we've found on how to be successful in a job",
      "type": "story",
      "url": "https://80000hours.org/career-guide/how-to-be-successful/"
    }, {
      "by": "ryan_j_naughton",
      "descendants": 565,
      "id": 14196812,
      "kids": [14198306, 14197339, 14200899, 14198165, 14198750, 14202199, 14201432, 14197619, 14197471, 14201113, 14202214, 14202043, 14197313, 14197751, 14197332, 14198050, 14201616, 14197404, 14199730, 14198007, 14197358, 14197283, 14200959, 14197891, 14198203, 14197312, 14200796, 14201528, 14197249, 14198271, 14197989, 14198842, 14197205, 14199148, 14197458, 14200457, 14197330, 14199993, 14197855, 14200102, 14197378, 14199315, 14198240, 14198397, 14199326, 14200159, 14198798, 14201296, 14198173, 14197323, 14197383, 14197459, 14197275, 14198305, 14198005, 14198015, 14199380, 14199079, 14198413, 14197334, 14197327, 14197234],
      "score": 385,
      "time": 1493146342,
      "title": "Is Every Speed Limit Too Low?",
      "type": "story",
      "url": "https://priceonomics.com/is-every-speed-limit-too-low/"
    }, {
      "by": "monort",
      "descendants": 63,
      "id": 14196322,
      "kids": [14197628, 14200026, 14197457, 14197486, 14202126, 14201266, 14197227, 14199404, 14199338, 14196382, 14200598, 14197377, 14199689, 14198538, 14196905, 14200404, 14198781, 14197278, 14197888, 14197742, 14197764],
      "score": 316,
      "time": 1493143464,
      "title": "Experimental Nighttime Photography with Nexus and Pixel",
      "type": "story",
      "url": "https://research.googleblog.com/2017/04/experimental-nighttime-photography-with.html"
    }, {
      "by": "networked",
      "descendants": 9,
      "id": 14199028,
      "kids": [14201588, 14200361, 14200314, 14200338],
      "score": 121,
      "time": 1493161601,
      "title": "JPEG Huffman Coding Tutorial",
      "type": "story",
      "url": "http://www.impulseadventure.com/photo/jpeg-huffman-coding.html"
    }, {
      "by": "jasontan",
      "id": 14202227,
      "score": 1,
      "time": 1493207865,
      "title": "Are you adept at understanding concurrency problems? Sift Science is hiring",
      "type": "job",
      "url": "https://boards.greenhouse.io/siftscience/jobs/550699#.WPUZhlMrLfY"
    }, {
      "by": "pouwerkerk",
      "descendants": 80,
      "id": 14196077,
      "kids": [14199434, 14196279, 14196604, 14197440, 14201734, 14200922, 14200452, 14197115, 14199837, 14199894, 14196596, 14198243, 14196565, 14197400, 14197049, 14197686, 14198545, 14198475],
      "score": 717,
      "time": 1493142008,
      "title": "Painting with Code: Introducing our new open source library React Sketch.app",
      "type": "story",
      "url": "http://airbnb.design/painting-with-code/"
    }, {
      "by": "mromnia",
      "descendants": 16,
      "id": 14201670,
      "kids": [14201835, 14202115, 14202176, 14201890, 14202325, 14201859, 14202158, 14201763, 14201902],
      "score": 62,
      "time": 1493198949,
      "title": "How to mod a Porsche 911 to run Doom [video]",
      "type": "story",
      "url": "https://www.youtube.com/watch?v=NRMpNA86e8Q"
    }, {
      "by": "rbanffy",
      "descendants": 16,
      "id": 14192383,
      "kids": [14197494, 14201805, 14197484],
      "score": 194,
      "time": 1493118160,
      "title": "Go programming language secure coding practices guide",
      "type": "story",
      "url": "https://github.com/Checkmarx/Go-SCP"
    }, {
      "by": "intous",
      "descendants": 0,
      "id": 14200446,
      "score": 39,
      "time": 1493181245,
      "title": "Building Functional Chatbot for Messenger with Ruby on Rails",
      "type": "story",
      "url": "https://tutorials.botsfloor.com/chatbot-development-tutorial-how-to-build-a-fully-functional-weather-bot-on-facebook-messenger-c94ac7c59185"
    }, {
      "by": "nanospeck",
      "descendants": 23,
      "id": 14201207,
      "kids": [14202252, 14201646, 14201620, 14202076, 14201511, 14201324, 14201940, 14201425, 14201505, 14201304, 14201435, 14201287, 14201739, 14202031, 14202018],
      "score": 57,
      "text": "This question was asked on both 2015 &amp; 2016 in HN. I would like to ask it again today to know what are the newest options for this.<p>Q: What would you recommend as a reasonably priced (sub 150$) quad-copter&#x2F;drone, that has a camera, the ability to be programmed (so that I can process video&#x2F;write my own stability algorithms for it), good range, and reasonable flying time?\nIn the event nothing fits that price point, any pointers on what the state of the art is?<p>Thanks!",
      "time": 1493192641,
      "title": "Ask HN (again): What is the best affordable programmable drone?",
      "type": "story"
    }, {
      "by": "geuis",
      "descendants": 57,
      "id": 14196708,
      "kids": [14197480, 14198523, 14198705, 14200969, 14200079, 14197605, 14198979, 14202203, 14197679, 14198461, 14200389, 14198065, 14197883, 14197908],
      "score": 123,
      "time": 1493145655,
      "title": "Hackpad shutting down",
      "type": "story",
      "url": "https://hackpad.com/"
    }, {
      "by": "jfoutz",
      "descendants": 55,
      "id": 14195956,
      "kids": [14199594, 14196972, 14202101, 14198197, 14196771, 14197326, 14196956, 14200842, 14201529, 14198581, 14196777, 14200177, 14200422, 14198571],
      "score": 167,
      "time": 1493141367,
      "title": "Linkerd 1.0",
      "type": "story",
      "url": "https://blog.buoyant.io/2017/04/25/announcing-linkerd-1.0/index.html"
    }, {
      "by": "DavidBuchanan",
      "descendants": 19,
      "id": 14199364,
      "kids": [14199735, 14200889, 14202245, 14200205, 14200104, 14201697, 14200061, 14199996, 14199867],
      "score": 66,
      "time": 1493164755,
      "title": "Show HN: TARDIS – Warp a process's perspective of time by hooking syscalls",
      "type": "story",
      "url": "https://github.com/DavidBuchanan314/TARDIS"
    }, {
      "by": "rchen8",
      "descendants": 121,
      "id": 14195664,
      "kids": [14196654, 14196206, 14196677, 14197035, 14196041, 14196399, 14196200, 14196140, 14196216, 14196421, 14196370, 14196146, 14197601, 14197107, 14196866, 14196691, 14197704, 14196772, 14200089, 14198588, 14196937, 14198530, 14197119, 14197247, 14198632, 14196137, 14200323, 14196346],
      "score": 486,
      "time": 1493139957,
      "title": "How to Become Well-Connected",
      "type": "story",
      "url": "http://firstround.com/review/how-to-become-insanely-well-connected/"
    }, {
      "by": "dbrgn",
      "descendants": 89,
      "id": 14191186,
      "kids": [14200855, 14200035, 14200110, 14201408, 14202159, 14197876, 14200348, 14198720, 14198183, 14199824, 14198281, 14201643, 14201591, 14199541, 14198423, 14201738, 14200037, 14201349, 14200028, 14201206, 14197995, 14197830, 14199603],
      "score": 135,
      "time": 1493100791,
      "title": "How to Say (Almost) Everything in a Hundred-Word Language (2015)",
      "type": "story",
      "url": "https://www.theatlantic.com/technology/archive/2015/07/toki-pona-smallest-language/398363/?single_page=true"
    }, {
      "by": "runesoerensen",
      "descendants": 62,
      "id": 14198866,
      "kids": [14199494, 14199495, 14200288, 14201118, 14199599],
      "score": 155,
      "time": 1493160263,
      "title": "Nginx 1.13 released with TLS 1.3 support",
      "type": "story",
      "url": "http://mailman.nginx.org/pipermail/nginx-announce/2017/000195.html"
    }, {
      "by": "bcherny",
      "descendants": 20,
      "id": 14199299,
      "kids": [14200694, 14201832, 14200517, 14201760, 14200966, 14200558, 14201815, 14201231, 14201073, 14201124],
      "score": 54,
      "time": 1493163960,
      "title": "Show HN: JSONSchema to TypeScript compiler",
      "type": "story",
      "url": "https://github.com/bcherny/json-schema-to-typescript"
    }, {
      "by": "tormeh",
      "descendants": 37,
      "id": 14198557,
      "kids": [14201027, 14199082, 14201023, 14201160, 14200367, 14200647],
      "score": 70,
      "time": 1493158034,
      "title": "A practitioner’s guide to hedonism (2007)",
      "type": "story",
      "url": "https://www.1843magazine.com/story/a-practitioners-guide-to-hedonism"
    }, {
      "by": "nickreiner",
      "descendants": 33,
      "id": 14199125,
      "kids": [14202332, 14201634, 14201200, 14201215, 14201157, 14201898, 14201969, 14201125],
      "score": 52,
      "time": 1493162517,
      "title": "Best Linux Distros for Gaming in 2017",
      "type": "story",
      "url": "https://thishosting.rocks/best-linux-distros-for-gaming/"
    }, {
      "by": "BinaryIdiot",
      "descendants": 170,
      "id": 14200486,
      "kids": [14200680, 14200677, 14201515, 14200793, 14200534, 14200908, 14200649, 14200633, 14200701, 14202295, 14200578, 14200709, 14200580, 14201107, 14201779, 14200773, 14200804, 14200720, 14202060, 14200948, 14200903, 14200748, 14200875, 14200750, 14200821, 14200756, 14201707, 14201689, 14200669, 14200997, 14200818, 14201586, 14200603, 14201054, 14201457, 14200616, 14201095, 14200915, 14200878, 14200629, 14201523, 14200620, 14202099],
      "score": 316,
      "time": 1493181945,
      "title": "Suicide of an Uber engineer: Widow blames job stress",
      "type": "story",
      "url": "http://www.sfchronicle.com/business/article/Suicide-of-an-Uber-engineer-widow-blames-job-11095807.php?t=7e40d1f554&cmpid=fb-premium&cmpid=twitter-premium"
    }, {
      "by": "catc",
      "descendants": 34,
      "id": 14195522,
      "kids": [14202316, 14202278, 14197167, 14199152, 14202077, 14197239, 14197721, 14197632, 14197219, 14198296, 14197245, 14197201, 14197403, 14198051, 14196747],
      "score": 87,
      "time": 1493139414,
      "title": "Show HN: React Timekeeper – Time picker based on the style of Google Keep",
      "type": "story",
      "url": "https://catc.github.io/react-timekeeper/"
    }, {
      "by": "Integer",
      "descendants": 152,
      "id": 14192353,
      "kids": [14197671, 14197754, 14199091, 14198533, 14201249, 14198626, 14198263, 14198009, 14195130, 14199551, 14197663, 14198285, 14199611, 14199835, 14197482, 14198924, 14198943],
      "score": 273,
      "time": 1493117771,
      "title": "Windows Is Bloated, Thanks to Adobe’s Extensible Metadata Platform",
      "type": "story",
      "url": "https://www.thurrott.com/windows/109962/windows-bloated-thanks-adobes-extensible-metadata-platform"
    }, {
      "by": "craigcannon",
      "descendants": 23,
      "id": 14197852,
      "kids": [14200024, 14199986, 14202106, 14198011, 14199228, 14202138, 14198917, 14198607],
      "score": 58,
      "time": 1493153342,
      "title": "New England Lost Ski Areas Project",
      "type": "story",
      "url": "http://www.nelsap.org/"
    }, {
      "by": "golfer",
      "descendants": 105,
      "id": 14198229,
      "kids": [14200202, 14198948, 14199770, 14198634, 14200263, 14198797, 14198919, 14200447, 14198645, 14199267, 14199124, 14198833, 14199059],
      "score": 282,
      "time": 1493155745,
      "title": "Uber must turn over information about its acquisition of Otto to Waymo",
      "type": "story",
      "url": "https://techcrunch.com/2017/04/25/uber-must-turn-over-information-about-its-acquisition-of-otto-to-waymo-court-rules/"
    }, {
      "by": "JoshTriplett",
      "descendants": 116,
      "id": 14198403,
      "kids": [14199771, 14199980, 14198664, 14198764, 14201086, 14200307, 14199294, 14198860, 14198817],
      "score": 139,
      "time": 1493156882,
      "title": "Shutting down public FTP services",
      "type": "story",
      "url": "https://lists.debian.org/debian-announce/2017/msg00001.html"
    }, {
      "by": "mabynogy",
      "descendants": 50,
      "id": 14191577,
      "kids": [14194021, 14195402, 14193886, 14193792, 14194355, 14197136, 14200386, 14194151, 14193989, 14193798, 14194042, 14197100, 14198984, 14193925, 14194170],
      "score": 365,
      "time": 1493107104,
      "title": "A Primer on Bézier Curves",
      "type": "story",
      "url": "https://pomax.github.io/bezierinfo#preface"
    }, {
      "by": "robertothais",
      "descendants": 29,
      "id": 14192946,
      "kids": [14202311, 14202299, 14201900, 14200029, 14198260, 14198605, 14201850, 14199858, 14198223, 14198610],
      "score": 61,
      "time": 1493124627,
      "title": "Consciousness as a State of Matter (2014)",
      "type": "story",
      "url": "https://arxiv.org/abs/1401.1219"
    }, {
      "by": "leephillips",
      "descendants": 2,
      "id": 14202078,
      "kids": [14202122],
      "score": 5,
      "time": 1493205152,
      "title": "The Republican Lawmaker Who Secretly Created Reddit’s Women-Hating ‘Red Pill’",
      "type": "story",
      "url": "http://www.thedailybeast.com/articles/2017/04/25/the-republican-lawmaker-who-secretly-created-reddit-s-women-hating-red-pill.html"
    }, {
      "by": "anguswithgusto",
      "descendants": 55,
      "id": 14196325,
      "kids": [14197131, 14196789, 14197299, 14197466, 14196737, 14199929, 14197550, 14197511, 14196888, 14200109, 14197101],
      "score": 80,
      "time": 1493143475,
      "title": "Gett in advanced talks to buy Juno for $250M as Uber rivals consolidate",
      "type": "story",
      "url": "https://techcrunch.com/2017/04/25/gett-in-advanced-talks-to-buy-juno-for-250m-as-uber-rivals-consolidate/"
    }, {
      "by": "fabuzaid",
      "descendants": 2,
      "id": 14196339,
      "kids": [14201557, 14201170],
      "score": 46,
      "time": 1493143560,
      "title": "Implementing a Fast Research Compiler in Rust",
      "type": "story",
      "url": "http://dawn.cs.stanford.edu/blog/weld.html"
    }, {
      "by": "bluesilver07",
      "descendants": 61,
      "id": 14196154,
      "kids": [14197614, 14196853, 14197074, 14197050, 14200090, 14197731, 14196352, 14197442],
      "score": 72,
      "time": 1493142448,
      "title": "Xenko Game Engine 2.0 released",
      "type": "story",
      "url": "http://xenko.com/blog/release-xenko-2-0-0/"
    }, {
      "by": "molecule",
      "descendants": 254,
      "id": 14189392,
      "kids": [14190198, 14190800, 14193591, 14190274, 14189796, 14190118, 14190405, 14190006, 14189430, 14190244, 14189877, 14190064, 14190211, 14189918, 14190071, 14191312, 14195969, 14190542, 14194775, 14189900, 14190032, 14189847, 14192128, 14191737, 14191047, 14190992, 14192759, 14191405, 14190815, 14194136, 14190737, 14190552, 14191385, 14189816, 14191316, 14193780, 14193979, 14190768, 14192973, 14191217, 14190879, 14190780, 14189914, 14190925, 14192906, 14190528, 14189893, 14190007, 14189929, 14190049, 14191859, 14191304, 14190177, 14193355, 14193352, 14190324, 14190846, 14189803],
      "score": 630,
      "time": 1493076480,
      "title": "Robert M. Pirsig has died",
      "type": "story",
      "url": "http://www.npr.org/sections/thetwo-way/2017/04/24/525443040/-zen-and-the-art-of-motorcycle-maintenance-author-robert-m-pirsig-dies-at-88"
    }, {
      "by": "artsandsci",
      "descendants": 67,
      "id": 14194422,
      "kids": [14199418, 14196266, 14197226, 14196647, 14196324, 14201761, 14196265, 14195599, 14199054, 14196057],
      "score": 127,
      "time": 1493134376,
      "title": "An extra-uterine system to physiologically support the extreme premature lamb",
      "type": "story",
      "url": "https://www.nature.com/articles/ncomms15112"
    }, {
      "by": "miobrien",
      "descendants": 9,
      "id": 14198261,
      "kids": [14199610, 14199447, 14199862, 14201753, 14199068],
      "score": 30,
      "time": 1493155969,
      "title": "Prior Indigenous Technological Species",
      "type": "story",
      "url": "https://arxiv.org/abs/1704.07263"
    }, {
      "by": "zdw",
      "descendants": 2,
      "id": 14199197,
      "kids": [14200610],
      "score": 12,
      "time": 1493163087,
      "title": "Should Curve25519 keys be validated?",
      "type": "story",
      "url": "https://research.kudelskisecurity.com/2017/04/25/should-ecdh-keys-be-validated/"
    }, {
      "by": "spearo77",
      "descendants": 213,
      "id": 14189688,
      "kids": [14191654, 14192373, 14190683, 14192095, 14191856, 14190771, 14190570, 14190599, 14190721, 14192049, 14189694, 14191430, 14193610, 14190543, 14190372, 14191818, 14192171, 14192177, 14192135, 14191483, 14190560, 14190341, 14190362, 14190452, 14192563, 14190458, 14195245, 14190809, 14192706, 14192959, 14190636, 14190634, 14190368, 14191163, 14191379, 14190668, 14191673, 14190884, 14192565, 14190480, 14190442],
      "score": 447,
      "time": 1493079289,
      "title": "WikiTribune – Evidence-based journalism",
      "type": "story",
      "url": "https://www.wikitribune.com"
    }, {
      "by": "adbrebs",
      "descendants": 294,
      "id": 14182262,
      "kids": [14183335, 14183715, 14182725, 14183897, 14185812, 14184510, 14182468, 14183231, 14182580, 14183996, 14182449, 14185671, 14182428, 14182666, 14186599, 14182519, 14185571, 14185159, 14182636, 14185864, 14188340, 14183433, 14183146, 14184034, 14184363, 14183368, 14183098, 14182495, 14182753, 14184720, 14188085, 14187692, 14183633, 14188137, 14182606, 14186796, 14196166, 14185084, 14185899, 14188219, 14186885, 14183406, 14185561, 14183388, 14191457, 14183281, 14183399, 14183674, 14183236, 14183990, 14183760, 14183248, 14184114, 14183318, 14183457, 14186509, 14186900, 14186695, 14188405, 14184636, 14184630, 14188301, 14184144, 14183023, 14184555, 14185946, 14184611, 14184490, 14183653, 14183881, 14182715, 14184440, 14182573, 14183251, 14184962, 14187249, 14182545, 14192314],
      "score": 1356,
      "time": 1493014335,
      "title": "Lyrebird – An API to copy the voice of anyone",
      "type": "story",
      "url": "https://lyrebird.ai/demo"
    }, {
      "by": "mathgenius",
      "descendants": 6,
      "id": 14192442,
      "kids": [14197265, 14195645],
      "score": 43,
      "time": 1493118936,
      "title": "Quantum – Open journal for quantum science",
      "type": "story",
      "url": "http://quantum-journal.org/papers/"
    }, {
      "by": "tjalfi",
      "descendants": 5,
      "id": 14190937,
      "kids": [14199744, 14197114, 14190946],
      "score": 107,
      "time": 1493097061,
      "title": "A Seven Dimensional Analysis of Hashing Methods [pdf]",
      "type": "story",
      "url": "http://www.vldb.org/pvldb/vol9/p96-richter.pdf"
    }, {
      "by": "mxstbr",
      "descendants": 0,
      "id": 14196935,
      "score": 24,
      "time": 1493147015,
      "title": "One GraphQL Client for JavaScript, iOS, and Android",
      "type": "story",
      "url": "https://dev-blog.apollodata.com/one-graphql-client-for-javascript-ios-and-android-64993c1b7991"
    }, {
      "by": "uptown",
      "descendants": 166,
      "id": 14192817,
      "kids": [14197690, 14195597, 14196750, 14195237, 14196320, 14195150, 14198816, 14194916, 14197746, 14196332, 14194695, 14196726, 14194947, 14199715, 14195059, 14195778, 14196204, 14200435, 14194780, 14195030, 14198452, 14199023, 14194852, 14197577, 14197778, 14195361, 14196368, 14194948, 14199024, 14195060, 14199498],
      "score": 226,
      "time": 1493123621,
      "title": "How Yahoo Killed Flickr (2012)",
      "type": "story",
      "url": "https://gizmodo.com/5910223/how-yahoo-killed-flickr-and-lost-the-internet"
    }, {
      "by": "mattklein123",
      "descendants": 42,
      "id": 14194026,
      "kids": [14194573, 14195577, 14194430, 14195407, 14194569, 14195298, 14200054, 14194456, 14198329, 14199198],
      "score": 167,
      "time": 1493131921,
      "title": "Envoy: 7 months later",
      "type": "story",
      "url": "https://eng.lyft.com/envoy-7-months-later-41986c2fd443"
    }, {
      "by": "misnamed",
      "descendants": 2,
      "id": 14191333,
      "kids": [14197296],
      "score": 29,
      "time": 1493103250,
      "title": "Modern Hieroglyphs: Binary Logic Behind the Universal “Power Symbol”",
      "type": "story",
      "url": "http://99percentinvisible.org/article/modern-hieroglyphics-binary-logic-behind-universal-power-symbol/"
    }, {
      "by": "LaFolle",
      "descendants": 92,
      "id": 14191681,
      "kids": [14192477, 14194490, 14192316, 14193364, 14192065, 14193499, 14194324, 14192622, 14192020, 14195866, 14192496, 14196391, 14192138, 14192714, 14195151, 14195094, 14192110, 14192155],
      "score": 138,
      "time": 1493108371,
      "title": "Feynman Algorithm (2014)",
      "type": "story",
      "url": "http://wiki.c2.com/?FeynmanAlgorithm"
    }, {
      "by": "Thevet",
      "descendants": 18,
      "id": 14190736,
      "kids": [14197744, 14195753, 14197880, 14197735, 14195874, 14197023, 14196660],
      "score": 81,
      "time": 1493093860,
      "title": "The legend of the Legion",
      "type": "story",
      "url": "https://aeon.co/essays/why-young-men-queue-up-to-die-in-the-french-foreign-legion"
    }, {
      "by": "bufordsharkley",
      "descendants": 92,
      "id": 14197013,
      "kids": [14197983, 14197168, 14197701, 14198239, 14197514, 14198064, 14197476, 14198489, 14197761, 14197080, 14198905, 14198068, 14198579],
      "score": 69,
      "time": 1493147532,
      "title": "Cracking the Mystery of Labor's Falling Share of GDP",
      "type": "story",
      "url": "https://www.bloomberg.com/view/articles/2017-04-24/cracking-the-mystery-of-labor-s-falling-share-of-gdp"
    }, {
      "by": "rbanffy",
      "descendants": 27,
      "id": 14198470,
      "kids": [14199443, 14201987, 14199461, 14199729, 14201519, 14198762, 14199524],
      "score": 52,
      "time": 1493157378,
      "title": "How the Internet Gave Mail-Order Brides the Power",
      "type": "story",
      "url": "https://backchannel.com/how-the-internet-gave-mail-order-brides-the-power-1af8c8a40562"
    }]
  };
  var start = performance.now();
  render(normalizeProps(createComponentVNode(2, Component$2, _extends({}, props))), root);
  alert(performance.now() - start);

}));
