import { KeyValueObject, Query } from "./query";
import { ViewType } from "./view-type";

function joinAllFields(o: any, separator: string) {
  return Object.keys(o)
    .map((key) => o[key])
    .join(separator);
}

export class QueryResult {
  constructor(private query: Query, private result: KeyValueObject[]) {}

  /**
   * Returns the raw data as a KeyValueObject array.
   *
   * @return {KeyValueObject[]} The raw data as a KeyValueObject array.
   */
  raw(): KeyValueObject[] {
    return this.result;
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
