// DO NOT MODIFY

import { Component } from "./App.compiled.js";
import { render } from "react-compiler-runtime/render";
import { reactElementSymbol } from "react-compiler-runtime/utils";

const React = {
  createElement(type, props) {
    return {
      $$typeof: reactElementSymbol,
      key: null,
      props,
      ref: null,
      type,
    };
  }
}

const root = document.getElementById("root");
const props = {
  "relayQueryID": "1416350251803297",
  "preloadedData": {
     "data": {
        "feedback": {
           "id": "ZmVlZGJhY2s6ODQyNzUwMTE5MDk2MTg0",
           "is_q_and_a": false,
           "is_eligible_for_real_time_updates": false,
           "feedback_typers": {
              "friend_count": 0,
              "other_count": 0
           },
           "comment_count": {
              "total_count": 32
           },
           "i18n_comment_count": "32",
           "url": "https://facebook.com/testcomments/posts/842750119096184",
           "i18n_reaction_count": "11",
           "important_reactors": {
              "nodes": []
           },
           "reaction_count": {
              "count": 11
           },
           "viewer_current_actor": {
              "__typename": "User",
              "id": "100001961182163",
              "name": "Dan Abramov",
              "profile_picture": {
                 "uri": "https://example.com/1.jpg"
              }
           },
           "viewer_feedback_reaction_info": null,
           "can_show_seen_by": false,
           "seen_by": {
              "count": 0,
              "i18n_seen_by_count": null,
              "seen_by_everyone": false
           },
           "i18n_share_count": "0",
           "share_count": {
              "count": 0
           },
           "share_fbid": "842750119096184",
           "top_reactions": {
              "edges": [
                 {
                    "i18n_reaction_count": "10",
                    "node": {
                       "localized_name": "Like",
                       "reaction_type": "LIKE",
                       "id": "1635855486666999",
                       "key": 1
                    },
                    "reaction_count": 10
                 },
                 {
                    "i18n_reaction_count": "1",
                    "node": {
                       "localized_name": "Love",
                       "reaction_type": "LOVE",
                       "id": "1678524932434102",
                       "key": 2
                    },
                    "reaction_count": 1
                 }
              ]
           },
           "video_view_count": null,
           "video_view_count_reduced": null,
           "total_video_posts": null,
           "video_post_view_count": null,
           "seen_by_count": {
              "count": 0
           },
           "can_viewer_comment": true,
           "is_group_q_and_a": false,
           "display_comments": {
              "after_count": 20,
              "before_count": 0,
              "count": 25,
              "edges": [
                 {
                    "node": {
                       "id": "Y29tbWVudDo4NDI3NTAxMTkwOTYxODRfODQyNzUwMTcyNDI5NTEy",
                       "is_hidden_by_viewer": false,
                       "author": {
                          "__typename": "Page",
                          "id": "431135680257632",
                          "name": "[FB Test Page] Comments Test Page",
                          "url": "https://facebook.com/testcomments/",
                          "profile_picture": {
                             "uri": "https://example.com/2.jpg"
                          }
                       },
                       "is_author_weak_reference": false,
                       "attachments": [],
                       "attached_story": null,
                       "body": {
                          "delight_ranges": [],
                          "ranges": [],
                          "text": "Comment",
                          "__typename": "TextWithEntities"
                       },
                       "comment_menu_items": [
                          {
                             "__typename": "CommentMenuItemHide"
                          }
                       ],
                       "can_viewer_disable_preview": false,
                       "edit_history": {
                          "count": 0
                       },
                       "feedback": {
                          "can_viewer_react": true,
                          "id": "ZmVlZGJhY2s6ODQyNzUwMTE5MDk2MTg0Xzg0Mjc1MDE3MjQyOTUxMg==",
                          "top_reactions": {
                             "edges": [
                                {
                                   "node": {
                                      "reaction_type": "LIKE",
                                      "id": "1635855486666999",
                                      "key": 1
                                   },
                                   "reaction_count": 1
                                }
                             ]
                          },
                          "reactors": {
                             "count_reduced": "1",
                             "count": 1
                          },
                          "viewer_current_actor": {
                             "__typename": "User",
                             "id": "100001961182163",
                             "name": "Dan Abramov",
                             "profile_picture": {
                                "uri": "https://example.com/3.jpg"
                             }
                          },
                          "viewer_feedback_reaction_info": null,
                          "supported_reactions": [
                             {
                                "key": 1
                             },
                             {
                                "key": 2
                             },
                             {
                                "key": 4
                             },
                             {
                                "key": 3
                             },
                             {
                                "key": 7
                             },
                             {
                                "key": 8
                             }
                          ],
                          "can_viewer_comment": true,
                          "is_group_q_and_a": false,
                          "is_q_and_a": false,
                          "display_comments": {
                             "after_count": 7,
                             "before_count": 0,
                             "count": 7,
                             "edges": [],
                             "highlighted_comments": [],
                             "is_initially_expanded": false,
                             "ordering_mode": "TOPLEVEL",
                             "page_info": {
                                "end_cursor": null,
                                "has_next_page": true,
                                "has_previous_page": false,
                                "start_cursor": null
                             }
                          }
                       },
                       "created_time": 1427330254,
                       "url": "https://facebook.com/testcomments/posts/842750119096184?comment_id=842750172429512",
                       "__typename": "Comment"
                    },
                    "cursor": "AQHResPYuKjRIG6HRAwDw8M2Sw4jnkzse6PZaP2Rz6Mpfp88FivRhkTkJ4uwc8cyJsFM"
                 },
                 {
                    "node": {
                       "id": "Y29tbWVudDo4NDI3NTAxMTkwOTYxODRfMTA2NzM0MzcyNjYzNjgyMQ==",
                       "is_hidden_by_viewer": false,
                       "author": {
                          "__typename": "User",
                          "id": "1380540005",
                          "name": "Jack Gill",
                          "url": "https://facebook.com/gill",
                          "profile_picture": {
                             "uri": "https://example.com/3.jpg"
                          }
                       },
                       "is_author_weak_reference": false,
                       "attachments": [],
                       "attached_story": null,
                       "body": {
                          "delight_ranges": [],
                          "ranges": [],
                          "text": "test tet",
                          "__typename": "TextWithEntities"
                       },
                       "comment_menu_items": [
                          {
                             "__typename": "CommentMenuItemHide"
                          }
                       ],
                       "can_viewer_disable_preview": false,
                       "edit_history": {
                          "count": 0
                       },
                       "feedback": {
                          "can_viewer_react": true,
                          "id": "ZmVlZGJhY2s6ODQyNzUwMTE5MDk2MTg0XzEwNjczNDM3MjY2MzY4MjE=",
                          "top_reactions": {
                             "edges": []
                          },
                          "reactors": {
                             "count_reduced": "0",
                             "count": 0
                          },
                          "viewer_current_actor": {
                             "__typename": "User",
                             "id": "100001961182163",
                             "name": "Dan Abramov",
                             "profile_picture": {
                                "uri": "https://example.com/4.jpg"
                             }
                          },
                          "viewer_feedback_reaction_info": null,
                          "supported_reactions": [
                             {
                                "key": 1
                             },
                             {
                                "key": 2
                             },
                             {
                                "key": 4
                             },
                             {
                                "key": 3
                             },
                             {
                                "key": 7
                             },
                             {
                                "key": 8
                             }
                          ],
                          "can_viewer_comment": true,
                          "is_group_q_and_a": false,
                          "is_q_and_a": false,
                          "display_comments": {
                             "after_count": 0,
                             "before_count": 0,
                             "count": 0,
                             "edges": [],
                             "highlighted_comments": [],
                             "is_initially_expanded": false,
                             "ordering_mode": "TOPLEVEL",
                             "page_info": {
                                "end_cursor": null,
                                "has_next_page": false,
                                "has_previous_page": false,
                                "start_cursor": null
                             }
                          }
                       },
                       "created_time": 1466555826,
                       "url": "https://facebook.com/testcomments/posts/842750119096184?comment_id=1067343726636821",
                       "__typename": "Comment"
                    },
                    "cursor": "AQHRWn3XXG0Ef-9VK0e26GWQJsroiMiqsYNIUWq2QJTxBdK40u3c-TIpQ7uqfL77NYJDYqimcsIUMGN1Iekfj4VlUw"
                 }
              ],
              "highlighted_comments": [],
              "is_initially_expanded": true,
              "ordering_mode": "RANKED_THREADED",
              "page_info": {
                 "end_cursor": "AQHRg-fcECmhpaDc5A9Mu-oWaIiN_D2uiwaEzkkwFc8hsbApyn2HkyvMSvPOJyQdHvAhyhsB2s20hJWJ0a95RwBTaA",
                 "has_next_page": true,
                 "has_previous_page": false,
                 "start_cursor": "AQHRHATKPgbMa7rJ_oFyc4ztjRfDnZHSG1Dxa6nrcGpD1A167lFM0ARsi7rcXAmIDsxX"
              }
           },
           "mentions_datasource_js_constructor_args_json": [
              {
                 "maxResults": 5,
                 "queryData": {
                    "context": "topics_limited_autosuggest",
                    "viewer": 100001961182163,
                    "filter": [
                       "page",
                       "user"
                    ],
                    "include_fans": false,
                    "context_id": 100001961182163,
                    "rsp": "mentions",
                    "post_fbid": 842750119096184
                 },
                 "queryEndpoint": "/ajax/typeahead/search.php",
                 "bootstrapData": {
                    "rsp": "mentions"
                 },
                 "enabledLocalCache": true,
                 "enabledMergeUids": true,
                 "disableAllCaches": false,
                 "enforceNewRequestIDUponFetch": false,
                 "bootstrapEndpoints": [
                    {
                       "endpoint": "/ajax/typeahead/first_degree.php",
                       "data": {
                          "context": "mentions",
                          "viewer": 100001961182163,
                          "token": "1523978152-7",
                          "filter": [
                             "page",
                             "group",
                             "app",
                             "event",
                             "user"
                          ],
                          "options": [
                             "friends_only",
                             "nm"
                          ]
                       }
                    }
                 ]
              }
           ],
           "can_viewer_react": true,
           "supported_reactions": [
              {
                 "key": 1
              },
              {
                 "key": 2
              },
              {
                 "key": 4
              },
              {
                 "key": 3
              },
              {
                 "key": 7
              },
              {
                 "key": 8
              }
           ],
           "reactors": {
              "count": 11
           }
        },
        "shareable_config": {
           "misinformation_confirm_dialog_uri": null,
           "share_action_link_primer_attributes": {
              "rel": "dialog"
           },
           "share_action_link_uri": "https://facebook.com/ajax/sharer/?s=22&appid=25554907596&id=842750119096184&p%5B0%5D=431135680257632&p%5B1%5D=842750119096184&share_source_type=unknown&feedback_source=1",
           "share_now_menu_uri": "https://facebook.com/share/share_now_menu/?actor_id=100001961182163&app_id=25554907596&dialog_uri=%2Fajax%2Fsharer%2F%3Fs%3D22%26appid%3D25554907596%26id%3D842750119096184%26p%255B0%255D%3D431135680257632%26p%255B1%255D%3D842750119096184%26share_source_type%3Dunknown%26feedback_source%3D1&share_rel=dialog&shareable_id=842750119096184&share_type=22&feedback_source=1&sharer_id=431135680257632&collection_id=98&shared_from_post_id=842750119096184"
        }
     }
  },
  "queryVariables": {
     "contextForFeedback": {
        "can_show_seen_state": false,
        "comment_expand_mode": 2,
        "comment_permalink_args": {
           "comment_id": null,
           "reply_comment_id": null
        },
        "feed_location": 159,
        "feedback_referrer": null,
        "feedback_source": 1,
        "interesting_comment_fbids": [],
        "is_ad_preview": false,
        "is_location_from_search": false,
        "is_story_set": false,
        "last_seen_time": null,
        "log_ranked_comment_impressions": false,
        "root_story_id": "S:_I431135680257632:842750119096184",
        "story_location": 5,
        "story_render_location": "survey_gallery",
        "target_story_id": "S:_I431135680257632:842750119096184"
     },
     "feedbackTargetID": "842750119096184",
     "focusCommentID": null,
     "shareableStoryContext": {
        "ad_id": null,
        "feed_location": "PERMALINK",
        "feedback_referrer": null,
        "feedback_source": 1,
        "outer_story_actor_id": 431135680257632,
        "story_caret_menu_button_id": null,
        "story_container_id": null,
        "user_logged_out_in_group_feed": false
     },
     "storyID": "S:_I431135680257632:842750119096184",
     "storyLocation": 5,
     "scale": 3
  }
}

console.time("Render")
render(<Component {...props} />, root);
console.timeEnd("Render")

