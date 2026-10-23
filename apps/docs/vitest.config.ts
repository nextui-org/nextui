import {fileURLToPath} from "node:url";

import {defineConfig} from "vitest/config";

export default defineConfig({
  oxc: {
    jsx: {runtime: "automatic"},
  },
  resolve: {
    alias: [
      {
        find: "@/.source",
        replacement: fileURLToPath(new URL("./.source/server.ts", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "server-only",
        replacement: fileURLToPath(new URL("./tests/server-only.ts", import.meta.url)),
      },
      {
        find: "~env",
        replacement: fileURLToPath(new URL("./env.ts", import.meta.url)),
      },
    ],
  },
  test: {
    env: {
      NEXT_PUBLIC_APP_ENV: "development",
      NEXT_PUBLIC_CDN_URL: "http://localhost:3000",
      NODE_ENV: "development",
    },
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
