import { Entity } from "./entity";
import { Tag } from "./tag";

/**
 * Markdown Task
 * @category Entities
 */
export interface Task extends Entity {
  checked: boolean;
  status: "open" | "closed";
  text: string;
  tags: Tag[];
}

export namespace Task {
  export function parse(content: string): Task[] {
    const tasks: Task[] = [];
    const regex = /- \[(?<checked>[xX ])\] (?<text>.+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const checked = match.groups?.["checked"].toLowerCase() === "x";
      const text = match.groups?.["text"] ?? "";
      const tags = Tag.parse(text);
      const status = checked ? "closed" : "open";
      tasks.push({ checked, text, tags, status });
    }

    return tasks;
  }
}
