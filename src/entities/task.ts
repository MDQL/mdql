import { Entity, QueryableEntity } from "./entity";
import { Tag } from "./tag";

/**
 * Markdown Task
 * @category Entities
 */
export interface Task extends QueryableEntity {
  $checked: boolean;
  status: "open" | "closed";
  text: string;
  tags: Tag[];
}

export namespace Task {
  export function parse(documentUri: string, content: string): Task[] {
    const tasks: Task[] = [];
    const regex = /- \[(?<checked>[xX ])\] (?<text>.+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const checked = match.groups?.["checked"].toLowerCase() === "x";
      const text = match.groups?.["text"] ?? "";
      const tags = Tag.parse(text);
      const status = checked ? "closed" : "open";
      tasks.push({ $checked: checked, text, tags, status, $uri: documentUri });
    }

    return tasks;
  }
}
