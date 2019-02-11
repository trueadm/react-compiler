import { createVNode } from "react-compiler-runtime";
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

function OnVisible_ComputeFunction(children) {
  // return React.Children.only(children);
  return [children];
}

function ErrorBoundary_ComputeFunction(children, fallbackComponent) {
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

function UFI2ErrorBoundary_ComputeFunction(children, getFBLoggerErrorMessage) {
  return [[children, void 0]];
}

function UFI2CommentsProvider_ComputeFunction(children, feedback) {
  // TODO
  // var orderingMode = $UFI2CommentsRenderer_getOrderingMode();
  // var state = {
  // };
  // var availableCommentIDs = state.availableCommentIDs;
  // var isCommentsListExpanded = state.isCommentsListExpanded;
  // var visibleCommentsWindow = state.visibleCommentsWindow;
  // var totalCount =
  //   ((_ref9 = feedback) != null
  //     ? (_ref9 = _ref9.display_comments) != null
  //       ? _ref9.count
  //       : _ref9
  //     : _ref9) || 0;
  return [];
}

function UFI2ReactionsCount_ComputeFunction(feedback, feedbackTargetID) {
  var __cached__9;

  var i18n_reaction_count = feedback["i18n_reaction_count"];
  var important_reactors = feedback["important_reactors"];
  var viewer_current_actor = feedback["viewer_current_actor"];
  var viewer_feedback_reaction_info = feedback["viewer_feedback_reaction_info"];
  var reaction_count = feedback["reaction_count"];
  var actorID = feedback != null ? feedback["viewer_current_actor"] != null ? feedback["viewer_current_actor"]["id"] : feedback["viewer_current_actor"] : feedback;
  actorID || invariant(0, "UFI2ReactionsCount: Expected an actor ID");
  var reactionCount = reaction_count != null ? reaction_count["count"] : reaction_count;
  reactionCount != null || invariant(0, "UFI2ReactionsCount: Expected a reaction count");
  i18n_reaction_count || invariant(0, "UFI2ReactionsCount: Expected an i18n_reaction_count");

  if (reactionCount === 0) {
    return null;
  }

  var importantReactors = (important_reactors != null ? important_reactors["nodes"] : important_reactors) || [];
  var viewerReacted = viewer_feedback_reaction_info != null;
  var importantReactorsCount = viewerReacted ? importantReactors["length"] + 1 : importantReactors["length"];
  var tooltipIsNecessary = importantReactorsCount < reactionCount;

  var primerProps = __cached__9 = UFIReactionsProfileBrowserUtils["getPrimerProps"]({
    ["actorID"]: actorID,
    ["feedbackTargetID"]: feedbackTargetID
  });

  return [[__cached__9["ajaxify"], void 0, cx("UFI2ReactionsCount/root"), "UFI2ReactionsCount/root", void 0, void 0, __cached__9["href"], void 0, void 0, [createVNode(__vnode_tpl_5), createVNode(__vnode_tpl_6)], void 0, __cached__9["rel"], "button", void 0, void 0]];
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

function UFI2ReactionIconTooltipTitle_ComputeFunction(children) {
  return [children];
}

function AbstractLink_ComputeFunction(ajaxify, aria_disabled, aria_label, children, className, data_testid, href, linkRef, nofollow, noopener, onClick, rel, shimhash, tabIndex, target, useMetaReferrer, useRedirect) {
  var __cached__2;

  var outputHref = href;
  var outputRel = rel;

  if (useRedirect) {
    outputHref = href + shimhash || "";
  }

  if (nofollow) {
    outputRel = outputRel ? outputRel + " nofollow" : "nofollow";
  }

  if (noopener) {
    outputRel = outputRel ? outputRel + " noopener" : "noopener";
  }

  __cached__2 = outputHref["toString"]();
  return [ajaxify, aria_disabled, aria_label, data_testid, className, tabIndex, target, __cached__2, outputRel, children];
}

function parseHref(rawHref): Array<string, string> {
  var shimhash = null;
  return [rawHref, shimhash];
}

function Link_ComputeFunction(ajaxify, allowunsafehref, aria_disabled, aria_label, children, className, data_testid, rawHref, linkRef, onClick, rel, isSafeToSkipShim, tabIndex, target) {
  var parsed_href = parseHref(rawHref);
  var shimhash = parsed_href[1];
  return [[ajaxify, aria_disabled, aria_label, children, className, data_testid, parsed_href[0], linkRef, shimhash != null, shimhash !== null && target === "_blank", onClick, rel, parsed_href[1], tabIndex, target, false, shimhash != null]];
}

function AbstractButton_ComputeFunction(ajaxify, aria_label, className, data_testid, depressed, disabled, href, image, imageRight, label, labelIsHidden, rel, role, tabIndex, type) {
  var _className = cx("abstractButton/root") + (disabled ? " " + cx("public/abstractButton/disabled") : "") + (depressed ? " " + cx("public/abstractButton/depressed") : "");

  if (href) {
    var isDisabledButton = disabled && role === "button";
    joinClasses(className, _className);
    return [0, [ajaxify, void 0, isDisabledButton ? true : undefined, aria_label, [image, labelIsHidden ? createVNode(__vnode_tpl_0, [label]) : label, imageRight], joinClasses(className, _className), data_testid, href, void 0, null, rel, void 0, disabled ? -1 : tabIndex, void 0]];
  } else if (type && type !== "submit") {
    var __cached__3;

    __cached__3 = joinClasses(className, _className);
    return [1, ajaxify, aria_label, data_testid, rel, __cached__3, disabled, href, type, image, labelIsHidden, label, imageRight];
  } else {
    var __cached__4;

    __cached__4 = joinClasses(className, _className);
    return [2, ajaxify, aria_label, data_testid, rel, __cached__4, disabled, href, image, labelIsHidden, label, imageRight];
  }
}

function createTooltipPortal(content, container): null {
  return null;
}

function Tooltip_ComputeFunction(children, className, data_testid, display, tabIndex, tooltip) {
  return [display === "block", className, data_testid, tabIndex, tooltip !== null ? createTooltipPortal(tooltip) : null, children];
}

function LazyContentTooltip_ComputeFunction(children, className, contentRenderer, contentRendererProps, data_testid, errorMessage, placeholder, tabIndex) {
  return [[children, className, data_testid, "inline", tabIndex, placeholder]];
}

function UFI2TopReactions_ComputeFunction(className, feedback, feedbackTargetID) {
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

  function $UFI2TopReactions_renderLink(actorID: string, reactionEdge: Edge, reactionIndex: number): React.Node {
    var __cached__7;

    var __cached__5;

    var selectedReactionIndex = null;
    var i18nReactionCount = reactionEdge != null ? reactionEdge["i18n_reaction_count"] : reactionEdge;
    var i18nReactionName = reactionEdge != null ? reactionEdge["node"] != null ? reactionEdge["node"]["localized_name"] : reactionEdge["node"] : reactionEdge;
    var reactionType = reactionEdge != null ? reactionEdge["node"] != null ? reactionEdge["node"]["reaction_type"] : reactionEdge["node"] : reactionEdge;
    var reactionKey = getReactionKeyFromType(reactionType);

    var primerProps = __cached__5 = UFIReactionsProfileBrowserUtils["getPrimerProps"]({
      ["actorID"]: actorID,
      ["feedbackTargetID"]: feedbackTargetID,
      ["reactionKey"]: reactionKey
    });

    var reactionsNotFocused = selectedReactionIndex === null;
    var currentReactionIsFocused = selectedReactionIndex === reactionIndex;
    __cached__7 = fbt["_"]("Loading\u2026", null, {
      ["hash_key"]: "2Ct2DW"
    });
    fbt["_"]("{i18nReactionCount} {i18nReactionName}", [fbt["_param"]("i18nReactionCount", i18nReactionCount), fbt["_param"]("i18nReactionName", i18nReactionName)], {
      ["hash_key"]: "1yBDpL"
    });
    return [[createVNode(__vnode_tpl_2, [[__cached__5["ajaxify"], fbt["_"]("{i18nReactionCount} {i18nReactionName}", [fbt["_param"]("i18nReactionCount", i18nReactionCount), fbt["_param"]("i18nReactionName", i18nReactionName)], {
      ["hash_key"]: "1yBDpL"
    }), cx("UFI2TopReactions/link"), void 0, void 0, void 0, __cached__5["href"], void 0, void 0, [createVNode(__vnode_tpl_1, [[cx("UFI2TopReactions/icon"), "16"]])], void 0, __cached__5["rel"], "button", reactionsNotFocused && reactionIndex === 0 || currentReactionIsFocused ? 0 : -1, void 0]]), cx("UFI2TopReactions/tooltip"), null, {
      ["feedbackTargetID"]: feedbackTargetID,
      ["i18nReactionName"]: i18nReactionName,
      ["reactionType"]: reactionType
    }, "UFI2TopReactions/tooltip_" + reactionType, void 0, createVNode(__vnode_tpl_3, [[reactionEdge != null ? reactionEdge["node"] != null ? reactionEdge["node"]["localized_name"] : reactionEdge["node"] : reactionEdge], __cached__7]), -1]];
  }

  __cached__1 = joinClasses(cx("UFI2TopReactions/root"), className);
  __cached__0 = fbt["_"]("See who reacted to this", null, {
    ["hash_key"]: "30H01m"
  });
  return [__cached__0, __cached__1, topThreeReactions["map"](function (edge: Edge, ii: number): React.Node {
    var __cached__8;

    __cached__8 = $UFI2TopReactions_renderLink(actorID, edge, ii);
    return createVNode([8, [12, LazyContentTooltip, 0], 0], [__cached__8], null);
  })];
}

function UFI2RealtimeContainer_ComputeFunction(children) {
  return [[children]];
}

function FeedStoryUFISummary_ComputeFunction(feedback, feedbackTargetID, onClickCommentsCount) {
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

  return [reaction_count != null ? reaction_count["count"] : reaction_count, [createVNode(__vnode_tpl_4, [[cx("fbFeedStoryUFI/topReactions"), feedback, feedbackTargetID]]), void 0], [createVNode(__vnode_tpl_7, [[feedback, feedbackTargetID]]), void 0]];
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
var REACTIONS = UFIReactionTypes["reactions"];
var UFI2ReactionUtils = {
  ["checkReactionKey"]: function (viewerReactionKey) {
    if (viewerReactionKey && !UFIReactionTypes["reactions"][viewerReactionKey]) {
      return 0;
    }

    return viewerReactionKey || 0;
  }
};

function UFI2ActionLink_ComputeFunction(children, showIcon) {
  var __cached__10;

  var _showIcon = showIcon === undefined ? true : showIcon;

  __cached__10 = children({
    ["className"]: cx("UFI2ActionLink/link") + (_showIcon ? " " + cx("UFI2ActionLink/withIcon") : "")
  });
  return [__cached__10];
}

function UFIReactionsMenu() {
  return null;
}

function AWithFocusEvents_ComputeFunction(aria_pressed, children, className, data_testid, href, onKeyboardFocus, onMouseFocus, role, style, tabIndex) {
  return [aria_pressed, className, data_testid, href, role, style["color"], tabIndex];
}

function UFI2ReactionLink_ComputeFunction(children, className, feedback) {
  var viewerReactionKey = feedback != null ? feedback["viewer_feedback_reaction_info"] != null ? feedback["viewer_feedback_reaction_info"]["key"] : feedback["viewer_feedback_reaction_info"] : feedback;
  var reactionKey = UFI2ReactionUtils["checkReactionKey"](viewerReactionKey);
  var label = void 0;
  var textColor = void 0;

  if (!reactionKey) {
    label = REACTIONS[UFIReactionTypes["LIKE"]]["display_name"];
  } else {
    var _REACTIONS$reactionKe = REACTIONS[reactionKey];
    var display_name = _REACTIONS$reactionKe["display_name"];
    var color = _REACTIONS$reactionKe["color"];
    label = display_name;
    textColor = color;
  }

  joinClasses(!!reactionKey ? cx("UFI2ReactionLink/hasReacted") : "", className);
  return [[!!reactionKey, [children, label], joinClasses(!!reactionKey ? cx("UFI2ReactionLink/hasReacted") : "", className), "UFI2ReactionLink", "#", void 0, void 0, "button", {
    ["color"]: textColor
  }, 0]];
}

function UFIReactionIcon_ComputeFunction(className, size) {
  var __cached__6;

  __cached__6 = joinClasses(cx("ufiReactionsIcons/root") + (size === "13" ? " " + cx("ufiReactionsIcons/13") : "") + (size === "16" ? " " + cx("ufiReactionsIcons/16") : "") + (size === "18" ? " " + cx("ufiReactionsIcons/18") : "") + (size === "48" ? " " + cx("ufiReactionsIcons/48") : "") + (size === "96" ? " " + cx("ufiReactionsIcons/96") : ""), className, cx("ufiReactions-dorothy-2017-v2/root") + (" " + cx("ufiReactions-toto-2017-v2/root")));
  return [__cached__6];
}

function UFI2ReactionActionLink_ComputeFunction(className, feedback) {
  var __cached__12;

  var __cached__11;

  var viewerReactionKey = feedback != null ? feedback["viewer_feedback_reaction_info"] != null ? feedback["viewer_feedback_reaction_info"]["key"] : feedback["viewer_feedback_reaction_info"] : feedback;
  var reactionKey = UFI2ReactionUtils["checkReactionKey"](viewerReactionKey);
  var icon = void 0;

  if (__cached__11 = !reactionKey) {
    icon = null;
  } else if (__cached__12 = reactionKey && reactionKey !== UFIReactionTypes["LIKE"]) {
    icon = {};
  }

  return [feedback != null ? feedback["can_viewer_react"] : feedback, [(_ref3: {
    className: string
  }) => createVNode(__vnode_tpl_9, function (): React.Node {
    var actionLinkClassName = _ref3["className"];
    joinClasses((reactionKey === UFIReactionTypes["LIKE"] ? cx("UFI2ReactionActionLink/liked") : "") + (" " + cx("UFI2ReactionActionLink/link")) + (!reactionKey ? " " + cx("UFI2ReactionActionLink/notLiked") : ""), actionLinkClassName, className);
    return [[__cached__11 ? null : !__cached__11 && __cached__12 ? createVNode(__vnode_tpl_8, [[cx("UFI2ReactionActionLink/inlineUFIIcon"), "18"]]) : void 0, joinClasses((reactionKey === UFIReactionTypes["LIKE"] ? cx("UFI2ReactionActionLink/liked") : "") + (" " + cx("UFI2ReactionActionLink/link")) + (!reactionKey ? " " + cx("UFI2ReactionActionLink/notLiked") : ""), actionLinkClassName, className), feedback]];
  }()), !icon]];
}

function ShimButton_ComputeFunction(children, className, form, inline, keyActivationToClickEvent, keyActivationToClickRef, onClick, onRef, pressed) {
  if (form === "link") {
    return [0, className, onClick, pressed, children];
  }

  return [1, inline, className, onClick, pressed, children];
}

function UFI2AnswerActionLink_ComputeFunction(className, feedback, onClick) {
  return [feedback && feedback["can_viewer_comment"] && feedback["is_q_and_a"], [(_ref: {
    className: string
  }) => createVNode(__vnode_tpl_10, function (): React.Node {
    var actionLinkClassName = _ref["className"];
    joinClasses(cx("UFI2AnswerActionLink/root"), actionLinkClassName, className);
    fbt["_"]("Answer", null, {
      ["hash_key"]: "7wbRt"
    });
    return [[fbt["_"]("Answer", null, {
      ["hash_key"]: "7wbRt"
    }), joinClasses(cx("UFI2AnswerActionLink/root"), actionLinkClassName, className), void 0, void 0, void 0, void 0, onClick, void 0, void 0]];
  }()), void 0]];
}

function UFI2CommentActionLink_ComputeFunction(className, feedback, onClick) {
  return [feedback && feedback["can_viewer_comment"], [(_ref: {
    className: string
  }) => createVNode(__vnode_tpl_11, function (): React.Node {
    var actionLinkClassName = _ref["className"];
    joinClasses(cx("UFI2CommentActionLink/root"), actionLinkClassName, className);
    fbt["_"]("Comment", null, {
      ["hash_key"]: "2MdL3e"
    });
    return [[fbt["_"]("Comment", null, {
      ["hash_key"]: "2MdL3e"
    }), joinClasses(cx("UFI2CommentActionLink/root"), actionLinkClassName, className), void 0, void 0, void 0, void 0, onClick, void 0, void 0]];
  }()), void 0]];
}

function UFI2ShareActionLink_ComputeFunction(className, feedback, feedbackTargetID, shareableConfig) {
  var state = {
    ["focusOnInit"]: false,
    ["interacted"]: false,
    ["isLoading"]: false,
    ["misinformationDialogConfirmed"]: false,
    ["openAfterMisinformationConfirmed"]: false,
    ["openOnInit"]: false
  };
  var _state = state;
  var misinformationDialogConfirmed = _state["misinformationDialogConfirmed"];

  if (!shareableConfig || !shareableConfig["share_action_link_uri"]) {
    return null;
  }

  var actorID = feedback != null ? feedback["viewer_current_actor"] != null ? feedback["viewer_current_actor"]["id"] : feedback["viewer_current_actor"] : feedback;
  var misinformationConfirmDialogURI = shareableConfig != null ? shareableConfig["misinformation_confirm_dialog_uri"] : shareableConfig;

  if (misinformationConfirmDialogURI && !misinformationDialogConfirmed) {
    return [0, [(_ref7: {
      className: string
    }) => createVNode(__vnode_tpl_13, function (): React.Node {
      return [[_ref7["className"], void 0, void 0, void 0]];
    }()), void 0]];
  }

  if (actorID) {}

  return [1, [(_ref9: {
    className: string
  }) => createVNode(__vnode_tpl_14, function (): React.Node {
    var __cached__17;

    __cached__17 = joinClasses(cx("UFI2ShareActionLink/root"), className);
    return [__cached__17, [_ref9["className"], void 0, false, void 0]];
  }()), void 0]];
}

function $ShareLink_getQualifiedHref(props: {
  href: string | null
}): null | string {
  var href = props["href"];

  if (!href) {
    return null;
  }

  return href;
}

function ShareLink_ComputeFunction(className, href, isLoading, rel) {
  var __cached__14;

  var __cached__13;

  var props = {
    ["href"]: href
  };
  __cached__14 = fbt["_"]("Share", null, {
    ["hash_key"]: "gaj3j"
  });
  __cached__13 = joinClasses(cx("UFI2ShareActionLink/link"), className);
  return [$ShareLink_getQualifiedHref(props) || "#", __cached__13, rel, "work user" ? fbt["_"]("Send this to coworkers or post it on your timeline.", null, {
    ["hash_key"]: "2zccV8"
  }) : fbt["_"]("Send this to friends or post it on your timeline.", null, {
    ["hash_key"]: "Y9LzE"
  }), __cached__14, isLoading === true, ["light", cx("UFI2ShareActionLink/spinner"), void 0, false, "small"]];
}

var USE_CSS = true;

function XUISpinner_ComputeFunction(background, className, paused, showOnAsync, size) {
  var __cached__16;

  var __cached__15;

  var imageClass = cx("img") + (" " + cx("xuiSpinner/root")) + (size == "small" ? " " + cx("xuiSpinner/small") : "") + (size == "large" ? " " + cx("xuiSpinner/large") : "") + (background == "light" ? " " + cx("xuiSpinner/light") : "") + (background == "dark" ? " " + cx("xuiSpinner/dark") : "") + (showOnAsync ? " " + cx("xuiSpinner/showOnAsync") : "") + (!USE_CSS ? " " + cx("xuiSpinner/animatedGIF") : "") + (USE_CSS && paused ? " " + cx("xuiSpinner/pauseAnimation") : "");
  __cached__16 = fbt["_"]("Loading...", null, {
    ["hash_key"]: "2pEOeS"
  });
  __cached__15 = joinClasses(className, imageClass);
  return [[createVNode(__vnode_tpl_12, [__cached__15, __cached__16])]];
}

function LoadingMarker_ComputeFunction(children) {
  return [children];
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

function FeedStoryUFIRootRenderer_ComputeFunction(contextForFeedback, feedLocation, feedback, feedbackSource, feedbackTargetID, linkedCommentId, shareable_config) {
  var state = getRendererStateFromProps();
  return [[createVNode(__vnode_tpl_15, [[feedback, feedbackTargetID, null], [void 0, feedback], feedback["is_q_and_a"], [void 0, feedback, null], [void 0, feedback, null], [void 0, feedback, feedbackTargetID, shareable_config]])]];
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

function Component_ComputeFunction(feedLocation, feedbackSource, preloadedData, queryVariables) {
  return [[queryVariables["contextForFeedback"], feedLocation, preloadedData["data"]["feedback"], feedbackSource, queryVariables["feedbackTargetID"], queryVariables["focusCommentID"], preloadedData["data"]["shareable_config"]]];
}

const OnVisible = [1, OnVisible_ComputeFunction, [13, 0]];
const UFI2RealtimeContainer = [1, UFI2RealtimeContainer_ComputeFunction, [12, OnVisible, 0]];
const ErrorBoundary = [1, ErrorBoundary_ComputeFunction, [13, 0]];
const UFI2ErrorBoundary = [1, UFI2ErrorBoundary_ComputeFunction, [12, ErrorBoundary, 0]];
const Tooltip = [1, Tooltip_ComputeFunction, [6, 0, [1154, "div", ["className", 0, 1, "data-testid", 0, 2, "tabindex", 0, 3], [13, 5]], [1154, "span", ["className", 0, 1, "data-testid", 0, 2, "tabindex", 0, 3], [13, 5]]]];
const LazyContentTooltip = [1, LazyContentTooltip_ComputeFunction, [12, Tooltip, 0]];
const AbstractLink = [1, AbstractLink_ComputeFunction, [1154, "a", ["ajaxify", 0, 0, "aria-disabled", 0, 1, "aria-label", 0, 2, "data-testid", 0, 3, "className", 0, 4, "tabindex", 0, 5, "target", 0, 6, "href", 0, 7, "rel", 0, 8], [13, 9]]];
const Link = [1, Link_ComputeFunction, [12, AbstractLink, 0]];
const AbstractButton = [1, AbstractButton_ComputeFunction, [14, 0, [12, Link, 1], 1, [2178, "button", ["ajaxify", 0, 1, "aria-label", 0, 2, "data-testid", 0, 3, "rel", 0, 4, "className", 0, 5, "disabled", 2, 6, "href", 0, 7, "type", 0, 8], [[13, 9], [6, 10, [1090, "span", ["className", 0, "accessible_elem"], [13, 11]], [13, 11]], [13, 12]]], 2, [2242, "button", ["type", 0, "submit", "value", 32, "1"], ["ajaxify", 0, 1, "aria-label", 0, 2, "data-testid", 0, 3, "rel", 0, 4, "className", 0, 5, "disabled", 2, 6, "href", 0, 7], [[13, 8], [6, 9, [1090, "span", ["className", 0, "accessible_elem"], [13, 10]], [13, 10]], [13, 11]]]]];
const UFIReactionIcon = [1, UFIReactionIcon_ComputeFunction, [4226, "span", ["className", 0, 0], "123"]];
const UFI2ReactionIconTooltipTitle = [1, UFI2ReactionIconTooltipTitle_ComputeFunction, [8258, "div", ["className", 0, "UFI2ReactionIconTooltipTitle__root"], 0]];
const UFI2TopReactions = [1, UFI2TopReactions_ComputeFunction, [1218, "span", ["role", 0, "toolbar"], ["aria-label", 0, 0, "className", 0, 1], [11, 2]]];
const UFI2ReactionsCount = [1, UFI2ReactionsCount_ComputeFunction, [12, AbstractButton, 0]];
const FeedStoryUFISummary = [1, FeedStoryUFISummary_ComputeFunction, [1090, "div", ["className", 0, "fbFeedStoryUFI__feedbackSummary", "data-testid", 0, "fbFeedStoryUFI/feedbackSummary"], [6, 0, [2114, "div", ["className", 0, "fbFeedStoryUFI__reactionsSummary"], [[12, UFI2ErrorBoundary, 1], [12, UFI2ErrorBoundary, 2]]], [32772, null]]]];
const UFI2ActionLink = [1, UFI2ActionLink_ComputeFunction, [1090, "span", ["className", 0, "UFI2ActionLink__root"], [13, 0]]];
const AWithFocusEvents = [1, AWithFocusEvents_ComputeFunction, [642, "a", ["aria-pressed", 0, 0, "className", 0, 1, "data-testid", 0, 2, "href", 0, 3, "role", 0, 4, "tabindex", 0, 6], ["color", 5]]];
const UFI2ReactionLink = [1, UFI2ReactionLink_ComputeFunction, [5, [[12, AWithFocusEvents, 0], [32772, null]]]];
const UFI2ReactionActionLink = [1, UFI2ReactionActionLink_ComputeFunction, [6, 0, [12, UFI2ActionLink, 1], [32772, null]]];
const ShimButton = [1, ShimButton_ComputeFunction, [14, 0, [8386, "a", ["role", 0, "button"], ["className", 0, 1, "click", 1, 2, "aria-pressed", 0, 3], 4], 1, [6, 1, [8386, "span", ["role", 0, "button"], ["className", 0, 2, "click", 1, 3, "aria-pressed", 0, 4], 5], [8386, "div", ["role", 0, "button"], ["className", 0, 2, "click", 1, 3, "aria-pressed", 0, 4], 5]]]];
const UFI2AnswerActionLink = [1, UFI2AnswerActionLink_ComputeFunction, [6, 0, [12, UFI2ActionLink, 1], [32772, null]]];
const UFI2CommentActionLink = [1, UFI2CommentActionLink_ComputeFunction, [6, 0, [12, UFI2ActionLink, 1], [32772, null]]];
const LoadingMarker = [1, LoadingMarker_ComputeFunction, [13, 0]];
const XUISpinner = [1, XUISpinner_ComputeFunction, [12, LoadingMarker, 0]];
const ShareLink = [1, ShareLink_ComputeFunction, [2242, "a", ["data-ft", 0, "{ &quot;tn&quot;: &quot;dummy&quot;, &quot;type&quot;: 25 }", "role", 0, "button", "tabindex", 0, 0], ["href", 0, 0, "className", 0, 1, "rel", 0, 2, "title", 0, 3], [[3, 4], [6, 5, [12, XUISpinner, 6], [32772, null]]]]];
const UFI2ShareActionLink = [1, UFI2ShareActionLink_ComputeFunction, [14, 0, [12, UFI2ActionLink, 1], 1, [12, UFI2ActionLink, 1]]];
const FeedStoryUFIRootRenderer = [1, FeedStoryUFIRootRenderer_ComputeFunction, [5, [[12, UFI2RealtimeContainer, 0], [32772, null]]]];
const __vnode_tpl_15 = [2114, "div", ["className", 0, "fbFeedStoryUFI__summaryAndActionsContainer"], [[12, FeedStoryUFISummary, 0], [2114, "div", ["className", 0, "fbFeedStoryUFI__actionLinks"], [[12, UFI2ReactionActionLink, 1], [6, 2, [12, UFI2AnswerActionLink, 3], [12, UFI2CommentActionLink, 4]], [12, UFI2ShareActionLink, 5]]]]];
const __vnode_tpl_4 = [12, UFI2TopReactions, 0];
const __vnode_tpl_7 = [12, UFI2ReactionsCount, 0];
const __vnode_tpl_1 = [12, UFIReactionIcon, 0];
const __vnode_tpl_2 = [12, AbstractButton, 0];
const __vnode_tpl_3 = [2050, "div", [[12, UFI2ReactionIconTooltipTitle, 0], [3, 1]]];
const __vnode_tpl_0 = [1090, "span", ["className", 0, "accessible_elem"], [13, 0]];
const __vnode_tpl_5 = [66, "span", ["aria-hidden", 0, true, "className", 0, "UFI2ReactionsCount__countOnlySentence"]];
const __vnode_tpl_6 = [66, "span", ["className", 0, "UFI2ReactionsCount__sentence foo UFI2ReactionsCount__sentenceWithSocialContext", "data-testid", 0, "UFI2ReactionsCount/sentenceWithSocialContext"]];
const __vnode_tpl_8 = [12, UFIReactionIcon, 0];
const __vnode_tpl_9 = [1090, "div", ["className", 0, "UFI2ReactionActionLink__root", "data-testid", 0, "UFI2ReactionLink/actionLink"], [12, UFI2ReactionLink, 0]];
const __vnode_tpl_10 = [12, ShimButton, 0];
const __vnode_tpl_11 = [12, ShimButton, 0];
const __vnode_tpl_13 = [12, ShareLink, 0];
const __vnode_tpl_14 = [1154, "span", ["className", 0, 0], [12, ShareLink, 1]];
const __vnode_tpl_12 = [194, "span", ["role", 0, "progressbar", "aria-busy", 0, "true", "aria-valuemin", 0, "0", "aria-valuemax", 0, "100"], ["className", 0, 0, "aria-valuetext", 0, 1]];
const Component = [0, ["feedLocation", "feedbackSource", "preloadedData", "queryVariables"], Component_ComputeFunction, [12, FeedStoryUFIRootRenderer, 0]];
module["exports"] = Component;