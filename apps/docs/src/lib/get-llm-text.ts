import type {Page} from "@/lib/source";

import {readFile} from "node:fs/promises";
import {join} from "node:path";

import {remarkNpm} from "fumadocs-core/mdx-plugins";
import {remarkInclude} from "fumadocs-mdx/config";
import {remarkAutoTypeTable} from "fumadocs-typescript";
import {remark} from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

import {getRelatedComponents} from "@/components-registry";
import {siteConfig} from "@/config/site";
import {getDemo} from "@/demos";
import {replaceNativeComponentsCategories} from "@/lib/native-components-markdown";
import {source} from "@/lib/source";

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkNpm);

const CONTENT_DIR = "content/docs";
const DEMOS_DIR = "src/demos";
const DEFAULT_CATEGORY = "docs";
const DEFAULT_TITLE = "Untitled";
const MAX_RELATED_COMPONENTS = 3;

function normalizePagePath(pagePath: string): string {
  return pagePath.endsWith(".mdx") ? pagePath : `${pagePath}.mdx`;
}

async function getRawMDXContent(pagePath: string): Promise<string> {
  try {
    const normalizedPath = normalizePagePath(pagePath);
    // `page.path` already includes the locale prefix when using `parser: "dir"`
    // (e.g. `en/react/components/(navigation)/accordion.mdx`), so we must not
    // prepend the locale again here.
    const filePath = join(process.cwd(), CONTENT_DIR, normalizedPath);

    const content = await readFile(filePath, "utf-8");

    if (!content.trim()) {
      console.warn(`MDX file is empty: ${filePath}`);

      return "";
    }

    return content;
  } catch (error) {
    console.error(`Failed to read MDX file: ${pagePath}`, error);

    return "";
  }
}

function formatAbsoluteUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = siteConfig.siteUrl.toString().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}

function formatLLMHeader(
  category: string,
  title: string,
  url: string,
  sourcePath: string,
  description: string,
): string {
  const descriptionBlock = description ? `\n> ${description}\n` : "\n";
  const absoluteUrl = formatAbsoluteUrl(url);

  return `# ${title}

**Category**: ${category}
**URL**: ${absoluteUrl}
**Source**: ${siteConfig.githubRawUrl}/${sourcePath}${descriptionBlock}`;
}

export async function getLLMText(page: Page) {
  const category = page.slugs[0] || DEFAULT_CATEGORY;
  const title = page.data.title || DEFAULT_TITLE;
  const description = page.data.description || "";
  const url = page.url || "";
  const normalizedPath = normalizePagePath(page.path);

  const rawContent = await getRawMDXContent(page.path);
  const header = formatLLMHeader(category, title, url, normalizedPath, description);

  if (!rawContent) {
    return `<page url="${url}">
${header}

*Content unavailable*
</page>`;
  }

  // First, process MDX content to replace ComponentPreview, CollapsibleCode, etc.
  const processedContent = await processMDXContent(
    rawContent,
    page.locale,
    source.getPages(page.locale),
  );

  // Then process with remark to convert MDX to markdown
  const processed = await processor.process({
    path: join(process.cwd(), CONTENT_DIR, normalizedPath),
    value: processedContent,
  });

  // Clean up any remaining component tags that remark might have preserved
  const finalContent = processed.value
    .toString()
    .replace(
      /<(ComponentPreview|CollapsibleCode|RelatedComponents|RelatedShowcases|DocsImage|NativeVideoPlayerView|NativeTryOnDevice)[^>]*\/?>/g,
      "",
    );

  return `<page url="${url}">
${header}

${finalContent}
</page>`;
}

const COMPONENT_PREVIEW_REGEX = /<ComponentPreview\s+name\s*=\s*["']([^"']+)["'][^/>]*\/>/g;
const REGEX_ESCAPE = /[.*+?^${}()|[\]\\]/g;

async function replaceComponentPreview(content: string, lang?: string): Promise<string> {
  const matches = Array.from(content.matchAll(COMPONENT_PREVIEW_REGEX));

  if (matches.length === 0) return content;

  const replacements = await Promise.all(
    matches.map(async (match) => {
      const fullMatch = match[0];
      const demoName = match[1];

      if (!demoName) {
        return {match: fullMatch, replacement: fullMatch};
      }

      const demo = getDemo(demoName, lang);

      if (!demo?.file) {
        return {match: fullMatch, replacement: fullMatch};
      }

      try {
        const filePath = join(process.cwd(), DEMOS_DIR, demo.file);
        const code = await readFile(filePath, "utf-8");

        return {
          match: fullMatch,
          replacement: `\`\`\`tsx\n${code}\n\`\`\``,
        };
      } catch {
        return {match: fullMatch, replacement: fullMatch};
      }
    }),
  );

  let result = content;
  const processedMatches = new Set<string>();

  for (const {match, replacement} of replacements) {
    if (processedMatches.has(match)) continue;

    processedMatches.add(match);
    const escapedMatch = match.replace(REGEX_ESCAPE, "\\$&");
    const regex = new RegExp(escapedMatch, "g");

    result = result.replace(regex, replacement);
  }

  return result;
}

const COLLAPSIBLE_CODE_REGEX =
  /<CollapsibleCode\s+lang\s*=\s*["']([^"']+)["']\s+code\s*=\s*{?`([\s\S]*?)`}?\s*\/>/g;

function replaceCollapsibleCode(content: string): string {
  return content.replace(COLLAPSIBLE_CODE_REGEX, (_match, lang, code) => {
    return `\`\`\`${lang || "tsx"}\n${code}\n\`\`\``;
  });
}

const RELATED_COMPONENTS_REGEX = /<RelatedComponents\s+component\s*=\s*["']([^"']+)["']\s*\/>/g;

function replaceRelatedComponents(content: string): string {
  return content.replace(RELATED_COMPONENTS_REGEX, (_match, componentName) => {
    const relatedComponents =
      getRelatedComponents(componentName)?.slice(0, MAX_RELATED_COMPONENTS) || [];

    if (relatedComponents.length === 0) {
      return "";
    }

    const componentList = relatedComponents
      .map(
        (comp) =>
          `- **${comp.title || "Untitled Component"}**: ${comp.description || "A related component"}`,
      )
      .join("\n");

    return `\n## Related Components\n\n${componentList}\n`;
  });
}

const USELESS_COMPONENT_TAGS =
  /<(ComponentCard|ComponentGrid|ComponentsCategory|ComponentPreview|CollapsibleCode|RelatedComponents|RelatedShowcases|DocsImage|NativeComponentsCategory|NativeVideoPlayerView|NativeTryOnDevice)[^>]*\/?>/g;
const BR_TAG = /<br\s*\/>/g;
const CODE_BLOCK_BEFORE = /([^\n`])\n(```[\w]*\n)/g;
const CODE_BLOCK_AFTER = /(```[\s\S]*?```)\n([^\n`])/g;
const EXCESSIVE_NEWLINES = /\n{3,}/g;
const FRONTMATTER_SPACING = /^(---\s*\n[\s\S]*?\n---\s*\n)([^\n])/m;
const FRONTMATTER_CONTENT = /^---\s*\n[\s\S]*?\n---\s*\n/m;
const YAML_FRONTMATTER_LINES = /^(title|description|icon|links|image|darkSrc|src):\s*.*$/gm;
const SEPARATOR_LINE = /^-{3,}$/gm;

function cleanContentForLLM(content: string): string {
  let processed = content.replace(USELESS_COMPONENT_TAGS, "").replace(BR_TAG, "\n");

  // Process headings outside code blocks
  // Split by code blocks to avoid matching headings inside code
  const codeBlockRegex = /```[\s\S]*?```/g;
  const parts: Array<{isCode: boolean; text: string}> = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({isCode: false, text: content.slice(lastIndex, match.index)});
    }
    parts.push({isCode: true, text: match[0]});
    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({isCode: false, text: content.slice(lastIndex)});
  }

  if (parts.length > 0) {
    processed = parts
      .map((part) => {
        if (part.isCode) {
          return part.text;
        }

        return part.text.replace(/\n(#{1,6}\s+[^\n]+)\n/g, "\n\n$1\n\n");
      })
      .join("");
  } else {
    processed = processed.replace(/\n(#{1,6}\s+[^\n]+)\n/g, "\n\n$1\n\n");
  }

  processed = processed
    .replace(CODE_BLOCK_BEFORE, "$1\n\n$2")
    .replace(CODE_BLOCK_AFTER, "$1\n\n$2")
    .replace(EXCESSIVE_NEWLINES, "\n\n")
    .replace(FRONTMATTER_SPACING, "$1\n$2")
    .replace(FRONTMATTER_CONTENT, "")
    .replace(YAML_FRONTMATTER_LINES, "")
    .replace(SEPARATOR_LINE, "")
    .trim();

  return processed;
}

async function processMDXContent(
  content: string,
  lang?: string,
  pages: Page[] = [],
): Promise<string> {
  let processed = replaceCollapsibleCode(content);

  processed = await replaceComponentPreview(processed, lang);
  processed = replaceRelatedComponents(processed);
  processed = replaceNativeComponentsCategories(processed, pages);
  processed = cleanContentForLLM(processed);

  return processed;
}

export async function getLLMRawText(page: Page) {
  const category = page.slugs[0] || DEFAULT_CATEGORY;
  const title = page.data.title || DEFAULT_TITLE;
  const description = page.data.description || "";
  const url = page.url || "";
  const normalizedPath = normalizePagePath(page.path);
  const header = formatLLMHeader(category, title, url, normalizedPath, description);

  const rawContent = await getRawMDXContent(page.path);

  if (!rawContent) {
    return `<page url="${url}">
${header}

***

*Content unavailable*
</page>`;
  }

  const processedContent = await processMDXContent(
    rawContent,
    page.locale,
    source.getPages(page.locale),
  );

  if (!processedContent.trim()) {
    return `<page url="${url}">
${header}

***

*Content processed but empty*
</page>`;
  }

  return `<page url="${url}">
${header}

***

${processedContent}
</page>`;
}
