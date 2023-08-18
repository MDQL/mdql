import { Heading } from "../data-model/heading";
import { QueryableTag } from "./queryable-tag";

export class QueryableHeading {
  static fromHeading(heading: Heading): any {
    return new QueryableHeading(
      heading.level,
      heading.text,
      heading.tags.map(QueryableTag.fromTag)
    );
  }
  constructor(
    private _level: number,
    private _text: string,
    private _tags: QueryableTag[]
  ) {}

  get level(): number {
    return this._level;
  }
  get text(): string {
    return this._text;
  }
  get tags(): QueryableTag[] {
    return this._tags;
  }
}
