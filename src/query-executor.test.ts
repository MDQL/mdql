import { DataSource } from "./data-sources/data-source";
import { Query } from "./query";
import { QueryExecutor } from "./query-executor";
import { Table } from "./table";
import { ViewType } from "./view-type";

describe("QueryExecutor", () => {
  const ds: DataSource = {
    tasks: () => [{ checked: true, status: "closed", text: "test", tags: [] }],
    documents: () => [],
    name: "dummy",
    refresh() {
      return Promise.resolve();
    },
  };
  it("tests tasks as list in Markdown", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(new Query(ViewType.LIST, ["text"], Table.TASKS, []))
      .toMarkdown();
    expect(result).toBe("- test");
  });
});
