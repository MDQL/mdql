import fs from "fs";
import { Heading } from "./heading";
import { Tag } from "./tag";
import { Task } from "./task";
import { FrontMatter } from "./frontmatter";
import { Entity } from "./entity";

type Frontmatter = Record<string, any>;

/**
 * Entity for markdown documents
 * @category Entities
 */
export interface Document extends Entity {
  /**
   * Filepath of the markdown document
   */
  path: string;
  /**
   * Tasks contained in the document
   */
  tasks: Task[];
  /**
   * Headings in the document
   */
  headings: Heading[];
  /**
   * Tags contained in the document
   */
  tags: Tag[];
  /**
   * Frontmatter of the document
   */
  frontMatter: Frontmatter | undefined;
}

export namespace Document {
  export function parse(
    file: fs.PathOrFileDescriptor,
    content: string
  ): Document {
    const tasks = Task.parse(content);
    const headings = Heading.parse(content);
    const tags = Tag.parse(content);
    const frontMatter = FrontMatter.parse(content);

    return {
      path: file.toString(),
      headings,
      tasks,
      tags,
      frontMatter,
    };
  }
}
