import { Operator } from "./query";
import { Filter } from "./query-filter";

describe("Filter", () => {
  it("shall support hierarchical keys", () => {
    const testling = new Filter("foo.bar.baz", Operator.EQUALS, "hello");
    const actualResult: any[] = testling.apply([
      {
        "foo.bar.baz": "hello",
      },
      {
        "foo.bar.baz": "fu",
      },
      {
        foo: "hello",
      },
    ]);
    expect(actualResult.length).toBe(1);
    expect(actualResult[0]["foo.bar.baz"]).toEqual("hello");
  });
});
