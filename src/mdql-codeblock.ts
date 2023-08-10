import { Query } from "./query";
import { ParseError, isParseError } from "./parse-error";
import { Position, Range } from "./position";

const regex =
  /```(?<infostring>mdql( .*)?)\n(?<query>.+?)\n```(\n(?<content>(> .*\n?)+))?/g;

export class MDQLCodeBlock {
  constructor(
    private readonly _blockPos: Range,
    private readonly _rawQuery: string | undefined,
    private readonly _infoString: string,
    private readonly _contentPos: Range,
    private readonly _query?: Query,
    private readonly _queryPos?: Range,
    private readonly _content?: string,
    private readonly _error?: ParseError
  ) {}

  /**
   * Get the parsed query.
   * @returns The query if parsing was successful, undefined otherwise
   */
  get query(): Query | undefined {
    return this._query;
  }

  /**
   * Get the error produced while parsing the query
   */
  get error(): ParseError | undefined {
    return this._error;
  }

  /**
   * Get the injected content
   * @returns Injected content if there is any, undefined otherwise
   */
  get content(): string | undefined {
    return this._content;
  }

  get rawQuery(): string | undefined {
    return this._rawQuery;
  }

  get queryPos(): Range | undefined {
    return this._queryPos;
  }
  /**
   * Get the position of the whole codeblock (including injected content and query)
   * @returns Codeblock position
   */
  get blockPos(): Range {
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
  get contentPos(): Range {
    return this._contentPos;
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
    const rawQuery = match?.groups?.["query"];
    const content = match?.groups?.["content"];
    const infoString = match?.groups?.["infostring"] || "";

    const matchIndex = match.index;
    const blockPos = Range.fromIndices(
      matchIndex,
      matchIndex + match[0].length
    );

    let error: ParseError | undefined;
    let contentPos;
    let query: Query | undefined = undefined;
    let queryPos;

    if (content) {
      const contentStartPos = s.indexOf(content);
      const contentEndPos = contentStartPos + content.length;
      contentPos = Range.fromIndices(contentStartPos, contentEndPos);
    } else {
      const blockStartAndEndMarker = "```";
      const index = s.indexOf(
        blockStartAndEndMarker,
        match.index + blockStartAndEndMarker.length
      ); //find the index of the block closing
      const pos = index + blockStartAndEndMarker.length;
      contentPos = Range.fromIndices(pos, pos); //Start and end are the same since there is no content
    }

    try {
      if (rawQuery) {
        const queryStartIndex = s.indexOf(rawQuery);
        const queryEndIndex = queryStartIndex + rawQuery?.length;
        queryPos = Range.fromIndices(queryStartIndex, queryEndIndex);

        query = Query.parse(rawQuery);
      } else {
        throw new ParseError("No query string found", blockPos.start);
      }
    } catch (e) {
      if (isParseError(e)) {
        error = e;
      } else {
        throw e;
      }
    }
    return new MDQLCodeBlock(
      blockPos,
      rawQuery,
      infoString,
      contentPos,
      query,
      queryPos,
      content,
      error
    );
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
