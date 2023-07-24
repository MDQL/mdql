import fs from "fs";
import { Heading, findHeadings } from "./headings";
import { Task, findTasks } from "./tasks";
import { Tag, findTags } from "./tags";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";

export interface Document {
  path: string;
  tasks: Task[];
  headings: Heading[];
  tags: Tag[];
}

export function parseDocument(
  file: fs.PathOrFileDescriptor,
  content: string
): Document {
  //   const md = new MarkdownIt();
  //   const tokens: Token[] = md.parse(content, {});
  //   for (const token of tokens) {
  //     console.log(token.type + " " + token.content);
  //   }
  const tasks = findTasks(content);
  const headings = findHeadings(content);
  const tags = findTags(content);

  return {
    path: file.toString(),
    headings,
    tasks,
    tags,
  };
}
