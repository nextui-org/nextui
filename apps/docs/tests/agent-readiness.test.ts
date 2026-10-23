import type {DocsAgentContext} from "@/components/ai/docs-agent-tools";
import type {ReactElement, ReactNode} from "react";

import {NextRequest} from "next/server";
import {isValidElement} from "react";
import {describe, expect, it, vi} from "vitest";

import {GET as getMcpHandshake} from "@/app/.well-known/mcp/route";

import AboutPage from "@/app/[lang]/(home)/about/page";
import ContactPage from "@/app/[lang]/(home)/contact/page";
import HomePage from "@/app/[lang]/(home)/page";
import PrivacyPage from "@/app/[lang]/(home)/privacy/page";
import {GET as getMarkdown} from "@/app/agent-markdown/route";
import {GET as getUnknownAgentEndpoint} from "@/app/api/agent/[...path]/route";
import {GET as getAgentPage} from "@/app/api/agent/page/route";
import {GET as searchAgentDocs} from "@/app/api/agent/search/route";
import {POST as getAgentAuthToken} from "@/app/api/heroui-agent/auth-token/route";
import {GET as getOpenApi} from "@/app/openapi.json/route";
import {getAgentThemeOptions} from "@/components/ai/docs-agent-theme";
import {
  createDocsPageContext,
  createThemeBuilderUrl,
  docsAgentTools,
  excerptSearchMarkdown,
  getThemeBuilderState,
  resolveSameOriginPath,
  sliceMarkdownResult,
} from "@/components/ai/docs-agent-tools";
import {searchAgentDocs as searchDocs} from "@/lib/agent-api";
import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";
import {getOrganizationJsonLd} from "@/lib/json-ld";
import {generateIndexHeader, generatePlatformIndexHeader} from "@/lib/llms-utils";

const createAuthToken = vi.hoisted(() => vi.fn());
const getPages = vi.hoisted(() => vi.fn(() => []));
const HeroUIAgentAuthError = vi.hoisted(
  () =>
    class extends Error {
      status: number;

      constructor(message: string, status: number) {
        super(message);
        this.status = status;
      }
    },
);

vi.mock("@heroui/agent/server", () => ({HeroUIAgentAuthError, createAuthToken}));
vi.mock("@/lib/get-llm-text", () => ({
  getLLMText: vi.fn(),
}));
vi.mock("@/lib/source", () => ({
  source: {
    getPage: vi.fn(),
    getPages,
  },
}));

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (!isValidElement(node)) return "";

  const element = node as ReactElement<{
    children?: ReactNode;
    description?: string;
    title?: string;
  }>;

  return [
    element.props.title ?? "",
    element.props.description ?? "",
    extractText(element.props.children),
  ].join(" ");
}

function collectHeadingLevels(node: ReactNode): number[] {
  if (Array.isArray(node)) return node.flatMap(collectHeadingLevels);
  if (!isValidElement(node)) return [];

  const element = node as ReactElement<{children?: ReactNode}>;
  const level =
    typeof element.type === "string" && /^h[1-6]$/.test(element.type)
      ? Number(element.type.slice(1))
      : null;

  return [...(level === null ? [] : [level]), ...collectHeadingLevels(element.props.children)];
}

describe("HeroUI agent readiness", () => {
  it("keeps the docs Agent token exchange on the server", async () => {
    createAuthToken.mockClear();
    const previousApiKey = process.env["HEROUI_AGENT_API_KEY"];

    process.env["HEROUI_AGENT_API_KEY"] = "test-server-key";
    createAuthToken.mockResolvedValue({expiresAt: 123, token: "short-lived-token"});

    try {
      const response = await getAgentAuthToken(
        new Request("https://heroui.com/api/heroui-agent/auth-token", {
          body: JSON.stringify({agentId: HEROUI_DOCS_AGENT_ID, anonymousId: "visitor-1"}),
          headers: {"Content-Type": "application/json"},
          method: "POST",
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({expiresAt: 123, token: "short-lived-token"});
      expect(createAuthToken).toHaveBeenCalledWith({
        agentId: HEROUI_DOCS_AGENT_ID,
        anonymousId: "visitor-1",
        apiKey: "test-server-key",
        identity: {id: "visitor-1", type: "anonymous"},
        metadata: {surface: "heroui-docs"},
      });
    } finally {
      if (previousApiKey === undefined) delete process.env["HEROUI_AGENT_API_KEY"];
      else process.env["HEROUI_AGENT_API_KEY"] = previousApiKey;
    }
  });

  it("rejects token requests for another Agent", async () => {
    createAuthToken.mockClear();
    const response = await getAgentAuthToken(
      new Request("https://heroui.com/api/heroui-agent/auth-token", {
        body: JSON.stringify({agentId: "another-agent", anonymousId: "visitor-1"}),
        headers: {"Content-Type": "application/json"},
        method: "POST",
      }),
    );

    expect(response.status).toBe(400);
    expect(createAuthToken).not.toHaveBeenCalled();
  });

  it("rejects invalid anonymous IDs before requesting an Agent token", async () => {
    createAuthToken.mockClear();

    for (const anonymousId of ["   ", "x".repeat(201)]) {
      const response = await getAgentAuthToken(
        new Request("https://heroui.com/api/heroui-agent/auth-token", {
          body: JSON.stringify({agentId: HEROUI_DOCS_AGENT_ID, anonymousId}),
          headers: {"Content-Type": "application/json"},
          method: "POST",
        }),
      );

      expect(response.status).toBe(400);
    }

    expect(createAuthToken).not.toHaveBeenCalled();
  });

  it("preserves SDK validation errors from the Agent token exchange", async () => {
    createAuthToken.mockClear();
    const previousApiKey = process.env["HEROUI_AGENT_API_KEY"];

    process.env["HEROUI_AGENT_API_KEY"] = "test-server-key";
    createAuthToken.mockRejectedValue(new HeroUIAgentAuthError("reserved identity", 400));

    try {
      const response = await getAgentAuthToken(
        new Request("https://heroui.com/api/heroui-agent/auth-token", {
          body: JSON.stringify({agentId: HEROUI_DOCS_AGENT_ID, anonymousId: "anonymous"}),
          headers: {"Content-Type": "application/json"},
          method: "POST",
        }),
      );

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({error: "Agent authentication failed"});
    } finally {
      if (previousApiKey === undefined) delete process.env["HEROUI_AGENT_API_KEY"];
      else process.env["HEROUI_AGENT_API_KEY"] = previousApiKey;
    }
  });

  it("exposes bounded docs tools and only approval-gates explicit navigation", () => {
    expect(docsAgentTools.map((tool) => tool.name)).toEqual([
      "search_heroui_docs",
      "get_heroui_doc",
      "navigate_heroui",
      "list_heroui_components",
      "get_heroui_theme",
      "set_heroui_theme",
    ]);
    expect(docsAgentTools.find((tool) => tool.name === "navigate_heroui")?.needsApproval).toBe(
      true,
    );
    expect(docsAgentTools.find((tool) => tool.name === "set_heroui_theme")?.needsApproval).toBe(
      false,
    );
    expect(resolveSameOriginPath("/en/docs/react/releases", "https://heroui.com")).toBe(
      "/en/docs/react/releases",
    );
    expect(resolveSameOriginPath("https://example.com/docs", "https://heroui.com")).toBeNull();
    expect(
      docsAgentTools.every((tool) => !JSON.stringify(tool.parameters).includes('"locale"')),
    ).toBe(true);
  });

  it("ranks noncontiguous documentation query terms with exact component titles first", () => {
    getPages.mockReturnValue([
      {
        data: {description: "Disable a control", title: "Button"},
        slugs: ["react", "components", "button"],
        url: "/docs/react/components/button",
      },
      {
        data: {description: "Button patterns", title: "Button group"},
        slugs: ["react", "components", "button-group"],
        url: "/docs/react/components/button-group",
      },
    ] as never[]);

    try {
      expect(searchDocs("button disabled", "react").map(({title}) => title)).toEqual([
        "Button",
        "Button group",
      ]);
    } finally {
      getPages.mockReturnValue([]);
    }
  });

  it("returns a deep API match within a bounded search excerpt", () => {
    const markdown = `${"# Button\n\n"}${"Filler line.\n".repeat(500)}| isDisabled | boolean | Disables the button |`;
    const excerpt = excerptSearchMarkdown(markdown, "button disabled", 500);

    expect(excerpt.truncated).toBe(true);
    expect(excerpt.excerpt).toContain("isDisabled");
    expect(excerpt.excerpt.length).toBeLessThanOrEqual(500);
  });

  it("enriches only the top three docs search results and leaves authorization failures bounded", async () => {
    const search = docsAgentTools.find((tool) => tool.name === "search_heroui_docs")!;
    const previousWindow = globalThis.window;
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/agent/search")) {
        return Response.json({
          results: [0, 1, 2, 3].map((index) => ({
            title: `Button ${index}`,
            url: `/docs/react/components/button-${index}`,
          })),
        });
      }
      if (input.includes("button-2")) return Response.json({error: "Forbidden"}, {status: 403});

      return Response.json({markdown: `# Button\n\nUse isDisabled to disable the button.`});
    });

    vi.stubGlobal("window", {location: {origin: "https://heroui.com"}});
    vi.stubGlobal("fetch", fetchMock);

    try {
      const result = (await search.execute(
        {query: "button disabled"},
        {} as DocsAgentContext,
        {} as Parameters<typeof search.execute>[2],
      )) as {
        results: Array<{contentError?: string; excerpt?: string}>;
      };

      expect(fetchMock).toHaveBeenCalledTimes(4);
      expect(result.results[0]?.excerpt).toContain("isDisabled");
      expect(result.results[2]).toMatchObject({contentError: "Forbidden"});
      expect(result.results[3]).not.toHaveProperty("excerpt");
    } finally {
      vi.unstubAllGlobals();
      if (previousWindow) vi.stubGlobal("window", previousWindow);
    }
  });

  it("skips page requests when docs search content is disabled", async () => {
    const search = docsAgentTools.find((tool) => tool.name === "search_heroui_docs")!;
    const fetchMock = vi.fn(async () =>
      Response.json({results: [{url: "/docs/react/components/button"}]}),
    );

    vi.stubGlobal("fetch", fetchMock);

    try {
      await search.execute(
        {includeContent: false, query: "button"},
        {} as DocsAgentContext,
        {} as Parameters<typeof search.execute>[2],
      );
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("keeps documentation tool results below the Agent receipt limit", () => {
    const result = sliceMarkdownResult({markdown: "a".repeat(92_000), title: "Large page"}) as {
      markdown: string;
      range: {end: number; start: number; totalCharacters: number};
      title: string;
      truncated: boolean;
    };

    expect(result.markdown).toHaveLength(40_000);
    expect(result.range).toEqual({end: 40_000, start: 0, totalCharacters: 92_000});
    expect(result.truncated).toBe(true);
  });

  it("builds compact English page context for the docs Agent", () => {
    expect(
      createDocsPageContext({
        description: "Button component documentation",
        hash: "#usage",
        heading: "Button",
        href: "https://heroui.com/en/docs/react/components/button?tab=usage",
        title: "Button | HeroUI",
      }),
    ).toEqual({
      locale: "en",
      page: {
        description: "Button component documentation",
        heading: "Button",
        title: "Button | HeroUI",
      },
      platform: "react",
      route: {
        hash: "#usage",
        pathname: "/en/docs/react/components/button",
        query: {tab: "usage"},
      },
    });
  });

  it("reads and updates shareable HeroUI theme builder state", () => {
    expect(
      getThemeBuilderState(
        "https://heroui.com/en/themes?lightness=0.72&chroma=0.18&hue=210&vibrantPalette=true",
        "dark",
      ),
    ).toMatchObject({
      colorScheme: "dark",
      isThemeBuilder: true,
      preset: "custom",
      values: {
        chroma: 0.18,
        hue: 210,
        lightness: 0.72,
        vibrantPalette: true,
      },
    });

    const updated = new URL(
      createThemeBuilderUrl(
        {preset: "mint", radius: "large", vibrantPalette: true},
        "https://heroui.com/en/docs/react/getting-started?tab=install",
      ),
      "https://heroui.com",
    );

    expect(updated.pathname).toBe("/en/themes");
    expect(Object.fromEntries(updated.searchParams)).toMatchObject({
      chroma: "0.12",
      hue: "155",
      lightness: "0.82",
      radius: "large",
      vibrantPalette: "true",
    });
  });

  it("rejects unsafe theme builder values", () => {
    expect(() => createThemeBuilderUrl({hue: 900}, "https://heroui.com/en/themes")).toThrow(
      "hue must be a number between 0 and 360",
    );
    expect(() =>
      createThemeBuilderUrl({fontFamily: "javascript:alert(1)"}, "https://heroui.com/en/themes"),
    ).toThrow("fontFamily must be one of");
  });

  it("maps docs presets to the Agent theme surface", () => {
    const sky = getAgentThemeOptions("sky", "light");
    const lavender = getAgentThemeOptions("lavender", "dark");

    expect(sky.colorScheme).toBe("light");
    expect(lavender.colorScheme).toBe("dark");
    expect(sky.colors?.accent).not.toEqual(lavender.colors?.accent);
    expect(sky.colors?.background).not.toEqual(lavender.colors?.background);
    expect(sky.radius).toBe("round");
    expect(sky.typography?.fontFamily).toBe('"Inter", sans-serif');
  });

  it("publishes a typed OpenAPI alias with unique documented operations", async () => {
    const response = getOpenApi(new Request("https://heroui.com/openapi.json"));
    const document = (await response.json()) as {
      info: {title: string};
      openapi: string;
      paths: Record<string, Record<string, {description?: string; operationId?: string}>>;
    };
    const operations = Object.values(document.paths).flatMap((path) => Object.values(path));
    const operationIds = operations.map((operation) => operation.operationId);

    expect(response.headers.get("content-type")).toContain("application/vnd.oai.openapi+json");
    expect(document.info.title).toBe("HeroUI Docs Agent API");
    expect(document.openapi).toBe("3.1.0");
    expect(operations.every((operation) => Boolean(operation.description))).toBe(true);
    expect(new Set(operationIds).size).toBe(operationIds.length);
  });

  it("returns structured JSON errors from agent API routes", async () => {
    const responses = [
      await searchAgentDocs(new NextRequest("https://heroui.com/api/agent/search")),
      await getAgentPage(new NextRequest("https://heroui.com/api/agent/page")),
      getUnknownAgentEndpoint(),
    ];

    for (const response of responses) {
      const body = (await response.json()) as Record<string, unknown>;

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.headers.get("content-type")).toContain("application/json");
      expect(body).toEqual({
        code: expect.any(String),
        error: true,
        hint: expect.any(String),
        message: expect.any(String),
      });
    }
  });

  it("rejects unsupported docs API locales", async () => {
    const responses = [
      await searchAgentDocs(
        new NextRequest("https://heroui.com/api/agent/search?q=button&locale=fr"),
      ),
      await getAgentPage(
        new NextRequest("https://heroui.com/api/agent/page?url=/docs/react&locale=fr"),
      ),
    ];

    for (const response of responses) {
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({code: "INVALID_LOCALE", error: true});
    }
  });

  it("varies negotiated markdown by Accept and Accept-Encoding", async () => {
    const request = new NextRequest("https://heroui.com/agent-markdown?path=/", {
      headers: {
        accept: "text/markdown",
        "x-heroui-markdown-path": "/",
      },
    });
    const response = await getMarkdown(request);

    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("vary")).toBe("Accept, Accept-Encoding");
    expect(await response.text()).toContain("# HeroUI");
  });

  it("serves the existing HeroUI MCP packages from the well-known handshake", async () => {
    const response = getMcpHandshake(new Request("https://heroui.com/.well-known/mcp"));
    const card = (await response.json()) as {
      endpoint: string;
      transports: {package: string; type: string}[];
    };

    expect(card.endpoint).toBe("https://heroui.com/.well-known/mcp/server-card.json");
    expect(card.transports).toEqual(
      expect.arrayContaining([
        expect.objectContaining({package: "@heroui/react-mcp", type: "stdio"}),
        expect.objectContaining({package: "@heroui/native-mcp", type: "stdio"}),
      ]),
    );
  });

  it("lists predictable HeroUI developer resources in llms.txt", () => {
    const header = generateIndexHeader().join("\n");

    expect(header).toContain("HeroUI OpenAPI specification");
    expect(header).toContain("/openapi.json");
    expect(header).toContain("/.well-known/mcp");
    expect(header).toContain("/react/DESIGN.md");
    expect(header).toContain("/native/DESIGN.md");
    expect(header).toContain("/docs/react/getting-started/cli");
  });

  it("links each platform index to its default theme DESIGN.md", () => {
    expect(generatePlatformIndexHeader("react").join("\n")).toContain("/react/DESIGN.md");
    expect(generatePlatformIndexHeader("native").join("\n")).toContain("/native/DESIGN.md");
  });

  it("adds a verified HeroUI support contact without fabricating an address", () => {
    const organization = getOrganizationJsonLd();

    expect(organization.contactPoint).toEqual({
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "sales@heroui.com",
    });
    expect(organization).not.toHaveProperty("address");
  });

  it("ships substantial trust-page copy", () => {
    for (const page of [AboutPage(), ContactPage(), PrivacyPage()]) {
      expect(extractText(page).replace(/\s+/g, " ").trim().length).toBeGreaterThanOrEqual(500);
      expect(collectHeadingLevels(page)).toEqual(expect.arrayContaining([2]));
    }

    const contactText = extractText(ContactPage());
    const privacyText = extractText(PrivacyPage());

    expect(contactText).toContain("sales@heroui.com");
    expect(contactText).toContain("junior@heroui.com");
    expect(contactText).not.toContain("jrgarciadev@gmail.com");
    expect(privacyText).toContain("sales@heroui.com");
    expect(privacyText).toContain("junior@heroui.com");
    expect(privacyText).not.toContain("jrgarciadev@gmail.com");
    expect(privacyText).toContain("Vercel Analytics");
    expect(privacyText).toContain("PostHog");
    expect(privacyText).toContain("IP address");
  });

  it("server-renders meaningful homepage text with a hierarchical outline", async () => {
    const page = await HomePage({params: Promise.resolve({lang: "en"})});
    const text = extractText(page).replace(/\s+/g, " ").trim();
    const headings = collectHeadingLevels(page);

    expect(text.length).toBeGreaterThanOrEqual(500);
    expect(headings).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(headings.filter((level) => level === 1)).toHaveLength(1);
  });
});
