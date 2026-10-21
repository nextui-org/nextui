import fs from "node:fs";
import path from "node:path";

import {i18n} from "@/lib/i18n";
import {readFrontmatter} from "@/utils/frontmatter";

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorAvatar?: string;
  authorHandle?: string;
  authorUrl?: string;
  tags: string[];
  image?: string;
  darkImage?: string;
  draft?: boolean;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const DEFAULT_LOCALE = i18n.defaultLanguage;

// Drafts are visible in development/preview but hidden in production builds.
const HIDE_DRAFTS = process.env.NODE_ENV === "production";

function getLocaleDir(locale: string): string {
  return path.join(BLOG_DIR, locale);
}

function parsePost(slug: string, locale: string, rawContent: string): BlogPost {
  const {content, data} = readFrontmatter(rawContent);

  return {
    author: data["author"] || "HeroUI Team",
    authorAvatar: data["authorAvatar"],
    authorHandle: data["authorHandle"],
    authorUrl: data["authorUrl"],
    content,
    darkImage: data["darkImage"],
    date: data["date"],
    description: data["description"],
    draft: Boolean(data["draft"]),
    image: data["image"],
    locale,
    slug,
    tags: data["tags"] || [],
    title: data["title"],
  };
}

function readPostsFromDir(locale: string): BlogPost[] {
  const dir = getLocaleDir(locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const rawContent = fs.readFileSync(path.join(dir, file), "utf-8");

    return parsePost(slug, locale, rawContent);
  });
}

/**
 * Returns all blog posts for the given locale.
 * Posts only available in the default locale are surfaced as fallbacks
 * so non-default locales never appear empty before their content is translated.
 */
export function getAllBlogPosts(locale: string = DEFAULT_LOCALE): BlogPost[] {
  const localePosts = readPostsFromDir(locale);

  let posts = localePosts;

  if (locale !== DEFAULT_LOCALE) {
    const seen = new Set(localePosts.map((p) => p.slug));
    const fallbackPosts = readPostsFromDir(DEFAULT_LOCALE).filter((p) => !seen.has(p.slug));

    posts = [...localePosts, ...fallbackPosts];
  }

  const visible = HIDE_DRAFTS ? posts.filter((post) => !post.draft) : posts;

  return visible.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string, locale: string = DEFAULT_LOCALE): BlogPost | undefined {
  const candidates = locale === DEFAULT_LOCALE ? [DEFAULT_LOCALE] : [locale, DEFAULT_LOCALE];

  for (const candidateLocale of candidates) {
    const filePath = path.join(getLocaleDir(candidateLocale), `${slug}.mdx`);

    if (!fs.existsSync(filePath)) continue;

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const post = parsePost(slug, candidateLocale, rawContent);

    if (HIDE_DRAFTS && post.draft) return undefined;

    return post;
  }

  return undefined;
}

export function getAllBlogTags(locale: string = DEFAULT_LOCALE): string[] {
  const posts = getAllBlogPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags).sort();
}

export function getRelatedPosts(
  slug: string,
  tags: string[],
  limit = 3,
  locale: string = DEFAULT_LOCALE,
): BlogPost[] {
  const allPosts = getAllBlogPosts(locale).filter((p) => p.slug !== slug);

  const scored = allPosts.map((post) => {
    const sharedTags = post.tags.filter((t) => tags.includes(t)).length;

    return {post, score: sharedTags};
  });

  scored.sort(
    (a, b) =>
      new Date(b.post.date).getTime() - new Date(a.post.date).getTime() || b.score - a.score,
  );

  return scored.slice(0, limit).map((s) => s.post);
}
