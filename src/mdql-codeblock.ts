import { Query } from "./query";
import { ParseException } from "./parse-exception";
import { Position } from "./position";

const regex = /```mdqlgen\n(?<query>.+?)\n```(\n(?<content>(> .*)+))?/g;

export class MDQLCodeBlock {
  constructor(
    public readonly rawQuery: string,
    public readonly queryPos: Position,
    public readonly query?: Query,
    public readonly content?: string,
    public readonly contentPos?: Position,
    public readonly parseError?: unknown
  ) {}

  hasContent(): boolean {
    return this.content !== undefined && this.content.length > 0;
  }

  static parse(s: string): MDQLCodeBlock {
    const matches = regex.exec(s);
    const query = matches?.groups?.["query"];
    const content = matches?.groups?.["content"];

    let error: unknown;
    if (query) {
      const queryStartIndex = s.indexOf(query);
      const queryEndIndex = queryStartIndex + query?.length;
      const queryPos = new Position(queryStartIndex, queryEndIndex);

      let contentPos;
      if (content) {
        const contentStartPos = s.indexOf(content);
        const contentEndPos = contentStartPos + content.length;
        contentPos = new Position(contentStartPos, contentEndPos);
      }

      let mdqlQuery: Query | undefined = undefined;
      try {
        mdqlQuery = Query.parse(query);
      } catch (e) {
        error = e;
      }

      return new MDQLCodeBlock(
        query,
        queryPos,
        mdqlQuery,
        content,
        contentPos,
        error
      );
    } else {
      throw new ParseException("No query string found");
    }
  }
}
