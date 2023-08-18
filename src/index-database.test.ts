import { Document } from "./data-model/document";
import { IndexDatabase } from "./index-database";

describe("IndexDatabase", () => {
  it("shall create tables", () => {
    const doc1: Document = {
      uri: "file://foo/bar.md",
      frontMatter: {},
      headings: [],
      tags: [],
      tasks: [],
    };

    const testling = new IndexDatabase();
    testling.import([doc1]);
  });
});
