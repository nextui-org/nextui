/* eslint-disable no-console */
import path from "path";
import fs from 'fs'

import {v4 as uuid} from "uuid"
import shell from "shelljs";
import dotenv from "dotenv";
import algoliasearch from "algoliasearch";
// @ts-ignore
import prettier from 'prettier'
// @ts-ignore
import toc from "markdown-toc";
import {parseMarkdownFile, fileToPath, removePrefix} from "@docusaurus/utils";

const docsRootFolder = "content/docs";

interface ResultType {
  content: string
  objectID: string
  url: string
  type: 'lvl1' | 'lvl2' | 'lvl3'
  hierarchy: {
    lvl1: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}

interface TOCResultItem {
  content: string
  slug: string
  lvl: 1 | 2 | 3
  i: number
  seen: number
}

const getUrl = (slug: string) => {
  const url = removePrefix(slug, "/")


  return `/docs${url}`
}

async function getMDXMeta(file: string) {
  const {content, frontMatter: _frontMatter} = await parseMarkdownFile(file);

  const frontMatter = _frontMatter as Record<string, any>
  const tableOfContent = toc(content);
  const json = tableOfContent.json as TOCResultItem[]
  let slug = fileToPath(file)
    .replace(`/${docsRootFolder}`, "")
    .replace(process.cwd(), "");


  const result:ResultType[] = [];
  const title = !!frontMatter.title ? frontMatter.title : "";

  result.push({
    content: title,
    objectID: uuid(),
    type: "lvl1",
    url: getUrl(slug),
    hierarchy: {
      lvl1: title,
    },
  });

  json.forEach((item, index) => {
    item.content !== title && result.push({
      content: item.content,
      objectID: uuid(),
      type: `lvl${item.lvl}`,
      url: getUrl(slug) + `#${item.slug}`,
      hierarchy: {
        lvl1: title,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ?? null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    });
  });

  return result;
}

async function getSearchMeta(saveMode: "algolia" | "local" = "local") {
  dotenv.config();

  try {
  
    let json: any = [];

    const files = shell
      .ls("-R", docsRootFolder)
      .map((file: any) => path.join(process.cwd(), docsRootFolder, file))
      .filter((file: any) => file.endsWith(".mdx"));

    for (const file of files) {
      let result = [];

      try {
        result = await getMDXMeta(file);
        json.push(...result);
      } catch (error) {}
    }

    if (saveMode === "local") {
       // Uncomment this to see save json into a file
        json = prettier.format(JSON.stringify(json), { parser: 'json' });

        
        // create a folder if it doesn't exist
        if (!fs.existsSync(`${docsRootFolder}`)) {
          fs.mkdirSync(`${docsRootFolder}`);
        }

        const outPath = path.join(
          process.cwd(),
          `${docsRootFolder}`,
          'search-meta.json'
        );

        fs.writeFileSync(outPath, json);


      console.log("[NextUI] Search meta is ready ✅");

      return;
    }

    // Initialize Algolia client
    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID || "",
      process.env.ALGOLIA_ADMIN_API_KEY || "",
    );
  
    const tmpIndex = await client.initIndex("prod_docs_tmp");
    const mainIndex = await client.initIndex("prod_docs");

    // Get settings of main index and set them to the temp index
    const indexSettings = await mainIndex.getSettings();

    await tmpIndex.setSettings(indexSettings);

    console.log("[Items count 🚀]: " + json.length);

    console.log("[Saving on Algolia ⏰...]");

    await mainIndex.replaceAllObjects(json, {
      autoGenerateObjectIDIfNotExist: true,
      safe: true,
    });

    console.log("[NextUI] Search meta is ready ✅");
  } catch (error) {
    console.error(`[ERROR 🔥]:`, error);
  }
}

getSearchMeta();
