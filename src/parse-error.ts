import { Position } from "./position";

export class ParseError extends Error {
  constructor(message: string | undefined, public readonly pos?: Position) {
    super(message);
    Object.setPrototypeOf(this, ParseError.prototype);
  }
}

export function isParseError(e: unknown): e is ParseError {
  return e instanceof ParseError;
}
