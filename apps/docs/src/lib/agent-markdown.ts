type AcceptEntry = {
  mediaType: string;
  q: number;
};

function parseAcceptHeader(accept: string): AcceptEntry[] {
  return accept
    .split(",")
    .map((entry) => {
      const [mediaType = "", ...params] = entry.split(";").map((part) => part.trim());
      const qParam = params.find((param) => param.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;

      return {
        mediaType: mediaType.toLowerCase(),
        q: Number.isFinite(q) ? q : 1,
      };
    })
    .filter((entry) => entry.mediaType.length > 0 && entry.q > 0)
    .sort((a, b) => b.q - a.q);
}

function getQuality(entries: AcceptEntry[], mediaType: string): number {
  const exact = entries.find((entry) => entry.mediaType === mediaType);

  if (exact) return exact.q;

  const [type] = mediaType.split("/");
  const typeWildcard = entries.find((entry) => entry.mediaType === `${type}/*`);

  if (typeWildcard) return typeWildcard.q;

  const allWildcard = entries.find((entry) => entry.mediaType === "*/*");

  return allWildcard?.q ?? 0;
}

export function acceptsMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept");

  if (!accept) return false;

  const entries = parseAcceptHeader(accept);
  const explicitMarkdown = entries.find((entry) => entry.mediaType === "text/markdown");

  if (!explicitMarkdown) return false;

  const htmlQuality = getQuality(entries, "text/html");

  return explicitMarkdown.q >= htmlQuality;
}

export function estimateMarkdownTokens(markdown: string): number {
  const trimmed = markdown.trim();

  if (!trimmed) return 0;

  return Math.max(trimmed.split(/\s+/).length, Math.ceil(trimmed.length / 4));
}

export function getHomepageMarkdown(origin: string): string {
  const baseUrl = origin.replace(/\/$/, "");

  return `# HeroUI

Beautiful, accessible React UI components built on React Aria and Tailwind CSS v4. The modern alternative to MUI, Chakra UI, and shadcn/ui for building production-ready applications.

HeroUI is the modern UI library for web and mobile, built to help teams move fast, stay consistent, and deliver delightful user experiences.

## Start here

- [Get started](${baseUrl}/docs/react/getting-started)
- [React components](${baseUrl}/docs/react/components)
- [Native components](${baseUrl}/docs/native/components)
- [GitHub repository](https://github.com/heroui-inc/heroui)

## Agent resources

- [LLMs quick index](${baseUrl}/llms.txt)
- [Full LLM documentation](${baseUrl}/llms-full.txt)
- [React LLM documentation](${baseUrl}/react/llms-full.txt)
- [Native LLM documentation](${baseUrl}/native/llms-full.txt)
- [HeroUI React default theme DESIGN.md](${baseUrl}/react/DESIGN.md)
- [HeroUI Native default theme DESIGN.md](${baseUrl}/native/DESIGN.md)
- [HeroUI OpenAPI specification](${baseUrl}/openapi.json)
- [HeroUI Docs Agent API](${baseUrl}/api/agent)
- [API catalog](${baseUrl}/.well-known/api-catalog)
- [MCP discovery handshake](${baseUrl}/.well-known/mcp)
- [MCP server card](${baseUrl}/.well-known/mcp/server-card.json)
- [Agent skills index](${baseUrl}/.well-known/agent-skills/index.json)

## MCP and skills

- [HeroUI React MCP server](${baseUrl}/docs/react/getting-started/mcp-server)
- [HeroUI Native MCP server](${baseUrl}/docs/native/getting-started/mcp-server)
- [HeroUI React Agent Skills](${baseUrl}/docs/react/getting-started/agent-skills)
- [HeroUI Native Agent Skills](${baseUrl}/docs/native/getting-started/agent-skills)
- [HeroUI CLI](${baseUrl}/docs/react/getting-started/cli)

## About HeroUI

- [About HeroUI](${baseUrl}/about)
- [Contact HeroUI](${baseUrl}/contact)
- [HeroUI privacy information](${baseUrl}/privacy)
`;
}

export function resolveDocsPathToSlug(pathname: string): string[] | null {
  const normalized = pathname.replace(/\/$/, "");

  if (!normalized.startsWith("/docs/")) return null;

  const slug = normalized
    .replace(/^\/docs\//, "")
    .split("/")
    .filter(Boolean);

  return slug.length > 0 ? slug : null;
}
