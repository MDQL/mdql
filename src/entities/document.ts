import fs from "fs";
import { Heading } from "./heading";
import { Tag } from "./tag";
import { Task } from "./task";

export interface Document {
  path: string;
  tasks: Task[];
  headings: Heading[];
  tags: Tag[];
}

export namespace Document {
  export function parse(
    file: fs.PathOrFileDescriptor,
    content: string
  ): Document {
    //   const md = new MarkdownIt();
    //   const tokens: Token[] = md.parse(content, {});
    //   for (const token of tokens) {
    //     console.log(token.type + " " + token.content);
    //   }
    const tasks = Task.parse(content);
    const headings = Heading.parse(content);
    const tags = Tag.parse(content);

    return {
      path: file.toString(),
      headings,
      tasks,
      tags,
    };
  }
}
