import {readFile, readdir} from "node:fs/promises";
import {join} from "node:path";

import {describe, expect, it} from "vitest";

async function getMdxFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, {withFileTypes: true});

  return (
    await Promise.all(
      entries.map(async (entry) => {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) return getMdxFiles(path);

        return entry.name.endsWith(".mdx") ? [path] : [];
      }),
    )
  ).flat();
}

describe("Docs links", () => {
  it("does not publish route-group names in getting-started links", async () => {
    const files = await getMdxFiles(join(process.cwd(), "content/docs"));
    const content = await Promise.all(files.map((file) => readFile(file, "utf-8")));

    expect(content.join("\n")).not.toMatch(/\/docs\/(?:react|native)\/getting-started\/handbook\//);
  });
});
