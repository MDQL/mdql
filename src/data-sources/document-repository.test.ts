import { DocumentRepository } from "./document-repository";

describe("DocumentRepository", () => {
  it("testdata scan", async () => {
    const docRepo = new DocumentRepository("testdata/**/*.md");
    await docRepo.refresh();

    const docs = docRepo.documents();
    expect(docs.length).toBe(3);
    expect(docs[0].uri).toBe("file://testdata/testdata.md");
    expect(docs[2].uri).toBe(
      "file://testdata/subfolder/some-other-document.md"
    );
    expect(docs[2].headings[0].level).toBe(1);
    expect(docs[2].headings[0].text).toBe("Another test document");
  });
});
