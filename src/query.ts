import { CharStreams, CommonTokenStream } from "antlr4";
import MDQLLexer from "./generated/MDQLLexer";
import MDQLParser from "./generated/MDQLParser";
import { ParseException } from "./parse-exception";
import { Table } from "./table";
import { ViewType } from "./view-type";

export type KeyValueObject = {
  [key: string]: any;
};

export enum Operator {
  EQUALS,
  NOT_EQUALS,
  CONTAINS,
  STARTS_WITH,
  ENDS_WITH,
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
      case "=^":
        return Operator.STARTS_WITH;
      case "=$":
        return Operator.ENDS_WITH;
      default:
        throw new ParseException(`Unsupported operator '${s}'`);
    }
  }
}

export class Filter {
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
        case Operator.NOT_EQUALS:
          return actualValue !== this.value;
        case Operator.CONTAINS:
          return (actualValue as string).includes(this.value);
        case Operator.ENDS_WITH:
          return (actualValue as string).endsWith(this.value);
        case Operator.STARTS_WITH:
          return (actualValue as string).startsWith(this.value);
      }
    });
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
