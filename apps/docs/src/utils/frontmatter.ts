import {parse} from "yaml";

export interface Frontmatter {
  content: string;
  data: Record<string, any>;
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Reads YAML frontmatter from an MDX document.
 * Replaces gray-matter, which pulls in unpatched sprintf-js (GHSA-hp3w-g68c-fv3c).
 */
export function readFrontmatter(source: string): Frontmatter {
  const match = FRONTMATTER_PATTERN.exec(source);

  if (!match) {
    return {content: source, data: {}};
  }

  const parsed = parse(match[1] ?? "");
  const data =
    parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};

  return {
    content: source.slice(match[0].length),
    data,
  };
}
