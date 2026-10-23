"use client";

import type {LAB} from "color-convert";

import colorConvert from "color-convert";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";

import {Iconify} from "@/components/iconify";
import {cn} from "@/utils/cn";

interface ColorSwatchProps {
  name: string;
  variable: string;
  value?: string;
  className?: string;
  foreground?: string;
}

const getLabValue = (value: string): LAB | null => {
  const match = value.match(/-?\d*\.?\d+/g);

  if (match && match.length >= 3) {
    return [Number(match[0]), Number(match[1]), Number(match[2])];
  }

  return null;
};

export function ColorSwatch({className, foreground, name, variable}: ColorSwatchProps) {
  const [checked, onClick] = useCopyButton(async () => {
    let hexValue = "";

    // Recursively resolve CSS variable references
    const resolveVariable = (varName: string, depth = 0): string => {
      if (depth > 5) return ""; // Max recursion depth

      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

      if (!value) return "";

      // Check if the value is another CSS variable reference
      if (value.startsWith("var(")) {
        // Extract the variable name from var(--variable-name)
        const match = value.match(/var\((--[^)]+)\)/);

        if (match && match[1]) {
          return resolveVariable(match[1], depth + 1);
        }
      }

      return value;
    };

    const computedValue = resolveVariable(variable);

    // Convert to hex using the browser's native color conversion
    if (computedValue) {
      try {
        if (computedValue.startsWith("lab")) {
          const labValue = getLabValue(computedValue);

          if (labValue) {
            hexValue = `#${colorConvert.lab.hex(labValue)}`;
          } else {
            throw new Error("Invalid lab value");
          }
        } else {
          hexValue = computedValue;
        }
      } catch (e) {
        console.warn(`Failed to convert color for ${variable}:`, e);
      }
    }

    // Copy the hex value to clipboard
    if (hexValue) {
      await navigator.clipboard.writeText(hexValue);
    }
  });

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        className="group relative size-10 rounded-full shadow-surface transition-all hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none"
        type="button"
        style={{
          backgroundColor: `var(${variable})`,
        }}
        onClick={onClick}
      >
        <span className="sr-only">Copy {name} color</span>
        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
          <Iconify
            className="size-5 opacity-0 transition-all group-hover:opacity-100 data-[checked=true]:opacity-100"
            data-checked={checked}
            icon={checked ? "check" : "copy"}
            style={
              foreground
                ? {
                    color: `var(${foreground})`,
                  }
                : {
                    filter:
                      "contrast(200%) brightness(0)  invert(1) drop-shadow(0 1px 1px rgba(0,0,0,0.5))",
                    mixBlendMode: "difference",
                  }
            }
          />
        </div>
      </button>
      <div className="text-center">
        <div className="text-xs font-medium">{variable}</div>
      </div>
    </div>
  );
}

interface ColorPaletteProps {
  colors: Array<{
    name: string;
    variable: string;
    value?: string;
    foreground?: string;
  }>;
  className?: string;
}

export function ColorPalette({className, colors}: ColorPaletteProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="my-5 flex flex-wrap gap-4 sm:gap-6">
        {colors.map((color) => (
          <ColorSwatch
            key={color.variable}
            foreground={color.foreground}
            name={color.name}
            value={color.value}
            variable={color.variable}
          />
        ))}
      </div>
    </div>
  );
}
