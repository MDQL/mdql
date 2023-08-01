import { DataSource } from "./data-source";
import { Document } from "../entities/document";
import { Task } from "../entities/task";

export class CombinedDataSource implements DataSource {
  private datasources: DataSource[];
  constructor(...datasources: DataSource[]) {
    this.datasources = datasources;
  }

  get name(): string {
    return "combined";
  }

  async refresh(): Promise<void> {
    await Promise.all(this.datasources.map((ds) => ds.refresh()));
  }

  async documents(): Promise<Document[]> {
    const result: Document[] = [];
    for (const ds of this.datasources) {
      const documents = await ds.documents();

      result.push(...documents);
    }
    return Promise.resolve(result);
  }

  async tasks(): Promise<Task[]> {
    const result: Task[] = [];
    for (const ds of this.datasources) {
      const tasks = await ds.tasks();
      result.push(...tasks);
    }
    return Promise.resolve(result);
  }
}
