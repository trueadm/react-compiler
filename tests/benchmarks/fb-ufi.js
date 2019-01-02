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
    edges: Array<Edge>,
  },
};

const React = require("react");
const cx = require("cx");
const fbt = require("fbt");

function joinClasses(className): string {
  var newClassName = className || "";
  for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }
  var argLength = classes.length;

  for (var index = 0; index < argLength; index++) {
    var nextClass = classes[index];
    if (nextClass != null && nextClass !== "") {
      newClassName = (newClassName ? newClassName + " " : "") + nextClass;
    }
  }
  return newClassName;
}

function eprintf(errorMessage) {
  for (var _len = arguments.length, rawArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rawArgs[_key - 1] = arguments[_key];
  }
  var args = rawArgs.map(function(arg) {
    return String(arg);
  });
  var expectedLength = errorMessage.split("%s").length - 1;

  if (expectedLength !== args.length) {
    return eprintf("eprintf args number mismatch: %s", JSON.stringify([errorMessage].concat(args)));
  }

  var index = 0;
  return errorMessage.replace(/%s/g, function() {
    return String(args[index++]);
  });
}

function ex(format) {
  for (var _len = arguments.length, rawArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rawArgs[_key - 1] = arguments[_key];
  }
  var args = rawArgs.map(function(arg) {
    return String(arg);
  });
  var expectedLength = format.split("%s").length - 1;
  if (expectedLength !== args.length) {
    return ex("ex args number mismatch: %s", JSON.stringify([format].concat(args)));
  }

  if (false) {
    return eprintf.call.apply(eprintf, [null, format].concat(args));
  } else {
    return ex._prefix + JSON.stringify([format].concat(args)) + ex._suffix;
  }
}

ex._prefix = "<![EX[";
ex._suffix = "]]>";

var printingFunction = ex;

function invariant(condition, format) {
  if (!condition) {
    var error = void 0;
    if (format === undefined) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment " +
          "for the full error message and additional helpful warnings.",
      );
    } else {
      for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
      }
      error = new Error(printingFunction.apply(undefined, [format].concat(params)));

      error.name = "Invariant Violation";

      error.messageWithParams = [format].concat(params);
    }

    error.framesToPop = 1;
    /*throw*/ error;
  }
}

function OnVisible({ children }: { children: React.Node }) {
  // return React.Children.only(children);
  return children;
}

function ErrorBoundary({
  children,
  fallbackComponent,
}: {
  children: React.Node,
  fallbackComponent?: () => React.Node,
}) {
  const state = {};
  const error = state.error;
  const moduleName = state.moduleName;
  if (error) {
    // TODO
    // var FallbackComponent = this.props.fallbackComponent;
    // var content = null;
    // if (FallbackComponent) {
    //   content = React.createElement(FallbackComponent, {
    //     error: error,
    //     moduleName: moduleName
    //   });
    // }
    // return React.createElement(ErrorMarker, null, content);
  }

  // TODO
  // return React.Children.only(this.props.children);
  return children;
}

function UFI2ErrorBoundary({
  children,
  getFBLoggerErrorMessage,
  ...otherProps
}: {
  children: React.Node,
  getFBLoggerErrorMessage?: () => void,
}) {
  return React.createElement(ErrorBoundary, otherProps, children);
}

function UFI2CommentsProvider({ children, feedback }) {
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
  return null
}

function UFI2ReactionsCount({ feedback, feedbackTargetID }: { feedback: FeedbackType, feedbackTargetID: string }) {
  var i18n_reaction_count = feedback.i18n_reaction_count;
  var important_reactors = feedback.important_reactors;
  var viewer_current_actor = feedback.viewer_current_actor;
  var viewer_feedback_reaction_info = feedback.viewer_feedback_reaction_info;
  var reaction_count = feedback.reaction_count;
  var actorID =
    feedback != null
      ? feedback.viewer_current_actor != null
        ? feedback.viewer_current_actor.id
        : feedback.viewer_current_actor
      : feedback;
  actorID || invariant(0, "UFI2ReactionsCount: Expected an actor ID");
  var reactionCount = reaction_count != null ? reaction_count.count : reaction_count;

  reactionCount != null || invariant(0, "UFI2ReactionsCount: Expected a reaction count");

  i18n_reaction_count || invariant(0, "UFI2ReactionsCount: Expected an i18n_reaction_count");

  if (reactionCount === 0) {
    return null;
  }

  var actorName = viewer_current_actor != null ? viewer_current_actor.name : viewer_current_actor;
  var importantReactors = (important_reactors != null ? important_reactors.nodes : important_reactors) || [];
  var viewerReacted = viewer_feedback_reaction_info != null;
  var importantReactorsCount = viewerReacted ? importantReactors.length + 1 : importantReactors.length;

  var tooltipIsNecessary = importantReactorsCount < reactionCount;
  var Tooltip = tooltipIsNecessary ? LazyContentTooltip : NoopTooltip;
  var tooltipProps = tooltipIsNecessary
    ? {
        contentRenderer: null,
        contentRendererProps: {
          feedbackTargetID: feedbackTargetID,
          reactionCount: reactionCount,
        },
      }
    : {};
  var primerProps = UFIReactionsProfileBrowserUtils.getPrimerProps({
    actorID: actorID,
    feedbackTargetID: feedbackTargetID,
  });

  return React.createElement(
    AbstractButton,
    Object.assign({}, primerProps, {
      className: cx("UFI2ReactionsCount/root"),
      "data-testid": "UFI2ReactionsCount/root",
      label: [
        React.createElement(
          "span",
          {
            "aria-hidden": true,
            className: cx("UFI2ReactionsCount/countOnlySentence"),
            key: "count-sentence",
          },

          // React.createElement(
          //   Tooltip,
          //   Object.assign(
          //     {
          //       className: cx("UFI2ReactionsCount/sentence"),
          //     },

          //     tooltipProps,
          //   ),

          //   i18n_reaction_count,
          // ),
        ),

        React.createElement(
          "span",
          {
            className: cx("UFI2ReactionsCount/sentence", "foo", "UFI2ReactionsCount/sentenceWithSocialContext"),

            "data-testid": "UFI2ReactionsCount/sentenceWithSocialContext",
            key: "social-sentence",
          },

          // React.createElement(
          //   Tooltip,
          //   tooltipProps,
          //   React.createElement(SentenceWithSocialContext, {
          //     actorName: actorName,
          //     i18nReactionCount: i18n_reaction_count,
          //     importantReactors: importantReactors,
          //     reactionCount: reactionCount,
          //     viewerReacted: viewerReacted,
          //   }),
          // ),
        ),
      ],

      onClick: this.$UFI2ReactionsCount_onClick,
      role: "button",
    }),
  );
}

var UFIReactionsProfileBrowserUtils = {
  getDialogURI: function getDialogURI(_ref) {
    var actorID = _ref.actorID;
    var feedbackTargetID = _ref.feedbackTargetID;
    var reactionKey = _ref.reactionKey;
    return "dialog_uri";
  },

  getPageURI: function getPageURI(_ref2) {
    var actorID = _ref2.actorID;
    var feedbackTargetID = _ref2.feedbackTargetID;
    return "page_uri";
  },

  getPrimerProps: function getPrimerProps(args): { ajaxify: string, href: string, rel: string } {
    var pageURI = UFIReactionsProfileBrowserUtils.getPageURI(args);
    var dialogURI = UFIReactionsProfileBrowserUtils.getDialogURI(args);
    return {
      ajaxify: dialogURI,
      href: pageURI,
      rel: "dialog",
    };
  },
};

function getReactionKeyFromType(type): string {
  return "key";
}

function UFI2ReactionIconTooltipTitle({ children }: { children: string }) {
  return React.createElement("div", { className: cx("UFI2ReactionIconTooltipTitle/root") }, children);
}

function AbstractLink({
  href,
  linkRef,
  nofollow,
  noopener,
  onClick,
  rel,
  shimhash,
  useMetaReferrer,
  useRedirect,
  ...otherProps
}: {
  ajaxify: string,
  "aria-disabled": string,
  "aria-label": string,
  children: Array<React.Node>,
  "data-testid": string,
  className: string,
  href: string,
  linkRef: string,
  nofollow: boolean,
  noopener: boolean,
  onClick: null | (() => void),
  rel?: string,
  shimhash: null | string,
  tabIndex: number,
  target: string,
  useRedirect: boolean,
  useMetaReferrer: boolean,
}) {
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

  return React.createElement(
    "a",
    Object.assign({}, otherProps, {
      href: outputHref.toString(),
      rel: outputRel,
      ref: linkRef,
      onClick: null,
    }),
  );
}

function parseHref(rawHref): Array<string, string> {
  var href_string = "#";
  var shimhash = null;

  return [rawHref, shimhash];
}

function Link({
  allowunsafehref,
  href: rawHref,
  linkRef,
  s: isSafeToSkipShim,
  target,
  ...otherProps
}: {
  ajaxify: string,
  allowunsafehref?: boolean,
  "aria-disabled": string,
  "aria-label": string,
  className: string,
  children: Array<React.Node>,
  "data-testid": string,
  href: string,
  linkRef: string,
  onClick: null | (() => void),
  rel?: string,
  s?: boolean,
  tabIndex: number,
  target?: string,
}) {
  var parsed_href = parseHref(rawHref);
  var href = parsed_href[0];
  var shimhash = parsed_href[1];
  var nofollow = shimhash != null;
  var useRedirect = shimhash != null;
  var useMetaReferrer = false;

  var noopener = shimhash !== null && target === "_blank";

  return React.createElement(
    AbstractLink,
    Object.assign({}, otherProps, {
      href: href,
      linkRef: linkRef,
      nofollow: nofollow,
      noopener: noopener,
      shimhash: shimhash,
      target: target,
      useRedirect: useRedirect,
      useMetaReferrer: useMetaReferrer,
    }),
  );
}

function AbstractButton({
  className,
  depressed,
  disabled,
  href,
  image,
  imageRight,
  label,
  labelIsHidden,
  role,
  tabIndex,
  type,
  ...buttonProps
}: {
  ajaxify: string,
  "aria-label": string,
  className: string,
  "data-testid": string,
  depressed?: boolean,
  disabled?: boolean,
  href: string,
  image?: React.Node,
  imageRight?: React.Node,
  label: React.Node,
  labelIsHidden: boolean,
  rel: string,
  role: string,
  tabIndex: number,
  type?: string,
}) {
  var _className =
    cx("abstractButton/root") +
    (disabled ? " " + cx("public/abstractButton/disabled") : "") +
    (depressed ? " " + cx("public/abstractButton/depressed") : "");
  var imageChild = image;
  var imageRightChild = imageRight;

  if (href) {
    var isDisabledButton = disabled && role === "button";
    return React.createElement(
      Link,
      Object.assign({}, buttonProps, {
        "aria-disabled": isDisabledButton ? true : undefined,
        className: joinClasses(className, _className),
        href: href,
        onClick: null,
        tabIndex: disabled ? -1 : tabIndex,
        type: type,
      }),

      imageChild,
      labelIsHidden ? React.createElement("span", { className: cx("accessible_elem") }, label) : label,
      imageRightChild,
    );
  } else if (type && type !== "submit") {
    return React.createElement(
      "button",
      Object.assign({}, buttonProps, {
        className: joinClasses(className, _className),
        disabled: disabled,
        href: href,
        type: type,
      }),

      imageChild,
      labelIsHidden ? React.createElement("span", { className: cx("accessible_elem") }, label) : label,
      imageRightChild,
    );
  } else {
    return React.createElement(
      "button",
      Object.assign({}, buttonProps, {
        className: joinClasses(className, _className),
        disabled: disabled,
        href: href,
        type: "submit",
        value: "1",
      }),

      imageChild,
      labelIsHidden ? React.createElement("span", { className: cx("accessible_elem") }, label) : label,
      imageRightChild,
    );
  }
}

function createTooltipPortal(content, container): null {
  return null;
}

function Tooltip({
  children,
  display,
  tooltip,
  ...otherProps
}: {
  children: React.Node,
  className: string,
  "data-testid": string,
  display: string,
  tabIndex: number,
  tooltip: null | React.Node,
}) {
  var $Tooltip_container = document.createElement("div");

  return React.createElement(
    display === "block" ? "div" : "span",
    otherProps,
    tooltip !== null ? createTooltipPortal(tooltip, $Tooltip_container) : null,
    children,
  );
}

Tooltip.defaultProps = { display: "inline" };

function LazyContentTooltip({
  children,
  contentRenderer,
  contentRendererProps,
  errorMessage,
  placeholder,
  ...otherProps
}: {
  children: React.Node,
  className: string,
  contentRenderer: void,
  contentRendererProps: void,
  "data-testid": string,
  errorMessage: string,
  placeholder: React.Node,
  tabIndex: number,
}) {
  return React.createElement(
    Tooltip,
    Object.assign({}, otherProps, {
      onFocus: null,
      onMouseEnter: null,
      tooltip: placeholder,
    }),

    children,
  );
}

function UFI2TopReactions({
  className,
  feedback,
  feedbackTargetID,
}: {
  className?: string,
  feedback: FeedbackType,
  feedbackTargetID: string,
}) {
  var top_reactions = feedback.top_reactions;
  var topReactions = top_reactions != null ? top_reactions.edges : top_reactions;
  topReactions || invariant(0, "UFI2TopReactions: Expected top reactions");
  var actorID =
    feedback != null
      ? feedback.viewer_current_actor != null
        ? feedback.viewer_current_actor.id
        : feedback.viewer_current_actor
      : feedback;
  actorID || invariant(0, "UFI2TopReactions: Expected an actor ID");

  if (topReactions.length === 0) {
    return null;
  }

  var topThreeReactions = topReactions.slice(0, 3);

  function $UFI2TopReactions_renderLink(actorID: string, reactionEdge: Edge, reactionIndex: number): React.Node {
    var selectedReactionIndex = null;
    var i18nReactionCount = reactionEdge != null ? reactionEdge.i18n_reaction_count : reactionEdge;
    var i18nReactionName =
      reactionEdge != null
        ? reactionEdge.node != null
          ? reactionEdge.node.localized_name
          : reactionEdge.node
        : reactionEdge;
    var reactionType =
      reactionEdge != null
        ? reactionEdge.node != null
          ? reactionEdge.node.reaction_type
          : reactionEdge.node
        : reactionEdge;
    var reactionKey = getReactionKeyFromType(reactionType);
    var primerProps = UFIReactionsProfileBrowserUtils.getPrimerProps({
      actorID: actorID,
      feedbackTargetID: feedbackTargetID,
      reactionKey: reactionKey,
    });

    var reactionsNotFocused = selectedReactionIndex === null;
    var currentReactionIsFocused = selectedReactionIndex === reactionIndex;
    var tabIndex = (reactionsNotFocused && reactionIndex === 0) || currentReactionIsFocused ? 0 : -1;

    var placeholder = React.createElement(
      "div",
      null,
      React.createElement(UFI2ReactionIconTooltipTitle, null, i18nReactionName),

      fbt._("Loading\u2026", null, { hash_key: "2Ct2DW" }),
    );

    return React.createElement(
      LazyContentTooltip,
      {
        className: cx("UFI2TopReactions/tooltip"),
        contentRenderer: null,
        contentRendererProps: {
          feedbackTargetID: feedbackTargetID,
          i18nReactionName: i18nReactionName,
          reactionType: reactionType,
        },

        "data-testid": "UFI2TopReactions/tooltip_" + reactionType,
        key: reactionKey,
        placeholder: placeholder,
        tabIndex: -1,
      },

      React.createElement(
        AbstractButton,
        Object.assign({}, primerProps, {
          "aria-label": fbt._(
            "{i18nReactionCount} {i18nReactionName}",

            [fbt._param("i18nReactionCount", i18nReactionCount), fbt._param("i18nReactionName", i18nReactionName)],
            { hash_key: "1yBDpL" },
          ),

          className: cx("UFI2TopReactions/link"),
          label: [
            React.createElement(UFIReactionIcon, {
              className: cx("UFI2TopReactions/icon"),
              key: "reactionIcon",
              reaction: reactionKey,
            }),
          ],

          ref: null,
          role: "button",
          tabIndex: tabIndex,
        }),
      ),
    );
  }

  return React.createElement(
    "span",
    {
      "aria-label": fbt._("See who reacted to this", null, {
        hash_key: "30H01m",
      }),

      className: joinClasses(cx("UFI2TopReactions/root"), className),
      onKeyDown: null,
      ref: null,
      role: "toolbar",
    },
    topThreeReactions.map(function(edge: Edge, ii: number): React.Node {
      return $UFI2TopReactions_renderLink(actorID, edge, ii);
    }),
  );
}

function UFI2RealtimeContainer({ children }: { children: React.Node }) {
  return React.createElement(
    OnVisible,
    {
      buffer: 200,
      onHidden: null,
      onVisible: null,
    },
    children,
  );
}

function FeedStoryUFISummary({
  feedback,
  feedbackTargetID,
  onClickCommentsCount,
}: {
  feedback: FeedbackType,
  feedbackTargetID: string,
  onClickCommentsCount: null | number,
}) {
  var can_show_seen_by = feedback.can_show_seen_by;
  var comment_count = feedback.comment_count;
  var reaction_count = feedback.reaction_count;
  var seen_by_count = feedback.seen_by_count;
  var share_count = feedback.share_count;
  var viewCount = feedback.video_view_count;
  var seenByCount = (seen_by_count != null ? seen_by_count.count : seen_by_count) || 0;
  var canShowSeenBy = can_show_seen_by === true && seenByCount > 0;
  var commentsCount = comment_count != null ? comment_count.total_count : comment_count;
  var reactionsCount = reaction_count != null ? reaction_count.count : reaction_count;
  var sharesCount = share_count != null ? share_count.count : share_count;

  if (!canShowSeenBy && !commentsCount && !reactionsCount && !sharesCount && !viewCount) {
    return null;
  }

  return React.createElement(
    "div",
    {
      className: cx("fbFeedStoryUFI/feedbackSummary"),
      "data-testid": "fbFeedStoryUFI/feedbackSummary",
    },
    reactionsCount
      ? React.createElement(
          "div",
          { className: cx("fbFeedStoryUFI/reactionsSummary") },
          React.createElement(
            UFI2ErrorBoundary,
            null,
            React.createElement(UFI2TopReactions, {
              className: cx("fbFeedStoryUFI/topReactions"),
              feedback: feedback,
              feedbackTargetID: feedbackTargetID,
            }),
          ),

          React.createElement(
            UFI2ErrorBoundary,
            null,
            React.createElement(UFI2ReactionsCount, {
              className: cx("fbFeedStoryUFI/reactionsCount"),
              feedback: feedback,
              feedbackTargetID: feedbackTargetID,
            }),
          ),
        )
      : null,
  );
}

var UFIReactionTypes = {
  LIKE: 1,
  ordering: [1, 2, 13, 11, 12, 4, 5, 3, 10, 7, 8, 14, 15],
  NONE: 0,
  reactions: {
    "1": {
      class_name: "public/ufiReactionsIcons/like",
      color: "#4080ff",
      display_name: "Like",
      is_deprecated: false,
      is_visible: true,
      name: "like",
      type: 1,
    },

    "2": {
      class_name: "public/ufiReactionsIcons/love",
      color: "#f25268",
      display_name: "Love",
      is_deprecated: false,
      is_visible: true,
      name: "love",
      type: 2,
    },

    "3": {
      class_name: "public/ufiReactionsIcons/wow",
      color: "#f0ba15",
      display_name: "Wow",
      is_deprecated: false,
      is_visible: true,
      name: "wow",
      type: 3,
    },

    "4": {
      class_name: "public/ufiReactionsIcons/haha",
      color: "#f0ba15",
      display_name: "Haha",
      is_deprecated: false,
      is_visible: true,
      name: "haha",
      type: 4,
    },

    "5": {
      class_name: "public/ufiReactionsIcons/yay",
      color: "#f0ba15",
      display_name: "Yay",
      is_deprecated: true,
      is_visible: true,
      name: "yay",
      type: 5,
    },

    "7": {
      class_name: "public/ufiReactionsIcons/sorry",
      color: "#f0ba15",
      display_name: "Sad",
      is_deprecated: false,
      is_visible: true,
      name: "sorry",
      type: 7,
    },

    "8": {
      class_name: "public/ufiReactionsIcons/anger",
      color: "#f7714b",
      display_name: "Angry",
      is_deprecated: false,
      is_visible: true,
      name: "anger",
      type: 8,
    },

    "10": {
      class_name: "public/ufiReactionsIcons/confused",
      color: "#f0ba15",
      display_name: "Confused",
      is_deprecated: true,
      is_visible: true,
      name: "confused",
      type: 10,
    },

    "11": {
      class_name: "public/ufiReactionsIcons/dorothy",
      color: "#7e64c4",
      display_name: "Thankful",
      is_deprecated: false,
      is_visible: true,
      name: "dorothy",
      type: 11,
    },

    "12": {
      class_name: "public/ufiReactionsIcons/toto",
      color: "#EC7EBD",
      display_name: "Pride",
      is_deprecated: false,
      is_visible: true,
      name: "toto",
      type: 12,
    },

    "13": {
      class_name: null,
      color: "#1d2129",
      display_name: "Selfie",
      is_deprecated: false,
      is_visible: false,
      name: "selfie",
      type: 13,
    },

    "14": {
      class_name: "public/ufiReactionsIcons/flame",
      color: "#4080ff",
      display_name: "React",
      is_deprecated: false,
      is_visible: false,
      name: "flame",
      type: 14,
    },

    "15": {
      class_name: "public/ufiReactionsIcons/plane",
      color: "#4080ff",
      display_name: "React",
      is_deprecated: false,
      is_visible: false,
      name: "plane",
      type: 15,
    },
  },
};

var REACTIONS = UFIReactionTypes.reactions;

var UFI2ReactionUtils = {
  checkReactionKey: function checkReactionKey(viewerReactionKey) {
    if (viewerReactionKey && !UFIReactionTypes.reactions[viewerReactionKey]) {
      return 0;
    }

    return viewerReactionKey || 0;
  },
};

function UFI2ActionLink({
  children,
  showIcon,
}: {
  children: ({ className: string }) => React.Node,
  showIcon: boolean,
}) {
  var showIcon = showIcon === undefined ? true : showIcon;
  return React.createElement(
    "span",
    { className: cx("UFI2ActionLink/root") },
    children({
      className: cx("UFI2ActionLink/link") + (showIcon ? " " + cx("UFI2ActionLink/withIcon") : ""),
    }),
  );
}

function UFIReactionsMenu() {
  return null;
}

function AWithFocusEvents({
  children,
  onKeyboardFocus,
  onMouseFocus,
  ...otherProps
}: {
  "aria-pressed": boolean,
  children: React.Node,
  className: string,
  "data-testid": string,
  href: string,
  onKeyboardFocus: null,
  onMouseFocus: null,
  role: string,
  style: { color: string },
  tabIndex: number,
}) {
  return React.createElement(
    "a",
    Object.assign({}, otherProps, {
      onClick: null,
      onFocus: null,
      onKeyUp: null,
    }),
  );
}

function UFI2ReactionLink({
  children,
  className,
  feedback,
}: {
  children: React.Node,
  className: string,
  feedback: FeedbackType,
}) {
  var state = {
    menuShown: false,
  };
  var viewerReactionKey =
    feedback != null
      ? feedback.viewer_feedback_reaction_info != null
        ? feedback.viewer_feedback_reaction_info.key
        : feedback.viewer_feedback_reaction_info
      : feedback;

  var reactionKey = UFI2ReactionUtils.checkReactionKey(viewerReactionKey);
  var label = void 0;
  var textColor = void 0;
  if (!reactionKey) {
    label = REACTIONS[UFIReactionTypes.LIKE].display_name;
  } else {
    var _REACTIONS$reactionKe = REACTIONS[reactionKey];
    var display_name = _REACTIONS$reactionKe.display_name;
    var color = _REACTIONS$reactionKe.color;
    label = display_name;
    textColor = color;
  }

  function $UFI2ReactionLink_getSupportedReactions() {
    return ((feedback != null ? feedback.supported_reactions : feedback) || [])
      .map(function(_) {
        return _.key;
      })
      .filter(Boolean);
  }

  var menu =
    state.menuShown && UFIReactionsMenu
      ? React.createElement(UFIReactionsMenu, {
          initialReaction: reactionKey,
          onBlur: null,
          onFocus: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onReactionClick: null,
          shown: state.menuShown,
          supportedReactions: $UFI2ReactionLink_getSupportedReactions(),
        })
      : null;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      AWithFocusEvents,
      {
        "aria-pressed": !!reactionKey,
        className: joinClasses(!!reactionKey ? cx("UFI2ReactionLink/hasReacted") : "", className),

        "data-testid": "UFI2ReactionLink",
        href: "#",
        onClick: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        ref: "trigger",
        role: "button",
        style: { color: textColor },
        tabIndex: 0,
      },

      children,
      label,
    ),

    menu,
  );
}

var UFICommonInteractionEvents = {
  UFI_OPTIMISTIC_COMMENT: "UFIOptimisticComment",
  UFI_PERSISTED_COMMENT: "UFIPersistedComment",
  UFI2_OPTIMISTIC_COMMENT: "UFI2OptimisticComment",
  UFI2_PERSISTED_COMMENT: "UFI2PersistedComment",
  UFI_TOP_LEVEL_COMMENTS_PAGINATION: "UFITopLevelCommentsPagination",
  UFI2_TOP_LEVEL_COMMENTS_PAGINATION: "UFI2TopLevelCommentsPagination",
  UFI2_REPLY_COMMENTS_PAGINATION: "UFI2ReplyCommentsPagination",
  UFI_SHARE_DIALOG_OPENS: "UFIShareDialogOpens",
  UFI2_SHARE_DIALOG_OPENS: "UFI2ShareDialogOpens",
  UFI_COMPOSER_INPUT_FOCUS: "UFIComposerInputFocus",
  UFI_STORY_REACTION: "UFIStoryReaction",
  UFI_COMMENT_REACTION: "UFICommentReaction",
  UFI2_STORY_REACTION: "UFI2StoryReaction",
  UFI2_COMMENT_REACTION: "UFI2CommentReaction",
};

var HOVER_SHOW_DELAY = 525;
var HOVER_HIDE_DELAY = 750;

function UFIReactionIcon({ className, size }: { className: string, size: string }) {
  return React.createElement(
    "span",
    {
      className: joinClasses(
        cx("ufiReactionsIcons/root") +
          (size === "13" ? " " + cx("ufiReactionsIcons/13") : "") +
          (size === "16" ? " " + cx("ufiReactionsIcons/16") : "") +
          (size === "18" ? " " + cx("ufiReactionsIcons/18") : "") +
          (size === "48" ? " " + cx("ufiReactionsIcons/48") : "") +
          (size === "96" ? " " + cx("ufiReactionsIcons/96") : ""),
        className,
        cx("ufiReactions-dorothy-2017-v2/root") + (" " + cx("ufiReactions-toto-2017-v2/root")),
      ),
    },

    123,
  );
}

UFIReactionIcon.defaultProps = {
  className: null,
  grayscale: false,
  size: "16",
};

function UFI2ReactionActionLink({ className, feedback }: { className: string, feedback: FeedbackType }) {
  var viewerReactionKey =
    feedback != null
      ? feedback.viewer_feedback_reaction_info != null
        ? feedback.viewer_feedback_reaction_info.key
        : feedback.viewer_feedback_reaction_info
      : feedback;

  var reactionKey = UFI2ReactionUtils.checkReactionKey(viewerReactionKey);

  var icon = void 0;
  if (!reactionKey) {
    icon = null;
  } else if (reactionKey && reactionKey !== UFIReactionTypes.LIKE) {
    icon = React.createElement(UFIReactionIcon, {
      className: cx("UFI2ReactionActionLink/inlineUFIIcon"),
      reaction: reactionKey,
      size: "18",
    });
  }

  return (feedback != null
  ? feedback.can_viewer_react
  : feedback)
    ? React.createElement(UFI2ActionLink, { showIcon: !icon }, function(_ref3: { className: string }): React.Node {
        var actionLinkClassName = _ref3.className;
        return React.createElement(
          "div",
          {
            className: cx("UFI2ReactionActionLink/root"),
            "data-testid": "UFI2ReactionLink/actionLink",
          },

          React.createElement(
            UFI2ReactionLink,
            {
              className: joinClasses(
                (reactionKey === UFIReactionTypes.LIKE ? cx("UFI2ReactionActionLink/liked") : "") +
                  (" " + cx("UFI2ReactionActionLink/link")) +
                  (!reactionKey ? " " + cx("UFI2ReactionActionLink/notLiked") : ""),
                actionLinkClassName,
                className,
              ),

              feedback: feedback,
              hideDelay: HOVER_HIDE_DELAY,
              interactionEvent: UFICommonInteractionEvents.UFI2_STORY_REACTION,
              showDelay: HOVER_SHOW_DELAY,
            },

            icon,
          ),
        );
      })
    : null;
}

function ShimButton({
  children,
  form,
  inline,
  keyActivationToClickEvent,
  keyActivationToClickRef,
  onRef,
  pressed,
  ...buttonProps
}: {
  children: string,
  className: string,
  inline: void | boolean,
  form: void | string,
  keyActivationToClickEvent: null,
  keyActivationToClickRef: null,
  onClick: () => void | null,
  onRef: () => void | null,
  pressed: void | boolean,
}) {
  if (form === "link") {
    return React.createElement(
      "a",
      Object.assign({}, buttonProps, {
        "aria-pressed": pressed,
        ref: null,
        role: "button",
        onKeyPress: null,
      }),

      children,
    );
  }
  return React.createElement(
    inline ? "span" : "div",
    Object.assign({}, buttonProps, {
      "aria-pressed": pressed,
      ref: null,
      role: "button",
      onKeyPress: null,
    }),

    children,
  );
}

function UFI2AnswerActionLink({
  className,
  feedback,
  onClick,
}: {
  className: string,
  feedback: FeedbackType,
  onClick: null,
}) {
  return feedback && feedback.can_viewer_comment && feedback.is_q_and_a
    ? React.createElement(UFI2ActionLink, null, function(_ref: { className: string }): React.Node {
        var actionLinkClassName = _ref.className;
        return React.createElement(
          ShimButton,
          {
            className: joinClasses(cx("UFI2AnswerActionLink/root"), actionLinkClassName, className),

            onClick: onClick,
          },

          fbt._("Answer", null, { hash_key: "7wbRt" }),
        );
      })
    : null;
}

function UFI2CommentActionLink({
  className,
  feedback,
  onClick,
}: {
  className: string,
  feedback: FeedbackType,
  onClick: null,
}) {
  return feedback && feedback.can_viewer_comment
    ? React.createElement(UFI2ActionLink, null, function(_ref: { className: string }): React.Node {
        var actionLinkClassName = _ref.className;
        return React.createElement(
          ShimButton,
          {
            className: joinClasses(cx("UFI2CommentActionLink/root"), actionLinkClassName, className),

            onClick: onClick,
          },

          fbt._("Comment", null, { hash_key: "2MdL3e" }),
        );
      })
    : null;
}

function UFI2ShareActionLink({
  className,
  feedback,
  feedbackTargetID,
  shareableConfig,
}: {
  className: string,
  feedback: FeedbackType,
  feedbackTargetID: string,
  shareableConfig: void,
}) {
  var state = {
    focusOnInit: false,
    interacted: false,
    isLoading: false,
    misinformationDialogConfirmed: false,
    openAfterMisinformationConfirmed: false,
    openOnInit: false,
  };
  var _state = state;
  var focusOnInit = _state.focusOnInit;
  var interacted = _state.interacted;
  var isLoading = _state.isLoading;
  var misinformationDialogConfirmed = _state.misinformationDialogConfirmed;
  var openAfterMisinformationConfirmed = _state.openAfterMisinformationConfirmed;
  var openOnInit = _state.openOnInit;

  if (!shareableConfig || !shareableConfig.share_action_link_uri) {
    return null;
  }

  var actorID =
    feedback != null
      ? feedback.viewer_current_actor != null
        ? feedback.viewer_current_actor.id
        : feedback.viewer_current_actor
      : feedback;
  var misinformationConfirmDialogURI =
    shareableConfig != null ? shareableConfig.misinformation_confirm_dialog_uri : shareableConfig;

  var shareActionLinkRel =
    shareableConfig != null
      ? shareableConfig.share_action_link_primer_attributes != null
        ? shareableConfig.share_action_link_primer_attributes.rel
        : shareableConfig.share_action_link_primer_attributes
      : shareableConfig;

  var shareActionLinkURI = "#";

  var shareNowMenuURIAsString = shareableConfig != null ? shareableConfig.share_now_menu_uri : shareableConfig;

  if (misinformationConfirmDialogURI && !misinformationDialogConfirmed) {
    return React.createElement(UFI2ActionLink, null, function(_ref7: { className: string }): React.Node {
      var actionLinkClassName = _ref7.className;
      return React.createElement(ShareLink, {
        className: actionLinkClassName,
        onClick: null,
      });
    });
  }

  var shareNowMenuURI = void 0;
  if (actorID) {
    shareActionLinkURI = "#";
    shareNowMenuURI = "#";
  }

  var shareLinkProps = {
    isLoading: isLoading,
    onFocus: null,
    onMouseDown: null,
    onMouseOver: null,
    onMouseUp: null,
  };

  return React.createElement(UFI2ActionLink, null, function(_ref9: { className: string }): React.Node {
    var actionLinkClassName = _ref9.className;
    return React.createElement(
      "span",
      {
        className: joinClasses(cx("UFI2ShareActionLink/root"), className),
      },

      React.createElement(
        ShareLink,
        Object.assign({}, shareLinkProps, {
          className: actionLinkClassName,
        }),
      ),
    );
  });
}

function $ShareLink_getQualifiedHref(props: { href: string | null }): null | string {
  var href = props.href;
  if (!href) {
    return null;
  }
  return href;
}

function ShareLink({
  className,
  isLoading,
  rel,
  ...props
}: {
  className: string,
  isLoading: void | boolean,
  rel: void | string,
  href: null | string,
}) {
  var linkHref = $ShareLink_getQualifiedHref(props) || "#";
  var title = "work user"
    ? fbt._("Send this to coworkers or post it on your timeline.", null, { hash_key: "2zccV8" })
    : fbt._("Send this to friends or post it on your timeline.", null, {
        hash_key: "Y9LzE",
      });

  var trackingInfo = '{ "tn": "dummy", "type": 25 }';
  var spinner =
    isLoading === true
      ? React.createElement(XUISpinner, {
          className: cx("UFI2ShareActionLink/spinner"),
        })
      : null;

  return React.createElement(
    "a",
    Object.assign({}, props, {
      href: linkHref,
      className: joinClasses(cx("UFI2ShareActionLink/link"), className),
      "data-ft": trackingInfo,
      onClick: null,
      ref: null,
      rel: rel,
      role: "button",
      tabIndex: 0,
      title: title,
    }),

    fbt._("Share", null, { hash_key: "gaj3j" }),

    spinner,
  );
}

var USE_CSS = true;

function XUISpinner({
  background,
  className,
  paused,
  showOnAsync,
  size,
  ...spanProps
}: {
  background: string,
  className: string,
  paused: void | boolean,
  showOnAsync: boolean,
  size: string,
}) {
  var imageClass =
    cx("img") +
    (" " + cx("xuiSpinner/root")) +
    (size == "small" ? " " + cx("xuiSpinner/small") : "") +
    (size == "large" ? " " + cx("xuiSpinner/large") : "") +
    (background == "light" ? " " + cx("xuiSpinner/light") : "") +
    (background == "dark" ? " " + cx("xuiSpinner/dark") : "") +
    (showOnAsync ? " " + cx("xuiSpinner/showOnAsync") : "") +
    (!USE_CSS ? " " + cx("xuiSpinner/animatedGIF") : "") +
    (USE_CSS && paused ? " " + cx("xuiSpinner/pauseAnimation") : "");

  return React.createElement(
    LoadingMarker,
    null,
    React.createElement(
      "span",
      Object.assign({}, spanProps, {
        className: joinClasses(className, imageClass),
        role: "progressbar",
        "aria-valuetext": fbt._("Loading...", null, {
          hash_key: "2pEOeS",
        }),

        "aria-busy": "true",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
      }),
    ),
  );
}

XUISpinner.defaultProps = {
  showOnAsync: false,
  size: "small",
  background: "light",
};

function LoadingMarker({ children }: { children: React.Node }) {
  return children;
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
      rel: string,
    },
    share_action_link_uri: string,
    share_now_menu_uri: string,
  },
};

function FeedStoryUFIRootRenderer({
  contextForFeedback,
  feedbackSource,
  feedbackTargetID,
  feedback,
  shareable_config,
  linkedCommentId,
  feedLocation,
}: UFI2RootRendererProps) {
  var state = getRendererStateFromProps();
  const editingCommentID = state.editingCommentID;
  const composerPluginProps = state.composerPluginProps;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      UFI2RealtimeContainer,
      {
        subscribe: null,
      },
      React.createElement(
        "div",
        { className: cx("fbFeedStoryUFI/summaryAndActionsContainer") },
        React.createElement(FeedStoryUFISummary, {
          feedback: feedback,
          feedbackTargetID: feedbackTargetID,
          onClickCommentsCount: null,
        }),

        React.createElement(
          "div",
          { className: cx("fbFeedStoryUFI/actionLinks") },
          React.createElement(UFI2ReactionActionLink, {
            feedback: feedback,
          }),

          feedback.is_q_and_a
            ? React.createElement(UFI2AnswerActionLink, {
                feedback: feedback,
                onClick: null,
              })
            : React.createElement(UFI2CommentActionLink, {
                feedback: feedback,
                onClick: null,
              }),

          React.createElement(UFI2ShareActionLink, {
            feedback: feedback,
            feedbackTargetID: feedbackTargetID,
            shareableConfig: shareable_config,
          }),
        ),
      ),
    ),
    React.createElement(
      UFI2CommentsProvider,
      {
        componentRef: null,
        contextForFeedback: contextForFeedback,
        feedLocation: feedLocation,
        feedback: feedback,
        feedbackSource: feedbackSource,
        linkedCommentId: linkedCommentId,
      },

      function(commentsListProps) {
        return null;
      },
    ),
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
          rel: string,
        },
        share_action_link_uri: string,
        share_now_menu_uri: string,
      },
    },
  },
};

function Component({ feedLocation, queryVariables, preloadedData, feedbackSource }: UFI2RootProps) {
  const contextForFeedback = queryVariables.contextForFeedback;
  const feedbackTargetID = queryVariables.feedbackTargetID;
  const focusCommentID = queryVariables.focusCommentID;

  return React.createElement(FeedStoryUFIRootRenderer, {
    contextForFeedback: contextForFeedback,
    feedLocation: feedLocation,
    feedback: preloadedData.data.feedback,
    feedbackSource: feedbackSource,
    feedbackTargetID: feedbackTargetID,
    linkedCommentId: focusCommentID,
    shareable_config: preloadedData.data.shareable_config,
  });
}

Component.compileRootComponent = true;

module.exports = Component;
