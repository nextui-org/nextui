import {defineConfig} from "tsup";

export default defineConfig({
  clean: true,
  target: "es2019",
  entry: ["src/index.ts", "!src/scripts"],
  format: ["cjs", "esm"],
});
