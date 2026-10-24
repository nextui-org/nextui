import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

import {browserConfig} from "@heroui/testing/configs/browser";
import {uiConfig} from "@heroui/testing/configs/react";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {defineConfig, mergeConfig} from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "src");

/** Dual-project: jsdom (`*.test` / `*.ssr.test`) + Playwright (`*.browser.test`). */
export default defineConfig({
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  test: {
    // Coverage is root-only + jsdom-only. Thresholds are CI floors, not suite depth.
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: ["**/index.ts", "**/*.stories.*"],
      // Ratchet: kept ~1pt under the measured jsdom run so the floors actually
      // bite. Raise them again whenever coverage moves up; never lower them to
      // make a red build pass.
      thresholds: {
        statements: 87,
        branches: 66,
        functions: 90,
        lines: 87,
      },
      reporter: [
        "text",
        "html",
        [
          "json",
          {
            file: "coverage-final.json",
          },
        ],
      ],
      reportsDirectory: "./coverage",
    },
    projects: [
      mergeConfig(
        uiConfig,
        defineConfig({
          plugins: [react()],
          resolve: {
            alias: {
              "@": srcDir,
            },
          },
          test: {
            name: "react-jsdom",
            passWithNoTests: false,
            include: ["tests/**/*.{test,ssr.test}.{ts,tsx}"],
            exclude: ["**/node_modules/**", "**/dist/**", "**/*.browser.test.{ts,tsx}"],
          },
        }),
      ),
      mergeConfig(
        browserConfig,
        defineConfig({
          // Tailwind compiles `src/styles.css` so suites that assert on the design system's
          // own CSS (stacking, pointer-events) run against the real stylesheet.
          plugins: [react(), tailwindcss()],
          resolve: {
            alias: {
              "@": srcDir,
            },
          },
          test: {
            name: "react-browser",
            passWithNoTests: false,
            include: ["tests/**/*.browser.test.{ts,tsx}"],
            exclude: ["**/node_modules/**", "**/dist/**"],
          },
        }),
      ),
    ],
  },
});
