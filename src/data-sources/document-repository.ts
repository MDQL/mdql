import fs from "fs";
import { glob } from "glob";
import { Document } from "../entities/document";
import { Task } from "../entities/task";
import { DataSource } from "./data-source";
import { createLogger } from "../logger";

/**
 * Datasource that scans a given folder for markdown files and indexes the matching ones
 */
export class DocumentRepository implements DataSource {
  private log = createLogger(DocumentRepository.name);
  private db: Document[] = [];

  constructor(private globPattern: string, private ignorePatterns?: string[]) {}

  get name(): string {
    return "markdown";
  }

  /** @override */
  async refresh() {
    this.log.info(`Globbing for files matching ${this.globPattern}`);
    this.db = [];
    const files = await glob(this.globPattern, {
      ignore: this.ignorePatterns,
      windowsPathsNoEscape: true,
    });
    for (const file of files) {
      this.log.debug(`Parsing file ${file}`);
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
