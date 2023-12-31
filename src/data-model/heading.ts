import { Entity } from "./entity";
import { Tag } from "./tag";

/**
 * Heading in a markdown document
 * @category Data-Model
 */
export interface Heading extends Entity {
  level: number;
  text: string;
  tags: Tag[];
}

export namespace Heading {
  export function parse(content: string): Heading[] {
    const headings: Heading[] = [];
    const regex = /(?<level>#+) (?<text>.+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const level = match.groups?.["level"].length;
      const text = match.groups?.["text"] ?? "";
      const tags = Tag.parse(text);
      if (level) {
        headings.push({ level, text, tags });
      }
    }
    return headings;
  }
}
