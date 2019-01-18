import React from "react";

export function renderText(): string {
  return "Text!";
}

export function renderDivOrNull(cond: boolean): React.Node {
  if (cond) {
    return null;
  }
  return <div>another span!</div>;
}

export function renderDivWithText(text: string): React.Node {
  return <div>{text}</div>;
}

export const renderSpan = (): React.Node => <span>Span!</span>;