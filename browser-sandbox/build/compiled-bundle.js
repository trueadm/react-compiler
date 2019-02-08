(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function Component_ComputeFunction(cond, defaultClassName) {
    var __cached__0;

    if (__cached__0 = cond) ;

    return [__cached__0, defaultClassName];
  }

  var Component = [0, ["cond", "defaultClassName"], Component_ComputeFunction, [1090, "ul", ["id", 0, "list-view", "className", 0, "list"], [9, [0, [4162, "li", ["className", 0, "generic-item"], "Generic item"], null, [4226, "li", ["className", 0, 1], "Default item"]]]]];

  var reactElementSymbol = Symbol.for("react.element");
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
  function callComputeFunctionWithArray(computeFunction, arr) {
    if (arr === null) {
      return computeFunction();
    }

    switch (arr.length) {
      case 0:
        return computeFunction();

      case 1:
        return computeFunction(arr[0]);

      case 2:
        return computeFunction(arr[0], arr[1]);

      case 3:
        return computeFunction(arr[0], arr[1], arr[2]);

      case 4:
        return computeFunction(arr[0], arr[1], arr[2], arr[3]);

      case 7:
        return computeFunction(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);

      default:
        return computeFunction.apply(null, arr);
    }
  }
  function createElement(tag) {
    return document.createElement(tag);
  }
  function appendChild(parentDOMNode, DOMNode) {
    parentDOMNode.appendChild(DOMNode);
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function createPlaceholder() {
    return createTextNode("");
  }
  function insertFiber(parentFiber, fiber) {
    var children = parentFiber.children;

    if (children === null) {
      children = parentFiber.children = [];
    }

    children.push(fiber);
    fiber.parent = parentFiber;
  }

  var ROOT_COMPONENT = 0;
  var HOST_COMPONENT = 2;
  var TEXT = 3;
  var MULTI_CONDITIONAL = 9;

  var HAS_STATIC_PROPS = 1 << 6;
  var HAS_CHILD = 1 << 10;
  var HAS_CHILDREN = 1 << 11;
  var HAS_STATIC_TEXT_CONTENT = 1 << 12;
  var HAS_DYNAMIC_TEXT_CONTENT = 1 << 13;
  var IS_STATIC = 1 << 15;

  var HAS_HOOKS = 1 << 6; // Collection
  var PROP_IS_EVENT = 1;
  var PROP_IS_BOOLEAN = 1 << 1;
  var PROP_IS_POSITIVE_NUMBER = 1 << 2;
  var rootFibers = new Map();

  function mountFunctionComponentTemplate(isRoot, templateTypeAndFlags, componentTemplate, parentDOMNode, values, currentFiber) {
    var templateFlags = templateTypeAndFlags & ~0x3f;

    if ((templateFlags & IS_STATIC) === 0) {
      var componentProps = null;
      var computeFunction;

      var _childTemplateNode;

      if (isRoot === true) {
        var rootComponentPropsShape = componentTemplate[1];
        computeFunction = componentTemplate[2];
        _childTemplateNode = componentTemplate[3];

        if (rootComponentPropsShape !== 0) {
          componentProps = convertRootPropsToPropsArray(currentFiber.memoizedProps, rootComponentPropsShape);
        }
      } else {
        // This always means that the parent was a reference component template node
        componentProps = values;
        computeFunction = componentTemplate[1];
        _childTemplateNode = componentTemplate[2];
      }

      var hasHooks = (templateFlags & HAS_HOOKS) !== 0;
      var componentValues;

      if (hasHooks === true) ; else {
        componentValues = callComputeFunctionWithArray(computeFunction, componentProps);
      }

      var componentFiber = createFiber(componentTemplate, componentValues);
      insertFiber(currentFiber, componentFiber);

      if (componentValues === null) {
        var placeholder = createPlaceholder();
        componentFiber.hostNode = placeholder;
        return placeholder;
      }

      var hostNode = mountTemplateNode(_childTemplateNode, parentDOMNode, componentValues, componentFiber);
      componentFiber.hostNode = hostNode;
      return hostNode;
    }

    var childTemplateNode = componentTemplate[1];
    return mountTemplateNode(childTemplateNode, parentDOMNode, values, currentFiber);
  }

  function renderPropValue(propFlags, value) {
    if (value === null) {
      return;
    }

    if ((propFlags & PROP_IS_BOOLEAN) !== 0 && typeof value !== "boolean") {
      return;
    } else if ((propFlags & PROP_IS_POSITIVE_NUMBER) !== 0) {
      if (isNaN(value) || value < 1) {
        return;
      }
    }

    return value;
  }

  function mountHostComponentTemplate(templateTypeAndFlags, hostComponentTemplate, parentDOMNode, values, currentFiber) {
    var templateFlags = templateTypeAndFlags & ~0x3f;
    var tagName = hostComponentTemplate[1];
    var DOMNode = createElement(tagName);
    var childrenTemplateIndex = 2;

    if ((templateFlags & HAS_STATIC_PROPS) !== 0) {
      var staticProps = hostComponentTemplate[childrenTemplateIndex++];

      for (var i = 0, length = staticProps.length; i < length; i += 3) {
        var propName = staticProps[i];
        var staticPropFlags = staticProps[i + 1];
        var staticPropValue = renderPropValue(staticPropFlags, staticProps[i + 2]);

        if (staticPropValue === undefined) {
          continue;
        }

        if (propName === "className") {
          DOMNode.className = staticPropValue;
        } else if ((staticPropFlags & PROP_IS_EVENT) !== 0) {
          // TODO make events work
          continue;
        } else {
          DOMNode.setAttribute(propName, staticPropValue);
        }
      }
    }

    if ((templateFlags & HAS_DYNAMIC_TEXT_CONTENT) !== 0) {
      var textContentValueIndex = hostComponentTemplate[childrenTemplateIndex];
      var text = values[textContentValueIndex];

      if (text !== undefined && text !== null && text !== "") {
        DOMNode.textContent = text;
      }
    } else if ((templateFlags & HAS_STATIC_TEXT_CONTENT) !== 0) {
      DOMNode.textContent = hostComponentTemplate[childrenTemplateIndex];
    } else if ((templateFlags & HAS_CHILD) !== 0) {
      var child = hostComponentTemplate[childrenTemplateIndex];
      mountTemplateNode(child, DOMNode, values, currentFiber);
    } else if ((templateFlags & HAS_CHILDREN) !== 0) {
      var childrenTemplateNodes = hostComponentTemplate[childrenTemplateIndex];

      for (var _i = 0, _length = childrenTemplateNodes.length; _i < _length; ++_i) {
        mountTemplateNode(childrenTemplateNodes[_i], DOMNode, values, currentFiber);
      }
    }

    if (parentDOMNode !== null) {
      appendChild(parentDOMNode, DOMNode);
    }

    return DOMNode;
  }

  function mountTextTemplate(templateTypeAndFlags, textTemplate, parentDOMNode, values, currentFiber) {
    var templateFlags = templateTypeAndFlags & ~0x3f;
    var isStatic = (templateFlags & IS_STATIC) !== 0;
    var text = isStatic === true ? textTemplate[1] : values[textTemplate[1]];
    var textDOMNode = createTextNode(text);

    if (parentDOMNode !== null) {
      appendChild(parentDOMNode, textDOMNode);
    }

    return textDOMNode;
  }

  function mountMultiConditionalTemplate(multiConditionalTemplate, parentDOMNode, values, currentFiber) {
    var conditions = multiConditionalTemplate[1];
    var conditionalFiber = createFiber(multiConditionalTemplate, 0);
    insertFiber(currentFiber, conditionalFiber);

    for (var i = 0, length = conditions.length; i < length; i += 2) {
      var conditionValueIndexOrNull = conditions[i];

      if (conditionValueIndexOrNull === null) {
        conditionalFiber.values = i;
        var conditionTemplateNode = conditions[i + 1];
        return mountTemplateNode(conditionTemplateNode, parentDOMNode, values, conditionalFiber);
      }

      var conditionValue = values[conditionValueIndexOrNull];

      if (conditionValue) {
        conditionalFiber.values = i;
        var _conditionTemplateNode = conditions[i + 1];
        return mountTemplateNode(_conditionTemplateNode, parentDOMNode, values, conditionalFiber);
      }
    }
  }

  function mountTemplateNode(templateNode, parentDOMNode, values, currentFiber) {
    var templateTypeAndFlags = templateNode[0];
    var templateType = templateTypeAndFlags & 0x3f;

    switch (templateType) {
      case ROOT_COMPONENT:
        return mountFunctionComponentTemplate(true, templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);

      case HOST_COMPONENT:
        return mountHostComponentTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);

      case TEXT:
        return mountTextTemplate(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);

      case MULTI_CONDITIONAL:
        return mountMultiConditionalTemplate(templateNode, parentDOMNode, values, currentFiber);

      default:
        throw new Error("Should never happen");
    }
  }

  function renderNodeToRootContainer(node, DOMContainer) {
    var rootFiber = rootFibers.get(DOMContainer);

    if (node === null || node === undefined) ; else if (node.$$typeof === reactElementSymbol) {
      var templateNode = node.type;
      var rootProps = node.props;

      if (rootFiber === undefined) {
        rootFiber = createFiber(templateNode, null);
        rootFiber.memoizedProps = rootProps;
        rootFiber.hostNode = DOMContainer;
        rootFibers.set(DOMContainer, rootFiber);
        mountTemplateNode(templateNode, DOMContainer, null, rootFiber);
      }
    } else {
      throw new Error("render() expects a ReactElement as the first argument");
    }
  }

  function createFiber(templateNode, values) {
    return {
      children: null,
      hostNode: null,
      memoizedProps: null,
      memoizedState: null,
      parent: null,
      pendingProps: null,
      pendingState: null,
      slots: null,
      templateNode: templateNode,
      values: values
    };
  }

  function render(node, DOMContainer) {
    var returnNode = renderNodeToRootContainer(node, DOMContainer);
    return returnNode;
  }

  // DO NOT MODIFY
  var React = {
    createElement: function createElement$$1(type, props) {
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
  var start = performance.now();
  render(React.createElement(Component, props), root);
  console.log(performance.now() - start);

}));
