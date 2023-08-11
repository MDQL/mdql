import { DataSource } from "./data-sources/data-source";
import { ParseError } from "./parse-error";
import { KeyValueObject, Query } from "./query";
import { QueryResult } from "./query-result";
import { Table } from "./table";

export class QueryExecutor {
  constructor(private dataSource: DataSource) {}

  execute(query: Query): QueryResult {
    let data: KeyValueObject[];

    //Get data from corresponding table
    switch (query.table) {
      case Table.TASKS:
        data = this.dataSource.tasks();
        break;
      case Table.DOCUMENTS:
        data = this.dataSource.documents();
        break;
      default:
        throw new ParseError(
          `Executor doesn't support table '${query.table}' yet`
        );
    }

    //Flatten nested objects to key-value with dot notation for nested keys
    data = data.map((d) => flattenObject(d));

    //Execute filters
    for (const filter of query.filter) {
      data = filter.apply(data);
    }

    //Sort data
    if (query.sorter) {
      data = query.sorter.apply(data);
    }

    //Select fields based on fields array
    if (query.fields.length > 0) {
      data = data.map((d) => {
        const filteredObject: Record<string, any> = {};
        for (const key of query.fields) {
          const propName = getCaseInsensitivePropName(d, key);
          if (propName) {
            filteredObject[key] = d[propName];
          }
        }
        //force copying of all internal fields prefixed with $
        for (const key of Object.keys(d).filter((k) => k.startsWith("$"))) {
          filteredObject[key] = d[key];
        }
        return filteredObject;
      });
    }
    return new QueryResult(query, data);
  }
}

/**
 * Get the real case sensitive property name by providing an case insensitive property name
 * @param o
 * @param p
 * @returns
 */
function getCaseInsensitivePropName(o: any, p: string): string | undefined {
  for (const prop of Object.keys(o)) {
    if (prop.toLowerCase() === p.toLowerCase()) {
      return prop;
    }
  }
}

function flattenObject(obj: any, parentKey = ""): Record<string, any> {
  let result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      const flattened = flattenObject(value, newKey);
      result = { ...result, ...flattened };
    } else {
      result[newKey] = value;
    }
  }

  return result;
}
