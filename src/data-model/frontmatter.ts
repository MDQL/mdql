import { ModelEntity } from "./entity";

/**
 * Entity for frontmatter in markdown documents
 * @category Entities
 */
export interface FrontMatter extends ModelEntity {
  [k: string]: any;
}
