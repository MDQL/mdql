import { DataSource } from "./data-source";
import { Document } from "./entities/document";

export interface CombinedDsResult<T> {
  dataSource: string;
  data: T[];
}
export class CombinedDataSource<T> implements DataSource<CombinedDsResult<T>> {
  private datasources: DataSource<T>[];
  constructor(...datasources: DataSource<T>[]) {
    this.datasources = datasources;
  }

  get name(): string {
    return "combined";
  }

  async refresh(): Promise<void> {
    await Promise.all(this.datasources.map((ds) => ds.refresh()));
  }

  documents(): CombinedDsResult<T>[] {
    const result: CombinedDsResult<T>[] = [];
    for (const ds of this.datasources) {
      const documents = ds.documents();

      result.push({ dataSource: ds.name, data: documents });
    }
    return result;
  }
}
