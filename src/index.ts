import glob from "glob";
import fs from "fs";
import { Document } from "./entities/document";
import { MDQLQuery } from "./mdql-query";
import { Task } from "./entities/task";
import { Tag } from "./entities/tag";
import { Heading } from "./entities/heading";

export class DocumentIndex {
  private db: Document[] = [];

  constructor(private globPattern: string) {}

  /**
   * (Re-)index all matching files
   */
  index() {
    // Use the glob package to find all matching .md files
    const files = glob.globSync(this.globPattern);
    for (const file in files) {
      files.forEach((file) => {
        // Read the file content
        fs.readFile(file, "utf8", (err: Error | null, content: string) => {
          if (err) {
            console.error("Error while reading file:", file, err);
          } else {
            const doc = Document.parse(file, content);
            this.db.push(doc);
          }
        });
      });
    }
  }

  queryTasks(query: MDQLQuery): Task[] {
    //TODO execute the query and return the result
  }

  queryTags(query: MDQLQuery): Tag[] {
    //TODO execute the query and return the result
  }

  queryDocuments(query: MDQLQuery): Document[] {
    //TODO execute the query and return the result
  }

  queryHeadings(query: MDQLQuery): Heading[] {
    //TODO execute the query and return the result
  }
}
