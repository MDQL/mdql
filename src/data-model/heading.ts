import { ModelEntity } from "./entity";
import { Tag } from "./tag";

/**
 * Heading in a markdown document
 * @category Entities
 */
export interface Heading extends ModelEntity {
  level: number;
  text: string;
  tags: Tag[];
}
