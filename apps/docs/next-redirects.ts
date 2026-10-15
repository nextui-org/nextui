import {readdir, stat} from "fs/promises";
import {join} from "path";

type Redirect = {
  source: string;
  destination: string;
  has?: Array<{type: "host"; value: string}>;
} & (
  | {permanent: boolean; statusCode?: never}
  | {permanent?: never; statusCode: 301 | 302 | 303 | 307 | 308}
);

/**
 * Check if a directory name is a route group (starts with parentheses)
 */
function isRouteGroup(dirName: string): boolean {
  return dirName.startsWith("(") && dirName.endsWith(")");
}

/**
 * Get all MDX file names from a directory recursively (excluding meta.json and index.mdx)
 * Route groups (folders starting with parentheses) are ignored in path construction
 */
async function getMdxFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  try {
    const files = await readdir(dir);
    const mdxFiles: string[] = [];

    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (stats.isFile() && file.endsWith(".mdx") && file !== "index.mdx") {
        // Get relative path from base directory, removing route groups
        const relativePath = filePath.replace(baseDir, "").replace(/\\/g, "/").replace(/^\//, ""); // Remove leading slash

        // Split path and filter out route groups and empty parts
        const pathParts = relativePath.split("/").filter((part) => part && !isRouteGroup(part));

        // Remove the filename (last part) and extension
        const filename = pathParts.pop()?.replace(".mdx", "") || "";

        // Construct route path: if there are path parts, join them with filename, otherwise just filename
        const routePath = pathParts.length > 0 ? `${pathParts.join("/")}/${filename}` : filename;

        mdxFiles.push(routePath);
      } else if (stats.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = await getMdxFiles(filePath, baseDir);

        mdxFiles.push(...subFiles);
      }
    }

    return mdxFiles.sort();
  } catch {
    return [];
  }
}

/**
 * Produce locale-aware redirects for `/docs/...` sources.
 *
 * Every internal docs link in MDX is rewritten by `LocaleLink` to include
 * the current locale prefix (`/cn/docs/...` for Chinese, `/docs/...` for
 * the default `en` locale — Fumadocs strips the prefix for the default
 * language). To make a single conceptual redirect work in every locale,
 * we emit two Next.js rules per mapping:
 *
 *  1. A locale-prefixed source -> locale-prefixed destination (keeps the
 *     user in the same locale, e.g. /cn/docs/handbook/colors ->
 *     /cn/docs/react/getting-started/colors).
 *  2. A bare source -> default-locale destination (covers external links
 *     and crawlers landing on the un-prefixed URL).
 *
 * Both `source` and `destination` MUST start with `/docs/`.
 */
function localizedDocsRedirect(source: string, destination: string): Redirect[] {
  if (!source.startsWith("/docs/") || !destination.startsWith("/docs/")) {
    throw new Error(
      `localizedDocsRedirect expects /docs/... source and destination, got ${source} -> ${destination}`,
    );
  }

  const redirects: Redirect[] = [
    // Locale-prefixed (preserves the visitor's current language).
    {
      destination: `/:lang${destination}`,
      permanent: true,
      source: `/:lang(en|cn)${source}`,
    },
    // Bare path (no locale) -> default locale.
    {
      destination: `/en${destination}`,
      permanent: true,
      source,
    },
  ];

  // Beta and crawler URLs often append `.mdx`. Send those to the HTML page,
  // never to a locale-prefixed copy of the removed path.
  if (!source.includes(":") && !source.endsWith(".mdx")) {
    redirects.push(...localizedDocsRedirect(`${source}.mdx`, destination));
  }

  return redirects;
}

function compactSlug(slug: string): string {
  return slug.replace(/-/g, "");
}

const COMPOUND_SUFFIXES = ["input", "box", "group", "field", "button", "picker"] as const;

function hyphenatedSuffixAliases(slug: string): string[] {
  if (slug.includes("-")) return [];

  return COMPOUND_SUFFIXES.flatMap((suffix) =>
    slug.endsWith(suffix) && slug.length > suffix.length
      ? [`${slug.slice(0, -suffix.length)}-${suffix}`]
      : [],
  );
}

/**
 * Convenience: turn a list of {source, destination} pairs into the full
 * locale-aware redirect set.
 */
function localizedDocsRedirects(
  pairs: ReadonlyArray<{source: string; destination: string}>,
): Redirect[] {
  return pairs.flatMap(({destination, source}) => localizedDocsRedirect(source, destination));
}

/**
 * Generate redirects from `/docs/<prefix>/<route>` to
 * `/docs/react/<prefix>/<route>` (i.e. promoting the framework-agnostic
 * legacy URL to the `react` namespace), in both locale and non-locale form.
 */
function generateRedirects(routes: string[], prefix: string): Redirect[] {
  return localizedDocsRedirects(
    routes.map((route) => ({
      destination: `/docs/react/${prefix ? `${prefix}/` : ""}${route}`,
      source: `/docs/${prefix ? `${prefix}/` : ""}${route}`,
    })),
  );
}

/**
 * Main function to generate all redirects
 */
export async function getRedirects(): Promise<Redirect[]> {
  // Content lives under `content/docs/{en,cn}/react/...` because Fumadocs is
  // configured with `parser: "dir"` for i18n. The English copy is the source
  // of truth for the route list, so we enumerate redirects from there.
  const rootDir = join(process.cwd(), "content/docs/en/react");
  const redirects: Redirect[] = [];

  // Keep the apex domain canonical. This rule is also enforced in the Vercel
  // project domain configuration, which must route `www` to this deployment for
  // the application-level permanent status to take effect.
  redirects.push({
    destination: "https://heroui.com/:path*",
    has: [{type: "host", value: "www.heroui.com"}],
    permanent: true,
    source: "/:path*",
  });

  // The default-locale homepage is canonical at the apex, without `/en`.
  redirects.push({
    destination: "/",
    permanent: true,
    source: "/en",
  });

  // HeroUI Agents product page lives on heroui.pro. Docs and npm still link to
  // heroui.com/agents, so send those legacy paths to the live product URL.
  const agentsProductUrl = "https://heroui.pro/agents";

  redirects.push(
    {
      destination: agentsProductUrl,
      permanent: true,
      source: "/agents",
    },
    {
      destination: agentsProductUrl,
      permanent: true,
      source: "/:lang(en|cn)/agents",
    },
  );

  // Theme builder redirect - redirect /theme to /themes
  redirects.push({
    destination: "/themes",
    permanent: true,
    source: "/theme",
  });

  // Blog moved under [lang] for i18n. Redirect legacy /blog and /blog/<slug>
  // to the default-locale URL so old links keep working.
  redirects.push(
    {
      destination: "/en/blog",
      permanent: true,
      source: "/blog",
    },
    {
      destination: "/en/blog/:slug",
      permanent: true,
      source: "/blog/:slug",
    },
  );

  // Showcase moved under [lang] for i18n. Redirect legacy /showcase and
  // /showcase/<id> to the default-locale URL so old links keep working.
  redirects.push(
    {
      destination: "/en/showcase",
      permanent: true,
      source: "/showcase",
    },
    {
      destination: "/en/showcase/:id",
      permanent: true,
      source: "/showcase/:id",
    },
  );

  // Framework root redirects - redirect /react, /web, and /native to their respective docs
  redirects.push(
    {
      destination: "/docs/react/getting-started",
      permanent: true,
      source: "/react",
    },
    {
      destination: "/docs/react/getting-started",
      permanent: true,
      source: "/web",
    },
    {
      destination: "/docs/native/getting-started",
      permanent: true,
      source: "/native",
    },
  );

  // Root redirects (bare /docs and locale-prefixed /en/docs, /cn/docs).
  redirects.push(
    {
      destination: "/en/docs/react/getting-started",
      permanent: true,
      source: "/docs",
    },
    // Locale-prefixed root redirect (i18n)
    // Without these, /en/docs and /cn/docs hit the catch-all route with no slug
    // and 404 because there is no content/docs/{locale}/index.mdx.
    {
      destination: "/:lang/docs/react/getting-started",
      permanent: true,
      source: "/:lang(en|cn)/docs",
    },
  );

  // Framework root redirects under /docs (parallel to /react and /native at
  // the site root). Without these, links like /docs/react and /docs/native
  // 404 because there is no content/docs/{react,native}/index.mdx.
  redirects.push(
    ...localizedDocsRedirects([
      {destination: "/docs/react/getting-started", source: "/docs/react"},
      {destination: "/docs/native/getting-started", source: "/docs/native"},
    ]),
  );

  // Bare /docs/components -> the components index page
  redirects.push(...localizedDocsRedirect("/docs/components", "/docs/react/components"));

  // Redirect /docs/getting-started to /docs/react/getting-started
  redirects.push(...localizedDocsRedirect("/docs/getting-started", "/docs/react/getting-started"));

  // Getting Started pages - now includes (overview), (handbook), and (ui-for-agents) route groups
  const gettingStartedDir = join(rootDir, "getting-started");
  const gettingStartedPages = await getMdxFiles(gettingStartedDir);

  redirects.push(...generateRedirects(gettingStartedPages, "getting-started"));

  // Backward compatibility: redirect old get-started paths to new getting-started paths
  redirects.push(
    ...gettingStartedPages.flatMap((page) =>
      localizedDocsRedirect(`/docs/get-started/${page}`, `/docs/react/getting-started/${page}`),
    ),
  );

  // Backward compatibility: redirect old root paths to new getting-started paths
  redirects.push(
    ...localizedDocsRedirects([
      {destination: "/docs/react/getting-started", source: "/docs/introduction"},
      {destination: "/docs/react/getting-started/quick-start", source: "/docs/quick-start"},
      {destination: "/docs/react/components", source: "/docs/components-list"},
      {
        destination: "/docs/react/getting-started/design-principles",
        source: "/docs/react/design-principles",
      },
      {
        destination: "/docs/react/getting-started/design-principles",
        source: "/docs/design-principles",
      },
      {
        destination: "/docs/react/getting-started/colors",
        source: "/docs/customization/colors",
      },
      {
        destination: "/docs/react/getting-started/colors",
        source: "/docs/react/customization/colors",
      },
    ]),
  );

  // Releases (index and versions)
  redirects.push(...localizedDocsRedirect("/docs/changelog", "/docs/react/releases"));

  const releasesDir = join(rootDir, "releases");
  const releasesVersions = await getMdxFiles(releasesDir);

  redirects.push(...generateRedirects(releasesVersions, "releases"));

  // Backward compatibility: redirect old changelog paths to new releases paths
  redirects.push(...localizedDocsRedirect("/docs/react/changelog", "/docs/react/releases"));

  // Generate backward compatibility redirects for all changelog version pages
  releasesVersions.forEach((version) => {
    redirects.push(
      ...localizedDocsRedirect(
        `/docs/react/changelog/${version}`,
        `/docs/react/releases/${version}`,
      ),
      ...localizedDocsRedirect(`/docs/changelog/${version}`, `/docs/react/releases/${version}`),
    );
  });

  // Components - now organized in categorized subdirectories with route groups
  const componentsDir = join(rootDir, "components");
  const components = await getMdxFiles(componentsDir);

  redirects.push(...generateRedirects(components, "components"));

  // Legacy v2 component URLs should prefer a current React component page.
  // If no current component uses that slug, route to its v2 migration guide.
  // Keep this after the component redirects so current pages win when both exist.
  const migrationComponentsDir = join(rootDir, "migration/(components)");
  const migrationComponents = await getMdxFiles(migrationComponentsDir);
  const currentComponents = new Set(components);
  const currentByCompact = new Map(
    components.map((component) => [compactSlug(component), component]),
  );
  const migrationOnlyComponents = migrationComponents.filter(
    (component) =>
      !currentComponents.has(component) && !currentByCompact.has(compactSlug(component)),
  );

  redirects.push(
    ...localizedDocsRedirects(
      migrationOnlyComponents.flatMap((component) => {
        const destination = `/docs/react/migration/${component}`;

        return [component, ...hyphenatedSuffixAliases(component)].map((source) => ({
          destination,
          source: `/docs/components/${source}`,
        }));
      }),
    ),
  );

  // Compact legacy slugs whose hyphenated form is a live component
  // (e.g. /docs/components/listbox -> /docs/react/components/list-box).
  redirects.push(
    ...localizedDocsRedirects(
      [...currentByCompact.entries()].flatMap(([compact, current]) => {
        if (compact === current || currentComponents.has(compact)) return [];

        return [
          {
            destination: `/docs/react/components/${current}`,
            source: `/docs/components/${compact}`,
          },
        ];
      }),
    ),
  );

  // Component name redirects - backward compatibility for renamed components
  redirects.push(
    ...localizedDocsRedirects([
      {
        destination: "/docs/react/components/typography",
        source: "/docs/react/components/text",
      },
      {
        destination: "/docs/react/components/text-area",
        source: "/docs/react/components/textarea",
      },
      {
        destination: "/docs/react/components/combo-box",
        source: "/docs/react/components/combobox",
      },
      {
        destination: "/docs/react/components/list-box",
        source: "/docs/react/components/listbox",
      },
      {
        destination: "/docs/react/components/number-field",
        source: "/docs/react/components/numberfield",
      },
      {
        destination: "/docs/react/components/tag-group",
        source: "/docs/react/components/taggroup",
      },
      {
        destination: "/docs/react/components/tag-group",
        source: "/docs/components/taggroup",
      },
    ]),
  );

  // Unknown legacy component slugs should fail in the current React namespace,
  // never under the removed `/docs/components/*` namespace.
  redirects.push(
    ...localizedDocsRedirect("/docs/components/:path*.mdx", "/docs/react/components/:path*"),
    ...localizedDocsRedirect("/docs/components/:path*", "/docs/react/components/:path*"),
  );

  // Pre-v3 docs namespaces that have no `/react` prefix. Catch-alls must come
  // after more specific mappings (e.g. /docs/customization/colors).
  redirects.push(
    ...localizedDocsRedirects([
      {
        destination: "/docs/react/getting-started/frameworks",
        source: "/docs/frameworks",
      },
      {
        destination: "/docs/react/getting-started/frameworks",
        source: "/docs/frameworks/vite",
      },
      {
        destination: "/docs/react/getting-started/frameworks",
        source: "/docs/frameworks/nextjs",
      },
      {
        destination: "/docs/react/getting-started/theming",
        source: "/docs/customization",
      },
      {
        destination: "/docs/react/getting-started/theming",
        source: "/docs/customization/create-theme",
      },
      {
        destination: "/docs/react/getting-started/theming",
        source: "/docs/customization/theme",
      },
      {
        destination: "/docs/react/migration",
        source: "/docs/guide",
      },
      {
        destination: "/docs/react/migration",
        source: "/docs/guide/nextui-to-heroui",
      },
    ]),
    ...localizedDocsRedirect(
      "/docs/frameworks/:path*.mdx",
      "/docs/react/getting-started/frameworks",
    ),
    ...localizedDocsRedirect("/docs/frameworks/:path*", "/docs/react/getting-started/frameworks"),
    ...localizedDocsRedirect(
      "/docs/customization/:path*.mdx",
      "/docs/react/getting-started/theming",
    ),
    ...localizedDocsRedirect("/docs/customization/:path*", "/docs/react/getting-started/theming"),
    ...localizedDocsRedirect("/docs/guide/:path*.mdx", "/docs/react/migration"),
    ...localizedDocsRedirect("/docs/guide/:path*", "/docs/react/migration"),
  );

  // Handbook migration: redirect old handbook paths to new getting-started paths.
  // Also catch route-group names that leaked into URLs: route groups organize
  // source files but are never part of the public route.
  const handbookPages = ["colors", "theming", "styling", "animation", "composition", "dark-mode"];
  const nativeHandbookPages = [
    "provider",
    "portal",
    "colors",
    "theming",
    "styling",
    "animation",
    "composition",
  ];

  redirects.push(
    ...handbookPages.flatMap((page) => [
      ...localizedDocsRedirect(
        `/docs/react/handbook/${page}`,
        `/docs/react/getting-started/${page}`,
      ),
      ...localizedDocsRedirect(`/docs/handbook/${page}`, `/docs/react/getting-started/${page}`),
    ]),
    ...[
      {pages: handbookPages, platform: "react"},
      {pages: nativeHandbookPages, platform: "native"},
    ].flatMap(({pages, platform}) =>
      pages.flatMap((page) =>
        localizedDocsRedirect(
          `/docs/${platform}/getting-started/handbook/${page}`,
          `/docs/${platform}/getting-started/${page}`,
        ),
      ),
    ),
  );

  // UI for Agents migration: redirect old ui-for-agents paths to new getting-started paths
  // UI for Agents pages are now under getting-started/(ui-for-agents)/
  const uiForAgentsPages = ["llms-txt", "mcp-server"];

  redirects.push(
    ...uiForAgentsPages.flatMap((page) => [
      ...localizedDocsRedirect(
        `/docs/react/ui-for-agents/${page}`,
        `/docs/react/getting-started/${page}`,
      ),
      ...localizedDocsRedirect(
        `/docs/ui-for-agents/${page}`,
        `/docs/react/getting-started/${page}`,
      ),
    ]),
  );

  return redirects;
}
