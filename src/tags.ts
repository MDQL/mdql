export interface Tag {
  text: string;
}

export function findTags(content: string): Tag[] {
  const tasks: Tag[] = [];
  const regex = /#(?<text>[\w\d-]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match.groups?.["text"] ?? "";
    tasks.push({ text });
  }

  return tasks;
}
