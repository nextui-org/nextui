"use client";

import type {DocsAgentContext, ThemeMode} from "./docs-agent-tools";
import type {ThemeId} from "@/app/[lang]/themes/theme-values";
import type {GetAuthToken} from "@heroui/agent";
import type {Route} from "next";

import {HeroUIAgent, useAgent} from "@heroui/agent/next";
import {useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {useEffect, useMemo, useState} from "react";

import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";
import {
  DESIGN_THEME_CHANGE_EVENT,
  VIBRANT_STORAGE_KEY,
  getStoredDesignTheme,
  setStoredDesignTheme,
  setStoredVibrantPalette,
} from "@/utils/design-theme";

import {getAgentThemeOptions} from "./docs-agent-theme";
import {docsAgentTools, getDocsPageContext} from "./docs-agent-tools";

const getAuthToken: GetAuthToken = async (context) => {
  const response = await fetch("/api/heroui-agent/auth-token", {
    body: JSON.stringify(context),
    headers: {"Content-Type": "application/json"},
    method: "POST",
    signal: context.signal,
  });

  if (!response.ok) throw new Error("Agent authentication failed");

  return response.json();
};

export function HeroUIDocsAgent() {
  const agent = useAgent(HEROUI_DOCS_AGENT_ID);
  const router = useRouter();
  const {setTheme, theme} = useTheme();
  const [designTheme, setDesignTheme] = useState<ThemeId>("default");
  const colorScheme: ThemeMode = theme === "dark" || theme === "light" ? theme : "system";
  const agentTheme = useMemo(
    () => getAgentThemeOptions(designTheme, colorScheme),
    [colorScheme, designTheme],
  );
  const context = useMemo<DocsAgentContext>(
    () => ({
      navigate: (url) => router.push(url as Route),
      page: getDocsPageContext,
      theme: {
        getMode: () => colorScheme,
        getPreset: getStoredDesignTheme,
        getVibrantPalette: () => localStorage.getItem(VIBRANT_STORAGE_KEY) === "true",
        setMode: setTheme,
        setPreset: setStoredDesignTheme,
        setVibrantPalette: setStoredVibrantPalette,
      },
    }),
    [colorScheme, router, setTheme],
  );

  useEffect(() => {
    const syncDesignTheme = () => setDesignTheme(getStoredDesignTheme());

    syncDesignTheme();
    window.addEventListener(DESIGN_THEME_CHANGE_EVENT, syncDesignTheme);

    return () => window.removeEventListener(DESIGN_THEME_CHANGE_EVENT, syncDesignTheme);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.altKey || event.shiftKey) return;
      if ((!event.metaKey && !event.ctrlKey) || event.key.toLowerCase() !== "i") return;

      event.preventDefault();
      agent.toggle();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [agent]);

  return (
    <HeroUIAgent
      showLauncher
      startNewConversationOnOpen
      agentId={HEROUI_DOCS_AGENT_ID}
      appearance={{theme: agentTheme, viewMode: "sidebar"}}
      context={context}
      getAuthToken={getAuthToken}
      locale="en"
      permissions={{defaultMode: "auto", showPicker: false}}
      tools={docsAgentTools}
    />
  );
}
