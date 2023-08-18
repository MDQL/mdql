import { Document } from "../data-model/document";
import { QueryableFrontMatter } from "./queryable-frontmatter";
import { QueryableHeading } from "./queryable-heading";
import { QueryableTag } from "./queryable-tag";
import { QueryableTask } from "./queryable-task";

export interface QueryableDocument {
  /**
   * Filepath of the markdown document
   */
  path: string;
  /**
   * Tasks contained in the document
   */
  tasks: QueryableTask[];
  /**
   * Headings in the document
   */
  headings: QueryableHeading[];
  /**
   * Tags contained in the document
   */
  tags: QueryableTag[];
  /**
   * Frontmatter of the document
   */
  frontMatter: QueryableFrontMatter | undefined;
}
export namespace QueryableDocument {
  export function fromDocument(doc: Document): QueryableDocument {
    const path = doc.uri;

    return {
      frontMatter: doc.frontMatter,
      headings: doc.headings.map(QueryableHeading.fromHeading),
      path,
      tags: doc.tags.map(QueryableTag.fromTag),
      tasks: doc.tasks.map(QueryableTask.fromTask),
    };
  }
}
