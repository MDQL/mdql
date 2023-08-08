import exp from "constants";
import { MDQLCodeBlock } from "./mdql-codeblock";

describe("MQDLCodeBlock", () => {
  it("tests  MDQLCodeblock.scan()", () => {
    const testling = MDQLCodeBlock.scan(
      "```mdql\nSOMEQUERY\n```\n> foo\n> bar\n\n\n```mdql\nQRY\n```"
    );
    expect(testling[0].rawQuery).toBe("SOMEQUERY");
    expect(testling[0].queryPos.startIndex).toBe(8);
    expect(testling[0].queryPos.endIndex).toBe(17);
    expect(testling[0].blockPos.startIndex).toBe(0);
    expect(testling[0].blockPos.endIndex).toBe(34);
    expect(testling[0].contentPos.startIndex).toBe(22);
    expect(testling[0].contentPos.endIndex).toBe(34);
    expect(testling[1].rawQuery).toBe("QRY");
    expect(testling[1].blockPos.startIndex).toBe(36);
    expect(testling[1].contentPos.startIndex).toBe(51);
    expect(testling[1].contentPos.endIndex).toBe(51);
  });

  it("tests  MDQLCodeblock.scan()", () => {
    const testling = MDQLCodeBlock.scan(
      "```\n//some codeblock without infostring\n```"
    );
    expect(testling.length).toBe(0);
  });
});
