import {defineConfig} from "tsup";
import {findUpSync} from "find-up";

export default defineConfig({
  clean: true,
  minify: false,
  treeshake: false,
  format: ["cjs", "esm"],
  outExtension(ctx) {
    return {js: `.${ctx.format}.js`};
  },
  inject: process.env.JSX ? [findUpSync("react-shim.js")!] : undefined,
});
