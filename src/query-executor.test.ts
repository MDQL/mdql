import { DataSource } from "./data-sources/data-source";
import { Document } from "./data-sources/entities/document";
import { Operator, Query, SortOrder, Sorter } from "./query";
import { QueryExecutor } from "./query-executor";
import { Filter } from "./query-filter";
import { Table } from "./table";
import { ViewType } from "./view-type";

describe("QueryExecutor", () => {
  const ds: DataSource<Document> = {
    documents: () => [
      {
        frontMatter: {},
        headings: [],
        tags: [],
        uri: "file://foo/bar2.md",
        tasks: [
          {
            checked: true,

            text: "test",
            tags: [],
          },
          {
            checked: false,

            text: "second",
            tags: [],
          },
          {
            checked: false,

            text: "third",
            tags: [],
          },
        ],
      },
    ],
    name: "dummy",
    refresh() {
      return Promise.resolve();
    },
  };

  it("shall sort results DESC", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(
          ViewType.LIST,
          ["text"],
          Table.TASKS,
          [],
          new Sorter("text", SortOrder.DESC)
        )
      )
      .raw();
    expect(result).toMatchObject([
      { text: "third" },
      { text: "test" },
      { text: "second" },
    ]);
  });

  it("shall sort results ASC", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(
          ViewType.LIST,
          ["text"],
          Table.TASKS,
          [],
          new Sorter("text", SortOrder.ASC)
        )
      )
      .raw();
    expect(result).toMatchObject([
      { text: "second" },
      { text: "test" },
      { text: "third" },
    ]);
  });

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

  it("shall support aliases", () => {
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(
          ViewType.LIST,
          ["text"],
          Table.TASKS,
          [new Filter("text", Operator.EQUALS, "third")],
          undefined,
          [{ field: "text", alias: "some aliased title" }]
        )
      )
      .raw();
    expect(result).toMatchObject([{ "some aliased title": "third" }]);
  });

  it("shall allow selection of hierarchical fields", () => {
    const ds: DataSource<Document> = {
      documents: () => [
        {
          uri: "file://foo/bar.md",
          frontMatter: {
            foo: {
              bar: {
                baz: "hello",
              },
            },
          },
          headings: [],
          tags: [],
          tasks: [],
        },
      ],
      name: "dummy",
      refresh() {
        return Promise.resolve();
      },
    };

    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(
          ViewType.LIST,
          ["frontmatter.foo.bar.baz"],
          Table.DOCUMENTS,
          []
        )
      )
      .raw();
    expect(result).toMatchObject([{ "frontmatter.foo.bar.baz": "hello" }]);
  });

  it("shall support selecting documents by contained tags", () => {
    const ds: DataSource<Document> = {
      documents: () => [
        {
          uri: "file://foo/one.md",
          frontMatter: {
            foo: {
              bar: {
                baz: "hello",
              },
            },
          },
          headings: [],
          tags: [
            {
              text: "foo",
            },
            {
              text: "bar",
            },
          ],
          tasks: [],
        },
        {
          uri: "file://foo/two.md",
          frontMatter: {
            foo: {
              bar: {
                baz: "hello",
              },
            },
          },
          headings: [],
          path: "foo/two.md",
          tags: [
            {
              text: "baz",
            },
          ],
          tasks: [],
          dataSource: "dummy",
        },
      ],
      name: "dummy",
      refresh() {
        return Promise.resolve();
      },
    };
    const testling = new QueryExecutor(ds);
    const result = testling
      .execute(
        new Query(ViewType.LIST, ["path"], Table.DOCUMENTS, [
          new Filter("tags", Operator.CONTAINS, "foo"),
        ])
      )
      .raw();
    expect(result.length).toBe(1);
    expect(result).toMatchObject([{ path: "foo/one.md" }]);
  });
});
