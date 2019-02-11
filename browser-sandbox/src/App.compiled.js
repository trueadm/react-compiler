import { createVNode } from "react-compiler-runtime";
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

function HeaderBar_ComputeFunction() {
  return [];
}

function Story_ComputeFunction(rank, story) {
  var __cached__1;

  var __cached__0;

  __cached__1 = timeAge(story["time"]);
  __cached__0 = getHostUrl(story["url"]);
  return [`${rank}.`, story["title"], story["url"], __cached__0, `${story["score"]} points`, story["by"], __cached__1, `${story["descendants"] || 0} comments`];
}

function StoryList_ComputeFunction(stories) {
  return [stories["map"]((story: Story, i: number): React.Node => createVNode([12, Story, 0], [[++i, story]], null))];
}

function Component_ComputeFunction(stories) {
  return [[stories]];
}

const Story = [1, Story_ComputeFunction, [5, [[2114, "tr", ["className", 0, "athing"], [[1346, "td", ["className", 0, "title"], ["vertical-align", "top", "text-align", "right"], [8258, "span", ["className", 0, "rank"], 0]], [1346, "td", ["className", 0, "votelinks"], ["vertical-align", "top"], [1026, "center", [1090, "a", ["href", 0, "#"], [66, "div", ["className", 0, "votearrow", "title", 0, "upvote"]]]]], [2114, "td", ["className", 0, "title"], [[8258, "a", ["href", 0, "#", "className", 0, "storylink"], 1], [6, 2, [2114, "span", ["className", 0, "sitebit comhead"], [[32771, " ("], [8258, "a", ["href", 0, "#"], 3], [32771, ")"]]], [32772, null]]]]]], [2050, "tr", [[66, "td", ["colSpan", 0, 2]], [2114, "td", ["className", 0, "subtext"], [[8258, "span", ["className", 0, "score"], 4], [32771, " by "], [8258, "a", ["href", 0, "#", "className", 0, "hnuser"], 5], [32771, " "], [1090, "span", ["className", 0, "age"], [8258, "a", ["href", 0, "#"], 6]], [32771, " | "], [4162, "a", ["href", 0, "#"], "hide"], [32771, " | "], [8258, "a", ["href", 0, "#"], 7]]]]], [322, "tr", ["className", 0, "spacer"], ["height", "5px"]]]]];
const StoryList = [1, StoryList_ComputeFunction, [1026, "tr", [1026, "td", [1090, "table", ["cellPadding", 0, 0, "cellSpacing", 0, 0, "classList", 0, "itemlist"], [1026, "tbody", [11, 0]]]]]];
export const Component = [0, ["stories"], Component_ComputeFunction, [1026, "center", [1346, "table", ["id", 0, "hnmain", "border", 0, 0, "cellPadding", 0, 0, "cellSpacing", 0, 0, "width", 0, "85%"], ["background-color", "#f6f6ef"], [2050, "tbody", [[99586, "tr", ["background-color", "#222"], [1346, "table", ["width", 0, "100%", "cellSpacing", 0, 0, "cellPadding", 0, 0], ["padding", "4px"], [1026, "tbody", [2050, "tr", [[1282, "td", ["width", "18px", "padding-right", "4px"], [1090, "a", ["href", 0, "#"], [262466, "img", ["src", 0, "logo.png", "width", 0, 16, "height", 0, 16], ["border", "1px solid #00d8ff"]]]], [1346, "td", ["height", 0, 10], ["line-height", "12pt"], [2114, "span", ["className", 0, "pagetop"], [[4162, "b", ["className", 0, "hnname"], "React HN Benchmark"], [4162, "a", ["href", 0, "#"], "new"], [32771, " | "], [4162, "a", ["href", 0, "#"], "comments"], [32771, " | "], [4162, "a", ["href", 0, "#"], "show"], [32771, " | "], [4162, "a", ["href", 0, "#"], "ask"], [32771, " | "], [4162, "a", ["href", 0, "#"], "jobs"], [32771, " | "], [4162, "a", ["href", 0, "#"], "submit"]]]]]]]]], [66, "tr", ["height", 0, 10]], [12, StoryList, 0]]]]]];