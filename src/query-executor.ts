import { DocumentRepository } from "./data-sources/document-repository";
import { ParseException } from "./parse-exception";
import { KeyValueObject, Query } from "./query";
import { QueryResult } from "./query-result";
import { Table } from "./table";

export class QueryExecutor {
  constructor(private database: DocumentRepository) {}

  async execute(query: Query): Promise<QueryResult> {
    let data: KeyValueObject[];

    //Get data from corresponding table
    switch (query.table) {
      case Table.TASKS:
        data = await this.database.tasks();
        break;
      case Table.DOCUMENTS:
        data = await this.database.documents();
        break;
      default:
        throw new ParseException(
          `Executor doesn't support table '${query.table}' yet`
        );
    }

    //Filter based on fields array
    data.map((d) => {
      const filteredObject: Record<string, any> = {};
      for (const key of query.fields) {
        if (d.hasOwnProperty(key)) {
          filteredObject[key] = d[key];
        }
      }
      return filteredObject;
    });

    //Execute filters
    for (const filter of query.filter) {
      data = filter.apply(data);
    }

    return new QueryResult(query, data);
  }
}
