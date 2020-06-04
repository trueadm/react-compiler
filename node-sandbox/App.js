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

function Image({
  src,
  style,
  width,
  height,
}: {
  src: string,
  style: { border: string },
  width: string,
  height: string,
}) {
  return <img src={src} width={width} height={height} style={style} />;
}

function Link({
  children,
  href,
  className,
}: {
  children: string | React.Node,
  href: string | void,
  className: void | string,
}) {
  return (
    <a href={href || "#"} className={className}>
      {children}
    </a>
  );
}

function HeaderBar() {
  return (
    <tr style={{ "background-color": "#222" }}>
      <td>
        <table style={{ padding: "4px" }} width="100%" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td style={{ width: "18px", "padding-right": "4px" }}>
                <Link>
                  <Image src="logo.png" width="16" height="16" style={{ border: "1px solid #00d8ff" }} />
                </Link>
              </td>
              <td style={{ "line-height": "12pt" }} height="10">
                <span className="pagetop">
                  <b className="hnname">React HN Benchmark</b>
                  <Link>new</Link>
                  {" | "}
                  <Link>comments</Link>
                  {" | "}
                  <Link>show</Link>
                  {" | "}
                  <Link>ask</Link>
                  {" | "}
                  <Link>jobs</Link>
                  {" | "}
                  <Link>submit</Link>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

function Story({ story, rank }: { story: StoryType, rank: number }) {
  return (
    <>
      <tr className="athing">
        <td className="title" style={{ "vertical-align": "top", "text-align": "right" }}>
          <span className="rank">{rank}.</span>
        </td>
        <td className="votelinks" style={{ "vertical-align": "top" }}>
          <center>
            <Link>
              <div className="votearrow" title="upvote" />
            </Link>
          </center>
        </td>
        <td className="title">
          <Link className="storylink">{story.title}</Link>
          {story.url ? (
            <span className="sitebit comhead">
              {" "}
              (<Link>{getHostUrl(story.url)}</Link>)
            </span>
          ) : null}
        </td>
      </tr>
      <tr>
        <td colSpan="2" />
        <td className="subtext">
          <span className="score">{story.score} points</span>
          {" by "}
          <Link className="hnuser">{story.by}</Link>{" "}
          <span className="age">
            <Link>{timeAge(story.time)}</Link>
          </span>
          {" | "}
          <Link>hide</Link>
          {" | "}
          <Link>{story.descendants || 0} comments</Link>
        </td>
      </tr>
      <tr className="spacer" height="5" />
    </>
  );
}

function StoryList({ stories }: { stories: Array<StoryType> }) {
  return (
    <tr>
      <td>
        <table cellPadding="0" cellSpacing="0" classList="itemlist">
          <tbody>
            {stories.map(
              (story: Story, i: number): React.Node => (
                <Story story={story} rank={++i} key={story.id} />
              ),
            )}
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export function Component({ stories }: { stories: Array<StoryType> }) {
  return (
    <center>
      <table
        id="hnmain"
        border="0"
        cellPadding="0"
        cellSpacing="0"
        width="85%"
        style={{ "background-color": "#f6f6ef" }}
      >
        <tbody>
          <HeaderBar />
          <tr height="10" />
          <StoryList stories={stories} />
        </tbody>
      </table>
    </center>
  );
}

Component.compileRootComponent = true;
