export class Position {
  constructor(
    public readonly startIndex: number,
    public readonly endIndex: number
  ) {}

  isEmpty() {
    return this.startIndex >= this.endIndex;
  }
}
