import { createLogger } from "../logger";
import fs from "fs";
import yaml from "js-yaml";
import { Document, FrontMatter, Heading, Tag, Task } from "../data-model";

export class MarkdownParser {
  static parseDocument(
    file: fs.PathOrFileDescriptor,
    content: string
  ): Document {
    const log = createLogger("Document.parse");
    log.debug(`Parsing document ${file.toString()}`);

    const uri = `file://${file.toString()}`;
    const tasks = this.parseTasks(content);
    const headings = this.parseHeadings(content);
    const tags = this.parseTags(content);
    const frontMatter = this.parseFrontmatter(content);

    return {
      uri: uri,
      headings,
      tasks,
      tags,
      frontMatter,
    };
  }

  static parseFrontmatter(content: string): FrontMatter | undefined {
    const regex = /^---\n(?<frontmatter>.+?)\n---/gs;
    const matches = regex.exec(content);
    const frontmatter = matches?.groups?.["frontmatter"];
    if (frontmatter) {
      const data = yaml.load(frontmatter);
      return data as FrontMatter;
    } else {
      return undefined;
    }
  }

  static parseHeadings(content: string): Heading[] {
    const headings: Heading[] = [];
    const regex = /(?<level>#+) (?<text>.+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const level = match.groups?.["level"].length;
      const text = match.groups?.["text"] ?? "";
      const tags = this.parseTags(text);
      if (level) {
        headings.push({ level, text, tags });
      }
    }
    return headings;
  }

  static parseTasks(content: string): Task[] {
    const log = createLogger("Task.parse");

    const tasks: Task[] = [];
    const regex = /- \[(?<checked>[xX ])\] (?<text>.+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const checked = match.groups?.["checked"].toLowerCase() === "x";
      const text = match.groups?.["text"] ?? "";
      const tags = this.parseTags(text);
      log.trace(`Found task at index ${match.index} with text ${text}`);
      tasks.push({ checked, text, tags });
    }

    return tasks;
  }

  static parseTags(content: string): Tag[] {
    const tasks: Tag[] = [];
    const regex = /#(?<text>[\w\d-]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match.groups?.["text"] ?? "";
      tasks.push({ text });
    }

    return tasks;
  }
}
