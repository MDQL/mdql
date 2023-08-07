import { KeyValueObject, Query } from "./query";
import { ViewType } from "./view-type";

function joinAllFields(o: any, separator: string) {
  return Object.keys(o)
    .map((key) => o[key])
    .join(separator);
}

export class QueryResult {
  constructor(private _query: Query, private result: KeyValueObject[]) {}

  /**
   * Returns the raw data as a KeyValueObject array.
   *
   * @return {KeyValueObject[]} The raw data as a KeyValueObject array.
   */
  raw(): KeyValueObject[] {
    return this.result;
  }

  /**
   * Get the query that generated this result.
   */
  get query(): Query {
    return this._query;
  }

  /**
   * Generates a markdown representation of the result data.
   *
   * @param {Object} config - An object containing fieldSeparator and lineSeparator properties.
   *   - fieldSeparator: A string representing the separator between fields. Default is ";".
   *   - lineSeparator: A string representing the separator between lines. Default is "\n".
   * @return {string} The markdown representation of the result data.
   */
  toMarkdown(
    config: {
      fieldSeparator: string;
      lineSeparator: string;
    } = {
      fieldSeparator: "; ",
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
        const columns = Object.keys(data[0]);
        const header = `| ${columns.join(" | ")} |`;
        const separatorDashes = columns.map((c) => c.replace(/./g, "-"));
        const separator = `| ${separatorDashes.join(" | ")} |`;
        lines = [header, separator, ...lines];
        break;
      case ViewType.TASKLIST:
        lines = data.map((r) => {
          const allFields = joinAllFields(r, config.fieldSeparator);
          const checked = r["checked"];
          return `- [${checked ? "x" : " "}] ${allFields}`;
        });
        break;
    }
    return lines.map((l) => `> ${l}`).join(config.lineSeparator);
  }
}
