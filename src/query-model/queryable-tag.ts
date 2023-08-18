import { Tag } from "../data-model/tag";

export class QueryableTag {
  static fromTag(fromTag: Tag): QueryableTag {
    return new QueryableTag(fromTag.text);
  }

  constructor(private _text: string) {}
  get text(): string {
    return this._text;
  }
}
