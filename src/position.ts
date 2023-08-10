export class Range {
  constructor(public readonly start: Position, public readonly end: Position) {}

  static fromIndices(startIndex: number, endIndex: number, fullText: string) {
    return new Range(
      Position.fromIndex(startIndex, fullText),
      Position.fromIndex(endIndex, fullText)
    );
  }

  isEmpty() {
    return this.start.line === this.end.line && this.start.col === this.end.col;
  }
}

export class Position {
  /**
   *
   * @param line 1-based line number
   * @param col 1-based column number
   */
  constructor(public readonly line: number, public readonly col: number) {}

  toString(): string {
    return `${this.line}:${this.col}`;
  }
  //function that takes a string index and returns line and column
  static fromIndex(index: number, content: string) {
    const lines = content.split("\n");
    let currentLine = 0;
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for the newline character
      if (currentIndex + lineLength > index) {
        currentLine = i + 1; // Lines are 1-based
        break;
      }
      currentIndex += lineLength;
    }

    const column = index - currentIndex + 1; // Columns are 1-based

    return new Position(currentLine, column);
  }
}
