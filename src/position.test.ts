import { Position } from "./position";

describe("Position", () => {
  it("shall convert line and col to index", () => {
    const actual = Position.fromIndex(
      6,
      `123
456
789`
    );

    expect(actual).toEqual(new Position(2, 3));
  });

  it("shall convert at first char", () => {
    const actual = Position.fromIndex(
      0,
      `123
456
789`
    );

    expect(actual).toEqual(new Position(1, 1));
  });

  it("shall convert at last char", () => {
    const actual = Position.fromIndex(
      10,
      `012
345
678`
    );

    expect(actual).toEqual(new Position(3, 3));
  });
});
