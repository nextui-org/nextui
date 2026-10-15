import type {ColorVariable, OklchColor} from "../../utils/oklch-utils";

import React, {useCallback, useEffect, useRef, useState} from "react";

import {buildThemeCssVars, generateThemeColors} from "../../utils/apcach-colors";
import {COLOR_VARIABLES, parseOklch} from "../../utils/oklch-utils";

import {ColorControls} from "./color-controls";
import {ColorVariablesList} from "./color-variables-list";
import {PreviewColumn} from "./preview-column";

interface ColorVariableValue {
  name: string;
  label: string;
  category: string;
  rawValue: string;
  computedValue: string;
  oklch: OklchColor | null;
}

export function ColorsDemo() {
  const lightRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  // Initialize with values matching the default theme's accent (blue, hue ~254)
  // Reference default chroma: 0.0015 (very subtle)
  const [baseHue, setBaseHue] = useState(245);
  const [grayChroma, setGrayChroma] = useState(0.0015);
  const [variables, setVariables] = useState<ColorVariableValue[]>([]);
  const [initialized, setInitialized] = useState(false);

  /**
   * Read CSS variables from an element
   */
  const readVariables = useCallback(() => {
    const element = lightRef.current || document.documentElement;
    const computedStyle = getComputedStyle(element);

    const values: ColorVariableValue[] = COLOR_VARIABLES.map((variable: ColorVariable) => {
      const rawValue = computedStyle.getPropertyValue(variable.name).trim();
      const computedValue = rawValue || "unset";
      const oklch = parseOklch(computedValue);

      return {
        name: variable.name,
        label: variable.label,
        category: variable.category,
        rawValue,
        computedValue,
        oklch,
      };
    });

    setVariables(values);
  }, []);

  /**
   * Get or create the style element for CSS variable overrides
   */
  const styleRef = useRef<HTMLStyleElement | null>(null);

  /**
   * Apply CSS variable changes by injecting a style element
   * Uses apcach for APCA-based contrast calculations
   */
  const applyColorChanges = useCallback(
    (hue: number, chroma: number) => {
      // Create or update the style element
      if (!styleRef.current) {
        styleRef.current = document.createElement("style");
        styleRef.current.id = "colors-demo-overrides";
        document.head.appendChild(styleRef.current);
      }

      // Generate colors using apcach library (APCA-based contrast)
      const colors = generateThemeColors(hue, chroma);

      // Build CSS for both light and dark themes
      const lightCss = buildThemeCssVars(colors, "light");
      const darkCss = buildThemeCssVars(colors, "dark");

      // Generate CSS with high specificity selectors
      styleRef.current.textContent = `
        .light, [data-theme="light"] {
          ${lightCss};
        }
        .dark, [data-theme="dark"] {
          ${darkCss};
        }
      `;

      // Re-read variables after applying changes
      setTimeout(readVariables, 50);
    },
    [readVariables],
  );

  // Cleanup style element on unmount
  useEffect(() => {
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, []);

  /**
   * Handle base hue change
   */
  const handleBaseHueChange = useCallback(
    (hue: number) => {
      setBaseHue(hue);
      applyColorChanges(hue, grayChroma);
    },
    [grayChroma, applyColorChanges],
  );

  /**
   * Handle gray chroma change
   */
  const handleGrayChromaChange = useCallback(
    (chroma: number) => {
      setGrayChroma(chroma);
      applyColorChanges(baseHue, chroma);
    },
    [baseHue, applyColorChanges],
  );

  // Initialize by reading actual CSS values and applying them
  useEffect(() => {
    if (initialized) return;

    // Read current accent color from CSS
    const computedStyle = getComputedStyle(document.documentElement);
    const accentValue = computedStyle.getPropertyValue("--accent").trim();
    const accentOklch = parseOklch(accentValue);

    let initialHue = 245; // Default blue hue

    if (accentOklch) {
      initialHue = Math.round(accentOklch.h);
    }

    // Read current background chroma
    const bgValue = computedStyle.getPropertyValue("--background").trim();
    const bgOklch = parseOklch(bgValue);
    let initialChroma = 0.0015; // Very subtle default

    if (bgOklch && bgOklch.c > 0) {
      initialChroma = bgOklch.c;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBaseHue(initialHue);

    setGrayChroma(initialChroma);

    // Apply initial colors with apcach
    applyColorChanges(initialHue, initialChroma);

    readVariables();
    setInitialized(true);
  }, [initialized, readVariables, applyColorChanges]);

  return (
    <div className="flex min-w-0 flex-col">
      {/* Top Controls - Fixed at top */}
      <div className="sticky top-0 z-10 shrink-0 bg-background text-foreground">
        <ColorControls
          baseHue={baseHue}
          grayChroma={grayChroma}
          onBaseHueChange={handleBaseHueChange}
          onGrayChromaChange={handleGrayChromaChange}
        />
      </div>
      {/* Main Content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
        {/* Left Sidebar - Color Variables */}
        <div className="max-h-64 w-full min-w-0 shrink-0 overflow-y-auto lg:max-h-none lg:w-60">
          <div className="p-4">
            <h2 className="mb-4 text-sm font-semibold">Color Variables</h2>
            <ColorVariablesList variables={variables} />
          </div>
        </div>

        {/* Preview Columns */}
        <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-3 px-4 pt-2 pb-24">
          {/* Light Theme Preview */}
          <PreviewColumn ref={lightRef} theme="light" />
          {/* Dark Theme Preview */}
          <PreviewColumn ref={darkRef} theme="dark" />
        </div>
      </div>
    </div>
  );
}
