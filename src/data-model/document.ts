import { createLogger } from "../logger";
import { ModelEntity } from "./entity";
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
export interface Document extends ModelEntity {
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
