import { createVNode } from "react-compiler-runtime";
// import React from "react";
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

function Image_ComputeFunction(height, src, style, width) {
  return [src, width, height, style["border"]];
}

function Link_ComputeFunction(children, className, href) {
  return [href || "#", className, children];
}

function HeaderBar_ComputeFunction() {
  return [[createVNode(__vnode_tpl_0), void 0, void 0], ["new", void 0, void 0], ["comments", void 0, void 0], ["show", void 0, void 0], ["ask", void 0, void 0], ["jobs", void 0, void 0], ["submit", void 0, void 0]];
}

function Story_ComputeFunction(rank, story) {
  timeAge(story["time"]);
  getHostUrl(story["url"]);
  return [rank, [createVNode(__vnode_tpl_1), void 0, void 0], [story["title"], "storylink", void 0], story["url"], [getHostUrl(story["url"]), void 0, void 0], story["score"], [story["by"], "hnuser", void 0], [timeAge(story["time"]), void 0, void 0], ["hide", void 0, void 0], [[story["descendants"] || 0, " comments"], void 0, void 0]];
}

function StoryList_ComputeFunction(stories) {
  return [stories["map"]((story: Story, i: number): React.Node => createVNode([12, Story, 0], [[++i, story]], null))];
}

function Component_ComputeFunction(stories) {
  return [[stories]];
}

function Link() {
  return [1, Link_ComputeFunction, [1154, "a", ["href", 0, 0, "className", 0, 1], [13, 2]]];
}

const Image = [1, Image_ComputeFunction, [262786, "img", ["src", 0, 0, "width", 0, 1, "height", 0, 2], ["border", 3]]];
const HeaderBar = [1, HeaderBar_ComputeFunction, [1282, "tr", ["background-color", "#222"], [1026, "td", [1346, "table", ["width", 0, "100%", "cellSpacing", 0, "0", "cellPadding", 0, "0"], ["padding", "4px"], [1026, "tbody", [2050, "tr", [[1282, "td", ["width", "18px", "padding-right", "4px"], [12, Link, 0]], [1346, "td", ["height", 0, "10"], ["line-height", "12pt"], [2114, "span", ["className", 0, "pagetop"], [[4162, "b", ["className", 0, "hnname"], "React HN Benchmark"], [12, Link, 1], [32771, " | "], [12, Link, 2], [32771, " | "], [12, Link, 3], [32771, " | "], [12, Link, 4], [32771, " | "], [12, Link, 5], [32771, " | "], [12, Link, 6]]]]]]]]]]];
const Story = [1, Story_ComputeFunction, [5, [[2114, "tr", ["className", 0, "athing"], [[1346, "td", ["className", 0, "title"], ["vertical-align", "top", "text-align", "right"], [2114, "span", ["className", 0, "rank"], [[3, 0], [32771, "."]]]], [1346, "td", ["className", 0, "votelinks"], ["vertical-align", "top"], [1026, "center", [12, Link, 1]]], [2114, "td", ["className", 0, "title"], [[12, Link, 2], [6, 3, [2114, "span", ["className", 0, "sitebit comhead"], [[32771, " "], [32771, "("], [12, Link, 4], [32771, ")"]]], [32772, null]]]]]], [2050, "tr", [[66, "td", ["colSpan", 0, "2"]], [2114, "td", ["className", 0, "subtext"], [[2114, "span", ["className", 0, "score"], [[3, 5], [32771, " points"]]], [32771, " by "], [12, Link, 6], [32771, " "], [1090, "span", ["className", 0, "age"], [12, Link, 7]], [32771, " | "], [12, Link, 8], [32771, " | "], [12, Link, 9]]]]], [66, "tr", ["className", 0, "spacer", "height", 0, "5"]]]]];
const StoryList = [1, StoryList_ComputeFunction, [1026, "tr", [1026, "td", [1090, "table", ["cellPadding", 0, "0", "cellSpacing", 0, "0", "classList", 0, "itemlist"], [1026, "tbody", [11, 0]]]]]];
const __vnode_tpl_0 = [76, Image, ["16", "logo.png", {
  ["border"]: "1px solid #00d8ff"
}, "16"]];
const __vnode_tpl_1 = [66, "div", ["className", 0, "votearrow", "title", 0, "upvote"]];
export const Component = [0, ["stories"], Component_ComputeFunction, [1026, "center", [1346, "table", ["id", 0, "hnmain", "border", 0, "0", "cellPadding", 0, "0", "cellSpacing", 0, "0", "width", 0, "85%"], ["background-color", "#f6f6ef"], [2050, "tbody", [[76, HeaderBar, []], [66, "tr", ["height", 0, "10"]], [12, StoryList, 0]]]]]];