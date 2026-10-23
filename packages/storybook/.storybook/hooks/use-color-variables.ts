import type {ColorVariable, OklchColor} from "../utils/oklch-utils";

import {useCallback, useEffect, useState} from "react";

import {COLOR_VARIABLES, formatOklch, parseOklch} from "../utils/oklch-utils";

export interface ColorVariableValue {
  name: string;
  label: string;
  category: string;
  rawValue: string;
  computedValue: string;
  oklch: OklchColor | null;
}

/**
 * Read a CSS custom property value from an element
 */
function getCssVariableValue(element: Element, variableName: string): string {
  const computedStyle = getComputedStyle(element);

  return computedStyle.getPropertyValue(variableName).trim();
}

/**
 * Set a CSS custom property value on an element
 */
function setCssVariableValue(element: HTMLElement, variableName: string, value: string): void {
  element.style.setProperty(variableName, value);
}

/**
 * Hook to read and manage CSS color variables
 */
export function useColorVariables(containerRef?: React.RefObject<HTMLElement>) {
  const [variables, setVariables] = useState<ColorVariableValue[]>([]);
  const [baseHue, setBaseHue] = useState(360); // Default hue
  const [grayChroma, setGrayChroma] = useState(0.114); // Default chroma amount for grays

  /**
   * Read all color variables from the target element
   */
  const readVariables = useCallback(() => {
    const element = containerRef?.current || document.documentElement;

    const values: ColorVariableValue[] = COLOR_VARIABLES.map((variable: ColorVariable) => {
      const rawValue = getCssVariableValue(element, variable.name);
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
  }, [containerRef]);

  /**
   * Update a single CSS variable
   */
  const updateVariable = useCallback(
    (variableName: string, value: string) => {
      const element = containerRef?.current || document.documentElement;

      setCssVariableValue(element, variableName, value);
      readVariables();
    },
    [containerRef, readVariables],
  );

  /**
   * Update multiple variables at once based on base hue and gray chroma
   */
  const updateColorScheme = useCallback(
    (hue: number, chroma: number) => {
      const element = containerRef?.current || document.documentElement;

      // Update accent color with new hue
      const accentOklch: OklchColor = {
        l: 0.6204, // Default accent lightness
        c: 0.195,
        h: hue,
      };

      setCssVariableValue(element, "--accent", formatOklch(accentOklch));
      setCssVariableValue(element, "--focus", formatOklch(accentOklch));

      // Update gray-based colors with chroma adjustment
      const grayColors = [
        {name: "--background", l: 0.9702, baseC: 0},
        {name: "--surface", l: 1, baseC: 0},
        {name: "--muted", l: 0.5517, baseC: 0.0138},
        {name: "--default", l: 0.94, baseC: 0.001},
        {name: "--border", l: 0.9, baseC: 0.004},
        {name: "--separator", l: 0.92, baseC: 0.004},
      ];

      grayColors.forEach(({baseC, l, name}) => {
        const adjustedChroma = baseC * (chroma / 0.114); // Normalize to default chroma
        const oklch: OklchColor = {
          l,
          c: adjustedChroma,
          h: hue,
        };

        setCssVariableValue(element, name, formatOklch(oklch));
      });

      setBaseHue(hue);
      setGrayChroma(chroma);
      readVariables();
    },
    [containerRef, readVariables],
  );

  /**
   * Reset all variables to their original values
   */
  const resetVariables = useCallback(() => {
    const element = containerRef?.current || document.documentElement;

    // Remove inline styles to fall back to CSS defaults
    COLOR_VARIABLES.forEach((variable) => {
      element.style.removeProperty(variable.name);
    });

    setBaseHue(360);
    setGrayChroma(0.114);
    readVariables();
  }, [containerRef, readVariables]);

  // Initial read
  useEffect(() => {
    readVariables();
  }, [readVariables]);

  return {
    variables,
    baseHue,
    grayChroma,
    readVariables,
    updateVariable,
    updateColorScheme,
    resetVariables,
    setBaseHue,
    setGrayChroma,
  };
}

/**
 * Get variables grouped by category
 */
export function groupVariablesByCategory(variables: ColorVariableValue[]) {
  return variables.reduce(
    (acc, variable) => {
      if (!acc[variable.category]) {
        acc[variable.category] = [];
      }
      acc[variable.category].push(variable);

      return acc;
    },
    {} as Record<string, ColorVariableValue[]>,
  );
}
