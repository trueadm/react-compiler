(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function Component_ComputeFunction(val1, val2, val3, val4, val5, val6, val7) {
    return [val1, val2, val3, val4, val5, val6, val7];
  }

  var Component = // Component OPCODES
  [0 // COMPONENT
  , ["val1", "val2", "val3", "val4", "val5", "val6", "val7"] // ROOT_PROPS_SHAPE
  , [20 // UNCONDITIONAL_TEMPLATE
  , [8 // OPEN_ELEMENT_DIV
  , 0 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "container", 6 // OPEN_ELEMENT
  , "header", 1 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 2 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 3 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 4 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 5 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 6 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 7 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 8 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 9 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 10 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 11 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 12 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 13 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 14 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 15 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 16 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 17 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 18 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 19 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 20 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 21 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 22 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 23 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 24 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 25 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 26 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 27 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 28 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 29 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 30 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 31 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 32 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 33 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 34 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 35 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 36 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 37 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 38 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 39 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 40 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 41 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 42 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 43 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 44 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 45 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 46 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 47 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 48 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 49 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 50 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 51 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 52 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 53 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 54 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 55 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 56 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 57 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 58 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 59 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 60 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 61 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 62 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 63 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 64 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 65 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 66 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 67 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 68 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 69 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 70 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 71 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 72 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 73 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 74 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 75 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 76 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 77 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 78 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 79 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 80 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 81 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 82 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 83 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 84 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 85 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 86 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 87 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 88 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 89 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 90 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 91 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 92 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 93 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 94 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 95 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 96 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 97 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 98 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 99 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 100 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 101 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 102 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 103 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 104 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 105 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 106 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 107 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 108 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 109 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 110 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 111 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 112 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 113 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 114 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 115 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 116 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 117 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 118 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 119 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 120 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 121 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 122 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 123 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 124 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 125 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 126 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 127 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 128 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 129 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 130 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 131 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 132 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 133 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 134 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 135 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 136 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 137 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 138 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 139 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 140 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 141 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 142 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 143 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 144 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 145 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 146 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 147 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 148 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 149 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 150 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 151 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 152 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 153 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 154 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 155 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 156 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 157 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 158 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 159 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 160 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 161 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 162 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 163 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 164 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 165 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 166 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 167 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 168 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 169 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 170 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 171 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 172 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 173 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 174 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 175 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 176 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 177 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 178 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 179 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 180 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 181 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 182 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 183 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 184 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 185 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 186 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 187 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "header", 188 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "header-bar", 6 // OPEN_ELEMENT
  , "h1", 189 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 0, 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "section", 190 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "section-divider", 8 // OPEN_ELEMENT_DIV
  , 191 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 192 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #1", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 193 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 194 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 1, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 195 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 2, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 3, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 196 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 197 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 198 // VALUE_POINTER_INDEX
  , 6 // OPEN_ELEMENT
  , "h2", 199 // VALUE_POINTER_INDEX
  , 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Sub-section #2", 10 // CLOSE_ELEMENT
  , 8 // OPEN_ELEMENT_DIV
  , 200 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "details", 6 // OPEN_ELEMENT
  , "p", 201 // VALUE_POINTER_INDEX
  , 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 4, 10 // CLOSE_ELEMENT
  , 9 // OPEN_ELEMENT_SPAN
  , 202 // VALUE_POINTER_INDEX
  , 63 // DYNAMIC_PROP_CLASS_NAME
  , 0, 5, 43 // ELEMENT_DYNAMIC_CHILDREN_VALUE
  , 6, 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 203 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 6 // OPEN_ELEMENT
  , "button", 204 // VALUE_POINTER_INDEX
  , 62 // STATIC_PROP_CLASS_NAME
  , "button", 60 // STATIC_PROP
  , "id", "button1", 41 // ELEMENT_STATIC_CHILDREN_VALUE
  , "Click here!", 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  , 10 // CLOSE_ELEMENT
  ], Component_ComputeFunction // COMPUTE_FUNCTION
  ]];

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
      p = n ? Symbol.for("react.element") : 60103,
      q = n ? Symbol.for("react.portal") : 60106,
      r = n ? Symbol.for("react.fragment") : 60107,
      t = n ? Symbol.for("react.strict_mode") : 60108,
      u = n ? Symbol.for("react.profiler") : 60114,
      v = n ? Symbol.for("react.provider") : 60109,
      w = n ? Symbol.for("react.context") : 60110,
      x = n ? Symbol.for("react.concurrent_mode") : 60111,
      y = n ? Symbol.for("react.forward_ref") : 60112,
      z = n ? Symbol.for("react.suspense") : 60113,
      A = n ? Symbol.for("react.memo") : 60115,
      B = n ? Symbol.for("react.lazy") : 60116,
      C = "function" === typeof Symbol && Symbol.iterator;

  function aa(a, b, e, c, d, g, h, f) {
    if (!a) {
      a = void 0;
      if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
        var l = [e, c, d, g, h, f],
            m = 0;
        a = Error(b.replace(/%s/g, function () {
          return l[m++];
        }));
        a.name = "Invariant Violation";
      }
      a.framesToPop = 1;
      throw a;
    }
  }

  function D(a) {
    for (var b = arguments.length - 1, e = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) e += "&args[]=" + encodeURIComponent(arguments[c + 1]);

    aa(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
  }

  var E = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
      F = {};

  function G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = F;
    this.updater = e || E;
  }

  G.prototype.isReactComponent = {};

  G.prototype.setState = function (a, b) {
    "object" !== typeof a && "function" !== typeof a && null != a ? D("85") : void 0;
    this.updater.enqueueSetState(this, a, b, "setState");
  };

  G.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };

  function H() {}

  H.prototype = G.prototype;

  function I(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = F;
    this.updater = e || E;
  }

  var J = I.prototype = new H();
  J.constructor = I;
  objectAssign(J, G.prototype);
  J.isPureReactComponent = !0;
  var K = {
    current: null,
    currentDispatcher: null
  },
      L = Object.prototype.hasOwnProperty,
      M = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

  function N(a, b, e) {
    var c = void 0,
        d = {},
        g = null,
        h = null;
    if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) L.call(b, c) && !M.hasOwnProperty(c) && (d[c] = b[c]);
    var f = arguments.length - 2;
    if (1 === f) d.children = e;else if (1 < f) {
      for (var l = Array(f), m = 0; m < f; m++) l[m] = arguments[m + 2];

      d.children = l;
    }
    if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === d[c] && (d[c] = f[c]);
    return {
      $$typeof: p,
      type: a,
      key: g,
      ref: h,
      props: d,
      _owner: K.current
    };
  }

  function ba(a, b) {
    return {
      $$typeof: p,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner
    };
  }

  function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === p;
  }

  function escape$1(a) {
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

  function R(a, b, e, c) {
    if (Q.length) {
      var d = Q.pop();
      d.result = a;
      d.keyPrefix = b;
      d.func = e;
      d.context = c;
      d.count = 0;
      return d;
    }

    return {
      result: a,
      keyPrefix: b,
      func: e,
      context: c,
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

  function T(a, b, e, c) {
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
          case p:
          case q:
            g = !0;
        }

    }
    if (g) return e(c, a, "" === b ? "." + U(a, 0) : b), 1;
    g = 0;
    b = "" === b ? "." : b + ":";
    if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
      d = a[h];
      var f = b + U(d, h);
      g += T(d, f, e, c);
    } else if (null === a || "object" !== typeof a ? f = null : (f = C && a[C] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) d = d.value, f = b + U(d, h++), g += T(d, f, e, c);else "object" === d && (e = "" + a, D("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
    return g;
  }

  function V(a, b, e) {
    return null == a ? 0 : T(a, "", b, e);
  }

  function U(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
  }

  function ca(a, b) {
    a.func.call(a.context, b, a.count++);
  }

  function da(a, b, e) {
    var c = a.result,
        d = a.keyPrefix;
    a = a.func.call(a.context, b, a.count++);
    Array.isArray(a) ? W(a, c, e, function (a) {
      return a;
    }) : null != a && (O(a) && (a = ba(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + e)), c.push(a));
  }

  function W(a, b, e, c, d) {
    var g = "";
    null != e && (g = ("" + e).replace(P, "$&/") + "/");
    b = R(b, g, c, d);
    V(a, da, b);
    S(b);
  }

  var X = {
    Children: {
      map: function (a, b, e) {
        if (null == a) return a;
        var c = [];
        W(a, c, null, b, e);
        return c;
      },
      forEach: function (a, b, e) {
        if (null == a) return a;
        b = R(null, null, b, e);
        V(a, ca, b);
        S(b);
      },
      count: function (a) {
        return V(a, function () {
          return null;
        }, null);
      },
      toArray: function (a) {
        var b = [];
        W(a, b, null, function (a) {
          return a;
        });
        return b;
      },
      only: function (a) {
        O(a) ? void 0 : D("143");
        return a;
      }
    },
    createRef: function () {
      return {
        current: null
      };
    },
    Component: G,
    PureComponent: I,
    createContext: function (a, b) {
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
    },
    forwardRef: function (a) {
      return {
        $$typeof: y,
        render: a
      };
    },
    lazy: function (a) {
      return {
        $$typeof: B,
        _ctor: a,
        _status: -1,
        _result: null
      };
    },
    memo: function (a, b) {
      return {
        $$typeof: A,
        type: a,
        compare: void 0 === b ? null : b
      };
    },
    Fragment: r,
    StrictMode: t,
    Suspense: z,
    createElement: N,
    cloneElement: function (a, b, e) {
      null === a || void 0 === a ? D("267", a) : void 0;
      var c = void 0,
          d = objectAssign({}, a.props),
          g = a.key,
          h = a.ref,
          f = a._owner;

      if (null != b) {
        void 0 !== b.ref && (h = b.ref, f = K.current);
        void 0 !== b.key && (g = "" + b.key);
        var l = void 0;
        a.type && a.type.defaultProps && (l = a.type.defaultProps);

        for (c in b) L.call(b, c) && !M.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
      }

      c = arguments.length - 2;
      if (1 === c) d.children = e;else if (1 < c) {
        l = Array(c);

        for (var m = 0; m < c; m++) l[m] = arguments[m + 2];

        d.children = l;
      }
      return {
        $$typeof: p,
        type: a.type,
        key: g,
        ref: h,
        props: d,
        _owner: f
      };
    },
    createFactory: function (a) {
      var b = N.bind(null, a);
      b.type = a;
      return b;
    },
    isValidElement: O,
    version: "16.7.0",
    unstable_ConcurrentMode: x,
    unstable_Profiler: u,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentOwner: K,
      assign: objectAssign
    }
  },
      Y = {
    default: X
  },
      Z = Y && X || Y;
  var react_production_min = Z.default || Z;

  var react = createCommonjsModule(function (module) {

  {
    module.exports = react_production_min;
  }
  });

  const ROOT_ATTRIBUTE_NAME = "data-reactroot";
  const uppercasePattern = /([A-Z])/g;
  const msPattern = /^ms-/;
  const reactElementSymbol = Symbol.for("react.element");
  const isArray = Array.isArray;
  const emptyArray = [];
  const rxUnescaped = new RegExp(/["'&<>]/);

  function escapeText(text) {
    if (typeof text === "string") {
      /* Much faster when there is no unescaped characters */
      if (!rxUnescaped.test(text)) {
        return text;
      }

      let result = text;
      let start = 0;
      let i = 0;

      for (; i < text.length; ++i) {
        switch (text.charCodeAt(i)) {
          case 34:
            // "
            escape = "&quot;";
            break;

          case 39:
            // '
            escape = "&#x27;";
            break;

          case 38:
            // &
            escape = "&amp;";
            break;

          case 60:
            // <
            escape = "&lt;";
            break;

          case 62:
            // >
            escape = "&gt;";
            break;

          default:
            continue;
        }

        if (i > start) {
          escape = text.slice(start, i) + escape;
        }

        result = start > 0 ? result + escape : escape;
        start = i + 1;
      }

      if (i !== start) {
        return result + text.slice(start, i);
      }

      return result;
    }

    return text.toString();
  } // TODO: enable again

  function createMarkupForRoot() {
    return ROOT_ATTRIBUTE_NAME + '=""';
  }

  function hyphenateStyleName(name) {
    return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
  }

  function createElementForTesting(type, props) {
    return {
      $$typeof: reactElementSymbol,
      key: null,
      props,
      ref: null,
      type
    };
  }

  function getCurrentContextValue(context, state) {
    const contextValueStack = state.contextValueStack.get(context);

    if (contextValueStack === undefined) {
      return context._currentValue;
    } else {
      return contextValueStack[contextValueStack.length - 1];
    }
  }

  function pushCurrentContextValue(context, value, state) {
    const contextValueStack = state.contextValueStack.get(context);

    if (contextValueStack === undefined) {
      state.contextValueStack.set(context, [value]);
    } else {
      contextValueStack.push(value);
    }
  }

  function popCurrentContextValue(context, state) {
    const contextValueStack = state.contextValueStack.get(context);

    if (contextValueStack !== undefined) {
      contextValueStack.pop();

      if (contextValueStack.length === 0) {
        state.contextValueStack.set(context, undefined);
      }
    }
  }

  function convertRootPropsToPropsArray(rootProps, rootPropsShape) {
    const props = [];

    if (rootPropsShape !== null) {
      for (let i = 0, length = rootPropsShape.length; i < length; i++) {
        let propShape = rootPropsShape[i];
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
      props,
      usesHooks
    };
  }

  function createState(props) {
    return {
      componentOpcodeCache: new Map(),
      computeFunctionUsesHooks: false,
      contextValueStack: new Map(),
      currentComponent: null,
      currentElementTag: "",
      currentElementTagIsOpen: false,
      currentValue: undefined,
      elementCloseRenderString: "",
      elementTagStack: [],
      elementTagStackIndex: 0,
      hasMarkedRootElement: false,
      lastChildWasStyle: false,
      lastChildWasTextNode: false,
      propsArray: emptyArray,
      renderString: "",
      rootPropsObject: props,
      styleRenderString: ""
    };
  }

  function cloneState(state) {
    const clonedState = createState(null);
    clonedState.componentOpcodeCache = state.componentOpcodeCache;
    clonedState.computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    clonedState.contextValueStack = state.contextValueStack;
    clonedState.currentComponent = state.currentComponent;
    clonedState.currentElementTag = state.currentElementTag;
    clonedState.currentElementTagIsOpen = state.currentElementTagIsOpen;
    clonedState.currentValue = state.currentValue;
    clonedState.elementCloseRenderString = state.elementCloseRenderString;
    clonedState.elementTagStack = state.elementTagStack;
    clonedState.elementTagStackIndex = state.elementTagStackIndex;
    clonedState.hasMarkedRootElement = state.hasMarkedRootElement;
    clonedState.lastChildWasStyle = state.lastChildWasStyle;
    clonedState.lastChildWasTextNode = state.lastChildWasTextNode;
    clonedState.propsArray = state.propsArray;
    clonedState.renderString = state.renderString;
    return clonedState;
  }

  function applyState(targetState, state) {
    targetState.componentOpcodeCache = state.componentOpcodeCache;
    targetState.computeFunctionUsesHooks = state.computeFunctionUsesHooks;
    targetState.contextValueStack = state.contextValueStack;
    targetState.currentComponent = state.currentComponent;
    targetState.currentElementTag = state.currentElementTag;
    targetState.currentElementTagIsOpen = state.currentElementTagIsOpen;
    targetState.currentValue = state.currentValue;
    targetState.elementCloseRenderString = state.elementCloseRenderString;
    targetState.elementTagStack = state.elementTagStack;
    targetState.elementTagStackIndex = state.elementTagStackIndex;
    targetState.hasMarkedRootElement = state.hasMarkedRootElement;
    targetState.lastChildWasStyle = state.lastChildWasStyle;
    targetState.lastChildWasTextNode = state.lastChildWasTextNode;
    targetState.propsArray = state.propsArray;
    targetState.renderString = state.renderString;
  }

  function isReactNode(node) {
    return node !== null && node.t !== undefined && node.v !== undefined;
  }
  /* eslint-disable-next-line */


  var utils = {
    applyState,
    cloneState,
    convertRootPropsToPropsArray,
    createComponent,
    createElementForTesting,
    createMarkupForRoot,
    createRootComponent,
    createState,
    emptyArray,
    escapeText,
    getCurrentContextValue,
    hyphenateStyleName,
    isArray,
    isReactNode,
    popCurrentContextValue,
    pushCurrentContextValue,
    reactElementSymbol
  };

  const {
    convertRootPropsToPropsArray: convertRootPropsToPropsArray$1,
    createComponent: createComponent$1,
    createRootComponent: createRootComponent$1,
    emptyArray: emptyArray$1,
    isArray: isArray$1,
    reactElementSymbol: reactElementSymbol$1
  } = utils;

  const rootStates = new Map();
  const updateAndUnmountOpcodesFromMountOpcodes = new Map();
  const mountOpcodeRenderFuncs = [renderMountComponent, // COMPONENT: 0,
  noOp, // COMPONENT_WITH_HOOKS: 1,
  noOp, // STATIC_VALUE: 2,
  noOp, // DYNAMIC_VALUE: 3,
  noOp, // EMPTY 4
  noOp, // EMPTY 5
  renderMountOpenElement, // OPEN_ELEMENT: 6,
  renderMountOpenVoidElement, // OPEN_VOID_ELEMENT: 7,
  renderMountOpenDivElement, // OPEN_ELEMENT_DIV: 8,
  renderMountOpenSpanElement, // OPEN_ELEMENT_SPAN: 9,
  renderMountCloseElement, // CLOSE_ELEMENT: 10,
  noOp, // CLOSE_ELEMENT: 11,
  renderMountOpenFragment, // OPEN_FRAGMENT: 12,
  renderMountCloseFragment, // CLOSE_FRAGMENT: 13,
  noOp, // OPEN_CONTEXT_PROVIDER: 14,
  noOp, // CLOSE_CONTEXT_PROVIDER: 15,
  noOp, // OPEN_PROP_STYLE: 16,
  noOp, // CLOSE_PROP_STYLE: 17,
  noOp, // EMPTY 18
  noOp, // EMPTY 19
  renderMountUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  noOp, // CONDITIONAL_TEMPLATE: 21,
  noOp, // TEMPLATE: 22,
  noOp, // TEMPLATE_FROM_FUNC_CALL: 23,
  noOp, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  renderMountMultiConditional, // MULTI_CONDITIONAL: 25,
  noOp, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  noOp, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  noOp, // CONTEXT_CONSUMER_TEMPLATE: 28,
  noOp, // REF_COMPONENT: 29,
  renderMountConditional, // CONDITIONAL: 30,
  noOp, // LOGICAL_OR: 31,
  noOp, // LOGICAL_AND: 32,
  noOp, // EMPTY 33
  noOp, // EMPTY 34
  noOp, // EMPTY 35
  noOp, // EMPTY 36
  noOp, // EMPTY 37
  noOp, // EMPTY 38
  noOp, // EMPTY 39
  renderMountStaticChildValue, // ELEMENT_STATIC_CHILD_VALUE: 40,
  renderMountStaticChildrenValue, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  renderMountDynamicChildValue, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  renderMountDynamicChildrenValue, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  noOp, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  renderMountDynamicChildrenTemplateFromFunctionCall, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  noOp, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  noOp, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
  noOp, // EMPTY 50
  noOp, // EMPTY 51
  noOp, // EMPTY 52
  noOp, // EMPTY 53
  noOp, // EMPTY 54
  noOp, // EMPTY 55
  noOp, // EMPTY 56
  noOp, // EMPTY 57
  noOp, // EMPTY 58
  noOp, // EMPTY 59
  renderMountStaticProp, // STATIC_PROP: 60,
  renderMountDynamicProp, // DYNAMIC_PROP: 61,
  renderMountStaticClassNameProp, // STATIC_PROP_CLASS_NAME: 62,
  renderMountDynamicClassNameProp, // DYNAMIC_PROP_CLASS_NAME: 63,
  noOp, // STATIC_PROP_VALUE: 64,
  noOp, // DYNAMIC_PROP_VALUE: 65,
  noOp, // STATIC_PROP_STYLE: 66,
  noOp, // DYNAMIC_PROP_STYLE: 67,
  noOp, // STATIC_PROP_UNITLESS_STYLE: 68,
  noOp, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  noOp, // STATIC_PROP_KEY: 70,
  noOp, // DYNAMIC_PROP_KEY: 71,
  noOp];
  const updateOpcodeRenderFuncs = [renderUpdateComponent, // COMPONENT: 0,
  noOp, // COMPONENT_WITH_HOOKS: 1,
  noOp, // STATIC_VALUE: 2,
  noOp, // DYNAMIC_VALUE: 3,
  noOp, // EMPTY 4
  noOp, // EMPTY 5
  renderMountOpenElement, // OPEN_ELEMENT: 6,
  renderMountOpenVoidElement, // OPEN_VOID_ELEMENT: 7,
  renderMountOpenDivElement, // OPEN_ELEMENT_DIV: 8,
  renderMountOpenSpanElement, // OPEN_ELEMENT_SPAN: 9,
  renderMountCloseElement, // CLOSE_ELEMENT: 10,
  noOp, // CLOSE_ELEMENT: 11,
  renderMountOpenFragment, // OPEN_FRAGMENT: 12,
  renderMountCloseFragment, // CLOSE_FRAGMENT: 13,
  noOp, // OPEN_CONTEXT_PROVIDER: 14,
  noOp, // CLOSE_CONTEXT_PROVIDER: 15,
  noOp, // OPEN_PROP_STYLE: 16,
  noOp, // CLOSE_PROP_STYLE: 17,
  noOp, // EMPTY 18
  noOp, // EMPTY 19
  renderUpdateUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  noOp, // CONDITIONAL_TEMPLATE: 21,
  noOp, // TEMPLATE: 22,
  noOp, // TEMPLATE_FROM_FUNC_CALL: 23,
  noOp, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  renderMountMultiConditional, // MULTI_CONDITIONAL: 25,
  noOp, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  noOp, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  noOp, // CONTEXT_CONSUMER_TEMPLATE: 28,
  noOp, // REF_COMPONENT: 29,
  renderUpdateConditional, // CONDITIONAL: 30,
  noOp, // LOGICAL_OR: 31,
  noOp, // LOGICAL_AND: 32,
  noOp, // EMPTY 33
  noOp, // EMPTY 34
  noOp, // EMPTY 35
  noOp, // EMPTY 36
  noOp, // EMPTY 37
  noOp, // EMPTY 38
  noOp, // EMPTY 39
  renderMountStaticChildValue, // ELEMENT_STATIC_CHILD_VALUE: 40,
  renderMountStaticChildrenValue, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  renderMountDynamicChildValue, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  renderMountDynamicChildrenValue, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  noOp, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  renderMountDynamicChildrenTemplateFromFunctionCall, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  noOp, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  noOp, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
  noOp, // EMPTY 50
  noOp, // EMPTY 51
  noOp, // EMPTY 52
  noOp, // EMPTY 53
  noOp, // EMPTY 54
  noOp, // EMPTY 55
  noOp, // EMPTY 56
  noOp, // EMPTY 57
  noOp, // EMPTY 58
  noOp, // EMPTY 59
  renderMountStaticProp, // STATIC_PROP: 60,
  renderMountDynamicProp, // DYNAMIC_PROP: 61,
  renderMountStaticClassNameProp, // STATIC_PROP_CLASS_NAME: 62,
  renderMountDynamicClassNameProp, // DYNAMIC_PROP_CLASS_NAME: 63,
  noOp, // STATIC_PROP_VALUE: 64,
  noOp, // DYNAMIC_PROP_VALUE: 65,
  noOp, // STATIC_PROP_STYLE: 66,
  noOp, // DYNAMIC_PROP_STYLE: 67,
  noOp, // STATIC_PROP_UNITLESS_STYLE: 68,
  noOp, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  noOp, // STATIC_PROP_KEY: 70,
  noOp, // DYNAMIC_PROP_KEY: 71,
  noOp];
  const unmountOpcodeRenderFuncs = [renderUpdateComponent, // COMPONENT: 0,
  noOp, // COMPONENT_WITH_HOOKS: 1,
  noOp, // STATIC_VALUE: 2,
  noOp, // DYNAMIC_VALUE: 3,
  noOp, // EMPTY 4
  noOp, // EMPTY 5
  renderMountOpenElement, // OPEN_ELEMENT: 6,
  renderMountOpenVoidElement, // OPEN_VOID_ELEMENT: 7,
  renderMountOpenDivElement, // OPEN_ELEMENT_DIV: 8,
  renderUnmountOpenSpanElement, // OPEN_ELEMENT_SPAN: 9,
  renderMountCloseElement, // CLOSE_ELEMENT: 10,
  noOp, // CLOSE_ELEMENT: 11,
  renderMountOpenFragment, // OPEN_FRAGMENT: 12,
  renderMountCloseFragment, // CLOSE_FRAGMENT: 13,
  noOp, // OPEN_CONTEXT_PROVIDER: 14,
  noOp, // CLOSE_CONTEXT_PROVIDER: 15,
  noOp, // OPEN_PROP_STYLE: 16,
  noOp, // CLOSE_PROP_STYLE: 17,
  noOp, // EMPTY 18
  noOp, // EMPTY 19
  renderUpdateUnconditionalTemplate, // UNCONDITIONAL_TEMPLATE: 20,
  noOp, // CONDITIONAL_TEMPLATE: 21,
  noOp, // TEMPLATE: 22,
  noOp, // TEMPLATE_FROM_FUNC_CALL: 23,
  noOp, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  renderMountMultiConditional, // MULTI_CONDITIONAL: 25,
  noOp, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  noOp, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  noOp, // CONTEXT_CONSUMER_TEMPLATE: 28,
  noOp, // REF_COMPONENT: 29,
  renderUpdateConditional, // CONDITIONAL: 30,
  noOp, // LOGICAL_OR: 31,
  noOp, // LOGICAL_AND: 32,
  noOp, // EMPTY 33
  noOp, // EMPTY 34
  noOp, // EMPTY 35
  noOp, // EMPTY 36
  noOp, // EMPTY 37
  noOp, // EMPTY 38
  noOp, // EMPTY 39
  renderMountStaticChildValue, // ELEMENT_STATIC_CHILD_VALUE: 40,
  renderMountStaticChildrenValue, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  renderMountDynamicChildValue, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  renderMountDynamicChildrenValue, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  noOp, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  renderMountDynamicChildrenTemplateFromFunctionCall, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  noOp, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  noOp, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  noOp, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
  noOp, // EMPTY 50
  noOp, // EMPTY 51
  noOp, // EMPTY 52
  noOp, // EMPTY 53
  noOp, // EMPTY 54
  noOp, // EMPTY 55
  noOp, // EMPTY 56
  noOp, // EMPTY 57
  noOp, // EMPTY 58
  noOp, // EMPTY 59
  renderMountStaticProp, // STATIC_PROP: 60,
  renderMountDynamicProp, // DYNAMIC_PROP: 61,
  renderMountStaticClassNameProp, // STATIC_PROP_CLASS_NAME: 62,
  renderMountDynamicClassNameProp, // DYNAMIC_PROP_CLASS_NAME: 63,
  noOp, // STATIC_PROP_VALUE: 64,
  noOp, // DYNAMIC_PROP_VALUE: 65,
  noOp, // STATIC_PROP_STYLE: 66,
  noOp, // DYNAMIC_PROP_STYLE: 67,
  noOp, // STATIC_PROP_UNITLESS_STYLE: 68,
  noOp, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  noOp, // STATIC_PROP_KEY: 70,
  noOp, // DYNAMIC_PROP_KEY: 71,
  noOp];
  const doesOpcodeFuncTerminate = [1, // COMPONENT: 0,
  1, // COMPONENT_WITH_HOOKS: 1,
  1, // STATIC_VALUE: 2,
  1, // DYNAMIC_VALUE: 3,
  0, // EMPTY 4
  0, // EMPTY 5
  0, // OPEN_ELEMENT: 6,
  0, // OPEN_VOID_ELEMENT: 7,
  0, // OPEN_ELEMENT_DIV: 8,
  0, // OPEN_ELEMENT_SPAN: 9,
  0, // CLOSE_ELEMENT: 10,
  0, // CLOSE_VOID_ELEMENT: 11,
  0, // OPEN_FRAGMENT: 12,
  0, // CLOSE_FRAGMENT: 13,
  0, // OPEN_CONTEXT_PROVIDER: 14,
  0, // CLOSE_CONTEXT_PROVIDER: 15,
  0, // OPEN_PROP_STYLE: 16,
  0, // CLOSE_PROP_STYLE: 17,
  0, // EMPTY 18
  0, // EMPTY 19
  1, // UNCONDITIONAL_TEMPLATE: 20,
  1, // CONDITIONAL_TEMPLATE: 21,
  1, // TEMPLATE: 22,
  0, // TEMPLATE_FROM_FUNC_CALL: 23,
  0, // REACT_NODE_TEMPLATE_FROM_FUNC_CALL: 24,
  0, // MULTI_CONDITIONAL: 25,
  0, // CONTEXT_CONSUMER_UNCONDITIONAL_TEMPLATE: 26,
  0, // CONTEXT_CONSUMER_CONDITIONAL_TEMPLATE: 27,
  0, // CONTEXT_CONSUMER_TEMPLATE: 28,
  0, // REF_COMPONENT: 29,
  0, // CONDITIONAL: 30,
  0, // LOGICAL_OR: 31,
  0, // LOGICAL_AND: 32,
  0, // EMPTY 33
  0, // EMPTY 34
  0, // EMPTY 35
  0, // EMPTY 36
  0, // EMPTY 37
  0, // EMPTY 38
  0, // EMPTY 39
  0, // ELEMENT_STATIC_CHILD_VALUE: 40,
  0, // ELEMENT_STATIC_CHILDREN_VALUE: 41,
  0, // ELEMENT_DYNAMIC_CHILD_VALUE: 42,
  0, // ELEMENT_DYNAMIC_CHILDREN_VALUE: 43,
  0, // ELEMENT_DYNAMIC_CHILD_TEMPLATE_FROM_FUNC_CALL: 44,
  0, // ELEMENT_DYNAMIC_CHILDREN_TEMPLATE_FROM_FUNC_CALL: 45,
  0, // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE: 46,
  0, // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE: 47,
  0, // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE: 48,
  0, // ELEMENT_DYNAMIC_FUNCTION_CHILD: 49,
  0, // EMPTY 50
  0, // EMPTY 51
  0, // EMPTY 52
  0, // EMPTY 53
  0, // EMPTY 54
  0, // EMPTY 55
  0, // EMPTY 56
  0, // EMPTY 57
  0, // EMPTY 58
  0, // EMPTY 59
  0, // STATIC_PROP: 60,
  0, // DYNAMIC_PROP: 61,
  0, // STATIC_PROP_CLASS_NAME: 62,
  0, // DYNAMIC_PROP_CLASS_NAME: 63,
  0, // STATIC_PROP_VALUE: 64,
  0, // DYNAMIC_PROP_VALUE: 65,
  0, // STATIC_PROP_STYLE: 66,
  0, // DYNAMIC_PROP_STYLE: 67,
  0, // STATIC_PROP_UNITLESS_STYLE: 68,
  0, // DYNAMIC_PROP_UNITLESS_STYLE: 69,
  0, // STATIC_PROP_KEY: 70,
  0, // DYNAMIC_PROP_KEY: 71,
  0];
  const PropFlagPartialTemplate = 1;

  function noOp(index, opcodes, runtimeValues, state) {
    return index + 1;
  }

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
    if (isArray$1(parentElementOrFragment)) {
      parentElementOrFragment.push(element);
    } else if (isArray$1(element)) {
      for (let i = 0, length = element.length; i < length; i++) {
        appendChild(parentElementOrFragment, element[i]);
      }
    } else {
      parentElementOrFragment.appendChild(element);
    }
  }

  function pushNodeOrFragment(state, nextNodeOrFragment, workInProgress) {
    if (state.currentHostNodeIsVoidElement === true) {
      state.currentHostNodeIsVoidElement = false;
      popNodeOrFragment(state, workInProgress);
    }

    const currentHostNode = state.currentHostNode;

    if (currentHostNode !== null) {
      state.hostNodeStack[state.hostNodeStackIndex++] = currentHostNode;
    }

    state.currentHostNode = nextNodeOrFragment;
  }

  function popNodeOrFragment(state, workInProgress) {
    if (state.currentHostNodeIsVoidElement === true) {
      state.currentHostNodeIsVoidElement = false;
      popNodeOrFragment(state, workInProgress);
    }

    let hostNodeStackIndex = state.hostNodeStackIndex;

    if (hostNodeStackIndex === 0) {
      state.currentHostNode = null;
    } else {
      const hostNodeStack = state.hostNodeStack;
      const childNode = state.currentHostNode;
      hostNodeStackIndex = --state.hostNodeStackIndex;
      const parentNode = hostNodeStack[hostNodeStackIndex];
      state.currentHostNode = parentNode;
      appendChild(parentNode, childNode);
      hostNodeStack[hostNodeStackIndex] = null;
    }
  }

  function renderMountConditional(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const conditionValuePointer = mountOpcodes[++index];
    const conditionValue = runtimeValues[conditionValuePointer];
    const consequentMountOpcodes = mountOpcodes[++index];
    const alternateMountOpcodes = mountOpcodes[++index];

    if (shouldCreateOpcodes) {
      updateOpcodes.push(30, conditionValuePointer, consequentMountOpcodes, alternateMountOpcodes);
    }

    if (conditionValue) {
      if (consequentMountOpcodes !== null) {
        const [consequentUpdateOpcodes, consequentUnmountOpcodes, shouldCreateConsequentOpcodes] = getOpcodesFromMountOpcodes(consequentMountOpcodes);
        renderMountOpcodes(consequentMountOpcodes, consequentUpdateOpcodes, consequentUnmountOpcodes, shouldCreateConsequentOpcodes, runtimeValues, state, workInProgress);
      }

      return index;
    }

    if (alternateMountOpcodes !== null) {
      const [alternateUpdateOpcodes, alternateUnmountOpcodes, shouldCreateAlternateOpcodes] = getOpcodesFromMountOpcodes(alternateMountOpcodes);
      renderMountOpcodes(alternateMountOpcodes, alternateUpdateOpcodes, alternateUnmountOpcodes, shouldCreateAlternateOpcodes, runtimeValues, state, workInProgress);
    }

    return index;
  }

  function renderUpdateConditional(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
    const conditionValuePointer = updateOpcodes[++index];
    const previousConditionValue = previousRuntimeValues[conditionValuePointer];
    const nextConditionValue = nextRuntimeValues[conditionValuePointer];
    const consequentMountOpcodes = updateOpcodes[++index];
    const alternateMountOpcodes = updateOpcodes[++index];
    const shouldUpdate = previousConditionValue === nextConditionValue;

    if (nextConditionValue) {
      if (consequentMountOpcodes !== null) {
        const [consequentUpdateOpcodes, consequentUnmountpcodes, shouldCreateConsequentOpcodes] = getOpcodesFromMountOpcodes(consequentMountOpcodes);

        if (shouldUpdate) ; else {
          if (alternateMountOpcodes !== null) {
            const [, alternateUnmountOpcodes] = getOpcodesFromMountOpcodes(alternateMountOpcodes);
            renderUnmountOpcodes(alternateUnmountOpcodes, state, workInProgress);
          }

          renderMountOpcodes(consequentMountOpcodes, consequentUpdateOpcodes, consequentUnmountpcodes, shouldCreateConsequentOpcodes, nextRuntimeValues, state, workInProgress);
        }
      }

      return index;
    }

    if (alternateMountOpcodes !== null) {
      const [alternateUpdateOpcodes, alternateUnmountOpcodes, shouldCreateAlternateOpcodes] = getOpcodesFromMountOpcodes(alternateMountOpcodes);

      if (shouldUpdate) ; else {
        // debugger;
        renderMountOpcodes(alternateMountOpcodes, alternateUpdateOpcodes, alternateUnmountOpcodes, shouldCreateAlternateOpcodes, nextRuntimeValues, state, workInProgress);
      }
    }

    return index;
  }

  function renderMountDynamicChildrenTemplateFromFunctionCall(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const templateOpcodes = mountOpcodes[++index];
    const computeValuesPointer = mountOpcodes[++index];
    const computeValues = runtimeValues[computeValuesPointer];
    renderMountOpcodes(templateOpcodes, computeValues, state, workInProgress);
    return index;
  }

  function renderMountMultiConditional(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
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

    return startingIndex + (conditionalSize - 1) * 2 + 1;
  }

  function renderMountStaticProp(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const propName = mountOpcodes[++index];
    const staticPropValue = mountOpcodes[++index];
    state.currentHostNode.setAttribute(propName, staticPropValue);
    return index;
  }

  function renderMountDynamicProp(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const propName = mountOpcodes[++index];
    const propInformation = mountOpcodes[++index];
    const dynamicPropValuePointer = mountOpcodes[++index];
    const dynamicPropValue = runtimeValues[dynamicPropValuePointer];

    if (propInformation & PropFlagPartialTemplate) {
      throw new Error("TODO renderStaticProp");
    } else if (dynamicPropValue !== null && dynamicPropValue !== undefined) {
      state.currentHostNode.setAttribute(propName, dynamicPropValue);
    }

    return index;
  }

  function renderMountStaticClassNameProp(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const staticClassName = mountOpcodes[++index];
    state.currentHostNode.className = staticClassName;
    return index;
  }

  function renderMountDynamicClassNameProp(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const propInformation = mountOpcodes[++index];
    const dynamicClassNamePointer = mountOpcodes[++index];
    const dynamicClassName = runtimeValues[dynamicClassNamePointer];

    if (propInformation & PropFlagPartialTemplate) {
      throw new Error("TODO renderMountDynamicClassNameProp");
    } else if (dynamicClassName !== null && dynamicClassName !== undefined) {
      state.currentHostNode.className = dynamicClassName;
    }

    return index;
  }

  function renderMountOpenFragment(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    pushNodeOrFragment(state, [], workInProgress);
    return index;
  }

  function renderMountCloseFragment(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    popNodeOrFragment(state, workInProgress);
    return index;
  }

  function renderMountOpenElement(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const elementTag = mountOpcodes[++index];
    const elemValuePointer = mountOpcodes[++index];
    const elem = createElement(elementTag);

    if (shouldCreateOpcodes) {
      unmountOpcodes.push(9, elemValuePointer);
    }

    workInProgress.values[elemValuePointer] = elem;
    pushNodeOrFragment(state, elem, workInProgress);
    return index;
  }

  function renderMountOpenVoidElement(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const elementTag = mountOpcodes[++index];
    const elemValuePointer = mountOpcodes[++index];
    const elem = createElement(elementTag);

    if (shouldCreateOpcodes) {
      unmountOpcodes.push(9, elemValuePointer);
    }

    workInProgress.values[elemValuePointer] = elem;
    pushNodeOrFragment(state, elem, workInProgress);
    state.currentHostNodeIsVoidElement = true;
    return index;
  }

  function renderMountOpenDivElement(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const elem = createElement("div");
    const elemValuePointer = mountOpcodes[++index];

    if (shouldCreateOpcodes) {
      unmountOpcodes.push(9, elemValuePointer);
    }

    workInProgress.values[elemValuePointer] = elem;
    pushNodeOrFragment(state, elem, workInProgress);
    return index;
  }

  function renderMountOpenSpanElement(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const elem = createElement("span");
    const elemValuePointer = mountOpcodes[++index];

    if (shouldCreateOpcodes) {
      unmountOpcodes.push(9, elemValuePointer);
    }

    workInProgress.values[elemValuePointer] = elem;
    pushNodeOrFragment(state, elem, workInProgress);
    return index;
  }

  function renderUnmountOpenSpanElement(index, unmountOpcodes, state, workInProgress) {
    const elemValuePointer = unmountOpcodes[++index];
    const elem = workInProgress.values[elemValuePointer];
    removeChild(elem.parentNode, elem);
    return index;
  }

  function renderMountCloseElement(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    popNodeOrFragment(state, workInProgress);
    return index;
  }

  function renderMountStaticChildrenValue(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const staticTextContent = mountOpcodes[++index];
    state.currentHostNode.textContent = staticTextContent;
    return index;
  }

  function renderMountDynamicChildrenValue(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const dynamicTextContentPointer = mountOpcodes[++index];
    const dynamicTextContent = runtimeValues[dynamicTextContentPointer];
    state.currentHostNode.textContent = dynamicTextContent;
    return index;
  }

  function renderMountStaticChildValue(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const staticTextChild = mountOpcodes[++index];
    const textNode = createTextNode(staticTextChild);
    const currentHostNode = state.currentHostNode;

    if (currentHostNode === null) {
      state.currentHostNode = textNode;
    } else {
      appendChild(currentHostNode, textNode);
    }

    return index;
  }

  function renderMountDynamicChildValue(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const dynamicTextChildPointer = mountOpcodes[++index];
    const dynamicTextChild = runtimeValues[dynamicTextChildPointer];
    const textNode = createTextNode(dynamicTextChild);
    const currentHostNode = state.currentHostNode;

    if (currentHostNode === null) {
      state.currentHostNode = textNode;
    } else {
      appendChild(currentHostNode, textNode);
    }

    return index;
  }

  function renderMountComponent(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    let currentComponent = state.currentComponent;
    let rootPropsShape;
    const previousComponent = currentComponent;

    if (currentComponent === null) {
      rootPropsShape = mountOpcodes[++index];
      currentComponent = state.currentComponent = createRootComponent$1(state.rootPropsObject, rootPropsShape, false);
    } else {
      state.currentComponent = createComponent$1(state.propsArray, false);
    }

    const componentMountOpcodes = mountOpcodes[++index];
    const [componentUpdateOpcodes, componentUnmountOpcodes, shouldCreateComponentOpcodes] = getOpcodesFromMountOpcodes(componentMountOpcodes);
    const componentFiber = createOpcodeFiber(null, runtimeValues);

    if (shouldCreateComponentOpcodes) {
      updateOpcodes.push(0);

      if (rootPropsShape !== undefined) {
        updateOpcodes.push(rootPropsShape);
      }

      updateOpcodes.push(componentUpdateOpcodes);
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
    renderMountOpcodes(componentMountOpcodes, componentUpdateOpcodes, componentUnmountOpcodes, shouldCreateComponentOpcodes, runtimeValues, state, componentFiber);
    state.currentValue = previousValue;
    state.currentComponent = previousComponent;
  }

  function renderUpdateComponent(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
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
      nextPropsArray = convertRootPropsToPropsArray$1(state.rootPropsObject, rootPropsShape);
    } else {
      nextPropsArray = state.propsArray;
    }

    component.props = nextPropsArray;
    const componentUpdateOpcodes = updateOpcodes[++index];
    state.currentComponent = currentComponent = component;
    renderUpdateOpcodes(componentUpdateOpcodes, previousRuntimeValues, nextRuntimeValues, state, componentFiber);
    state.currentComponent = previousComponent;
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

  function renderMountUnconditionalTemplate(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const templateMountOpcodes = mountOpcodes[++index];
    const [templateUpdateOpcodes, templateUnmountOpcodes, shouldCreateTemplateOpcodes] = getOpcodesFromMountOpcodes(templateMountOpcodes);
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

      templateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);

      if (computeFunctionUsesHooks === true) {
        // finishHooks();
        state.computeFunctionUsesHooks = false;
      }
    }

    workInProgress.values[templateValuesPointerIndex] = templateRuntimeValues;
    renderMountOpcodes(templateMountOpcodes, templateUpdateOpcodes, templateUnmountOpcodes, shouldCreateTemplateOpcodes, templateRuntimeValues, state, workInProgress);
  }

  function renderUpdateUnconditionalTemplate(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
    const templateValuesPointerIndex = updateOpcodes[++index];
    const templateUpdateOpcodes = updateOpcodes[++index];
    const computeFunction = updateOpcodes[++index];
    const previousTemplateRuntimeValues = workInProgress.values[templateValuesPointerIndex];
    let nextTemplateRuntimeValues = nextRuntimeValues;

    if (computeFunction !== null) {
      const computeFunctionUsesHooks = state.computeFunctionUsesHooks;

      nextTemplateRuntimeValues = callComputeFunctionWithArray(computeFunction, state.currentComponent.props);

      if (computeFunctionUsesHooks === true) {
        // finishHooks();
        state.computeFunctionUsesHooks = false;
      }
    }

    workInProgress.values[templateValuesPointerIndex] = nextRuntimeValues;
    renderUpdateOpcodes(templateUpdateOpcodes, previousTemplateRuntimeValues, nextTemplateRuntimeValues, state, workInProgress);
  }

  function renderMountOpcodes(mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) {
    const opcodesLength = mountOpcodes.length;
    let index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      const opcode = mountOpcodes[index];
      const renderOpcode = mountOpcodeRenderFuncs[opcode];
      const shouldTerminate = doesOpcodeFuncTerminate[opcode];

      if (shouldTerminate === 1) {
        renderOpcode(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress);
        return;
      } else {
        index = renderOpcode(index, mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, runtimeValues, state, workInProgress) + 1;
      }
    }
  }

  function renderUpdateOpcodes(updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) {
    const opcodesLength = updateOpcodes.length;
    let index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      const opcode = updateOpcodes[index];
      const renderOpcode = updateOpcodeRenderFuncs[opcode];
      const shouldTerminate = doesOpcodeFuncTerminate[opcode];

      if (shouldTerminate === 1) {
        renderOpcode(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress);
        return;
      } else {
        index = renderOpcode(index, updateOpcodes, previousRuntimeValues, nextRuntimeValues, state, workInProgress) + 1;
      }
    }
  }

  function renderUnmountOpcodes(unmountOpcodes, state, workInProgress) {
    const opcodesLength = unmountOpcodes.length;
    let index = 0; // Render opcodes from the opcode jump-table

    while (index < opcodesLength) {
      const opcode = unmountOpcodes[index];
      const renderOpcode = unmountOpcodeRenderFuncs[opcode];
      const shouldTerminate = doesOpcodeFuncTerminate[opcode];

      if (shouldTerminate === 1) {
        renderOpcode(index, unmountOpcodes, state, workInProgress);
        return;
      } else {
        index = renderOpcode(index, unmountOpcodes, state, workInProgress) + 1;
      }
    }
  }

  function renderRoot(rootState, mountOpcodes) {
    const [updateOpcodes, unmountOpcodes, shouldCreateOpcodes] = getOpcodesFromMountOpcodes(mountOpcodes);

    if (rootState.fiber === null) {
      // Mount
      renderMountOpcodes(mountOpcodes, updateOpcodes, unmountOpcodes, shouldCreateOpcodes, emptyArray$1, rootState, null);
    } else {
      // Update
      renderUpdateOpcodes(updateOpcodes, emptyArray$1, emptyArray$1, rootState, null);
    }
  }

  function getOpcodesFromMountOpcodes(mountOpcodes) {
    let shouldCreateOpcodes = false;
    let updateAndUnmountOpcodes = updateAndUnmountOpcodesFromMountOpcodes.get(mountOpcodes);

    if (updateAndUnmountOpcodes === undefined) {
      updateAndUnmountOpcodes = [[], []];
      shouldCreateOpcodes = true;
      updateAndUnmountOpcodesFromMountOpcodes.set(mountOpcodes, updateAndUnmountOpcodes);
    }

    return [updateAndUnmountOpcodes[0], updateAndUnmountOpcodes[1], shouldCreateOpcodes];
  }

  function createState$1(rootPropsObject, currentHostNode) {
    return {
      currentComponent: null,
      currentHostNode,
      currentHostNodeIsVoidElement: false,
      fiber: null,
      hostNodeStack: [],
      hostNodeStackIndex: 0,
      propsArray: emptyArray$1,
      rootPropsObject
    };
  }

  function createOpcodeFiber(hostNode, values) {
    return {
      child: null,
      hostNode,
      key: null,
      sibling: null,
      parent: null,
      values
    };
  }

  function insertChildFiberIntoParentFiber(parent, child) {
    child.parent = parent;

    if (parent.child === null) {
      parent.child = child;
    }
  }

  function renderNodeToRootContainer(node, DOMContainer) {
    let rootState = rootStates.get(DOMContainer);

    if (node === null || node === undefined) ; else if (node.$$typeof === reactElementSymbol$1) {
      if (rootState === undefined) {
        rootState = createState$1(node.props, DOMContainer);
        rootStates.set(DOMContainer, rootState);
      } else {
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


  var render_1 = {
    render
  };
  var render_2 = render_1.render;

  // DO NOT MODIFY
  const root = document.getElementById("root");
  const props = {
    val1: "val1",
    val2: "val2",
    val3: "val3",
    val4: "val4",
    val5: "val5",
    val6: "val6",
    val7: "val7"
  };
  console.time("Render");
  render_2(react.createElement(Component, props), root);
  console.timeEnd("Render");
   // render(React.createElement(Component, updateProps), root);

}));
