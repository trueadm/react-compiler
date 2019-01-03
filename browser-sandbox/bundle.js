(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function createReactNode(t, v) {
    return {
      t,
      v: v || null,
    };
  }

  /* eslint-disable-next-line */
  var createReactNode_1 = createReactNode;

  function createTemplateNode(c) {
    return {
      c: c,
      d: null,
      u: null,
    };
  }

  /* eslint-disable-next-line */
  var createTemplateNode_1 = createTemplateNode;

  /* eslint-disable-next-line */
  var reactCompilerRuntime = {
    createReactNode: createReactNode_1,
    createTemplateNode: createTemplateNode_1,
  };
  var reactCompilerRuntime_2 = reactCompilerRuntime.createTemplateNode;

  var Component = // Component OPCODES
  [0 // COMPONENT
  , "Component" // DISPLAY_NAME
  , null // ROOT_PROPS_SHAPE
  , reactCompilerRuntime_2([20 // UNCONDITIONAL_TEMPLATE
  , [12 // OPEN_FRAGMENT
  , 8 // OPEN_ELEMENT_DIV
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Hello world", 10 // CLOSE_ELEMENT
  , 12 // OPEN_FRAGMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "123", 10 // CLOSE_ELEMENT
  , 40 // ELEMENT_STATIC_CHILD_VALUE
  , "456", 7 // OPEN_VOID_ELEMENT
  , "input", 60 // STATIC_PROP
  , "type", "text", 11 // CLOSE_VOID_ELEMENT
  , 12 // OPEN_FRAGMENT
  , 12 // OPEN_FRAGMENT
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "789", 13 // CLOSE_FRAGMENT
  , 13 // CLOSE_FRAGMENT
  , 13 // CLOSE_FRAGMENT
  , 13 // CLOSE_FRAGMENT
  ], null // COMPUTE_FUNCTION
  ])];

  function render(a, b) {
    console.log(a);
  }

  /* eslint-disable-next-line */
  var render_1 = {
    render,
  };
  var render_2 = render_1.render;

  // DO NOT MODIFY

  const root = document.getElementById("root");

  render_2(Component, root);

}));
