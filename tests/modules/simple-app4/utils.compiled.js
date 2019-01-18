import "react-compiler-runtime";
export function renderText(): string {
  return "Text!";
}
export function renderDivOrNull(cond: boolean): React.Node {
  if (cond) {
    return null;
  }

  return [];
}
export function renderDivWithText(text: string): React.Node {
  return [text];
}
export const renderSpan = (): React.Node => [];