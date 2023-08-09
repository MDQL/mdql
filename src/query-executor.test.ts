import { DataSource } from "./data-sources/data-source";
import { Filter, Operator, Query } from "./query";
import { QueryExecutor } from "./query-executor";
import { Table } from "./table";
import { ViewType } from "./view-type";

describe("QueryExecutor", () => {
  const ds: DataSource = {
    tasks: () => [
      {
        $checked: true,
        status: "closed",
        text: "test",
        tags: [],
        $uri: "file://foo/bar.md",
      },
      {
        $checked: false,
        status: "open",
        text: "second",
        tags: [],
        $uri: "file://foo/bar2.md",
      },
      {
        $checked: false,
        status: "open",
        text: "third",
        tags: [],
        $uri: "file://foo/bar2.md",
      },
    ],
    documents: () => [],
    name: "dummy",
    refresh() {
      return Promise.resolve();
    },
  };

  it("shall support status selection of tasks", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("status", Operator.EQUALS, "closed"),
        ])
      )
      .raw();
    expect(result).toMatchObject([{ text: "test" }]);
  });

  it("shall support and operator", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("$uri", Operator.ENDS_WITH, "bar2.md"),
          new Filter("text", Operator.EQUALS, "third"),
        ])
      )
      .raw();
    expect(result).toMatchObject([{ text: "third" }]);
  });

  it("shall support ends with operator", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("text", Operator.ENDS_WITH, "rd"),
        ])
      )
      .raw();
    expect(result).toMatchObject([{ text: "third" }]);
  });

  it("shall support starts with operator", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("text", Operator.STARTS_WITH, "sec"),
        ])
      )
      .toMarkdown();
    expect(result).toBe("> - second");
  });

  it("tests tasks as list in Markdown", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(new Query(ViewType.LIST, ["text"], Table.TASKS, []))
      .toMarkdown();
    expect(result).toBe("> - test\n> - second\n> - third");
  });
  it("tests MD Table rendering", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(new Query(ViewType.TABLE, ["text"], Table.TASKS, []))
      .toMarkdown();
    expect(result).toEqual(
      "> | text |\n> | ---- |\n> | test |\n> | second |\n> | third |"
    );
  });

  it("tests MD Tasklist rendering", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(new Query(ViewType.TASKLIST, ["text"], Table.TASKS, []))
      .toMarkdown();
    expect(result).toEqual("> - [x] test\n> - [ ] second\n> - [ ] third");
  });
});
