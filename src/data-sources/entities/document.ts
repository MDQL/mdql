import { createLogger } from "../../logger";
import { Entity } from "./entity";
import { Heading } from "./heading";
import { Tag } from "./tag";
import fs from "fs";
import { Task } from "./task";
import { FrontMatter } from "./frontmatter";

type Frontmatter = Record<string, any>;

/**
 * Entity for markdown documents
 * @category Entities
 */
export interface Document extends Entity {
  /**
   * URI of the markdown document
   */
  uri: string;
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
      uri: uri,
      headings,
      tasks,
      tags,
      frontMatter,
    };
  }
}
