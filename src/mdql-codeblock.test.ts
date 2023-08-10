import { MDQLCodeBlock } from "./mdql-codeblock";
import { ParseError, isParseError } from "./parse-error";

describe("MQDLCodeBlock", () => {
  it("tests  MDQLCodeblock.scan()", () => {
    const testling = MDQLCodeBlock.scan(
      "```mdql\nTASKLIST text FROM tasks\n```\n> foo\n> bar\n\n\n```mdql\nTASKLIST status FROM tasks\n```"
    );
    expect(isParseError(testling[0])).toBeFalsy();
    expect(isParseError(testling[1])).toBeFalsy();
    if (!isParseError(testling[0]) && !isParseError(testling[1])) {
      expect(testling[0].rawQuery).toBe("TASKLIST text FROM tasks");
      expect(testling[0].queryPos?.start.index).toBe(8);
      expect(testling[0].queryPos?.end.index).toBe(32);
      expect(testling[0].blockPos.start.index).toBe(0);
      expect(testling[0].blockPos.end.index).toBe(49);
      expect(testling[0].contentPos?.start.index).toBe(37);
      expect(testling[0].contentPos?.end.index).toBe(49);
      expect(testling[0].error).toBeUndefined();
      expect(testling[1].rawQuery).toBe("TASKLIST status FROM tasks");
      expect(testling[1].blockPos.start.index).toBe(51);
      expect(testling[1].contentPos?.start.index).toBe(89);
      expect(testling[1].contentPos?.end.index).toBe(89);
      expect(testling[1].error).toBeUndefined();
    }
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
});
