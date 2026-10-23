import {TranslationProvider} from "@fuma-translate/react";
import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it} from "vitest";

import {PageLastUpdate} from "@/components/fumadocs/layouts/notebook/page/client";
import {LargeSearchToggle} from "@/components/fumadocs/ui/search-toggle";
import {translations} from "@/lib/layout.shared";

describe("Docs UI translations", () => {
  it.each([
    {lang: "en", lastUpdate: "Last updated on", search: "Search"},
    {lang: "cn", lastUpdate: "最后更新于", search: "搜索"},
  ])("renders search and footer labels on the server in $lang", ({lang, lastUpdate, search}) => {
    const html = renderToStaticMarkup(
      <TranslationProvider translations={translations.get(lang) ?? {}}>
        <LargeSearchToggle />
        <PageLastUpdate date={new Date("2026-01-02T00:00:00Z")} />
      </TranslationProvider>,
    );

    expect(html).toContain(search);
    expect(html).toContain(`${lastUpdate} </p>`);
  });
});
