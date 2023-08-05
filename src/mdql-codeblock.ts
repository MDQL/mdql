import { Query } from "./query";
import { ParseException } from "./parse-exception";
import { Position } from "./position";

const regex = /```mdql\n(?<query>.+?)\n```(\n(?<content>(> .*\n)+))?/g;

export class MDQLCodeBlock {
  constructor(
    /**
     * The position of the code block in the document
     */
    public readonly blockPos: Position,
    /**
     * The raw query as string
     */
    public readonly rawQuery: string,
    /**
     * The position of the query in the document
     */
    public readonly queryPos: Position,
    public readonly query?: Query,
    public readonly content?: string,
    public readonly contentPos?: Position,
    public readonly parseError?: unknown
  ) {}

  hasContent(): boolean {
    return this.content !== undefined && this.content.length > 0;
  }

  private static parse(match: RegExpExecArray, s: string): MDQLCodeBlock {
    const query = match?.groups?.["query"];
    const content = match?.groups?.["content"];
    const rawProps = match?.groups?.["properties"];

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

      const blockPos = new Position(match.index, match.index + match[0].length);

      let mdqlQuery: Query | undefined = undefined;
      try {
        mdqlQuery = Query.parse(query);
      } catch (e) {
        error = e;
      }

      return new MDQLCodeBlock(
        blockPos,
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

  static scan(s: string): MDQLCodeBlock[] {
    const result: MDQLCodeBlock[] = [];
    let match;
    while ((match = regex.exec(s))) {
      result.push(MDQLCodeBlock.parse(match, s));
    }
    return result;
  }
}
