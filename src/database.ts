import fs from "fs";
import glob from "glob";
import { Document, parseDocument } from "./document";

export class MarkdownRepository {
  private db: Document[] = [];

  constructor(private globPattern: string) {}

  async index() {
    this.db = [];
    try {
      const files = await glob.glob(this.globPattern);
      for (const file of files) {
        fs.readFile(file, "utf8", (err, data) => {
          if (err) {
            console.error(`Error reading file ${file}:`, err);
          } else {
            const doc = parseDocument(file, data);
            this.db.push(doc);
          }
        });
      }
    } catch (err) {
      console.error(`Error globbing for files: ${err}`);
    }
  }
}
