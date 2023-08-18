import { DataSource } from "./data-sources/data-source";
import { Document } from "./data-model/document";
import { ParseError } from "./parse-error";
import { FieldMapping, KeyValueObject, Query } from "./query";
import { QueryResult } from "./query-result";
import { Table } from "./table";
import { IndexDatabase, MarkdownFile, Task } from "./index-database";

export class QueryExecutor {
  constructor(private index: IndexDatabase) {}

  async execute(query: Query): Promise<QueryResult> {
    let data: KeyValueObject[];

    //Get data from corresponding table
    switch (query.table) {
      case Table.TASKS:
        data = await this.index.Task.findAll();
        break;
      case Table.DOCUMENTS:
        data = await this.index.MarkdownFile.findAll();
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
            const aliasedKey = lookupAlias(key, query.fieldAliases);
            filteredObject[aliasedKey] = d[propName];
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

/**
 * Flatten objects to dotted key value list
 * @param obj
 * @param parentKey
 * @returns
 */
function flattenObject(obj: any, parentKey = ""): Record<string, any> {
  let result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (value !== null && Array.isArray(value)) {
      //set the old key to the joined value
      result[key] = value.join(",");
    }
    if (typeof value === "object" && value !== null) {
      const flattened = flattenObject(value, newKey);
      result = { ...result, ...flattened };
    } else {
      result[newKey] = value;
    }
  }

  return result;
}
function lookupAlias(key: string, fieldAliases?: FieldMapping[]): string {
  if (fieldAliases) {
    for (const alias of fieldAliases) {
      if (key === alias.field) {
        return alias.alias;
      }
    }
  }

  return key;
}
