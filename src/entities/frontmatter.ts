import yaml from "js-yaml";
import { Entity } from "./entity";

/**
 * Entity for frontmatter in markdown documents
 * @category Entities
 */
export interface FrontMatter extends Entity {
  [k: string]: any;
}

export namespace FrontMatter {
  export function parse(document: string) {
    const regex = /---\n(?<content>.+?)\n---/gs;
    const matches = regex.exec(document);
    const content = matches?.groups?.["content"];
    if (content) {
      const data = yaml.load(content);
      return data as FrontMatter;
    } else {
      return undefined;
    }
  }
}
