import { Query } from "./query";
import { ParseException } from "./parse-exception";
import { Position } from "./position";

const regex =
  /```(?<infostring>mdql( .*)?)\n(?<query>.+?)\n```(\n(?<content>(> .*\n?)+))?/g;

export class MDQLCodeBlock {
  constructor(
    /**
     * The position of the code block in the document
     */
    private readonly _blockPos: Position,
    /**
     * The raw query as string
     */
    private readonly _rawQuery: string,
    /**
     * The position of the query in the document
     */
    private readonly _queryPos: Position,
    /**
     * Info string of codeblock
     */
    private readonly _infoString: string,
    private readonly _contentPos: Position,

    private readonly _query?: Query,
    private readonly _content?: string,

    private readonly _parseError?: unknown
  ) {}

  /**
   * Get the parsed query.
   * @returns The query if parsing was successful, undefined otherwise
   */
  get query(): Query | undefined {
    return this._query;
  }

  /**
   * Get the injected content
   * @returns Injected content if there is any, undefined otherwise
   */
  get content(): string | undefined {
    return this._content;
  }

  get rawQuery(): string {
    return this._rawQuery;
  }

  get queryPos(): Position {
    return this._queryPos;
  }
  /**
   * Get the position of the whole codeblock (including injected content and query)
   * @returns Codeblock position
   */
  get blockPos(): Position {
    return this._blockPos;
  }
  /**
   * Get the info string of the codeblock
   * @returns Info string
   */
  get infoString(): string {
    return this._infoString;
  }
  /**
   * Get the position of the injected content
   * @returns Injected content position. If there is no injected content, returns the position a potential content shall be injected to
   */
  get contentPos(): Position {
    return this._contentPos;
  }

  /**
   * Error description in case there was a parsing error
   * @returns Error
   */
  get parseError(): unknown {
    return this._parseError;
  }

  hasContent(): boolean {
    return this.content !== undefined && this.content.length > 0;
  }

  /**
   * Parse a string as codeblock
   * @param match
   * @param s
   * @returns
   */
  private static parse(match: RegExpExecArray, s: string): MDQLCodeBlock {
    const query = match?.groups?.["query"];
    const content = match?.groups?.["content"];
    const infoString = match?.groups?.["infostring"] || "";

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
      } else {
        const blockStartAndEndMarker = "```";
        const index = s.indexOf(
          blockStartAndEndMarker,
          match.index + blockStartAndEndMarker.length
        ); //find the index of the block closing
        const pos = index + blockStartAndEndMarker.length;
        contentPos = new Position(pos, pos); //Start and end are the same since there is no content
      }

      const matchIndex = match.index;
      const blockPos = new Position(matchIndex, matchIndex + match[0].length);

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
        infoString,
        contentPos,
        mdqlQuery,
        content,
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
