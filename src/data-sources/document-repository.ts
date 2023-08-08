import fs from "fs";
import { glob } from "glob";
import { Document } from "../entities/document";
import { Task } from "../entities/task";
import { DataSource } from "./data-source";

/**
 * Datasource that scans a given folder for markdown files and indexes the matching ones
 */
export class DocumentRepository implements DataSource {
  private db: Document[] = [];

  constructor(private globPattern: string, private ignorePatterns?: string[]) {}

  get name(): string {
    return "markdown";
  }

  /** @override */
  async refresh() {
    this.db = [];
    const files = await glob(this.globPattern, { ignore: this.ignorePatterns });
    for (const file of files) {
      const data = fs.readFileSync(file).toString();

      const doc = Document.parse(file, data);
      doc.dataSource = this.name;
      this.db.push(doc);
    }
    console.log(this.db.length + " documents found");
  }

  /** @override */
  documents(): Document[] {
    return this.db;
  }

  /** @override */
  tasks(): Task[] {
    return this.db.flatMap((doc) => doc.tasks);
  }
}
