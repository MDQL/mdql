import { ParseException } from "./parse-exception";

/**
 * Types of available output view renderings
 */
export enum ViewType {
  TABLE,
  LIST,
  TASKLIST,
}
export namespace ViewType {
  export function parse(s: string) {
    if (s.toLocaleLowerCase() === "table") {
      return ViewType.TABLE;
    }
    if (s.toLocaleLowerCase() === "list") {
      return ViewType.LIST;
    }
    if (s.toLocaleLowerCase() === "tasklist") {
      return ViewType.TASKLIST;
    }
    throw new ParseException(`View type '${s}' is unknown`);
  }
}
