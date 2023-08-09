import * as fs from "fs";
import { QueryableEntity } from "./entity";
import { FrontMatter } from "./frontmatter";
import { Heading } from "./heading";
import { Tag } from "./tag";
import { Task } from "./task";
import { createLogger } from "../logger";

type Frontmatter = Record<string, any>;

/**
 * Entity for markdown documents
 * @category Entities
 */
export interface Document extends QueryableEntity {
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
    const log = createLogger("Document.parse");
    log.debug(`Parsing document ${file.toString()}`);

    const uri = `file://${file.toString()}`;
    const tasks = Task.parse(uri, content);
    const headings = Heading.parse(content);
    const tags = Tag.parse(content);
    const frontMatter = FrontMatter.parse(content);

    return {
      $uri: uri,
      path: file.toString(),
      headings,
      tasks,
      tags,
      frontMatter,
    };
  }
}
