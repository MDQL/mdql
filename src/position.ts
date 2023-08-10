export class Range {
  constructor(public readonly start: Position, public readonly end: Position) {}

  static fromIndices(startIndex: number, endIndex: number) {
    return new Range(new Position(startIndex), new Position(endIndex));
  }

  isEmpty() {
    return this.start.index >= this.end.index;
  }
}

export class Position {
  constructor(public readonly index: number) {}

  static fromLineAndCol(line: number, column: number, content: string) {
    const index =
      column +
      content
        .split("\n")
        .map((l) => l.length)
        .filter((v, i) => i + 1 < line)
        .reduce((total, current) => total + current, 0);
    return new Position(index);
  }
}
