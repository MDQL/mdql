import exp from "constants";
import { MDQLCodeBlock } from "./mdql-codeblock";

describe("MQDLCodeBlock", () => {
  it("tests  MDQLCodeblock.parse()", () => {
    const testling = MDQLCodeBlock.scan(
      "```mdql\nSOMEQUERY\n```\n> foo\n> bar\n\n\n```mdql\nQRY\n```"
    );
    expect(testling[0].rawQuery).toBe("SOMEQUERY");
    expect(testling[0].queryPos.startIndex).toBe(8);
    expect(testling[0].queryPos.endIndex).toBe(17);
    expect(testling[0].blockPos.startIndex).toBe(0);
    expect(testling[0].blockPos.endIndex).toBe(34);
    expect(testling[1].rawQuery).toBe("QRY");
  });
});
