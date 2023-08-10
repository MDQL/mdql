import { Position } from "./position";

describe("Position", () => {
  it("shall convert line and col to index", () => {
    const actual = Position.fromLineAndCol(
      2,
      3,
      `123
456`
    );
    expect(actual.index).toBe(6);
  });
});
