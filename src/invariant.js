import { InvariantError } from "./errors";

export default function invariant(condition: boolean, format: string = ""): void {
  if (condition) return;
  const message = `${format}
This is likely a bug or missing functionality in the compiler, not your code.`;
  let error = new InvariantError(message);
  error.name = "Invariant Violation";
  throw error;
}
