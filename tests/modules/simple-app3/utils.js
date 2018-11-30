import React from "react";

export function renderText(): string {
  return "Text!";
}

export function renderDiv(): React.Node {
  return <div>span!</div>;
}

export function renderDivWithText(text: string): React.Node {
  return <div>{text}</div>;
}

export const renderSpan = (): React.Node => <span>Span!</span>;