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

function UFI2CommentsProvider() {
  return null;
}

function UFI2ReactionsCount() {
  return null;
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

  getPrimerProps: function getPrimerProps(
    args,
  ): {
    ajaxify: string,
    "aria-disabled": string,
    "aria-label": string,
    className: string,
    href: string,
    ref: string,
    tabIndex: number,
  } {
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

function UFI2ReactionIconTooltipTitle() {
  return null;
}

function parseHref(rawHref): Array<string, string> {
  var href_string = "#";
  var shimhash = null;

  return [rawHref, shimhash];
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
}: {
  href: string,
  linkRef: string,
  nofollow: boolean,
  noopener: boolean,
  shimhash: null | string,
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

function Link({
  allowunsafehref,
  href,
  linkRef,
  s,
  target,
  ...otherProps
}: {
  ajaxify: string,
  allowunsafehref?: boolean,
  children: Array<React.Node>,
  href: string,
  linkRef: string,
  onClick: null | (() => void),
  rel?: string,
  s?: boolean,
  target?: string,
}) {
  var rawHref = href;
  var isSafeToSkipShim = s;
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
        onClick: null,
        tabIndex: disabled ? -1 : tabIndex,
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
        type: "submit",
        value: "1",
      }),

      imageChild,
      labelIsHidden ? React.createElement("span", { className: cx("accessible_elem") }, label) : label,
      imageRightChild,
    );
  }
}

function UFIReactionIcon() {
  return null;
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

  if (display === "block") {
    return React.createElement(
      "div",
      otherProps,
      tooltip !== null ? createTooltipPortal(tooltip, $Tooltip_container) : null,
      children,
    );
  } else {
    return React.createElement(
      "span",
      otherProps,
      tooltip !== null ? createTooltipPortal(tooltip, $Tooltip_container) : null,
      children,
    );
  }
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

  function $UFI2TopReactions_renderLink(actorID, reactionEdge, reactionIndex): React.Node {
    var selectedReactionIndex = null;
    var i18nReactionCount = (_ref2 = reactionEdge) != null ? _ref2.i18n_reaction_count : _ref2;
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

function UFI2ReactionActionLink() {
  return null;
}

function UFI2AnswerActionLink() {
  return null;
}

function UFI2CommentActionLink() {
  return null;
}

function UFI2ShareActionLink() {
  return null;
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
