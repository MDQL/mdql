import {
  CharStreams,
  CommonTokenStream,
  ErrorListener,
  RecognitionException,
  Recognizer,
} from "antlr4";
import MDQLLexer from "./generated/MDQLLexer";
import MDQLParser from "./generated/MDQLParser";
import { Table } from "./table";
import { ViewType } from "./view-type";
import { ParseError } from "./parse-error";
import { Position } from "./position";
import { Filter } from "./query-filter";

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
        throw new ParseError(`Unsupported operator '${s}'`);
    }
  }
}

export enum SortOrder {
  ASC,
  DESC,
}
export class Sorter {
  constructor(
    public readonly field: string,
    private readonly order: SortOrder
  ) {}

  apply<T extends KeyValueObject>(data: T[]): T[] {
    return data.sort((a, b) => {
      const aVal = a[this.field];
      const bVal = b[this.field];
      switch (this.order) {
        case SortOrder.ASC:
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        case SortOrder.DESC:
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        default:
          return 0;
      }
    });
  }
}

class ThrowingErrorListener<T> implements ErrorListener<T> {
  syntaxError(
    recognizer: Recognizer<T>,
    offendingSymbol: T,
    line: number,
    column: number,
    msg: string,
    e: RecognitionException | undefined
  ): void {
    column = column + 1; //Position columns are 1-based whereas ANTLR is 0-based
    throw new ParseError(msg + " " + e?.message, new Position(line, column));
  }
}

export type FieldMapping = { field: string; alias: string };
export class Query {
  constructor(
    public readonly view: ViewType,
    public readonly fields: string[],
    public readonly table: Table,
    public readonly filter: Filter[],
    public readonly sorter?: Sorter,
    public readonly fieldAliases?: FieldMapping[]
  ) {}

  static parse(s: string): Query {
    const stream = CharStreams.fromString(s);
    const lexer = new MDQLLexer(stream);

    lexer.addErrorListener(new ThrowingErrorListener());

    // Create a stream of tokens and give it to the parser
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new MDQLParser(tokenStream);
    parser.addErrorListener(new ThrowingErrorListener());
    const query = parser.query();

    let view;
    if (query.view().LIST()) {
      view = ViewType.LIST;
    } else if (query.view().TASKLIST()) {
      view = ViewType.TASKLIST;
    } else if (query.view().TABLE()) {
      view = ViewType.TABLE;
    } else {
      throw new ParseError("Unsupported view type");
    }

    let fields: string[] = [];
    let fieldAliases: FieldMapping[] = [];
    if (query.fields()) {
      for (const field of query.fields().field_list()) {
        if (field.aliased_field()) {
          const fieldName = field.aliased_field().FIELD().getText();
          const alias = field
            .aliased_field()
            .alias()
            .STRING_LITERAL()
            .getText()
            .slice(1, -1);
          fieldAliases.push({ field: fieldName, alias });
          fields.push(fieldName);
        } else {
          fields.push(field.getText());
        }
      }
    }
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
    let sorter: Sorter | undefined = undefined;
    if (query.sort_clause() !== null) {
      const order =
        query.sort_clause().DESC() !== null ? SortOrder.DESC : SortOrder.ASC;
      const field = query.sort_clause().FIELD().getText();
      sorter = new Sorter(field, order);
    }

    const pTable = Table.parse(table);
    return new Query(view, fields, pTable, filters || [], sorter, fieldAliases);
  }
}
