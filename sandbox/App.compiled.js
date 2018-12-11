import { createReactNode, createTemplateNode } from "react-compiler-runtime";
// props_from_file:tests/benchmarks/fb-ufi.json
type Edge = {
  i18n_reaction_count: string,
  node: {
    localized_name: string,
    reaction_type: string,
    id: string,
    key: number,
  },
  reaction_count: number,
};
type FeedbackType = {
  top_reactions: {
    edges: Array<Edge>
  }
};

const React = require("react");

const cx = require("cx");

const fbt = require("fbt");

function joinClasses(className): string {
  var newClassName = className || "";

  for (var _len = arguments["length"], classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  var argLength = classes["length"];

  for (var index = 0; index < argLength; index++) {
    var nextClass = classes[index];

    if (nextClass != null && nextClass !== "") {
      newClassName = (newClassName ? newClassName + " " : "") + nextClass;
    }
  }

  return newClassName;
}

function eprintf(errorMessage) {
  for (var _len = arguments["length"], rawArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rawArgs[_key - 1] = arguments[_key];
  }

  var args = rawArgs["map"](function (arg) {
    return String(arg);
  });
  var expectedLength = errorMessage["split"]("%s")["length"] - 1;

  if (expectedLength !== args["length"]) {
    return eprintf("eprintf args number mismatch: %s", JSON["stringify"]([errorMessage]["concat"](args)));
  }

  var index = 0;
  return errorMessage["replace"](/%s/g, function () {
    return String(args[index++]);
  });
}

function ex(format) {
  for (var _len = arguments["length"], rawArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rawArgs[_key - 1] = arguments[_key];
  }

  var args = rawArgs["map"](function (arg) {
    return String(arg);
  });
  var expectedLength = format["split"]("%s")["length"] - 1;

  if (expectedLength !== args["length"]) {
    return ex("ex args number mismatch: %s", JSON["stringify"]([format]["concat"](args)));
  }

  if (false) {
    return eprintf["call"]["apply"](eprintf, [null, format]["concat"](args));
  } else {
    return ex["_prefix"] + JSON["stringify"]([format]["concat"](args)) + ex["_suffix"];
  }
}

ex["_prefix"] = "<![EX[";
ex["_suffix"] = "]]>";
var printingFunction = ex;

function invariant(condition, format) {
  if (!condition) {
    var error = void 0;

    if (format === undefined) {
      error = new Error("Minified exception occurred; use the non-minified dev environment " + "for the full error message and additional helpful warnings.");
    } else {
      for (var _len = arguments["length"], params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
      }

      error = new Error(printingFunction["apply"](undefined, [format]["concat"](params)));
      error["name"] = "Invariant Violation";
      error["messageWithParams"] = [format]["concat"](params);
    }

    error["framesToPop"] = 1;
    /*throw*/

    error;
  }
}

function OnVisible_ComputeFunction // COMPUTE_FUNCTION
(children) {
  // return React.Children.only(children);
  return [children];
}

function OnVisible() {
  return (// OnVisible OPCODES
    [0 // COMPONENT
    , "OnVisible" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [3 // ROOT_DYNAMIC_VALUE
    , 0], OnVisible_ComputeFunction])]
  );
}

function ErrorBoundary_ComputeFunction // COMPUTE_FUNCTION
(children, fallbackComponent) {
  const state = {};
  const error = state["error"];

  if (error) {} // TODO
  // var FallbackComponent = this.props.fallbackComponent;
  // var content = null;
  // if (FallbackComponent) {
  //   content = React.createElement(FallbackComponent, {
  //     error: error,
  //     moduleName: moduleName
  //   });
  // }
  // return React.createElement(ErrorMarker, null, content);
  // TODO
  // return React.Children.only(this.props.children);


  return [children];
}

function ErrorBoundary() {
  return (// ErrorBoundary OPCODES
    [0 // COMPONENT
    , "ErrorBoundary" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [3 // ROOT_DYNAMIC_VALUE
    , 0], ErrorBoundary_ComputeFunction])]
  );
}

function UFI2ErrorBoundary_ComputeFunction // COMPUTE_FUNCTION
(children, getFBLoggerErrorMessage) {
  return [[children, void 0]];
}

function UFI2ErrorBoundary() {
  return (// UFI2ErrorBoundary OPCODES
    [0 // COMPONENT
    , "UFI2ErrorBoundary" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [29 // REF_COMPONENT
    , ErrorBoundary, 0 // COMPONENT_PROPS_ARRAY
    ], UFI2ErrorBoundary_ComputeFunction])]
  );
}

function UFI2CommentsProvider() {
  return (// UFI2CommentsProvider OPCODES
    [0 // COMPONENT
    , "UFI2CommentsProvider" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
  );
}

function UFI2ReactionsCount() {
  return (// UFI2ReactionsCount OPCODES
    [0 // COMPONENT
    , "UFI2ReactionsCount" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
  );
}

var UFIReactionsProfileBrowserUtils = {
  ["getDialogURI"]: function (_ref) {
    return "dialog_uri";
  },
  ["getPageURI"]: function (_ref2) {
    return "page_uri";
  },
  ["getPrimerProps"]: function (args): {
    ajaxify: string,
    href: string,
    rel: string,
  } {
    var pageURI = UFIReactionsProfileBrowserUtils["getPageURI"](args);
    var dialogURI = UFIReactionsProfileBrowserUtils["getDialogURI"](args);
    return {
      ["ajaxify"]: dialogURI,
      ["href"]: pageURI,
      ["rel"]: "dialog"
    };
  }
};

function getReactionKeyFromType(type): string {
  return "key";
}

function UFI2ReactionIconTooltipTitle() {
  return (// UFI2ReactionIconTooltipTitle OPCODES
    [0 // COMPONENT
    , "UFI2ReactionIconTooltipTitle" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
  );
}

function AbstractLink_ComputeFunction // COMPUTE_FUNCTION
(ajaxify, aria_disabled, aria_label, children, className, href, linkRef, nofollow, noopener, onClick, rel, shimhash, tabIndex, target, useMetaReferrer, useRedirect) {
  var __cached__4;

  var __cached__3;

  var __cached__2;

  var outputHref = href;
  var outputRel = rel;

  if (useRedirect) {
    outputHref = href + shimhash || "";
  }

  if (__cached__4 = nofollow) {
    outputRel = outputRel ? outputRel + " nofollow" : "nofollow";
  }

  if (__cached__3 = noopener) {
    outputRel = outputRel ? outputRel + " noopener" : "noopener";
  }

  __cached__2 = outputHref["toString"]();
  return [ajaxify, aria_disabled, aria_label, className, tabIndex, target, __cached__2, __cached__3, outputRel ? outputRel + " noopener" : "noopener", __cached__4, outputRel ? outputRel + " nofollow" : "nofollow", rel, linkRef, children];
}

function AbstractLink() {
  return (// AbstractLink OPCODES
    [0 // COMPONENT
    , "AbstractLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [6 // OPEN_ELEMENT
    , "a", 61 // DYNAMIC_PROP
    , "ajaxify", 0, 0, 61 // DYNAMIC_PROP
    , "aria-disabled", 0, 1, 61 // DYNAMIC_PROP
    , "aria-label", 0, 2, 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 3, 61 // DYNAMIC_PROP
    , "tabindex", 8, 4, 61 // DYNAMIC_PROP
    , "target", 0, 5, 61 // DYNAMIC_PROP
    , "href", 0, 6, 25 // MULTI_CONDITIONAL
    , 3 // MULTI_CONDITIONAL_SIZE
    , 7, [61 // DYNAMIC_PROP
    , "rel", 0, 8], 9, [61 // DYNAMIC_PROP
    , "rel", 0, 10], [61 // DYNAMIC_PROP
    , "rel", 0, 11], 72 // DYNAMIC_PROP_REF
    , 0, 12, 48 // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE
    , 13, 10 // CLOSE_ELEMENT
    ], AbstractLink_ComputeFunction])]
  );
}

function parseHref(rawHref): Array<string, string> {
  var shimhash = null;
  return [rawHref, shimhash];
}

function Link_ComputeFunction // COMPUTE_FUNCTION
(ajaxify, allowunsafehref, aria_disabled, aria_label, children, className, rawHref, linkRef, onClick, rel, isSafeToSkipShim, tabIndex, target) {
  var parsed_href = parseHref(rawHref);
  var shimhash = parsed_href[1];
  return [[ajaxify, aria_disabled, aria_label, children, className, parsed_href[0], linkRef, shimhash != null, shimhash !== null && target === "_blank", onClick, rel, parsed_href[1], tabIndex, target, false, shimhash != null]];
}

function Link() {
  return (// Link OPCODES
    [0 // COMPONENT
    , "Link" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [29 // REF_COMPONENT
    , AbstractLink, 0 // COMPONENT_PROPS_ARRAY
    ], Link_ComputeFunction])]
  );
}

var __hoisted__opcodes__0 = [9 // OPEN_ELEMENT_SPAN
, 62 // STATIC_PROP_CLASS_NAME
, "accessible_elem", 48 // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE
, 0, 10 // CLOSE_ELEMENT
];

function AbstractButton_ComputeFunction // COMPUTE_FUNCTION
(ajaxify, aria_label, className, depressed, disabled, href, image, imageRight, label, labelIsHidden, rel, role, tabIndex, type) {
  var _className = cx("abstractButton/root") + (disabled ? " " + cx("public/abstractButton/disabled") : "") + (depressed ? " " + cx("public/abstractButton/depressed") : "");

  if (href) {
    var isDisabledButton = disabled && role === "button";
    joinClasses(className, _className);
    return [0, [ajaxify, void 0, isDisabledButton ? true : undefined, aria_label, [image, labelIsHidden ? createReactNode(__hoisted__opcodes__0, [label]) : label, imageRight], joinClasses(className, _className), href, void 0, null, rel, void 0, disabled ? -1 : tabIndex, void 0]];
  } else if (type && type !== "submit") {
    var __cached__5;

    __cached__5 = joinClasses(className, _className);
    return [1, ajaxify, aria_label, rel, __cached__5, disabled, href, type, image, labelIsHidden, label, imageRight];
  } else {
    var __cached__6;

    __cached__6 = joinClasses(className, _className);
    return [2, ajaxify, aria_label, rel, __cached__6, disabled, href, image, labelIsHidden, label, imageRight];
  }
}

function AbstractButton() {
  return (// AbstractButton OPCODES
    [0 // COMPONENT
    , "AbstractButton" // DISPLAY_NAME
    , createTemplateNode([21 // CONDITIONAL_TEMPLATE
    , AbstractButton_ComputeFunction, [0 // CONDITIONAL_ROOT_INDEX
    , [29 // REF_COMPONENT
    , Link, 1 // COMPONENT_PROPS_ARRAY
    ], 1 // CONDITIONAL_ROOT_INDEX
    , [6 // OPEN_ELEMENT
    , "button", 61 // DYNAMIC_PROP
    , "ajaxify", 0, 1, 61 // DYNAMIC_PROP
    , "aria-label", 0, 2, 61 // DYNAMIC_PROP
    , "rel", 0, 3, 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 4, 61 // DYNAMIC_PROP
    , "disabled", 32, 5, 61 // DYNAMIC_PROP
    , "href", 0, 6, 61 // DYNAMIC_PROP
    , "type", 0, 7, 47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 8, 30 // CONDITIONAL
    , 9, [9 // OPEN_ELEMENT_SPAN
    , 62 // STATIC_PROP_CLASS_NAME
    , "accessible_elem", 48 // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE
    , 10, 10 // CLOSE_ELEMENT
    ] // CONDITIONAL_CONSEQUENT
    , [47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 10] // CONDITIONAL_ALTERNATE
    , 47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 11, 10 // CLOSE_ELEMENT
    ], 2 // CONDITIONAL_ROOT_INDEX
    , [6 // OPEN_ELEMENT
    , "button", 61 // DYNAMIC_PROP
    , "ajaxify", 0, 1, 61 // DYNAMIC_PROP
    , "aria-label", 0, 2, 61 // DYNAMIC_PROP
    , "rel", 0, 3, 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 4, 61 // DYNAMIC_PROP
    , "disabled", 32, 5, 61 // DYNAMIC_PROP
    , "href", 0, 6, 60 // STATIC_PROP
    , "type", "submit", 64 // STATIC_PROP_VALUE
    , "1", 47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 7, 30 // CONDITIONAL
    , 8, [9 // OPEN_ELEMENT_SPAN
    , 62 // STATIC_PROP_CLASS_NAME
    , "accessible_elem", 48 // ELEMENT_DYNAMIC_CHILDREN_REACT_NODE_TEMPLATE
    , 9, 10 // CLOSE_ELEMENT
    ] // CONDITIONAL_CONSEQUENT
    , [47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 9] // CONDITIONAL_ALTERNATE
    , 47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 10, 10 // CLOSE_ELEMENT
    ]]])]
  );
}

function createTooltipPortal(content, container): null {
  return null;
}

function Tooltip_ComputeFunction // COMPUTE_FUNCTION
(children, className, data_testid, display, tabIndex, tooltip) {
  var $Tooltip_container = document["createElement"]("div");

  if (display === "block") {
    return [0, className, data_testid, tabIndex, tooltip !== null ? createTooltipPortal(tooltip, $Tooltip_container) : null, children];
  } else {
    return [1, className, data_testid, tabIndex, tooltip !== null ? createTooltipPortal(tooltip, $Tooltip_container) : null, children];
  }
}

function Tooltip() {
  return (// Tooltip OPCODES
    [0 // COMPONENT
    , "Tooltip" // DISPLAY_NAME
    , createTemplateNode([21 // CONDITIONAL_TEMPLATE
    , Tooltip_ComputeFunction, [0 // CONDITIONAL_ROOT_INDEX
    , [8 // OPEN_ELEMENT_DIV
    , 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 1, 61 // DYNAMIC_PROP
    , "data-testid", 0, 2, 61 // DYNAMIC_PROP
    , "tabindex", 8, 3, 47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 5, 10 // CLOSE_ELEMENT
    ], 1 // CONDITIONAL_ROOT_INDEX
    , [9 // OPEN_ELEMENT_SPAN
    , 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 1, 61 // DYNAMIC_PROP
    , "data-testid", 0, 2, 61 // DYNAMIC_PROP
    , "tabindex", 8, 3, 47 // ELEMENT_DYNAMIC_CHILD_REACT_NODE_TEMPLATE
    , 5, 10 // CLOSE_ELEMENT
    ]]])]
  );
}

Tooltip["defaultProps"] = {
  ["display"]: "inline"
};

function LazyContentTooltip_ComputeFunction // COMPUTE_FUNCTION
(children, className, contentRenderer, contentRendererProps, data_testid, errorMessage, placeholder, tabIndex) {
  return [[children, className, data_testid, "inline", tabIndex, placeholder]];
}

function LazyContentTooltip() {
  return (// LazyContentTooltip OPCODES
    [0 // COMPONENT
    , "LazyContentTooltip" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [29 // REF_COMPONENT
    , Tooltip, 0 // COMPONENT_PROPS_ARRAY
    ], LazyContentTooltip_ComputeFunction])]
  );
}

var __hoisted__opcodes__2 = [29 // REF_COMPONENT
, AbstractButton, 0 // COMPONENT_PROPS_ARRAY
];
var __hoisted__opcodes__1 = [29 // REF_COMPONENT
, UFIReactionIcon, 0 // COMPONENT_PROPS_ARRAY
];
var __hoisted__opcodes__3 = [8 // OPEN_ELEMENT_DIV
, 29 // REF_COMPONENT
, UFI2ReactionIconTooltipTitle, null // COMPONENT_PROPS_ARRAY
, 42 // ELEMENT_DYNAMIC_CHILD_VALUE
, 0, 10 // CLOSE_ELEMENT
];
var __opcodes__11 = // $UFI2TopReactions_renderLink OPCODES
[20 // UNCONDITIONAL_TEMPLATE
, [29 // REF_COMPONENT
, LazyContentTooltip, 0 // COMPONENT_PROPS_ARRAY
], null // COMPUTE_FUNCTION
];

function UFI2TopReactions_ComputeFunction // COMPUTE_FUNCTION
(className, feedback, feedbackTargetID) {
  var __cached__1;

  var __cached__0;

  var top_reactions = feedback["top_reactions"];
  var topReactions = top_reactions != null ? top_reactions["edges"] : top_reactions;
  topReactions || invariant(0, "UFI2TopReactions: Expected top reactions");
  var actorID = feedback != null ? feedback["viewer_current_actor"] != null ? feedback["viewer_current_actor"]["id"] : feedback["viewer_current_actor"] : feedback;
  actorID || invariant(0, "UFI2TopReactions: Expected an actor ID");

  if (topReactions["length"] === 0) {
    return null;
  }

  var topThreeReactions = topReactions["slice"](0, 3);

  function $UFI2TopReactions_renderLink(actorID, reactionEdge, reactionIndex): React.Node {
    var __cached__9;

    var __cached__7;

    var selectedReactionIndex = null;
    var i18nReactionCount = reactionEdge != null ? reactionEdge["i18n_reaction_count"] : reactionEdge;
    var i18nReactionName = reactionEdge != null ? reactionEdge["node"] != null ? reactionEdge["node"]["localized_name"] : reactionEdge["node"] : reactionEdge;
    var reactionType = reactionEdge != null ? reactionEdge["node"] != null ? reactionEdge["node"]["reaction_type"] : reactionEdge["node"] : reactionEdge;
    var reactionKey = getReactionKeyFromType(reactionType);

    var primerProps = __cached__7 = UFIReactionsProfileBrowserUtils["getPrimerProps"]({
      ["actorID"]: actorID,
      ["feedbackTargetID"]: feedbackTargetID,
      ["reactionKey"]: reactionKey
    });

    var reactionsNotFocused = selectedReactionIndex === null;
    var currentReactionIsFocused = selectedReactionIndex === reactionIndex;
    __cached__9 = fbt["_"]("Loading\u2026", null, {
      ["hash_key"]: "2Ct2DW"
    });
    fbt["_"]("{i18nReactionCount} {i18nReactionName}", [fbt["_param"]("i18nReactionCount", i18nReactionCount), fbt["_param"]("i18nReactionName", i18nReactionName)], {
      ["hash_key"]: "1yBDpL"
    });
    return [[createReactNode(__hoisted__opcodes__2, [[__cached__7["ajaxify"], fbt["_"]("{i18nReactionCount} {i18nReactionName}", [fbt["_param"]("i18nReactionCount", i18nReactionCount), fbt["_param"]("i18nReactionName", i18nReactionName)], {
      ["hash_key"]: "1yBDpL"
    }), cx("UFI2TopReactions/link"), void 0, void 0, __cached__7["href"], void 0, void 0, [createReactNode(__hoisted__opcodes__1, [[cx("UFI2TopReactions/icon"), "16"]])], void 0, __cached__7["rel"], "button", reactionsNotFocused && reactionIndex === 0 || currentReactionIsFocused ? 0 : -1, void 0]]), cx("UFI2TopReactions/tooltip"), null, {
      ["feedbackTargetID"]: feedbackTargetID,
      ["i18nReactionName"]: i18nReactionName,
      ["reactionType"]: reactionType
    }, "UFI2TopReactions/tooltip_" + reactionType, void 0, createReactNode(__hoisted__opcodes__3, [__cached__9]), -1]];
  }

  __cached__1 = joinClasses(cx("UFI2TopReactions/root"), className);
  __cached__0 = fbt["_"]("See who reacted to this", null, {
    ["hash_key"]: "30H01m"
  });
  return [__cached__0, __cached__1, topThreeReactions, function (edge: Edge, ii: number): React.Node {
    var __cached__10;

    __cached__10 = $UFI2TopReactions_renderLink(actorID, edge, ii);
    return [__cached__10];
  }];
}

function UFI2TopReactions() {
  return (// UFI2TopReactions OPCODES
    [0 // COMPONENT
    , "UFI2TopReactions" // DISPLAY_NAME
    , createTemplateNode([22 // TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 61 // DYNAMIC_PROP
    , "aria-label", 0, 0, 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 1, 60 // STATIC_PROP
    , "role", "toolbar", 46 // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE
    , 2, [20 // UNCONDITIONAL_TEMPLATE
    , [23 // TEMPLATE_FROM_FUNC_CALL
    , __opcodes__11, 0 // COMPUTE_VALUES
    ], null // COMPUTE_FUNCTION
    ] // ARRAY_MAP_OPCODES
    , 3 // ARRAY_MAP_COMPUTE_FUNCTION
    , 10 // CLOSE_ELEMENT
    ], UFI2TopReactions_ComputeFunction])]
  );
}

function UFI2RealtimeContainer_ComputeFunction // COMPUTE_FUNCTION
(children) {
  return [[children]];
}

function UFI2RealtimeContainer() {
  return (// UFI2RealtimeContainer OPCODES
    [0 // COMPONENT
    , "UFI2RealtimeContainer" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [29 // REF_COMPONENT
    , OnVisible, 0 // COMPONENT_PROPS_ARRAY
    ], UFI2RealtimeContainer_ComputeFunction])]
  );
}

var __hoisted__opcodes__4 = [29 // REF_COMPONENT
, UFI2TopReactions, 0 // COMPONENT_PROPS_ARRAY
];
var __hoisted__opcodes__5 = [29 // REF_COMPONENT
, UFI2ReactionsCount, null // COMPONENT_PROPS_ARRAY
];

function FeedStoryUFISummary_ComputeFunction // COMPUTE_FUNCTION
(feedback, feedbackTargetID, onClickCommentsCount) {
  var can_show_seen_by = feedback["can_show_seen_by"];
  var comment_count = feedback["comment_count"];
  var reaction_count = feedback["reaction_count"];
  var seen_by_count = feedback["seen_by_count"];
  var share_count = feedback["share_count"];
  var viewCount = feedback["video_view_count"];
  var seenByCount = (seen_by_count != null ? seen_by_count["count"] : seen_by_count) || 0;
  var canShowSeenBy = can_show_seen_by === true && seenByCount > 0;
  var commentsCount = comment_count != null ? comment_count["total_count"] : comment_count;
  var reactionsCount = reaction_count != null ? reaction_count["count"] : reaction_count;
  var sharesCount = share_count != null ? share_count["count"] : share_count;

  if (!canShowSeenBy && !commentsCount && !reactionsCount && !sharesCount && !viewCount) {
    return null;
  }

  return [reaction_count != null ? reaction_count["count"] : reaction_count, [createReactNode(__hoisted__opcodes__4, [[cx("fbFeedStoryUFI/topReactions"), feedback, feedbackTargetID]]), void 0]];
}

function FeedStoryUFISummary() {
  return (// FeedStoryUFISummary OPCODES
    [0 // COMPONENT
    , "FeedStoryUFISummary" // DISPLAY_NAME
    , createTemplateNode([22 // TEMPLATE
    , [8 // OPEN_ELEMENT_DIV
    , 62 // STATIC_PROP_CLASS_NAME
    , "fbFeedStoryUFI__feedbackSummary", 60 // STATIC_PROP
    , "data-testid", "fbFeedStoryUFI/feedbackSummary", 30 // CONDITIONAL
    , 0, [8 // OPEN_ELEMENT_DIV
    , 62 // STATIC_PROP_CLASS_NAME
    , "fbFeedStoryUFI__reactionsSummary", 29 // REF_COMPONENT
    , UFI2ErrorBoundary, 1 // COMPONENT_PROPS_ARRAY
    , 29 // REF_COMPONENT
    , UFI2ErrorBoundary, [createReactNode(__hoisted__opcodes__5), void 0] // COMPONENT_PROPS_ARRAY
    , 10 // CLOSE_ELEMENT
    ] // CONDITIONAL_CONSEQUENT
    , null // CONDITIONAL_ALTERNATE
    , 10 // CLOSE_ELEMENT
    ], FeedStoryUFISummary_ComputeFunction])]
  );
}

var UFIReactionTypes = {
  ["LIKE"]: 1,
  ["ordering"]: [1, 2, 13, 11, 12, 4, 5, 3, 10, 7, 8, 14, 15],
  ["NONE"]: 0,
  ["reactions"]: {
    "1": {
      ["class_name"]: "public/ufiReactionsIcons/like",
      ["color"]: "#4080ff",
      ["display_name"]: "Like",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "like",
      ["type"]: 1
    },
    "2": {
      ["class_name"]: "public/ufiReactionsIcons/love",
      ["color"]: "#f25268",
      ["display_name"]: "Love",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "love",
      ["type"]: 2
    },
    "3": {
      ["class_name"]: "public/ufiReactionsIcons/wow",
      ["color"]: "#f0ba15",
      ["display_name"]: "Wow",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "wow",
      ["type"]: 3
    },
    "4": {
      ["class_name"]: "public/ufiReactionsIcons/haha",
      ["color"]: "#f0ba15",
      ["display_name"]: "Haha",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "haha",
      ["type"]: 4
    },
    "5": {
      ["class_name"]: "public/ufiReactionsIcons/yay",
      ["color"]: "#f0ba15",
      ["display_name"]: "Yay",
      ["is_deprecated"]: true,
      ["is_visible"]: true,
      ["name"]: "yay",
      ["type"]: 5
    },
    "7": {
      ["class_name"]: "public/ufiReactionsIcons/sorry",
      ["color"]: "#f0ba15",
      ["display_name"]: "Sad",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "sorry",
      ["type"]: 7
    },
    "8": {
      ["class_name"]: "public/ufiReactionsIcons/anger",
      ["color"]: "#f7714b",
      ["display_name"]: "Angry",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "anger",
      ["type"]: 8
    },
    "10": {
      ["class_name"]: "public/ufiReactionsIcons/confused",
      ["color"]: "#f0ba15",
      ["display_name"]: "Confused",
      ["is_deprecated"]: true,
      ["is_visible"]: true,
      ["name"]: "confused",
      ["type"]: 10
    },
    "11": {
      ["class_name"]: "public/ufiReactionsIcons/dorothy",
      ["color"]: "#7e64c4",
      ["display_name"]: "Thankful",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "dorothy",
      ["type"]: 11
    },
    "12": {
      ["class_name"]: "public/ufiReactionsIcons/toto",
      ["color"]: "#EC7EBD",
      ["display_name"]: "Pride",
      ["is_deprecated"]: false,
      ["is_visible"]: true,
      ["name"]: "toto",
      ["type"]: 12
    },
    "13": {
      ["class_name"]: null,
      ["color"]: "#1d2129",
      ["display_name"]: "Selfie",
      ["is_deprecated"]: false,
      ["is_visible"]: false,
      ["name"]: "selfie",
      ["type"]: 13
    },
    "14": {
      ["class_name"]: "public/ufiReactionsIcons/flame",
      ["color"]: "#4080ff",
      ["display_name"]: "React",
      ["is_deprecated"]: false,
      ["is_visible"]: false,
      ["name"]: "flame",
      ["type"]: 14
    },
    "15": {
      ["class_name"]: "public/ufiReactionsIcons/plane",
      ["color"]: "#4080ff",
      ["display_name"]: "React",
      ["is_deprecated"]: false,
      ["is_visible"]: false,
      ["name"]: "plane",
      ["type"]: 15
    }
  }
};
var UFI2ReactionUtils = {
  ["checkReactionKey"]: function (viewerReactionKey) {
    if (viewerReactionKey && !UFIReactionTypes["reactions"][viewerReactionKey]) {
      return 0;
    }

    return viewerReactionKey || 0;
  }
};

function UFI2ActionLink_ComputeFunction // COMPUTE_FUNCTION
(children, showIcon) {
  var __cached__11;

  var showIcon = showIcon === undefined ? true : showIcon;
  __cached__11 = children({
    ["className"]: cx("UFI2ActionLink/link") + (showIcon ? " " + cx("UFI2ActionLink/withIcon") : "")
  });
  return [__cached__11];
}

function UFI2ActionLink() {
  return (// UFI2ActionLink OPCODES
    [0 // COMPONENT
    , "UFI2ActionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 62 // STATIC_PROP_CLASS_NAME
    , "UFI2ActionLink__root", 24 // REACT_NODE_TEMPLATE_FROM_FUNC_CALL
    , 0, 10 // CLOSE_ELEMENT
    ], UFI2ActionLink_ComputeFunction])]
  );
}

function UFI2ReactionLink_ComputeFunction // COMPUTE_FUNCTION
(children) {
  return [children];
}

function UFI2ReactionLink() {
  return (// UFI2ReactionLink OPCODES
    [0 // COMPONENT
    , "UFI2ReactionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [3 // ROOT_DYNAMIC_VALUE
    , 0], UFI2ReactionLink_ComputeFunction])]
  );
}

function UFIReactionIcon_ComputeFunction // COMPUTE_FUNCTION
(className, size) {
  var __cached__8;

  __cached__8 = joinClasses(cx("ufiReactionsIcons/root") + (size === "13" ? " " + cx("ufiReactionsIcons/13") : "") + (size === "16" ? " " + cx("ufiReactionsIcons/16") : "") + (size === "18" ? " " + cx("ufiReactionsIcons/18") : "") + (size === "48" ? " " + cx("ufiReactionsIcons/48") : "") + (size === "96" ? " " + cx("ufiReactionsIcons/96") : ""), className, cx("ufiReactions-dorothy-2017-v2/root") + (" " + cx("ufiReactions-toto-2017-v2/root")));
  return [__cached__8];
}

function UFIReactionIcon() {
  return (// UFIReactionIcon OPCODES
    [0 // COMPONENT
    , "UFIReactionIcon" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 0, 41 // ELEMENT_STATIC_CHILDREN_VALUE
    , 123, 10 // CLOSE_ELEMENT
    ], UFIReactionIcon_ComputeFunction])]
  );
}

UFIReactionIcon["defaultProps"] = {
  ["className"]: null,
  ["grayscale"]: false,
  ["size"]: "16"
};
var __hoisted__opcodes__6 = [20 // UNCONDITIONAL_TEMPLATE
, [8 // OPEN_ELEMENT_DIV
, 62 // STATIC_PROP_CLASS_NAME
, "UFI2ReactionActionLink__root", 60 // STATIC_PROP
, "data-testid", "UFI2ReactionLink/actionLink", 29 // REF_COMPONENT
, UFI2ReactionLink, 0 // COMPONENT_PROPS_ARRAY
, 10 // CLOSE_ELEMENT
], null // COMPUTE_FUNCTION
];

function UFI2ReactionActionLink_ComputeFunction // COMPUTE_FUNCTION
(className, feedback) {
  var __cached__13;

  var __cached__12;

  var viewerReactionKey = feedback != null ? feedback["viewer_feedback_reaction_info"] != null ? feedback["viewer_feedback_reaction_info"]["key"] : feedback["viewer_feedback_reaction_info"] : feedback;
  var reactionKey = UFI2ReactionUtils["checkReactionKey"](viewerReactionKey);
  var icon = void 0;

  if (__cached__12 = !reactionKey) {
    icon = null;
  } else if (__cached__13 = reactionKey && reactionKey !== UFIReactionTypes["LIKE"]) {
    icon = {};
  }

  (function (): React.Node {
    return [[__cached__12 ? null : !__cached__12 && __cached__13 ? createReactNode(__hoisted__opcodes__1, [[cx("UFI2ReactionActionLink/inlineUFIIcon"), "18"]]) : void 0]];
  });

  return [feedback != null ? feedback["can_viewer_react"] : feedback, [(_ref3: {
    className: string
  }) => createReactNode(__hoisted__opcodes__6, function (): React.Node {
    return [[__cached__12 ? null : !__cached__12 && __cached__13 ? createReactNode(__hoisted__opcodes__1, [[cx("UFI2ReactionActionLink/inlineUFIIcon"), "18"]]) : void 0]];
  }()), !icon]];
}

function UFI2ReactionActionLink() {
  return (// UFI2ReactionActionLink OPCODES
    [0 // COMPONENT
    , "UFI2ReactionActionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [30 // CONDITIONAL
    , 0, [29 // REF_COMPONENT
    , UFI2ActionLink, 1 // COMPONENT_PROPS_ARRAY
    ] // CONDITIONAL_CONSEQUENT
    , [2 // ROOT_STATIC_VALUE
    , null] // CONDITIONAL_ALTERNATE
    ], UFI2ReactionActionLink_ComputeFunction])]
  );
}

function UFI2AnswerActionLink() {
  return (// UFI2AnswerActionLink OPCODES
    [0 // COMPONENT
    , "UFI2AnswerActionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
  );
}

function UFI2CommentActionLink() {
  return (// UFI2CommentActionLink OPCODES
    [0 // COMPONENT
    , "UFI2CommentActionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
  );
}

function UFI2ShareActionLink() {
  return (// UFI2ShareActionLink OPCODES
    [0 // COMPONENT
    , "UFI2ShareActionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
  );
}

function getRendererStateFromProps(props) {
  return {};
}

type UFI2RootRendererProps = {
  feedbackSource: string,
  feedLocation: string,
  contextForFeedback: string,
  feedbackTargetID: string,
  linkedCommentId: string,
  feedback: FeedbackType,
  shareable_config: {
    misinformation_confirm_dialog_uri?: string,
    share_action_link_primer_attributes: {
      rel: string
    },
    share_action_link_uri: string,
    share_now_menu_uri: string,
  },
};
var __hoisted__opcodes__7 = [8 // OPEN_ELEMENT_DIV
, 62 // STATIC_PROP_CLASS_NAME
, "fbFeedStoryUFI__summaryAndActionsContainer", 29 // REF_COMPONENT
, FeedStoryUFISummary, 0 // COMPONENT_PROPS_ARRAY
, 8 // OPEN_ELEMENT_DIV
, 62 // STATIC_PROP_CLASS_NAME
, "fbFeedStoryUFI__actionLinks", 29 // REF_COMPONENT
, UFI2ReactionActionLink, 1 // COMPONENT_PROPS_ARRAY
, 30 // CONDITIONAL
, 2, [29 // REF_COMPONENT
, UFI2AnswerActionLink, null // COMPONENT_PROPS_ARRAY
] // CONDITIONAL_CONSEQUENT
, [29 // REF_COMPONENT
, UFI2CommentActionLink, null // COMPONENT_PROPS_ARRAY
] // CONDITIONAL_ALTERNATE
, 29 // REF_COMPONENT
, UFI2ShareActionLink, null // COMPONENT_PROPS_ARRAY
, 10 // CLOSE_ELEMENT
, 10 // CLOSE_ELEMENT
];

function FeedStoryUFIRootRenderer_ComputeFunction // COMPUTE_FUNCTION
(contextForFeedback, feedLocation, feedback, feedbackSource, feedbackTargetID, linkedCommentId, shareable_config) {
  var state = getRendererStateFromProps();
  return [[createReactNode(__hoisted__opcodes__7, [[feedback, feedbackTargetID, null], [void 0, feedback], feedback["is_q_and_a"]])]];
}

function FeedStoryUFIRootRenderer() {
  return (// FeedStoryUFIRootRenderer OPCODES
    [0 // COMPONENT
    , "FeedStoryUFIRootRenderer" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [12 // OPEN_FRAGMENT
    , 29 // REF_COMPONENT
    , UFI2RealtimeContainer, 0 // COMPONENT_PROPS_ARRAY
    , 29 // REF_COMPONENT
    , UFI2CommentsProvider, null // COMPONENT_PROPS_ARRAY
    , 13 // CLOSE_FRAGMENT
    ], FeedStoryUFIRootRenderer_ComputeFunction])]
  );
}

type UFI2RootProps = {
  feedbackSource: string,
  feedLocation: string,
  queryVariables: {
    contextForFeedback: string,
    feedbackTargetID: string,
    focusCommentID: string,
  },
  preloadedData: {
    data: {
      feedback: FeedbackType,
      shareable_config: {
        misinformation_confirm_dialog_uri?: string,
        share_action_link_primer_attributes: {
          rel: string
        },
        share_action_link_uri: string,
        share_now_menu_uri: string,
      },
    }
  },
};

function Component_ComputeFunction // COMPUTE_FUNCTION
(feedLocation, feedbackSource, preloadedData, queryVariables) {
  return [[queryVariables["contextForFeedback"], feedLocation, preloadedData["data"]["feedback"], feedbackSource, queryVariables["feedbackTargetID"], queryVariables["focusCommentID"], preloadedData["data"]["shareable_config"]]];
}

var Component = // Component OPCODES
[0 // COMPONENT
, "Component" // DISPLAY_NAME
, ["feedLocation", "feedbackSource", "preloadedData", "queryVariables"] // ROOT_PROPS_SHAPE
, createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
, [29 // REF_COMPONENT
, FeedStoryUFIRootRenderer, 0 // COMPONENT_PROPS_ARRAY
], Component_ComputeFunction])];
module["exports"] = Component;