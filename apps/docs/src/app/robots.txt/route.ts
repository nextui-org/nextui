import {absoluteUrl} from "@/lib/seo";

export const revalidate = false;

/**
 * Content Signals (https://contentsignals.org) is not expressible through
 * Next.js' `MetadataRoute.Robots` type, so `robots.txt` is served as a route
 * instead of a static file. Keeping it in the app means the `Sitemap` line can
 * never drift from the deployed canonical host.
 */
const CONTENT_SIGNAL = "Content-Signal: ai-train=yes, search=yes, ai-input=yes";
const GOOGLEBOT_DISALLOWS = [
  "/*.mdx$",
  "/llms*.txt$",
  "/react/llms*.txt$",
  "/react/DESIGN.md$",
  "/native/llms*.txt$",
  "/native/DESIGN.md$",
  "/*/node_modules/*",
  "/*/src/*.d.ts$",
];

export const GET = () => {
  const body = [
    "# Public HTML pages are crawlable. Machine-readable docs stay available to",
    "# humans and agents, but are excluded from Google Search.",
    "User-agent: *",
    "Allow: /",
    CONTENT_SIGNAL,
    "",
    "User-agent: Googlebot",
    ...GOOGLEBOT_DISALLOWS.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
