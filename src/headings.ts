import { Tag, findTags } from "./tags";

export interface Heading {
  level: number;
  text: string;
  tags: Tag[];
}

export function findHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /(?<level>#+) (?<text>.+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match.groups?.["level"].length;
    const text = match.groups?.["text"] ?? "";
    const tags = findTags(text);
    if (level) {
      headings.push({ level, text, tags });
    }
  }
  return headings;
}
