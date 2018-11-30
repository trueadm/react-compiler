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

function UFI2TopReactions({ className, feedback }: { className?: string, feedback: FeedbackType }) {
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

  function $UFI2TopReactions_renderLink(): React.Node {
    return <span>123</span>;
  }

  return React.createElement(
    "foo",
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
  var _ref, _ref2, _ref3, _ref4;
  var can_show_seen_by = feedback.can_show_seen_by;
  var comment_count = feedback.comment_count;
  var reaction_count = feedback.reaction_count;
  var seen_by_count = feedback.seen_by_count;
  var share_count = feedback.share_count;
  var viewCount = feedback.video_view_count;
  var seenByCount = ((_ref = seen_by_count) != null ? _ref.count : _ref) || 0;
  var canShowSeenBy = can_show_seen_by === true && seenByCount > 0;
  var commentsCount = (_ref2 = comment_count) != null ? _ref2.total_count : _ref2;
  var reactionsCount = (_ref3 = reaction_count) != null ? _ref3.count : _ref3;
  var sharesCount = (_ref4 = share_count) != null ? _ref4.count : _ref4;

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
