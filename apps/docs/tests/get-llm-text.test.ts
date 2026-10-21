import {describe, expect, it} from "vitest";

import {replaceNativeComponentsCategories} from "@/lib/native-components-markdown";

describe("replaceNativeComponentsCategories", () => {
  it("adds native component links and descriptions to the Markdown overview", () => {
    const content = '## Buttons\n\n<NativeComponentsCategory category="Buttons" />';
    const pages = [
      {
        data: {description: "Triggers an action", title: "Button"},
        path: "en/native/components/(buttons)/button.mdx",
        url: "/docs/native/components/button",
      },
      {
        data: {description: "Outside this category", title: "Input"},
        path: "en/native/components/(forms)/input.mdx",
        url: "/docs/native/components/input",
      },
    ];

    expect(replaceNativeComponentsCategories(content, pages)).toBe(
      "## Buttons\n\n- [Button](/docs/native/components/button): Triggers an action",
    );
  });

  it("keeps empty categories empty when their source pages are unavailable", () => {
    const content = '<NativeComponentsCategory category="Utilities" />';

    expect(replaceNativeComponentsCategories(content, [])).toBe("");
  });
});
