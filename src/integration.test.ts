import { fail } from "assert";
import { CombinedDataSource } from "./data-sources/combined-data-source";
import { DataSource } from "./data-sources/data-source";
import { DocumentRepository } from "./data-sources/document-repository";
import { Document } from "./entities/document";
import { Task } from "./entities/task";
import exp from "constants";

describe("integration tests", () => {
  it("Index md directory and merge with another datasource", async () => {
    const docRepo = new DocumentRepository("testdata/**/*.md");
    const otherSource: DataSource = {
      name: "otherds",
      refresh: function (): Promise<void> {
        return Promise.resolve();
      },
      documents: function (): Document[] {
        const data: Document[] = [
          {
            frontMatter: {},
            headings: [],
            path: "none",
            tags: [],
            tasks: [],
            dataSource: this.name,
          },
        ];
        return data;
      },
      tasks: function (): Task[] {
        const data: Task[] = [
          {
            checked: false,
            status: "open",
            tags: [],
            text: "static task",
            dataSource: this.name,
          },
        ];
        return data;
      },
    };
    const dataSource = new CombinedDataSource(docRepo, otherSource);
    await dataSource.refresh();

    const documents = await dataSource.documents();
    expect(documents.length).toBe(4);
    expect(documents[0].dataSource).toBe("markdown");
    expect(documents[1].dataSource).toBe("markdown");
    expect(documents[2].dataSource).toBe("markdown");
    expect(documents[3].dataSource).toBe("otherds");
  });
});
