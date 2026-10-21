import {NextRequest} from "next/server";
import {describe, expect, it} from "vitest";

import {getBlogPost} from "@/lib/blog";
import {proxy} from "@/proxy";

import {getRedirects} from "../next-redirects";

type Redirect = Awaited<ReturnType<typeof getRedirects>>[number];

function findRedirect(redirects: Redirect[], source: string): Redirect | undefined {
  return redirects.find((redirect) => redirect.source === source);
}

function expectLegacyDocsRedirect(
  redirects: Redirect[],
  source: string,
  destination: string,
): void {
  expect(findRedirect(redirects, source)).toMatchObject({
    destination: `/en${destination}`,
    permanent: true,
  });
  expect(findRedirect(redirects, `/:lang(en|cn)${source}`)).toMatchObject({
    destination: `/:lang${destination}`,
    permanent: true,
  });
}

describe("Docs redirects", () => {
  it.each([
    ["navbar", "/docs/react/migration/navbar"],
    ["progress", "/docs/react/migration/progress"],
    ["divider", "/docs/react/migration/divider"],
    ["snippet", "/docs/react/migration/snippet"],
    ["date-input", "/docs/react/migration/dateinput"],
    ["time-input", "/docs/react/migration/timeinput"],
  ])(
    "redirects the legacy %s component URL to its migration guide",
    async (component, destination) => {
      const redirects = await getRedirects();

      expectLegacyDocsRedirect(redirects, `/docs/components/${component}`, destination);
    },
  );

  it("prefers an existing React component page over its migration guide", async () => {
    const redirects = await getRedirects();

    expectLegacyDocsRedirect(
      redirects,
      "/docs/components/calendar",
      "/docs/react/components/calendar",
    );
    expectLegacyDocsRedirect(
      redirects,
      "/docs/components/listbox",
      "/docs/react/components/list-box",
    );
  });

  it.each([
    ["/docs/native/getting-started/handbook/provider", "/docs/native/getting-started/provider"],
    ["/docs/react/getting-started/handbook/composition", "/docs/react/getting-started/composition"],
  ])("redirects leaked route groups from %s to %s", async (source, destination) => {
    const redirects = await getRedirects();

    expectLegacyDocsRedirect(redirects, source, destination);
  });

  it("redirects leaked component MDX URLs to the current HTML page", async () => {
    const redirects = await getRedirects();

    expectLegacyDocsRedirect(
      redirects,
      "/docs/components/calendar.mdx",
      "/docs/react/components/calendar",
    );
    expectLegacyDocsRedirect(
      redirects,
      "/docs/components/alert-dialog.mdx",
      "/docs/react/components/alert-dialog",
    );
    expectLegacyDocsRedirect(
      redirects,
      "/docs/components/skeleton.mdx",
      "/docs/react/components/skeleton",
    );
  });

  it.each([
    ["/docs/frameworks/vite", "/docs/react/getting-started/frameworks"],
    ["/docs/frameworks/nextjs", "/docs/react/getting-started/frameworks"],
    ["/docs/customization/create-theme", "/docs/react/getting-started/theming"],
    ["/docs/customization/theme", "/docs/react/getting-started/theming"],
    ["/docs/guide/nextui-to-heroui", "/docs/react/migration"],
  ])("maps legacy %s into the React docs namespace", async (source, destination) => {
    const redirects = await getRedirects();

    expectLegacyDocsRedirect(redirects, source, destination);
  });

  it("maps unknown legacy component URLs into the current namespace", async () => {
    const redirects = await getRedirects();

    expectLegacyDocsRedirect(redirects, "/docs/components/:path*", "/docs/react/components/:path*");
    expectLegacyDocsRedirect(
      redirects,
      "/docs/components/:path*.mdx",
      "/docs/react/components/:path*",
    );
  });
});

describe("Blog redirects", () => {
  it("serves the translated native styling post without redirecting to English", async () => {
    const slug = "styling-and-theming-in-heroui-native";
    const url = `https://heroui.com/cn/blog/${slug}`;
    const redirects = await getRedirects();

    expect(findRedirect(redirects, `/cn/blog/${slug}`)).toBeUndefined();
    expect(proxy(new NextRequest(url)).headers.get("location")).toBeNull();
    expect(getBlogPost(slug, "cn")).toMatchObject({
      locale: "cn",
      title: "HeroUI Native 的样式与主题机制",
    });
  });
});

describe("Leaked and placeholder paths", () => {
  it.each(["/en/src/uniwind.d.ts", "/en/node_modules/heroui-native/lib"])(
    "returns 410 for %s",
    (pathname) => {
      const response = proxy(new NextRequest(`https://heroui.com${pathname}`));

      expect(response.status).toBe(410);
      expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    },
  );

  it.each([
    "/docs/react/getting-started/{topic}.mdx",
    "/en/docs/react/getting-started/{topic}.mdx",
    "/docs/react/getting-started/%7Btopic%7D.mdx",
  ])("returns 410 for the unresolved template URL %s", (pathname) => {
    const response = proxy(new NextRequest(`https://heroui.com${pathname}`));

    expect(response.status).toBe(410);
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  });
});
