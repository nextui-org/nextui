import type {ClientTool, ClientToolExecutionContext} from "@heroui/agent";

import {fontIds} from "@/app/[lang]/themes/constants";
import {
  defaultThemeValues,
  findMatchingTheme,
  radiusIds,
  themeIds,
  themeValuesById,
} from "@/app/[lang]/themes/theme-values";

type DocsToolInput = Record<string, unknown>;

export type DocsAgentContext = {
  navigate: (url: string) => void;
  page: () => DocsPageContext;
  theme: {
    getMode: () => string | undefined;
    getPreset: () => (typeof themeIds)[number];
    getVibrantPalette: () => boolean;
    setMode: (mode: ThemeMode) => void;
    setPreset: (preset: (typeof themeIds)[number]) => void;
    setVibrantPalette: (enabled: boolean) => void;
  };
};

export type ThemeMode = "dark" | "light" | "system";

export type ThemeBuilderState = {
  colorScheme: ThemeMode;
  isThemeBuilder: boolean;
  preset: (typeof themeIds)[number] | "custom";
  values: {
    base: number;
    chroma: number;
    fontFamily: string;
    formRadius: (typeof radiusIds)[number];
    hue: number;
    lightness: number;
    radius: (typeof radiusIds)[number];
    vibrantPalette: boolean;
  };
};

export type DocsPageContext = {
  locale: "en";
  page: {
    description: string;
    heading: string;
    title: string;
  };
  platform: "native" | "react" | null;
  route: {
    hash: string;
    pathname: string;
    query: Record<string, string>;
  };
};

type DocsToolDefinition = Omit<ClientTool<DocsToolInput, DocsAgentContext>, "execute"> & {
  execute: (
    input: DocsToolInput,
    context?: DocsAgentContext,
    execution?: ClientToolExecutionContext,
  ) => Promise<unknown> | unknown;
};

const DEFAULT_PAGE_CHARACTERS = 40_000;
const MAX_PAGE_CHARACTERS = 40_000;
const MAX_SEARCH_CONTENT_RESULTS = 3;
const MAX_SEARCH_CONTENT_CHARACTERS = 9_000;
const TRUNCATION_NOTICE = "\n\n[Content truncated. Request this page for more detail.]";
const THEME_BUILDER_PATH = "/en/themes";
const themeModes = ["light", "dark", "system"] as const;

const themeValueKeys = [
  "base",
  "chroma",
  "fontFamily",
  "formRadius",
  "hue",
  "lightness",
  "radius",
  "vibrantPalette",
] as const;

function getString(input: DocsToolInput, key: string, fallback = ""): string {
  const value = input[key];

  return typeof value === "string" ? value : fallback;
}

function getInteger(input: DocsToolInput, key: string, fallback: number): number {
  const value = input[key];
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed)) return fallback;

  return Math.trunc(parsed);
}

function getOptionalNumber(
  input: DocsToolInput,
  key: string,
  minimum: number,
  maximum: number,
): number | undefined {
  const value = input[key];

  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || value > maximum) {
    throw new Error(`${key} must be a number between ${minimum} and ${maximum}`);
  }

  return value;
}

function getOptionalEnum<T extends string>(
  input: DocsToolInput,
  key: string,
  values: readonly T[],
): T | undefined {
  const value = input[key];

  if (value === undefined) return undefined;
  if (typeof value !== "string" || !values.includes(value as T)) {
    throw new Error(`${key} must be one of: ${values.join(", ")}`);
  }

  return value as T;
}

function getUrlNumber(searchParams: URLSearchParams, key: string, fallback: number): number {
  const value = searchParams.get(key);
  const parsed = value === null ? Number.NaN : Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function isThemeBuilderPath(pathname: string): boolean {
  return pathname === THEME_BUILDER_PATH || pathname === `${THEME_BUILDER_PATH}/`;
}

export function getThemeBuilderState(
  href: string,
  colorScheme: string | undefined = "system",
): ThemeBuilderState {
  const url = new URL(href);
  const {searchParams} = url;
  const formRadius = searchParams.get("formRadius");
  const radius = searchParams.get("radius");
  const mode = themeModes.includes(colorScheme as ThemeMode)
    ? (colorScheme as ThemeMode)
    : "system";
  const values: ThemeBuilderState["values"] = {
    base: getUrlNumber(searchParams, "base", defaultThemeValues.base),
    chroma: getUrlNumber(searchParams, "chroma", defaultThemeValues.chroma),
    fontFamily: searchParams.get("fontFamily") || defaultThemeValues.fontFamily,
    formRadius: radiusIds.includes(formRadius as (typeof radiusIds)[number])
      ? (formRadius as (typeof radiusIds)[number])
      : defaultThemeValues.formRadius,
    hue: getUrlNumber(searchParams, "hue", defaultThemeValues.hue),
    lightness: getUrlNumber(searchParams, "lightness", defaultThemeValues.lightness),
    radius: radiusIds.includes(radius as (typeof radiusIds)[number])
      ? (radius as (typeof radiusIds)[number])
      : defaultThemeValues.radius,
    vibrantPalette: searchParams.get("vibrantPalette") === "true",
  };

  return {
    colorScheme: mode,
    isThemeBuilder: isThemeBuilderPath(url.pathname),
    preset: findMatchingTheme(values) ?? "custom",
    values,
  };
}

export function createThemeBuilderUrl(input: DocsToolInput, href: string): string {
  const current = getThemeBuilderState(href);
  const preset = getOptionalEnum(input, "preset", themeIds);
  const baseValues = preset ? themeValuesById[preset] : current.values;
  const fontFamily = getOptionalEnum(input, "fontFamily", fontIds);
  const formRadius = getOptionalEnum(input, "formRadius", radiusIds);
  const radius = getOptionalEnum(input, "radius", radiusIds);
  const vibrantPalette = input["vibrantPalette"];

  if (vibrantPalette !== undefined && typeof vibrantPalette !== "boolean") {
    throw new Error("vibrantPalette must be a boolean");
  }

  const values: ThemeBuilderState["values"] = {
    base: getOptionalNumber(input, "base", 0, 0.02) ?? baseValues.base,
    chroma: getOptionalNumber(input, "chroma", 0, 0.4) ?? baseValues.chroma,
    fontFamily: fontFamily ?? baseValues.fontFamily,
    formRadius: formRadius ?? baseValues.formRadius,
    hue: getOptionalNumber(input, "hue", 0, 360) ?? baseValues.hue,
    lightness: getOptionalNumber(input, "lightness", 0, 1) ?? baseValues.lightness,
    radius: radius ?? baseValues.radius,
    vibrantPalette: (vibrantPalette as boolean | undefined) ?? baseValues.vibrantPalette ?? false,
  };
  const url = new URL(href);

  if (!isThemeBuilderPath(url.pathname)) url.search = "";
  url.pathname = THEME_BUILDER_PATH;
  url.hash = "";
  url.searchParams.set("base", String(values.base));
  url.searchParams.set("chroma", String(values.chroma));
  url.searchParams.set("fontFamily", values.fontFamily);
  url.searchParams.set("formRadius", values.formRadius);
  url.searchParams.set("hue", String(values.hue));
  url.searchParams.set("lightness", String(values.lightness));
  url.searchParams.set("radius", values.radius);

  if (values.vibrantPalette) url.searchParams.set("vibrantPalette", "true");
  else url.searchParams.delete("vibrantPalette");

  return `${url.pathname}${url.search}`;
}

function getPlatform(input: DocsToolInput, fallback: "all" | "native" | "react" = "all") {
  const platform = getString(input, "platform", fallback);

  if (platform === "react" || platform === "native" || platform === "all") return platform;

  return fallback;
}

async function fetchJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(path, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
        ? data.error
        : "HeroUI docs request failed";

    throw new Error(message);
  }

  return data;
}

export function resolveSameOriginPath(value: string, origin: string): string | null {
  try {
    const url = new URL(value, origin);

    if (url.origin !== origin) return null;
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) return null;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

type SearchResultWithContent = {
  contentError?: string;
  excerpt?: string;
  truncated?: boolean;
  url: string;
};

type SearchResponse = {
  results?: SearchResultWithContent[];
};

function searchTerms(query: string): string[] {
  return [...new Set(query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])];
}

function mergeLineRanges(ranges: Array<{end: number; start: number}>) {
  return [...ranges]
    .sort((left, right) => left.start - right.start || left.end - right.end)
    .reduce<Array<{end: number; start: number}>>((merged, range) => {
      const previous = merged.at(-1);

      if (previous && range.start <= previous.end) previous.end = Math.max(previous.end, range.end);
      else merged.push({...range});

      return merged;
    }, []);
}

/** Return bounded matching Markdown windows so deep API details survive search. */
export function excerptSearchMarkdown(markdown: string, query: string, maxCharacters: number) {
  if (markdown.length <= maxCharacters) return {excerpt: markdown, truncated: false};

  const lines = markdown.split("\n");
  const terms = searchTerms(query);
  const matches = lines
    .map((line, index) => ({
      index,
      score: terms.reduce((score, term) => score + Number(line.toLowerCase().includes(term)), 0),
    }))
    .filter(({score}) => score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index);
  const notice = TRUNCATION_NOTICE.slice(0, maxCharacters);
  const contentLimit = Math.max(0, maxCharacters - notice.length);
  let ranges: Array<{end: number; start: number}> = [];

  for (const {index} of matches) {
    const candidate = {end: Math.min(lines.length, index + 7), start: Math.max(0, index - 5)};
    const next = mergeLineRanges([...ranges, candidate]);
    const length = next.reduce(
      (total, range, rangeIndex) =>
        total +
        (rangeIndex ? "\n\n…\n\n".length : 0) +
        lines.slice(range.start, range.end).join("\n").length,
      0,
    );

    if (length <= contentLimit) ranges = next;
  }

  if (!ranges.length) {
    const matchingLine = matches[0] ? (lines[matches[0].index] ?? markdown) : markdown;

    return {excerpt: `${matchingLine.slice(0, contentLimit)}${notice}`, truncated: true};
  }

  return {
    excerpt: `${ranges.map((range) => lines.slice(range.start, range.end).join("\n")).join("\n\n…\n\n")}${notice}`,
    truncated: true,
  };
}

async function enrichSearchResults(
  response: unknown,
  query: string,
  signal?: AbortSignal,
): Promise<unknown> {
  if (!response || typeof response !== "object" || !("results" in response)) return response;

  const results = (response as SearchResponse).results;

  if (!Array.isArray(results) || !results.length) return response;

  const selected = results.slice(0, MAX_SEARCH_CONTENT_RESULTS);
  const maxCharacters = Math.floor(MAX_SEARCH_CONTENT_CHARACTERS / selected.length);
  const content = await Promise.all(
    selected.map(async (result) => {
      const url = resolveSameOriginPath(result.url, window.location.origin);
      const pathname = url ? new URL(url, window.location.origin).pathname : null;
      const unlocalizedUrl = pathname?.replace(/^\/en(?=\/docs(?:\/|$))/, "");

      if (!unlocalizedUrl?.startsWith("/docs/")) {
        return {contentError: "Documentation content was unavailable."};
      }

      try {
        const page = await fetchJson(
          `/api/agent/page?url=${encodeURIComponent(unlocalizedUrl)}&locale=en`,
          signal,
        );
        const markdown =
          page &&
          typeof page === "object" &&
          "markdown" in page &&
          typeof page.markdown === "string"
            ? page.markdown
            : "";

        return markdown
          ? excerptSearchMarkdown(markdown, query, maxCharacters)
          : {contentError: "Documentation content was unavailable."};
      } catch (error) {
        return {
          contentError:
            error instanceof Error ? error.message : "Documentation content was unavailable.",
        };
      }
    }),
  );

  return {
    ...response,
    results: results.map((result, index) => ({...result, ...(content[index] ?? {})})),
  };
}

export function sliceMarkdownResult(
  value: unknown,
  start = 0,
  maxCharacters = DEFAULT_PAGE_CHARACTERS,
): unknown {
  if (
    typeof value !== "object" ||
    value === null ||
    !("markdown" in value) ||
    typeof value.markdown !== "string"
  ) {
    return value;
  }

  const safeStart = Math.min(Math.max(Math.trunc(start), 0), value.markdown.length);
  const safeMaximum = Math.min(Math.max(Math.trunc(maxCharacters), 1_000), MAX_PAGE_CHARACTERS);
  const end = Math.min(safeStart + safeMaximum, value.markdown.length);

  return {
    ...value,
    markdown: value.markdown.slice(safeStart, end),
    range: {
      end,
      start: safeStart,
      totalCharacters: value.markdown.length,
    },
    truncated: end < value.markdown.length,
  };
}

export function createDocsPageContext({
  description,
  hash,
  heading,
  href,
  title,
}: {
  description: string;
  hash: string;
  heading: string;
  href: string;
  title: string;
}): DocsPageContext {
  const url = new URL(href);
  const segments = url.pathname.split("/").filter(Boolean);
  const platformSegment = segments.find((segment) => segment === "native" || segment === "react");
  const query = Object.fromEntries(
    Array.from(url.searchParams.entries())
      .slice(0, 10)
      .map(([key, value]) => [key.slice(0, 100), value.slice(0, 200)]),
  );

  return {
    locale: "en",
    page: {
      description: description.trim().slice(0, 500),
      heading: heading.trim().slice(0, 200),
      title: title.trim().slice(0, 200),
    },
    platform: platformSegment ?? null,
    route: {
      hash: hash.slice(0, 200),
      pathname: url.pathname,
      query,
    },
  };
}

export function getDocsPageContext(): DocsPageContext {
  return createDocsPageContext({
    description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
    hash: window.location.hash,
    heading: document.querySelector("h1")?.textContent ?? "",
    href: window.location.href,
    title: document.title,
  });
}

export const docsToolDefinitions: DocsToolDefinition[] = [
  {
    description:
      "Search the official HeroUI React and Native documentation by keyword. Returns page matches and concise relevant excerpts from up to three pages. Use get_heroui_doc when the exact page is already known or more detail is needed.",
    displayName: "Search HeroUI docs",
    async execute(input, _context, execution) {
      const query = getString(input, "query").trim();
      const platform = getPlatform(input);
      const includeContent = input["includeContent"] !== false;
      const limit = Math.min(Math.max(getInteger(input, "limit", 10), 1), 20);

      if (!query) throw new Error("query is required");

      const response = await fetchJson(
        `/api/agent/search?q=${encodeURIComponent(query)}&platform=${platform}&limit=${limit}&locale=en`,
        execution?.signal,
      );

      return includeContent ? enrichSearchResults(response, query, execution?.signal) : response;
    },
    icon: "search",
    name: "search_heroui_docs",
    parameters: {
      additionalProperties: false,
      properties: {
        includeContent: {default: true, type: "boolean"},
        limit: {default: 10, maximum: 20, minimum: 1, type: "integer"},
        platform: {default: "all", enum: ["all", "react", "native"], type: "string"},
        query: {
          description: "Search query, such as button, theming, migration, or native colors.",
          type: "string",
        },
      },
      required: ["query"],
      type: "object",
    },
  },
  {
    description:
      "Retrieve one official HeroUI documentation page as markdown from a same-origin /docs/ path.",
    displayName: "Read HeroUI doc",
    async execute(input, _context, execution) {
      const url = resolveSameOriginPath(getString(input, "url"), window.location.origin);
      const pathname = url ? new URL(url, window.location.origin).pathname : null;
      const unlocalizedUrl = pathname?.replace(/^\/en(?=\/docs(?:\/|$))/, "");
      const start = Math.max(getInteger(input, "start", 0), 0);
      const maxCharacters = Math.min(
        Math.max(getInteger(input, "maxCharacters", DEFAULT_PAGE_CHARACTERS), 1_000),
        MAX_PAGE_CHARACTERS,
      );

      if (!unlocalizedUrl?.startsWith("/docs/")) {
        throw new Error("url must be a same-origin HeroUI docs path");
      }

      const result = await fetchJson(
        `/api/agent/page?url=${encodeURIComponent(unlocalizedUrl)}&locale=en`,
        execution?.signal,
      );

      return sliceMarkdownResult(result, start, maxCharacters);
    },
    icon: "view",
    name: "get_heroui_doc",
    parameters: {
      additionalProperties: false,
      properties: {
        maxCharacters: {
          default: DEFAULT_PAGE_CHARACTERS,
          maximum: MAX_PAGE_CHARACTERS,
          minimum: 1_000,
          type: "integer",
        },
        start: {default: 0, minimum: 0, type: "integer"},
        url: {
          description:
            "A HeroUI docs path, for example /en/docs/react/components/button or /docs/react/components/button.",
          type: "string",
        },
      },
      required: ["url"],
      type: "object",
    },
  },
  {
    description:
      "Navigate the current browser tab to a same-origin HeroUI page. Use only when the user asks to open or go to a page.",
    displayName: "Open HeroUI page",
    execute(input, context) {
      const url = resolveSameOriginPath(getString(input, "url"), window.location.origin);

      if (!url) throw new Error("url must be a same-origin HeroUI page");

      if (context) context.navigate(url);
      else window.location.assign(url);

      return {navigating: true, url};
    },
    icon: "navigate",
    name: "navigate_heroui",
    needsApproval: true,
    parameters: {
      additionalProperties: false,
      properties: {
        url: {
          description: "A same-origin HeroUI path, for example /en/docs/react/getting-started.",
          type: "string",
        },
      },
      required: ["url"],
      type: "object",
    },
  },
  {
    description:
      "Discover official HeroUI component documentation pages when the exact component is unknown. Returns at most 20 entries.",
    displayName: "List HeroUI components",
    execute(input, _context, execution) {
      const platform = getPlatform(input, "react") === "native" ? "native" : "react";
      const limit = Math.min(Math.max(getInteger(input, "limit", 20), 1), 20);

      return fetchJson(
        `/api/agent/search?q=${encodeURIComponent("/components/")}&platform=${platform}&limit=${limit}&locale=en`,
        execution?.signal,
      );
    },
    icon: "view",
    name: "list_heroui_components",
    parameters: {
      additionalProperties: false,
      properties: {
        limit: {default: 20, maximum: 20, minimum: 1, type: "integer"},
        platform: {default: "react", enum: ["react", "native"], type: "string"},
      },
      type: "object",
    },
  },
  {
    description:
      "Read the current HeroUI docs theme preset, theme-builder values, vibrant-palette setting, and light, dark, or system color scheme. Use this before changing a theme when the user asks to inspect or edit it.",
    displayName: "Read HeroUI theme",
    execute(_input, context) {
      const state = getThemeBuilderState(window.location.href, context?.theme.getMode());

      if (!context || state.isThemeBuilder) return state;

      const preset = context.theme.getPreset();

      return {
        ...state,
        preset,
        values: {
          ...themeValuesById[preset],
          vibrantPalette: context.theme.getVibrantPalette(),
        },
      };
    },
    name: "get_heroui_theme",
    parameters: {
      additionalProperties: false,
      properties: {},
      type: "object",
    },
  },
  {
    description:
      "Change the current browser's HeroUI docs appearance when the user asks to switch or change the theme. For named themes, pass only preset to apply it immediately on the current page (default, sky, lavender, mint, netflix, uber, spotify, coinbase, airbnb, discord, or rabbit). For example, 'change the docs theme to Uber' must call this tool with preset='uber'. Never include custom theme values with a named preset. Custom accent, neutral tint, font, or radius values open the English theme builder and preserve unspecified settings.",
    displayName: "Update HeroUI theme",
    execute(input, context) {
      const colorScheme = getOptionalEnum(input, "colorScheme", themeModes);
      const preset = getOptionalEnum(input, "preset", themeIds);
      const vibrantPalette = input["vibrantPalette"];
      const hasBuilderValues =
        !preset &&
        themeValueKeys
          .filter((key) => key !== "vibrantPalette")
          .some((key) => input[key] !== undefined);

      if (!colorScheme && !hasBuilderValues && !preset && vibrantPalette === undefined) {
        throw new Error("Provide a preset, theme value, or colorScheme to update");
      }

      if (!context) throw new Error("Theme controls are unavailable");

      if (colorScheme) {
        context.theme.setMode(colorScheme);
      }

      if (preset) context.theme.setPreset(preset);
      if (typeof vibrantPalette === "boolean") {
        context.theme.setVibrantPalette(vibrantPalette);
      }

      const url = hasBuilderValues ? createThemeBuilderUrl(input, window.location.href) : null;

      if (url) {
        context.navigate(url);
      }

      return {
        colorScheme: colorScheme ?? context.theme.getMode() ?? "system",
        navigating: Boolean(url),
        preset: preset ?? context.theme.getPreset(),
        url,
        vibrantPalette:
          typeof vibrantPalette === "boolean" ? vibrantPalette : context.theme.getVibrantPalette(),
      };
    },
    name: "set_heroui_theme",
    needsApproval: false,
    parameters: {
      additionalProperties: false,
      properties: {
        base: {
          description: "Neutral color chroma from 0 to 0.02.",
          maximum: 0.02,
          minimum: 0,
          type: "number",
        },
        chroma: {
          description: "Accent color chroma from 0 to 0.4.",
          maximum: 0.4,
          minimum: 0,
          type: "number",
        },
        colorScheme: {enum: themeModes, type: "string"},
        fontFamily: {enum: fontIds, type: "string"},
        formRadius: {enum: radiusIds, type: "string"},
        hue: {
          description: "Accent hue from 0 to 360.",
          maximum: 360,
          minimum: 0,
          type: "number",
        },
        lightness: {
          description: "Accent lightness from 0 to 1.",
          maximum: 1,
          minimum: 0,
          type: "number",
        },
        preset: {
          description: "Named docs preset to apply immediately to the current page.",
          enum: themeIds,
          type: "string",
        },
        radius: {enum: radiusIds, type: "string"},
        vibrantPalette: {type: "boolean"},
      },
      type: "object",
    },
  },
];

export const docsAgentTools: ClientTool<DocsToolInput, DocsAgentContext>[] =
  docsToolDefinitions.map((definition) => ({
    ...definition,
    execute: (input, context, execution) => definition.execute(input, context, execution),
  }));
