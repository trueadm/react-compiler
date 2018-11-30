import { createReactNode, createTemplateNode } from "react-compiler-runtime";
// props_from_file:tests/create-element/complex/complex.json
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

function UFI2TopReactions_ComputeFunction // COMPUTE_FUNCTION
(className, feedback) {
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

  function $UFI2TopReactions_renderLink(): React.Node {
    return [];
  }

  __cached__1 = joinClasses(cx("UFI2TopReactions/root"), className);
  __cached__0 = fbt["_"]("See who reacted to this", null, {
    ["hash_key"]: "30H01m"
  });
  return [__cached__0, __cached__1, topThreeReactions];
}

function UFI2TopReactions() {
  return (// UFI2TopReactions OPCODES
    [0 // COMPONENT
    , "UFI2TopReactions" // DISPLAY_NAME
    , createTemplateNode([22 // TEMPLATE
    , [6 // OPEN_ELEMENT
    , "foo", 61 // DYNAMIC_PROP
    , "aria-label", 0, 0, 63 // DYNAMIC_PROP_CLASS_NAME
    , 0, 1, 60 // STATIC_PROP
    , "role", "toolbar", 46 // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE
    , 2, [20 // UNCONDITIONAL_TEMPLATE
    , [9 // OPEN_ELEMENT_SPAN
    , 41 // ELEMENT_STATIC_CHILDREN_VALUE
    , "123", 10 // CLOSE_ELEMENT
    ], null // COMPUTE_FUNCTION
    ] // ARRAY_MAP_OPCODES
    , null // ARRAY_MAP_COMPUTE_FUNCTION
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

var __hoisted__opcodes__0 = [29 // REF_COMPONENT
, UFI2TopReactions, 0 // COMPONENT_PROPS_ARRAY
];
var __hoisted__opcodes__1 = [29 // REF_COMPONENT
, UFI2ReactionsCount, null // COMPONENT_PROPS_ARRAY
];

function FeedStoryUFISummary_ComputeFunction // COMPUTE_FUNCTION
(feedback, feedbackTargetID, onClickCommentsCount) {
  var _ref, _ref2, _ref3, _ref4;

  var can_show_seen_by = feedback["can_show_seen_by"];
  var comment_count = feedback["comment_count"];
  var reaction_count = feedback["reaction_count"];
  var seen_by_count = feedback["seen_by_count"];
  var share_count = feedback["share_count"];
  var viewCount = feedback["video_view_count"];
  var seenByCount = ((_ref = seen_by_count) != null ? _ref["count"] : _ref) || 0;
  var canShowSeenBy = can_show_seen_by === true && seenByCount > 0;
  var commentsCount = (_ref2 = comment_count) != null ? _ref2["total_count"] : _ref2;
  var reactionsCount = (_ref3 = reaction_count) != null ? _ref3["count"] : _ref3;
  var sharesCount = (_ref4 = share_count) != null ? _ref4["count"] : _ref4;

  if (!canShowSeenBy && !commentsCount && !reactionsCount && !sharesCount && !viewCount) {
    return null;
  }

  cx("fbFeedStoryUFI/topReactions");
  return [(_ref3 = reaction_count) != null ? _ref3["count"] : _ref3, [createReactNode(__hoisted__opcodes__0, [[cx("fbFeedStoryUFI/topReactions"), feedback]]), void 0]];
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
    , UFI2ErrorBoundary, [createReactNode(__hoisted__opcodes__1), void 0] // COMPONENT_PROPS_ARRAY
    , 10 // CLOSE_ELEMENT
    ] // CONDITIONAL_CONSEQUENT
    , null // CONDITIONAL_ALTERNATE
    , 10 // CLOSE_ELEMENT
    ], FeedStoryUFISummary_ComputeFunction])]
  );
}

function UFI2ReactionActionLink() {
  return (// UFI2ReactionActionLink OPCODES
    [0 // COMPONENT
    , "UFI2ReactionActionLink" // DISPLAY_NAME
    , createTemplateNode([20 // UNCONDITIONAL_TEMPLATE
    , [2 // ROOT_STATIC_VALUE
    , null], null // COMPUTE_FUNCTION
    ])]
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
var __hoisted__opcodes__2 = [8 // OPEN_ELEMENT_DIV
, 62 // STATIC_PROP_CLASS_NAME
, "fbFeedStoryUFI__summaryAndActionsContainer", 29 // REF_COMPONENT
, FeedStoryUFISummary, 0 // COMPONENT_PROPS_ARRAY
, 8 // OPEN_ELEMENT_DIV
, 62 // STATIC_PROP_CLASS_NAME
, "fbFeedStoryUFI__actionLinks", 29 // REF_COMPONENT
, UFI2ReactionActionLink, null // COMPONENT_PROPS_ARRAY
, 30 // CONDITIONAL
, 1, [29 // REF_COMPONENT
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
  return [[createReactNode(__hoisted__opcodes__2, [[feedback, feedbackTargetID, null], feedback["is_q_and_a"]])]];
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