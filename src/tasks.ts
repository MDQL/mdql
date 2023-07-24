import { Tag, findTags } from "./tags";

export interface Task {
  checked: boolean;
  text: string;
  tags: Tag[];
}

export function findTasks(content: string): Task[] {
  const tasks: Task[] = [];
  const regex = /- \[(?<checked>[xX ])\] (?<text>.+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const checked = match.groups?.["checked"].toLowerCase() === "x";
    const text = match.groups?.["text"] ?? "";
    const tags = findTags(text);
    tasks.push({ checked, text, tags });
  }

  return tasks;
}
