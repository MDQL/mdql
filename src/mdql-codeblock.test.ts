import { MDQLCodeBlock } from "./mdql-codeblock";
import { ParseError, isParseError } from "./parse-error";
import { Position } from "./position";

describe("MQDLCodeBlock", () => {
  it("tests  MDQLCodeblock.scan()", () => {
    const testling = MDQLCodeBlock.scan(
      "```mdql\nTASKLIST text FROM tasks\n```\n> foo\n> bar\n\n\n```mdql\nTASKLIST status FROM tasks\n```"
    );
    expect(isParseError(testling[0])).toBeFalsy();
    expect(isParseError(testling[1])).toBeFalsy();
    if (!isParseError(testling[0]) && !isParseError(testling[1])) {
      expect(testling[0].rawQuery).toBe("TASKLIST text FROM tasks");
      expect(testling[0].queryPos?.start).toEqual(new Position(2, 1));
      expect(testling[0].queryPos?.end).toEqual(new Position(2, 25));
      expect(testling[0].blockPos.start).toEqual(new Position(1, 1));
      expect(testling[0].blockPos.end).toEqual(new Position(5, 6));
      expect(testling[0].contentPos?.start).toEqual(new Position(4, 1));
      expect(testling[0].contentPos?.end).toEqual(new Position(5, 6));
      expect(testling[0].error).toBeUndefined();
      expect(testling[1].rawQuery).toBe("TASKLIST status FROM tasks");
      expect(testling[1].blockPos.start).toEqual(new Position(8, 1));
      expect(testling[1].contentPos?.start).toEqual(new Position(10, 4));
      expect(testling[1].contentPos?.end).toEqual(new Position(10, 4));
      expect(testling[1].contentPos.isEmpty()).toBeTruthy();
      expect(testling[1].error).toBeUndefined();
    }
  });

  it("shall recognize mdql block with leading line breaks", () => {
    const testling = MDQLCodeBlock.scan(
      "```mdql\n\n\nTASKLIST text FROM tasks\n\n```"
    );
    expect(testling.length).toBe(1);
  });

  it("tests  MDQLCodeblock.scan()", () => {
    const testling = MDQLCodeBlock.scan(
      "```\n//some codeblock without infostring\n```"
    );
    expect(testling.length).toBe(0);
  });

  it("shall fail for invalid mqdl syntax", () => {
    const actual = MDQLCodeBlock.scan("```mdql\nSOMEQUERY\n```");
    expect(actual[0].error).toBeInstanceOf(ParseError);
  });
  it("shall fail using example", () => {
    const testquery = "```mdql\nTASKLIST text FRpOhM tasks\n```";
    const actual = MDQLCodeBlock.scan(testquery);
    expect(actual[0].error).toBeInstanceOf(ParseError);
  });
});
