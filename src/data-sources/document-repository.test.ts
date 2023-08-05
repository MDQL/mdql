import path from "path";
import { DocumentRepository } from "./document-repository";
import { fail } from "assert";

describe("DocumentRepository", () => {
  it("testdata scan", async () => {
    const docRepo = new DocumentRepository("testdata/**/*.md");
    await docRepo.refresh();

    const docs = docRepo.documents();
    expect(docs.length).toBe(2);
    expect(docs[0].dataSource).toBe("markdown");
    expect(docs[0].path).toBe("testdata/testdata.md");
    expect(docs[1].path).toBe("testdata/subfolder/some-other-document.md");
    expect(docs[1].headings[0].level).toBe(1);
    expect(docs[1].headings[0].text).toBe("Another test document");
  });
});
