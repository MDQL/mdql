import { CombinedDataSource } from "./data-sources/combined-data-source";
import { DataSource } from "./data-sources/data-source";
import { DocumentRepository } from "./data-sources/document-repository";
import { Document } from "./data-model/document";

describe("integration tests", () => {
  it("Index md directory and merge with another datasource", async () => {
    const docRepo = new DocumentRepository("testdata/**/*.md");
    const otherSource: DataSource<Document> = {
      name: "otherds",
      refresh: function (): Promise<void> {
        return Promise.resolve();
      },
      documents: function (): Document[] {
        const data: Document[] = [
          {
            frontMatter: {},
            headings: [],
            tags: [],
            tasks: [],
            uri: "file://foo/bar.md",
          },
        ];
        return data;
      },
    };
    const dataSource = new CombinedDataSource(docRepo, otherSource);
    await dataSource.refresh();

    const results = await dataSource.documents();
    expect(results.length).toBe(2);
    expect(results[0].data.length).toBe(3);
    expect(results[1].data.length).toBe(1);
    expect(results[0].dataSource).toBe("markdown");
    expect(results[1].dataSource).toBe("otherds");
  });
});
