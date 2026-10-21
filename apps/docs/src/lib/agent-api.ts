import type {Page} from "@/lib/source";

import {getLLMText} from "@/lib/get-llm-text";
import {
  filterExcludedPages,
  filterPagesByPlatform,
  getPlatformFromPage,
  isComponentPage,
  validatePlatform,
} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export type AgentSearchPlatform = "react" | "native" | "all";
export type AgentDocsLocale = "cn" | "en";

export type AgentSearchResult = {
  description: string;
  platform: AgentSearchPlatform;
  title: string;
  url: string;
};

export type AgentPageResult = {
  description: string;
  markdown: string;
  title: string;
  url: string;
};

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 20;

export function parseAgentSearchPlatform(value: string | null): AgentSearchPlatform {
  const platform = validatePlatform(value ?? undefined);

  return platform ?? "all";
}

export function parseAgentLimit(value: string | null): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;

  return Math.min(Math.max(Math.trunc(parsed), 1), MAX_LIMIT);
}

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

function searchTerms(value: string): string[] {
  return [...new Set(normalizeSearchText(value).match(/[\p{L}\p{N}]+/gu) ?? [])];
}

function searchScore(page: Page, terms: string[]): number {
  const title = page.data.title.toLowerCase();
  const url = page.url.toLowerCase();
  const description = (page.data.description ?? "").toLowerCase();

  return terms.reduce(
    (score, term) =>
      score +
      (title === term ? 20 : title.includes(term) ? 8 : 0) +
      (url.includes(term) ? 6 : 0) +
      (description.includes(term) ? 2 : 0),
    0,
  );
}

function pageToSearchResult(page: Page): AgentSearchResult {
  return {
    description: page.data.description ?? "",
    platform: getPlatformFromPage(page),
    title: page.data.title,
    url: page.url,
  };
}

export function searchAgentDocs(
  query: string,
  platform: AgentSearchPlatform = "all",
  limit = DEFAULT_LIMIT,
  locale: AgentDocsLocale = "en",
): AgentSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) return [];

  const terms = searchTerms(normalizedQuery);
  const pages = filterPagesByPlatform(filterExcludedPages(source.getPages(locale)), platform);

  return pages
    .map((page) => ({page, score: searchScore(page, terms)}))
    .filter(({score}) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({page}) => pageToSearchResult(page));
}

export function listAgentComponents(
  platform: Exclude<AgentSearchPlatform, "all"> = "react",
  limit = MAX_LIMIT,
  locale: AgentDocsLocale = "en",
): AgentSearchResult[] {
  return filterPagesByPlatform(filterExcludedPages(source.getPages(locale)), platform)
    .filter(isComponentPage)
    .slice(0, limit)
    .map(pageToSearchResult);
}

export function normalizeDocsUrl(value: string): string | null {
  if (!value) return null;

  let pathname = value.trim();

  try {
    if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
      pathname = new URL(pathname).pathname;
    }
  } catch {
    return null;
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/$/, "");

  if (!pathname.startsWith("/docs/")) return null;

  return pathname;
}

export async function getAgentDocPage(
  value: string,
  locale: AgentDocsLocale = "en",
): Promise<AgentPageResult | null> {
  const pathname = normalizeDocsUrl(value);

  if (!pathname) return null;

  const slug = pathname
    .replace(/^\/docs\//, "")
    .split("/")
    .filter(Boolean);
  const page = source.getPage(slug, locale);

  if (!page) return null;

  const markdown = await getLLMText(page);

  return {
    description: page.data.description ?? "",
    markdown,
    title: page.data.title,
    url: page.url,
  };
}
