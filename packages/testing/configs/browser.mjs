import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

import {playwright} from "@vitest/browser-playwright";
import {defineConfig, mergeConfig} from "vitest/config";

import {baseConfig} from "./base.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const setupFile = join(__dirname, "../setup/browser.ts");

/** Playwright Chromium defaults for `*.browser.test.tsx`. */
export const browserConfig = mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      browser: {
        enabled: true,
        headless: true,
        instances: [{browser: "chromium"}],
        // RAC accessible names can include the current value or visible date range.
        locators: {exact: false},
        provider: playwright(),
      },
      globals: true,
      passWithNoTests: true,
      setupFiles: [setupFile],
    },
  }),
);
