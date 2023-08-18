import { createLogger } from "../logger";
import { ModelEntity } from "./entity";
import { Tag } from "./tag";

/**
 * Markdown Task
 * @category Entities
 */
export interface Task extends ModelEntity {
  checked: boolean;
  text: string;
  tags: Tag[];
}
