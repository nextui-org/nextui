import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";

import {describe, expect, it} from "vitest";

/**
 * `public/react/DESIGN.md` restates the default theme as literal values so agents and
 * designers can read them without resolving CSS. Nothing at runtime keeps that copy in
 * sync, so these tests pin every restated value to the theme CSS it came from and fail
 * the build when the theme moves and the document does not.
 *
 * The Native document describes `heroui-native`, whose CSS lives in another repository,
 * so it cannot be checked here — it has to be re-verified against that repo by hand.
 */
const readRepoFile = (relativePath: string): string =>
  readFileSync(fileURLToPath(new URL(`../../../${relativePath}`, import.meta.url)), "utf8");

const designMd = readRepoFile("apps/docs/public/react/DESIGN.md");
const variablesCss = readRepoFile("packages/styles/themes/default/variables.css");
const themeCss = readRepoFile("packages/styles/themes/shared/theme.css");

const UTILITY_PREFIXES = ["bg-", "text-", "border-", "shadow-"];

const stripCodeBlocks = (markdown: string): string => markdown.replace(/```[\s\S]*?```/g, "");

const inlineCodeSpans = (markdown: string): string[] =>
  [...stripCodeBlocks(markdown).matchAll(/`([^`\n]+)`/g)].map((match) => match[1] ?? "");

/** Rows of the colors table, keyed by the utilities / variables / value columns. */
const colorTableRows = (): {cssVariables: string[]; utilities: string[]; values: string[]}[] =>
  designMd
    .split("\n")
    .filter((line) => line.startsWith("| ") && line.includes("--"))
    .map((line) => {
      const [, , utilities = "", cssVariables = "", light = "", dark = ""] = line.split("|");

      return {
        cssVariables: [...cssVariables.matchAll(/--[a-z][a-z-]*/g)].map(([name]) => name),
        utilities: [...utilities.matchAll(/`([^`]+)`/g)].flatMap((match) =>
          (match[1] ?? "").split(/\s+/),
        ),
        values: [...`${light}${dark}`.matchAll(/oklch\([^)]+\)/g)].map(([value]) => value),
      };
    });

describe("React DESIGN.md", () => {
  it("restates only color values that exist in the default theme", () => {
    const documented = [...designMd.matchAll(/oklch\([^)]+\)/g)].map(([value]) => value);
    const stale = [...new Set(documented)].filter((value) => !variablesCss.includes(value));

    expect(documented.length).toBeGreaterThan(0);
    expect(stale).toEqual([]);
  });

  it("names only CSS variables that the default theme declares", () => {
    const rows = colorTableRows();
    const undeclared = rows
      .flatMap((row) => row.cssVariables)
      .filter((name) => !variablesCss.includes(`${name}:`));

    expect(rows.length).toBeGreaterThan(0);
    expect([...new Set(undeclared)]).toEqual([]);
  });

  it("names only utilities that the shared theme maps to a token", () => {
    const utilities = inlineCodeSpans(designMd)
      .flatMap((span) => span.split(/\s+/))
      .filter((token) => UTILITY_PREFIXES.some((prefix) => token.startsWith(prefix)));
    const unmapped = utilities.filter((utility) => {
      const [prefix] = UTILITY_PREFIXES.filter((candidate) => utility.startsWith(candidate));
      const name = utility.slice(prefix?.length ?? 0);
      const namespace = utility.startsWith("shadow-") ? "--shadow-" : "--color-";

      return !themeCss.includes(`${namespace}${name}:`);
    });

    expect(utilities.length).toBeGreaterThan(0);
    expect([...new Set(unmapped)]).toEqual([]);
  });

  it("documents the radius scale exactly as the shared theme defines it", () => {
    const rows = [...designMd.matchAll(/\|\s*`rounded-([a-z0-9]+)`\s*\|\s*`([^`]+)`\s*\|/g)];
    const mismatched = rows
      .filter(([, key, formula]) => !themeCss.includes(`--radius-${key}: ${formula};`))
      .map(([, key]) => key);

    expect(rows).toHaveLength(8);
    expect(mismatched).toEqual([]);
  });

  it.each([
    ["--spacing", "0.25rem"],
    ["--radius", "0.5rem"],
    ["--field-radius", "calc(var(--radius) * 1.5)"],
    ["--disabled-opacity", "0.5"],
    ["--ring-offset-width", "2px"],
  ])("keeps its stated %s in step with the default theme", (name, value) => {
    expect(variablesCss).toContain(`${name}: ${value};`);
    expect(designMd).toContain(value);
  });
});
