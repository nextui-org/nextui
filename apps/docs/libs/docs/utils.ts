import {ParsedUrlQuery} from "querystring";

export type SlugParams = ParsedUrlQuery | undefined;
export type Heading = {level: number; text: string; id: string};

export interface SlugResponse {
  slug: string;
  tag?: string;
}

// Handle optional catch all route for `/docs`
function getDocsSlug(slug: any): any {
  return slug?.length ? slug : ["getting-started"];
}

export function getSlug(params: SlugParams): SlugResponse {
  // Handle optional catch all route for `/docs`
  const slug = getDocsSlug(params?.slug);

  if (slug[0] === "tag") {
    return {
      slug: `/docs/${getDocsSlug(slug.slice(2)).join("/")}`,
      tag: slug[1],
    };
  }

  return {slug: `/docs/${slug.join("/")}`};
}

export function getAppSlug(params: {slug: string[]}) {
  // Handle optional catch all route for `/docs`
  const slug = getDocsSlug(params?.slug);

  if (slug[0] === "tag") {
    return {
      slug: `/docs/${getDocsSlug(slug.slice(2)).join("/")}`,
      tag: slug[1],
    };
  }

  return {slug: `/docs/${slug.join("/")}`};
}

export function extractHeadings(compiledSource: string): Heading[] {
  const regex = /mdx\("(h\d)",[a-z]\(\{},{id:"(.*?)"\}\),"([^"]*?)"/g;
  let match;
  const headings = [];

  while ((match = regex.exec(compiledSource)) !== null) {
    const [, level, id, text] = match;
    // Check if text is ending with "),mdx", if so, remove it.
    let cleanedText = text.endsWith('"),mdx') ? text.slice(0, -6) : text;

    headings.push({level: parseInt(level.replace("h", "")), text: cleanedText, id});
  }

  return headings;
}
