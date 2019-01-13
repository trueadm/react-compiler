import "react-compiler-runtime";
export function renderText(): string {
  return "Text!";
}
export function renderDiv(): React.Node {
  return [];
}
export function renderDivWithText(text: string): React.Node {
  return [text];
}
export const renderSpan = (): React.Node => [];