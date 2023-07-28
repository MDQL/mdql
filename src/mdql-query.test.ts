import { Query, Operator } from "./mdql-query";
import { Table } from "./table";
import { ViewType } from "./view-type";

describe("mdql-query", () => {
  it("parse query without filters", () => {
    const query = "LIST text, status FROM tasks";
    const testling = Query.parse(query);

    expect(testling.fields).toEqual(["text", "status"]);
    expect(testling.filter).toEqual([]);
    expect(testling.table).toEqual(Table.TASKS);
    expect(testling.view).toEqual(ViewType.LIST);
  });

  it("parse query with all gizmos", () => {
    const query =
      "TASKLIST text, status, foo,Bar FROM tasks WHERE status='open' AND id !='123' AND text=~ 'hello'";
    const testling = Query.parse(query);

    expect(testling.fields).toEqual(["text", "status", "foo", "Bar"]);
    expect(testling.filter.length).toBe(3);
    expect(testling.filter[0].key).toBe("status");
    expect(testling.filter[0].operator).toBe(Operator.EQUALS);
    expect(testling.filter[0].value).toBe("open");
    expect(testling.filter[1].key).toBe("id");
    expect(testling.filter[1].operator).toBe(Operator.NOT_EQUALS);
    expect(testling.filter[1].value).toBe("123");
    expect(testling.filter[2].key).toBe("text");
    expect(testling.filter[2].operator).toBe(Operator.CONTAINS);
    expect(testling.filter[2].value).toBe("hello");
    expect(testling.table).toEqual(Table.TASKS);
    expect(testling.view).toEqual(ViewType.TASKLIST);
  });
});
