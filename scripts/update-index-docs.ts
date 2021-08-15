import { parseMarkdownFile, fileToPath, removePrefix } from '@docusaurus/utils';
import path from 'path';
import { v4 as uuid } from 'uuid';
import shell from 'shelljs';
const dotenv = require('dotenv');
const algoliasearch = require('algoliasearch');
const toc = require('markdown-toc');

interface ResultType {
  content: string;
  objectID: string;
  url: string;
  type: 'lvl1' | 'lvl2' | 'lvl3';
  hierarchy: {
    lvl1: string | null;
    lvl2?: string | null;
    lvl3?: string | null;
  };
}

interface TOCResultItem {
  content: string;
  slug: string;
  lvl: 1 | 2 | 3;
  i: number;
  seen: number;
}

const docsRootFolder = 'packages/docs';

async function getMDXMeta(file: string) {
  const { content, frontMatter } = await parseMarkdownFile(file);
  const tableOfContent = toc(content);
  const json = tableOfContent.json as TOCResultItem[];
  const slug = fileToPath(file)
    .replace(`/${docsRootFolder}`, '')
    .replace('/content', '')
    .replace(process.cwd(), '');

  const result: ResultType[] = [];
  //@ts-ignore
  const title: string = !!frontMatter.title ? frontMatter.title : '';

  result.push({
    content: title,
    objectID: uuid(),
    type: 'lvl1',
    url: removePrefix(slug, '/'),
    hierarchy: {
      lvl1: title,
    },
  });

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      objectID: uuid(),
      type: `lvl${item.lvl}` as any,
      url: removePrefix(slug, '/') + `#${item.slug}`,
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
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  );

  try {
    const tmpIndex = await client.initIndex('prod_docs_tmp');
    const mainIndex = await client.initIndex('prod_docs');

    let json: any = [];

    const files = shell
      .ls('-R', docsRootFolder)
      .map((file) => path.join(process.cwd(), docsRootFolder, file))
      .filter((file) => file.endsWith('.mdx'));

    for (const file of files) {
      let result: any[] = [];
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

    console.log('[Items count 🚀]: ' + json.length);

    console.log('[Saving on Algolia ⏰...]');

    await mainIndex.replaceAllObjects(json, {
      autoGenerateObjectIDIfNotExist: true,
      safe: true,
    });

    console.log('[NextUI] Search meta is ready ✅');
  } catch (error) {
    console.error(`[ERROR 🔥]:`, error);
  }
}

getSearchMeta();
