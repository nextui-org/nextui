import {ParsedUrlQuery} from "querystring";

import {marked} from "marked";
import Slugger from "github-slugger";

export type SlugParams = ParsedUrlQuery | undefined;
export type Heading = {level: number; text: string; id: string};

export interface SlugResponse {
  slug: string;
  tag?: string;
}

const slugger = new Slugger();

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

export function getHeadings(markdownText: string | undefined): Heading[] {
  let headings: Heading[] = [];

  if (!markdownText) {
    return headings;
  }
  slugger.reset();
  const tokens = marked.lexer(markdownText);

  tokens.forEach((token) => {
    if (token.type === "heading") {
      headings.push({level: token.depth, text: token.text, id: slugger.slug(token.text)});
    }
  });

  return headings;
}
