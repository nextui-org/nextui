"use client";

import type {Key} from "@heroui/react";
import type {Item, Node} from "fumadocs-core/page-tree";
import type {SearchItemType, SharedProps} from "fumadocs-ui/components/dialog/search";
import type {ComponentProps} from "react";

import {useTranslations} from "@fuma-translate/react";
import {Sparkles} from "@gravity-ui/icons";
import {useAgent} from "@heroui/agent/next";
import {Chip, Kbd, Tag, TagGroup} from "@heroui/react";
import {useDocsSearch} from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogList,
  SearchDialogOverlay,
  useSearch,
} from "fumadocs-ui/components/dialog/search";
import {useI18n} from "fumadocs-ui/contexts/i18n";
import {useTreeContext} from "fumadocs-ui/contexts/tree";
import {ArrowRight} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {tv} from "tailwind-variants";

import {useDictionary} from "@/hooks/use-dictionary";
import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";

// Default suggested pages for each tag
const DEFAULT_SUGGESTIONS: Record<"native" | "web", string[]> = {
  native: [
    "/docs/native/getting-started",
    "/docs/native/getting-started/quick-start",
    "/docs/native/getting-started/design-principles",
    "/docs/native/getting-started/provider",
    "/docs/native/getting-started/colors",
    "/docs/native/getting-started/theming",
  ],
  web: [
    "/docs/react/getting-started",
    "/docs/react/getting-started/quick-start",
    "/docs/react/getting-started/design-principles",
    "/docs/react/getting-started/colors",
    "/docs/react/getting-started/theming",
  ],
};

const PRO_URL = process.env["NEXT_PUBLIC_PRO_URL"] ?? "https://heroui.pro";
const PRO_SEARCH_DEBOUNCE_MS = 150;

interface ProComponent {
  title: string;
  description: string;
  slug: string;
  category: string;
}

function useProSearch(query: string, tag: "web" | "native") {
  const [results, setResults] = useState<ProComponent[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback(
    (q: string) => {
      abortRef.current?.abort();

      if (!q) {
        setResults([]);

        return;
      }

      const controller = new AbortController();

      abortRef.current = controller;

      fetch(`${PRO_URL}/docs/api/pro-components/search?q=${encodeURIComponent(q)}&tag=${tag}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : {results: []}))
        .then((data: {results: ProComponent[]}) => {
          if (!controller.signal.aborted) {
            setResults(data.results);
          }
        })
        .catch(() => {
          // aborted or network error — ignore
        });
    },
    [tag],
  );

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => fetchResults(query), PRO_SEARCH_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, fetchResults]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return results;
}

const tagStyles = tv({
  base: "bg-default/80 px-2 data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent-soft-foreground",
});

export default function CustomSearchDialog(props: SharedProps) {
  const agent = useAgent(HEROUI_DOCS_AGENT_ID);
  const dict = useDictionary();
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  const getDefaultTag = (path: string): "web" | "native" => {
    if (path.startsWith("/docs/native/")) return "native";
    if (path.startsWith("/docs/react/")) return "web";

    return "web";
  };

  const [selected, setSelected] = useState<Iterable<Key>>(() => new Set([getDefaultTag(pathname)]));

  useEffect(() => {
    // Only update if pathname actually changed
    if (previousPathnameRef.current !== pathname) {
      const defaultTag = getDefaultTag(pathname);

      setSelected(new Set([defaultTag]));
      previousPathnameRef.current = pathname;
    }
  }, [pathname]);

  const selectedTag = useMemo(() => {
    return Array.from(selected).includes("web") ? "web" : "native";
  }, [selected]);

  const {locale} = useI18n();

  const {query, search, setSearch} = useDocsSearch({
    locale,
    tag: selectedTag,
    type: "fetch",
  });
  const {onOpenChange, ...restProps} = props;
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) {
      setSearch("");
    }
  };
  const {full} = useTreeContext();
  const router = useRouter();

  // Collect all pages from the tree
  const allPages = useMemo(() => {
    const pages: Item[] = [];

    function onNode(node: Node) {
      if (node.type === "page") {
        pages.push(node);
      } else if (node.type === "folder") {
        if (node.index) onNode(node.index);
        for (const item of node.children) onNode(item);
      }
    }

    for (const item of full.children) onNode(item);

    return pages;
  }, [full]);

  // Strip the locale prefix from a page tree URL so comparisons can be done
  // against locale-agnostic paths like `/docs/react/...`.
  const stripLocale = useCallback(
    (url: string | undefined) => {
      if (!url) return "";
      if (locale && url.startsWith(`/${locale}/`)) {
        return url.slice(locale.length + 1);
      }

      return url;
    },
    [locale],
  );

  // Filter pages by tag and create a map
  const searchMap = useMemo(() => {
    const map = new Map<string, Item>();
    const tagPrefix = selectedTag === "web" ? "/docs/react/" : "/docs/native/";
    const releasePrefix =
      selectedTag === "web" ? "/docs/react/releases/" : "/docs/native/releases/";
    const migrationPrefix = "/docs/react/migration";

    for (const page of allPages) {
      const path = stripLocale(page.url);
      const isMigrationSubPage = path.startsWith(migrationPrefix) && path !== migrationPrefix;

      if (
        path.startsWith(tagPrefix) &&
        !path.startsWith(releasePrefix) &&
        !isMigrationSubPage &&
        typeof page.name === "string"
      ) {
        map.set(page.name.toLowerCase(), page);
      }
    }

    return map;
  }, [allPages, selectedTag, stripLocale]);

  // Get default suggestions for the current tag
  const defaultSuggestions = useMemo(() => {
    if (search.length > 0) return [];

    const suggestionUrls = DEFAULT_SUGGESTIONS[selectedTag];
    const suggestions: SearchItemType[] = [];

    for (const url of suggestionUrls) {
      const page = allPages.find((p) => stripLocale(p.url) === url);

      if (page && page.name) {
        suggestions.push({
          id: `suggestion-${url}`,
          node: (
            <div className="inline-flex items-center gap-2">
              {page.icon}
              <span>{page.name}</span>
            </div>
          ),
          onSelect: () => router.push((page.url ?? url) as any),
          type: "action",
        });
      }
    }

    return suggestions;
  }, [allPages, selectedTag, search, router, stripLocale]);

  let pageTreeAction: SearchItemType | undefined;

  if (search.length > 0) {
    const normalized = search.toLowerCase();

    for (const [k, page] of searchMap) {
      if (!k.startsWith(normalized)) continue;

      pageTreeAction = {
        id: "quick-action",
        node: (
          <div className="text-fd-muted-foreground inline-flex items-center gap-2">
            <ArrowRight className="size-4" />
            <p>
              {dict.searchDialog.jumpTo}{" "}
              <span className="text-fd-foreground font-medium">{page.name}</span>
            </p>
          </div>
        ),
        onSelect: () => router.push(page.url as any),
        type: "action",
      };
      break;
    }
  }

  const proComponents = useProSearch(search, selectedTag);

  const proResults: SearchItemType[] = useMemo(() => {
    if (search.length === 0) return [];

    return proComponents.map((comp) => ({
      id: `pro-${comp.slug}`,
      node: (
        <div className="inline-flex w-full items-center gap-2">
          <ArrowRight className="text-fd-muted-foreground size-4" />
          <p className="truncate">{comp.title}</p>
          <Chip className="ms-auto shrink-0" color="accent" size="sm" variant="soft">
            PRO
          </Chip>
        </div>
      ),
      onSelect: () =>
        window.open(
          `${PRO_URL}${comp.slug}?utm_source=heroui_docs&utm_medium=search&utm_campaign=pro_components`,
          "_blank",
        ),
      type: "action" as const,
    }));
  }, [proComponents, search]);

  const assistantAction = useMemo<SearchItemType | null>(() => {
    const prompt = search.trim();

    if (!prompt || locale !== "en") return null;

    return {
      id: "ask-ai",
      node: (
        <div className="flex w-full items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-soft-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-fd-muted-foreground block text-xs">Ask AI</span>
            <span className="block truncate font-medium">Ask “{prompt}”</span>
          </span>
        </div>
      ),
      onSelect: () => agent.newConversation(prompt),
      type: "action",
    };
  }, [agent, locale, search]);

  const releasesPath = useMemo(() => {
    return `/docs/${selectedTag === "web" ? "react" : "native"}/releases`;
  }, [selectedTag]);

  const migrationPath = "/docs/react/migration";

  const queryData = useMemo(() => {
    if (!query.data || query.data === "empty") return null;

    return query.data.filter((item) => {
      const path = stripLocale(item.url);

      if (path.startsWith(releasesPath)) return false;
      if (path.startsWith(migrationPath) && path !== migrationPath) {
        return false;
      }

      return true;
    });
  }, [query.data, releasesPath, migrationPath, stripLocale]);

  return (
    <SearchDialog
      isLoading={query.isLoading}
      search={search}
      onOpenChange={handleOpenChange}
      onSearchChange={setSearch}
      {...restProps}
    >
      <SearchDialogOverlay />
      <SearchDialogContent className="border-none bg-surface">
        <div className="border-none px-2 pt-2">
          <TagGroup
            disallowEmptySelection
            aria-label={dict.frameworksTabs.ariaLabel}
            selectedKeys={selected}
            selectionMode="single"
            onSelectionChange={(keys) => setSelected(keys)}
          >
            <TagGroup.List className="gap-1">
              <Tag className={tagStyles()} id="web">
                {dict.frameworksTabs.web}
              </Tag>
              <Tag className={tagStyles()} id="native">
                {dict.frameworksTabs.native}
              </Tag>
            </TagGroup.List>
          </TagGroup>
        </div>
        <SearchDialogHeader className="border-b border-separator">
          <SearchDialogIcon />
          <SearchDialogInput placeholder={dict.searchDialog.placeholder} />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          className="**:aria-selected:bg-default **:aria-selected:text-foreground"
          items={
            search.length === 0
              ? defaultSuggestions.length > 0
                ? defaultSuggestions
                : null
              : queryData || pageTreeAction || proResults.length > 0
                ? [
                    ...(assistantAction ? [assistantAction] : []),
                    ...(pageTreeAction ? [pageTreeAction] : []),
                    ...proResults,
                    ...(Array.isArray(queryData) ? queryData : []),
                  ]
                : null
          }
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}

function SearchDialogInput(props: ComponentProps<"input">) {
  const t = useTranslations({note: "search dialog"});
  const {onSearchChange, search} = useSearch();

  return (
    <input
      {...props}
      autoFocus
      className="placeholder:text-fd-muted-foreground w-0 flex-1 bg-transparent text-lg focus-visible:outline-none"
      placeholder={props.placeholder || t("Search")}
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

function SearchDialogClose({children = "ESC", className, ...props}: ComponentProps<"kbd">) {
  const {onOpenChange} = useSearch();

  return (
    <Kbd className={className} onClick={() => onOpenChange(false)} {...props}>
      <Kbd.Content>{children}</Kbd.Content>
    </Kbd>
  );
}
