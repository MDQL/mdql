import { ParseError, isParseError } from "./parse-error";
import { Position } from "./position";
import { Operator, Query } from "./query";
import { Table } from "./table";
import { ViewType } from "./view-type";

describe("mdql-query", () => {
  it("parse query without filters", () => {
    const query = "LIST text, status FROM tasks";
    const testling = Query.parse(query);
    expect(isParseError(testling)).toBeFalsy();
    if (!isParseError(testling)) {
      expect(testling.fields).toEqual(["text", "status"]);
      expect(testling.filter).toEqual([]);
      expect(testling.table).toEqual(Table.TASKS);
      expect(testling.view).toEqual(ViewType.LIST);
    }
  });

  it("Shall report parsing errors", () => {
    expect(() => {
      Query.parse("LIST text, status @ FROM tasks");
    }).toThrow(ParseError);

    try {
      Query.parse("LIST text, status @ FROM tasks");
    } catch (e) {
      expect(e).toBeTruthy();
      expect((e as ParseError).pos).toEqual(new Position(1, 19));
    }
  });

  it("shall parse hierarchical field names", () => {
    const query = "LIST foo.bar.baz, status FROM tasks";
    const testling = Query.parse(query);
    expect(isParseError(testling)).toBeFalsy();
    if (!isParseError(testling)) {
      expect(testling.fields).toEqual(["foo.bar.baz", "status"]);
      expect(testling.filter).toEqual([]);
      expect(testling.table).toEqual(Table.TASKS);
      expect(testling.view).toEqual(ViewType.LIST);
    }
  });
  it("shall return all fields if none is specified", () => {
    const query = "LIST FROM tasks";
    const testling = Query.parse(query);
    expect(isParseError(testling)).toBeFalsy();
    if (!isParseError(testling)) {
      expect(testling.fields).toEqual([]);
      expect(testling.filter).toEqual([]);
      expect(testling.table).toEqual(Table.TASKS);
      expect(testling.view).toEqual(ViewType.LIST);
    }
  });
  it("parse query with all gizmos", () => {
    const query =
      "TASKLIST text, status, foo,Bar FROM tasks WHERE status='open' AND id !='123' AND text=~ 'hello' AND text=^'hell' AND text=$'llo' SORT status DESC";
    const testling = Query.parse(query);

    expect(isParseError(testling)).toBeFalsy();
    if (!isParseError(testling)) {
      expect(testling.fields).toEqual(["text", "status", "foo", "Bar"]);
      expect(testling.filter.length).toBe(5);
      expect(testling.filter[0].key).toBe("status");
      expect(testling.filter[0].operator).toBe(Operator.EQUALS);
      expect(testling.filter[0].value).toBe("open");
      expect(testling.filter[1].key).toBe("id");
      expect(testling.filter[1].operator).toBe(Operator.NOT_EQUALS);
      expect(testling.filter[1].value).toBe("123");
      expect(testling.filter[2].key).toBe("text");
      expect(testling.filter[2].operator).toBe(Operator.CONTAINS);
      expect(testling.filter[2].value).toBe("hello");
      expect(testling.filter[3].key).toBe("text");
      expect(testling.filter[3].operator).toBe(Operator.STARTS_WITH);
      expect(testling.filter[3].value).toBe("hell");
      expect(testling.filter[4].key).toBe("text");
      expect(testling.filter[4].operator).toBe(Operator.ENDS_WITH);
      expect(testling.filter[4].value).toBe("llo");
      expect(testling.sorter).toBeDefined();
      expect(testling.sorter?.field).toBe("status");
      expect(testling.table).toEqual(Table.TASKS);
      expect(testling.view).toEqual(ViewType.TASKLIST);
    }
  });

  it("shall create alias map if aliases are given", () => {
    const query = "TASKLIST text as 'desc', status as 'foo' FROM tasks";
    const testling = Query.parse(query);
    expect(isParseError(testling)).toBeFalsy();
    if (!isParseError(testling)) {
      expect(testling.fieldAliases).toEqual([
        { field: "text", alias: "desc" },
        { field: "status", alias: "foo" },
      ]);
    }
  });
});
