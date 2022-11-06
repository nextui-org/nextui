const path = require("path");
const uuid = require("uuid").v4;
const shell = require("shelljs");
const dotenv = require("dotenv");
const algoliasearch = require("algoliasearch");
const toc = require("markdown-toc/index");

const docusaurusUtils = require("@docusaurus/utils");
const {parseMarkdownFile, fileToPath, removePrefix} = docusaurusUtils;

const docsRootFolder = "apps/docs";

async function getMDXMeta(file) {
  const {content, frontMatter} = await parseMarkdownFile(file);
  const tableOfContent = toc(content);
  const json = tableOfContent.json;
  const slug = fileToPath(file)
    .replace(`/${docsRootFolder}`, "")
    .replace("/content", "")
    .replace(process.cwd(), "");

  const result = [];
  const title = !!frontMatter.title ? frontMatter.title : "";

  result.push({
    content: title,
    objectID: uuid(),
    type: "lvl1",
    url: removePrefix(slug, "/"),
    hierarchy: {
      lvl1: title,
    },
  });

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      objectID: uuid(),
      type: `lvl${item.lvl}`,
      url: removePrefix(slug, "/") + `#${item.slug}`,
      hierarchy: {
        lvl1: title,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ?? null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    });
  });

  return result;
}

async function getSearchMeta() {
  dotenv.config();
  // Initialise Algolia client
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID || "",
    process.env.ALGOLIA_ADMIN_API_KEY || "",
  );

  try {
    const tmpIndex = await client.initIndex("prod_docs_tmp");
    const mainIndex = await client.initIndex("prod_docs");

    let json = [];

    const files = shell
      .ls("-R", docsRootFolder)
      .map((file) => path.join(process.cwd(), docsRootFolder, file))
      .filter((file) => file.endsWith(".mdx"));

    for (const file of files) {
      let result = [];
      try {
        result = await getMDXMeta(file);
        json.push(...result);
      } catch (error) {}
    }

    // Uncomment this to see save json into a file
    // json = prettier.format(JSON.stringify(json), { parser: 'json' });
    // const outPath = path.join(
    //   process.cwd(),
    //   `${docsRootFolder}/content/docs`,
    //   'search-meta.json'
    // );
    // fs.writeFileSync(outPath, json);

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
