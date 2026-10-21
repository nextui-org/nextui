/** @vitest-environment jsdom */

import type {DocsAgentContext, ThemeMode} from "./docs-agent-tools";
import type {ClientToolExecutionContext} from "@heroui/agent";

import {beforeEach, describe, expect, it, vi} from "vitest";

import {
  DESIGN_THEME_CHANGE_EVENT,
  DESIGN_THEME_STORAGE_KEY,
  VIBRANT_STORAGE_KEY,
  getStoredDesignTheme,
  setStoredDesignTheme,
  setStoredVibrantPalette,
} from "@/utils/design-theme";

import {docsAgentTools} from "./docs-agent-tools";

const execution: ClientToolExecutionContext = {
  conversationId: "conversation-1",
  idempotencyKey: "theme-test",
  signal: new AbortController().signal,
  toolCallId: "tool-call-1",
  uploadDataSource: vi.fn(),
};

function createContext() {
  const navigate = vi.fn();
  let mode: ThemeMode = "system";

  const context: DocsAgentContext = {
    navigate,
    page: () => ({
      locale: "en",
      page: {description: "", heading: "Introduction", title: "HeroUI"},
      platform: "react",
      route: {hash: "", pathname: "/en/docs/react/getting-started", query: {}},
    }),
    theme: {
      getMode: () => mode,
      getPreset: getStoredDesignTheme,
      getVibrantPalette: () => localStorage.getItem(VIBRANT_STORAGE_KEY) === "true",
      setMode: (value) => {
        mode = value;
      },
      setPreset: setStoredDesignTheme,
      setVibrantPalette: setStoredVibrantPalette,
    },
  };

  return {context, navigate};
}

beforeEach(() => {
  document.documentElement.removeAttribute("data-design-theme");
  document.documentElement.removeAttribute("data-vibrant-palette");
  document.getElementById("design-theme-css-link")?.remove();
  localStorage.clear();
  window.history.replaceState({}, "", "/en/docs/react/getting-started");
});

describe("HeroUI docs theme client tools", () => {
  it("applies a named preset immediately without approval or navigation", async () => {
    const {context, navigate} = createContext();
    const onChange = vi.fn();
    const setTheme = docsAgentTools.find(({name}) => name === "set_heroui_theme");

    window.addEventListener(DESIGN_THEME_CHANGE_EVENT, onChange);

    const result = await setTheme?.execute(
      {base: 0.01, hue: 0, preset: "uber"},
      context,
      execution,
    );

    expect(setTheme?.needsApproval).toBe(false);
    expect(result).toMatchObject({navigating: false, preset: "uber", url: null});
    expect(localStorage.getItem(DESIGN_THEME_STORAGE_KEY)).toBe("uber");
    expect(document.documentElement.dataset["designTheme"]).toBe("uber");
    expect(onChange).toHaveBeenCalledOnce();
    expect(navigate).not.toHaveBeenCalled();

    const readTheme = docsAgentTools.find(({name}) => name === "get_heroui_theme");
    const current = await readTheme?.execute({}, context, execution);

    expect(current).toMatchObject({isThemeBuilder: false, preset: "uber"});
  });

  it("applies browser-local appearance values and only navigates for builder edits", async () => {
    const {context, navigate} = createContext();
    const setTheme = docsAgentTools.find(({name}) => name === "set_heroui_theme");

    const localResult = await setTheme?.execute(
      {colorScheme: "dark", preset: "sky", vibrantPalette: true},
      context,
      execution,
    );

    expect(localResult).toMatchObject({
      colorScheme: "dark",
      navigating: false,
      preset: "sky",
      vibrantPalette: true,
    });
    expect(document.documentElement.dataset["designTheme"]).toBe("sky");
    expect(document.documentElement.dataset["vibrantPalette"]).toBe("true");
    expect(navigate).not.toHaveBeenCalled();

    const builderResult = await setTheme?.execute({hue: 210}, context, execution);

    expect(builderResult).toMatchObject({navigating: true});
    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate.mock.calls[0]?.[0]).toContain("/en/themes?");
    expect(navigate.mock.calls[0]?.[0]).toContain("hue=210");
  });
});
