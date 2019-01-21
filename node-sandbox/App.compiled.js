// props_from_file:tests/benchmarks/hacker-news.json
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
    , 0 // COMPUTE_FUNCTION
    , [0 // OPEN_ELEMENT
    , "tr", 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "background-color", "#222", 22 // CLOSE_PROP_STYLE
    , 0 // OPEN_ELEMENT
    , "table", 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "padding", "4px", 22 // CLOSE_PROP_STYLE
    , 38 // STATIC_PROP
    , "width", "100%", 38 // STATIC_PROP
    , "cellSpacing", 0, 38 // STATIC_PROP
    , "cellPadding", 0, 0 // OPEN_ELEMENT
    , "tbody", 0 // OPEN_ELEMENT
    , "tr", 0 // OPEN_ELEMENT
    , "td", 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "width", "18px", 44 // STATIC_PROP_STYLE
    , "padding-right", "4px", 22 // CLOSE_PROP_STYLE
    , 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 6 // OPEN_VOID_ELEMENT
    , "img", 38 // STATIC_PROP
    , "src", "logo.png", 38 // STATIC_PROP
    , "width", 16, 38 // STATIC_PROP
    , "height", 16, 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "border", "1px solid #00d8ff", 22 // CLOSE_PROP_STYLE
    , 9 // CLOSE_VOID_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 21 // OPEN_PROP_STYLE
    , 46 // STATIC_PROP_UNITLESS_STYLE
    , "line-height", "12pt", 22 // CLOSE_PROP_STYLE
    , 38 // STATIC_PROP
    , "height", 10, 4 // OPEN_ELEMENT_SPAN
    , 40 // STATIC_PROP_CLASS_NAME
    , "pagetop", 0 // OPEN_ELEMENT
    , "b", 40 // STATIC_PROP_CLASS_NAME
    , "hnname", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "React HN Benchmark", 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "new", 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "comments", 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "show", 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "ask", 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "jobs", 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "submit", 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
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
    , Story_ComputeFunction // COMPUTE_FUNCTION
    , [16 // OPEN_FRAGMENT
    , 0 // OPEN_ELEMENT
    , "tr", 40 // STATIC_PROP_CLASS_NAME
    , "athing", 0 // OPEN_ELEMENT
    , "td", 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "vertical-align", "top", 44 // STATIC_PROP_STYLE
    , "text-align", "right", 22 // CLOSE_PROP_STYLE
    , 40 // STATIC_PROP_CLASS_NAME
    , "title", 4 // OPEN_ELEMENT_SPAN
    , 40 // STATIC_PROP_CLASS_NAME
    , "rank", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 0, 0 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 40 // STATIC_PROP_CLASS_NAME
    , "votelinks", 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "vertical-align", "top", 22 // CLOSE_PROP_STYLE
    , 0 // OPEN_ELEMENT
    , "center", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 2 // OPEN_ELEMENT_DIV
    , 40 // STATIC_PROP_CLASS_NAME
    , "votearrow", 38 // STATIC_PROP
    , "title", "upvote", 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 40 // STATIC_PROP_CLASS_NAME
    , "title", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 40 // STATIC_PROP_CLASS_NAME
    , "storylink", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 1, 1 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 15 // CONDITIONAL
    , 2 // VALUE_POINTER_INDEX
    , 2, [4 // OPEN_ELEMENT_SPAN
    , 40 // STATIC_PROP_CLASS_NAME
    , "sitebit comhead", 28 // ELEMENT_STATIC_CHILD_VALUE
    , " (", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 3, 3 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , ")", 8 // CLOSE_ELEMENT
    ] // CONDITIONAL_CONSEQUENT
    , 0 // CONDITIONAL_ALTERNATE
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "tr", 0 // OPEN_ELEMENT
    , "td", 38 // STATIC_PROP
    , "colSpan", 2, 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "td", 40 // STATIC_PROP_CLASS_NAME
    , "subtext", 4 // OPEN_ELEMENT_SPAN
    , 40 // STATIC_PROP_CLASS_NAME
    , "score", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 4, 4 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " by ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 40 // STATIC_PROP_CLASS_NAME
    , "hnuser", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 5, 5 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " ", 4 // OPEN_ELEMENT_SPAN
    , 40 // STATIC_PROP_CLASS_NAME
    , "age", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 6, 6 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 29 // ELEMENT_STATIC_CHILDREN_VALUE
    , "hide", 8 // CLOSE_ELEMENT
    , 28 // ELEMENT_STATIC_CHILD_VALUE
    , " | ", 0 // OPEN_ELEMENT
    , "a", 38 // STATIC_PROP
    , "href", "#", 31 // ELEMENT_DYNAMIC_CHILDREN_VALUE
    , 7, 7 // HOST_NODE_VALUE_POINTER_INDEX
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 0 // OPEN_ELEMENT
    , "tr", 21 // OPEN_PROP_STYLE
    , 44 // STATIC_PROP_STYLE
    , "height", "5px", 22 // CLOSE_PROP_STYLE
    , 40 // STATIC_PROP_CLASS_NAME
    , "spacer", 8 // CLOSE_ELEMENT
    , 17 // CLOSE_FRAGMENT
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
    , StoryList_ComputeFunction // COMPUTE_FUNCTION
    , [0 // OPEN_ELEMENT
    , "tr", 0 // OPEN_ELEMENT
    , "td", 0 // OPEN_ELEMENT
    , "table", 38 // STATIC_PROP
    , "cellPadding", 0, 38 // STATIC_PROP
    , "cellSpacing", 0, 38 // STATIC_PROP
    , "classList", "itemlist", 1 // OPEN_ELEMENT_WITH_POINTER
    , "tbody", 0 // HOST_NODE_VALUE_POINTER_INDEX
    , 34 // ELEMENT_DYNAMIC_CHILDREN_ARRAY_MAP_TEMPLATE
    , 0, [25 // REF_COMPONENT
    , Story, 0 // COMPONENT_PROPS_ARRAY
    ] // ARRAY_MAP_OPCODES
    , 1 // ARRAY_MAP_COMPUTE_FUNCTION
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    , 8 // CLOSE_ELEMENT
    ]]
  );
}

function App_ComputeFunction(stories) {
  return [[stories]];
}

function App(mode) {
  openComponent(0, App_ComputeFunction);
    openElement('center');
      openElement('table');
        staticProp('id', 'hnmain');
        staticProp('border', 0);
        staticProp('cellPadding', 0);
        staticProp('cellSpacing', 0);
        staticProp('width', '85%');
        openPropStyle();
          staticPropStyle('background-color', '#f6f6ef');
        closePropStyle();
        openElement('tbody');
          openElement('tr');
            staticProp('height', '10');
          closeElement();
        closeElement();
      closeElement();
    closeElement();
  closeComponent();
}

// var App = // App OPCODES
// [10 // COMPONENT
// , 0 // USES_HOOKS
// , ["stories"] // ROOT_PROPS_SHAPE
// , App_ComputeFunction // COMPUTE_FUNCTION
// , [0 // OPEN_ELEMENT
// , "center", 0 // OPEN_ELEMENT
// , "table", 38 // STATIC_PROP
// , "id", "hnmain", 38 // STATIC_PROP
// , "border", 0, 38 // STATIC_PROP
// , "cellPadding", 0, 38 // STATIC_PROP
// , "cellSpacing", 0, 38 // STATIC_PROP
// , "width", "85%", 21 // OPEN_PROP_STYLE
// , 44 // STATIC_PROP_STYLE
// , "background-color", "#f6f6ef", 22 // CLOSE_PROP_STYLE
// , 0 // OPEN_ELEMENT
// , "tbody", 25 // REF_COMPONENT
// , HeaderBar, null // COMPONENT_PROPS_ARRAY
// , 0 // OPEN_ELEMENT
// , "tr", 38 // STATIC_PROP
// , "height", 10, 8 // CLOSE_ELEMENT
// , 25 // REF_COMPONENT
// , StoryList, 0 // COMPONENT_PROPS_ARRAY
// , 8 // CLOSE_ELEMENT
// , 8 // CLOSE_ELEMENT
// , 8 // CLOSE_ELEMENT
// ]];
module["exports"] = App;