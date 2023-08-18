import { DataSource } from "./data-sources/data-source";
import { Document } from "./data-model/document";
import { Operator, Query, SortOrder, Sorter } from "./query";
import { QueryExecutor } from "./query-executor";
import { Filter } from "./query-filter";
import { Table } from "./table";
import { ViewType } from "./view-type";
import { Database } from "sqlite3";
import { IndexDatabase } from "./index-database";

async function createMockDb() {
  const db = new IndexDatabase();
  await db.init();
  await db.import([
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
  ]);
  return db;
}

describe("QueryExecutor", () => {
  it("shall sort results DESC", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(
          ViewType.LIST,
          ["text"],
          Table.TASKS,
          [],
          new Sorter("text", SortOrder.DESC)
        )
      )
    ).raw();
    expect(result).toMatchObject([
      { text: "third" },
      { text: "test" },
      { text: "second" },
    ]);
  });

  it("shall sort results ASC", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = await testling.execute(
      new Query(
        ViewType.LIST,
        ["text"],
        Table.TASKS,
        [],
        new Sorter("text", SortOrder.ASC)
      )
    );

    expect(result.raw()).toMatchObject([
      { text: "second" },
      { text: "test" },
      { text: "third" },
    ]);
  });

  it("shall support status selection of tasks", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("status", Operator.EQUALS, "closed"),
        ])
      )
    ).raw();
    expect(result).toMatchObject([{ text: "test" }]);
  });

  it("shall support and operator", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("$uri", Operator.ENDS_WITH, "bar2.md"),
          new Filter("text", Operator.EQUALS, "third"),
        ])
      )
    ).raw();
    expect(result).toMatchObject([{ text: "third" }]);
  });

  it("shall support ends with operator", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("text", Operator.ENDS_WITH, "rd"),
        ])
      )
    ).raw();
    expect(result).toMatchObject([{ text: "third" }]);
  });

  it("shall support starts with operator", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [
          new Filter("text", Operator.STARTS_WITH, "sec"),
        ])
      )
    ).toMarkdown();
    expect(result).toBe("> - second");
  });

  it("tests tasks as list in Markdown", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.LIST, ["text"], Table.TASKS, [])
      )
    ).toMarkdown();
    expect(result).toBe("> - test\n> - second\n> - third");
  });

  it("tests MD Table rendering", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.TABLE, ["text"], Table.TASKS, [])
      )
    ).toMarkdown();
    expect(result).toEqual(
      "> | text |\n> | ---- |\n> | test |\n> | second |\n> | third |"
    );
  });

  it("tests MD Tasklist rendering", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(ViewType.TASKLIST, ["text"], Table.TASKS, [])
      )
    ).toMarkdown();
    expect(result).toEqual("> - [x] test\n> - [ ] second\n> - [ ] third");
  });

  it("shall support aliases", async () => {
    const testling = new QueryExecutor(await createMockDb());
    const result = (
      await testling.execute(
        new Query(
          ViewType.LIST,
          ["text"],
          Table.TASKS,
          [new Filter("text", Operator.EQUALS, "third")],
          undefined,
          [{ field: "text", alias: "some aliased title" }]
        )
      )
    ).raw();
    expect(result).toMatchObject([{ "some aliased title": "third" }]);
  });

  it("shall allow selection of hierarchical fields", async () => {
    const db = new IndexDatabase();
    await db.init();
    db.import([
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
    ]);

    const testling = new QueryExecutor(db);
    const result = (
      await testling.execute(
        new Query(
          ViewType.LIST,
          ["frontmatter.foo.bar.baz"],
          Table.DOCUMENTS,
          []
        )
      )
    ).raw();
    expect(result).toMatchObject([{ "frontmatter.foo.bar.baz": "hello" }]);
  });

  it("shall support selecting documents by contained tags", async () => {
    const db = new IndexDatabase();
    await db.init();
    await db.import([
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

        tags: [
          {
            text: "baz",
          },
        ],
        tasks: [],
      },
    ]);
    const testling = new QueryExecutor(db);
    const result = (
      await testling.execute(
        new Query(ViewType.LIST, ["path"], Table.DOCUMENTS, [
          new Filter("tags", Operator.CONTAINS, "foo"),
        ])
      )
    ).raw();
    expect(result.length).toBe(1);
    expect(result).toMatchObject([{ path: "foo/one.md" }]);
  });
});
