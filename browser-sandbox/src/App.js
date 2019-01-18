import React from "react";

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
  const now = new Date().getTime() / 1000;
  const minutes = (now - time) / 60;

  if (minutes < 60) {
    return Math.round(minutes) + " minutes ago";
  }
  return Math.round(minutes / 60) + " hours ago";
}

function getHostUrl(url): string {
  return (url + "")
    .replace("https://", "")
    .replace("http://", "")
    .split("/")[0];
}

function HeaderBar() {
  return (
    <tr
      style={{
        "background-color": "#222",
      }}
    >
      <table width="100%" style={{ padding: 4 }} cellSpacing={0} cellPadding={0}>
        <tbody>
          <td style={{ width: 18, paddingRight: 4 }}>
            <a href="#">
              <img src="logo.png" width={16} height={16} style={{ border: "1px solid #00d8ff" }} />
            </a>
          </td>
          <td style={{ "line-height": "12pt" }} height={10}>
            <span className="pagetop">
              <b className="hnname">React HN Benchmark</b>
              <a href="#">new</a> | <a href="#">comments</a> | <a href="#">show</a> | <a href="#">ask</a> |{" "}
              <a href="#">jobs</a> | <a href="#">submit</a>
            </span>
          </td>
        </tbody>
      </table>
    </tr>
  );
}

function Story({ story, rank }: { story: StoryType, rank: number }) {
  return (
    <>
      <tr className="athing">
        <td style={{ verticalAlign: "top", "text-align": "right" }} className="title">
          <span className="rank">{`${rank}.`}</span>
        </td>
        <td className="votelinks" style={{ "vertical-align": "top" }}>
          <center>
            <a href="#">
              <div className="votearrow" title="upvote" />
            </a>
          </center>
        </td>
        <td className="title">
          <a href="#" className="storylink">
            {story.title}
          </a>
          {story.url ? (
            <span className="sitebit comhead">
              {" "}
              (<a href="#">{getHostUrl(story.url)}</a>)
            </span>
          ) : null}
        </td>
      </tr>
      <tr>
        <td colSpan={2} />
        <td className="subtext">
          <span className="score">{`${story.score} points`}</span> by{" "}
          <a href="#" className="hnuser">
            {story.by}
          </a>{" "}
          <span className="age">
            <a href="#">{timeAge(story.time)}</a>
          </span>{" "}
          | <a href="#">hide</a> | <a href="#">{`${story.descendants || 0} comments`}</a>
        </td>
      </tr>
      <tr style={{ height: 5 }} className="spacer" />
    </>
  );
}

function StoryList({ stories }: { stories: Array<StoryType> }) {
  return (
    <tr>
      <td>
        <table cellPadding={0} cellSpacing={0} classList="itemlist">
          {stories.map(
            (story: Story, i: number): React.Node => (
              <Story story={story} rank={++i} key={story.id} />
            ),
          )}
        </table>
      </td>
    </tr>
  );
}

export function Component({ stories }: { stories: Array<StoryType> }) {
  return (
    <center>
      <table id="hnmain" border={0} cellPadding={0} cellSpacing={0} width="85%" style={{ "background-color": "#f6f6ef" }}>
        <tbody>
          <HeaderBar />
          <tr height={10} />
          <StoryList stories={stories} />
        </tbody>
      </table>
    </center>
  );
}

Component.compileRootComponent = true;