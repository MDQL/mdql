export enum Table {
  DOCUMENTS,
  TASKS,
}

export namespace Table {
  export function parse(s: string): Table {
    if (s.toLowerCase() === "tasks") {
      return Table.TASKS;
    }
    if (s.toLowerCase() === "documents") {
      return Table.DOCUMENTS;
    }
    throw new Error(`Table '${s}' is not supported`);
  }
}
