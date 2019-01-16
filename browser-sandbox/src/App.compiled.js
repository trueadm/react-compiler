import "react-compiler-runtime";
type StoryType = {
  by: string,
  descendants: number,
  id: number,
  kids: Array<number>,
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
};

function timeAge(time): string {
  const now = new Date()["getTime"]() / 1000;
  const minutes = (now - time) / 60;

  if (minutes < 60) {
    return Math["round"](minutes) + " minutes ago";
  }

  return Math["round"](minutes / 60) + " hours ago";
}

function getHostUrl(url): string {
  return (url + "")["replace"]("https://", "")["replace"]("http://", "")["split"]("/")[0];
}

function HeaderBar() {
  return (// HeaderBar OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , [13 // UNCONDITIONAL_TEMPLATE
    , [0 // OPEN_ELEMENT
    , "tr", 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "background-color", "#222", 22 // CLOSE_PROP_STYLE
    , 0 // OPEN_ELEMENT
    , "table", 42 // STATIC_PROP
    , "width", "100%", 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "padding", "4px", 22 // CLOSE_PROP_STYLE
    , 42 // STATIC_PROP
    , "cellSpacing", 0, 42 // STATIC_PROP
    , "cellPadding", 0, 0 // OPEN_ELEMENT
    , "tbody", 0 // OPEN_ELEMENT
    , "td", 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "width", "18px", 48 // STATIC_PROP_STYLE
    , "padding-right", "4px", 22 // CLOSE_PROP_STYLE
    , 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 6 // OPEN_VOID_ELEMENT
    , "img", 42 // STATIC_PROP
    , "src", "logo.png", 42 // STATIC_PROP
    , "width", 16, 42 // STATIC_PROP
    , "height", 16, 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "border", "1px solid #00d8ff", 22 // CLOSE_PROP_STYLE
    , 9 // CLOSE_VOID_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 21 // OPEN_PROP_STYLE
    , 50 // STATIC_PROP_UNITLESS_STYLE
    , "line-height", "12pt", 22 // CLOSE_PROP_STYLE
    , 42 // STATIC_PROP
    , "height", 10, 4 // OPEN_ELEMENT_SPAN
    , 44 // STATIC_PROP_CLASS_NAME
    , "pagetop", 0 // OPEN_ELEMENT
    , "b", 44 // STATIC_PROP_CLASS_NAME
    , "hnname", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "React HN Benchmark", 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "new", 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "comments", 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "show", 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "ask", 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " |", 32 // ELEMENT_STATIC_CHILD_VALUE
    , " ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "jobs", 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "submit", 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    ], 0 // COMPUTE_FUNCTION
    ]]
  );
}

function Story_ComputeFunction(rank, story) {
  var __cached__1;

  var __cached__0;

  __cached__1 = timeAge(story["time"]);
  __cached__0 = getHostUrl(story["url"]);
  return [`${rank}.`, story["title"], story["url"], __cached__0, `${story["score"]} points`, story["by"], __cached__1, `${story["descendants"] || 0} comments`];
}

function Story() {
  return (// Story OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , [13 // UNCONDITIONAL_TEMPLATE
    , [17 // OPEN_FRAGMENT
    , 0 // OPEN_ELEMENT
    , "tr", 44 // STATIC_PROP_CLASS_NAME
    , "athing", 0 // OPEN_ELEMENT
    , "td", 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "vertical-align", "top", 48 // STATIC_PROP_STYLE
    , "text-align", "right", 22 // CLOSE_PROP_STYLE
    , 44 // STATIC_PROP_CLASS_NAME
    , "title", 4 // OPEN_ELEMENT_SPAN
    , 44 // STATIC_PROP_CLASS_NAME
    , "rank", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 0 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 44 // STATIC_PROP_CLASS_NAME
    , "votelinks", 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "vertical-align", "top", 22 // CLOSE_PROP_STYLE
    , 0 // OPEN_ELEMENT
    , "center", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 2 // OPEN_ELEMENT_DIV
    , 44 // STATIC_PROP_CLASS_NAME
    , "votearrow", 42 // STATIC_PROP
    , "title", "upvote", 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 44 // STATIC_PROP_CLASS_NAME
    , "title", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 44 // STATIC_PROP_CLASS_NAME
    , "storylink", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 1, 1 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 16 // CONDITIONAL
    , 2 // VALUE_POINTER_INDEX
    , 2, [4 // OPEN_ELEMENT_SPAN
    , 44 // STATIC_PROP_CLASS_NAME
    , "sitebit comhead", 32 // ELEMENT_STATIC_CHILD_VALUE
    , " ", 32 // ELEMENT_STATIC_CHILD_VALUE
    , "(", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 3, 3 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , ")", 8 // CLOSE_ELEMENT
    ] // CONDITIONAL_CONSEQUENT
    , 0 // CONDITIONAL_ALTERNATE
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "tr", 0 // OPEN_ELEMENT
    , "td", 42 // STATIC_PROP
    , "colSpan", 2, 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 44 // STATIC_PROP_CLASS_NAME
    , "subtext", 4 // OPEN_ELEMENT_SPAN
    , 44 // STATIC_PROP_CLASS_NAME
    , "score", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 4, 4 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " by", 32 // ELEMENT_STATIC_CHILD_VALUE
    , " ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 44 // STATIC_PROP_CLASS_NAME
    , "hnuser", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 5, 5 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " ", 4 // OPEN_ELEMENT_SPAN
    , 44 // STATIC_PROP_CLASS_NAME
    , "age", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 6, 6 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " ", 32 // ELEMENT_STATIC_CHILD_VALUE
    , "| ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 33 // ELEMENT_STATIC_CHILDREN_VALUE
    , "hide", 8 // CLOSE_ELEMENT
    , 32 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 42 // STATIC_PROP
    , "href", "#", 35 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 7, 7 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "tr", 21 // OPEN_PROP_STYLE
    , 48 // STATIC_PROP_STYLE
    , "height", "5px", 22 // CLOSE_PROP_STYLE
    , 44 // STATIC_PROP_CLASS_NAME
    , "spacer", 8 // CLOSE_ELEMENT
    , 18 // CLOSE_FRAGMENT
    ], Story_ComputeFunction // COMPUTE_FUNCTION
    , 8 // VALUE_POINTER_INDEX
    ]]
  );
}

function StoryList_ComputeFunction(stories) {
  return [stories, (story: Story, i: number): React.Node => [[++i, story]]];
}

function StoryList() {
  return (// StoryList OPCODES
    [10 // COMPONENT
    , 0 // USES_HOOKS
    , [13 // UNCONDITIONAL_TEMPLATE
    , [0 // OPEN_ELEMENT
    , "tr", 0 // OPEN_ELEMENT
    , "td", 1 // OPEN_ELEMENT_WITH_POINTER
    , "table", 0 // HOST_NODE_VALUE_POINTER_INDEX
    , 42 // STATIC_PROP
    , "cellPadding", 0, 42 // STATIC_PROP
    , "cellSpacing", 0, 42 // STATIC_PROP
    , "classList", "itemlist", 38 // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE
    , 0, [13 // UNCONDITIONAL_TEMPLATE
    , [29 // REF_COMPONENT
    , Story, 0 // COMPONENT_PROPS_ARRAY
    ], 0 // COMPUTE_FUNCTION
    ] // ARRAY_MAP_OPCODES
    , 1 // ARRAY_MAP_COMPUTE_FUNCTION
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    ], StoryList_ComputeFunction // COMPUTE_FUNCTION
    , 1 // VALUE_POINTER_INDEX
    ]]
  );
}

function Component_ComputeFunction(stories) {
  return [[stories]];
}

export var Component = // Component OPCODES
[10 // COMPONENT
, 0 // USES_HOOKS
, ["stories"] // ROOT_PROPS_SHAPE
, [13 // UNCONDITIONAL_TEMPLATE
, [0 // OPEN_ELEMENT
, "center", 0 // OPEN_ELEMENT
, "table", 42 // STATIC_PROP
, "id", "hnmain", 42 // STATIC_PROP
, "border", 0, 42 // STATIC_PROP
, "cellPadding", 0, 42 // STATIC_PROP
, "cellSpacing", 0, 42 // STATIC_PROP
, "width", "85%", 21 // OPEN_PROP_STYLE
, 48 // STATIC_PROP_STYLE
, "background-color", "#f6f6ef", 22 // CLOSE_PROP_STYLE
, 0 // OPEN_ELEMENT
, "tbody", 29 // REF_COMPONENT
, HeaderBar, null // COMPONENT_PROPS_ARRAY
, 0 // OPEN_ELEMENT
, "tr", 42 // STATIC_PROP
, "height", 10, 8 // CLOSE_ELEMENT
, 29 // REF_COMPONENT
, StoryList, 0 // COMPONENT_PROPS_ARRAY
, 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
, 8 // CLOSE_ELEMENT
], Component_ComputeFunction // COMPUTE_FUNCTION
, 1 // VALUE_POINTER_INDEX
]];