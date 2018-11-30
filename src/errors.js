// This error is thrown when a false invariant is encountered. This error should never be swallowed.
export class InvariantError extends Error {
  constructor(message: string) {
    super(message);
  }
}
