(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var Component = [32768, [36866, "div", "Hello world"]];

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

  var ROOT_COMPONENT = 0;
  var HOST_COMPONENT = 2;
  var IS_STATIC = 1 << 15;
  var rootFibers = new Map();

  function mountFunctionComponent(isRoot, templateTypeAndFlags, componentTemplate, parentDOMNode, values, currentFiber) {
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
      debugger; // if (hasHooks === true) {
      //   prepareToUseHooks(computeFunction);
      // }
      // const componentValues = callComputeFunctionWithArray(computeFunction, componentProps);
      // if (hasHooks === true) {
      //   finishHooks(computeFunction);
      // }
      // if (componentValues === null) {
      //   return "";
      // }
      // return renderTemplateToString(childTemplateNode, componentValues, isOnlyChild, state);
    }

    var childTemplateNode = componentTemplate[1];
    return mountTemplateNode(childTemplateNode, parentDOMNode, values, currentFiber);
  }

  function mountHostComponent(templateTypeAndFlags, hostComponentTemplate, parentDOMNode, values, currentFiber) {
    debugger;
  }

  function mountTemplateNode(templateNode, parentDOMNode, values, currentFiber) {
    var templateTypeAndFlags = templateNode[0];
    var templateType = templateTypeAndFlags & 0x3f;

    switch (templateType) {
      case ROOT_COMPONENT:
        return mountFunctionComponent(true, templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);

      case HOST_COMPONENT:
        return mountHostComponent(templateTypeAndFlags, templateNode, parentDOMNode, values, currentFiber);

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
  var start = performance.now();
  render(React.createElement(Component, props), root);
  console.log(performance.now() - start);

}));
