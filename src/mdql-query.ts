import { DocumentRepository } from "./data-sources/document-repository";
import { ParseException } from "./parse-exception";
import { Table } from "./table";
import { ViewType } from "./view-type";
import MDQLLexer from "./generated/MDQLLexer";
import MDQLParser from "./generated/MDQLParser";
import { CharStreams, CommonTokenStream } from "antlr4";

export type KeyValueObject = {
  [key: string]: any;
};

export enum Operator {
  EQUALS,
  NOT_EQUALS,
  CONTAINS,
}
export namespace Operator {
  export function parse(s: string): Operator {
    switch (s.toLowerCase()) {
      case "=":
        return Operator.EQUALS;
      case "!=":
        return Operator.NOT_EQUALS;
      case "=~":
        return Operator.CONTAINS;
      default:
        throw new ParseException(`Unsupported operator '${s}'`);
    }
  }
}

class Filter {
  constructor(
    public readonly key: string,
    public readonly operator: Operator,
    public readonly value: any
  ) {}

  apply<T extends KeyValueObject>(data: T[]): T[] {
    return data.filter((d) => {
      const actualValue = d[this.key];
      switch (this.operator) {
        case Operator.EQUALS:
          return actualValue === this.value;
      }
    });
  }
}

function joinAllFields(o: any, separator: string) {
  Object.keys(o)
    .map((key) => o[key])
    .join(separator);
}
export class QueryResult {
  constructor(private query: Query, private result: KeyValueObject[]) {}

  toMarkdown(
    config: {
      fieldSeparator: string;
      lineSeparator: string;
    } = {
      fieldSeparator: ";",
      lineSeparator: "\n",
    }
  ): string {
    let lines: string[];
    const data = this.result;
    switch (this.query.view) {
      case ViewType.LIST:
        lines = data.map((r) => {
          const allFields = joinAllFields(r, config.fieldSeparator);
          return `- ${allFields}`;
        });
        break;

      case ViewType.TABLE:
        lines = data.map((r) => {
          const allFields = joinAllFields(r, " | ");
          return `| ${allFields} |`;
        });
        break;
      case ViewType.TASKLIST:
        lines = data.map((r) => {
          const allFields = joinAllFields(r, config.fieldSeparator);
          const checked = r["checked"];
          return `- [${checked ? "x" : " "}] ${allFields}`;
        });
        break;
    }
    return lines.join(config.lineSeparator);
  }
}

export class Query {
  constructor(
    public readonly view: ViewType,
    public readonly fields: string[],
    public readonly table: Table,
    public readonly filter: Filter[]
  ) {}

  static parse(s: string): Query {
    const stream = CharStreams.fromString(s);
    const lexer = new MDQLLexer(stream);

    // Create a stream of tokens and give it to the parser
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new MDQLParser(tokenStream);
    const query = parser.query();

    const view = query.view().getText();
    const fields = query
      .fields()
      .FIELD_list()
      .map((f) => f.getText().trim());
    const table = query.table().getText();
    const filters = query
      .filters()
      ?.attr_filter_list()
      .map(
        (f) =>
          new Filter(
            f.FIELD().getText(),
            Operator.parse(f.COMPARE_OPERATOR().getText()),
            f.STRING_LITERAL().getText().slice(1, -1)
          )
      );

    const pView = ViewType.parse(view);
    const pTable = Table.parse(table);
    return new Query(pView, fields, pTable, filters || []);
  }
}

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
