import { createLogger } from "../../logger";
import { Entity } from "./entity";
import { Tag } from "./tag";

/**
 * Markdown Task
 * @category Entities
 */
export interface Task extends Entity {
  checked: boolean;
  text: string;
  tags: Tag[];
}

export namespace Task {
  export function parse(documentUri: string, content: string): Task[] {
    const log = createLogger("Task.parse");

    const tasks: Task[] = [];
    const regex = /- \[(?<checked>[xX ])\] (?<text>.+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const checked = match.groups?.["checked"].toLowerCase() === "x";
      const text = match.groups?.["text"] ?? "";
      const tags = Tag.parse(text);
      log.trace(`Found task at index ${match.index} with text ${text}`);
      tasks.push({ checked, text, tags });
    }

    return tasks;
  }
}
