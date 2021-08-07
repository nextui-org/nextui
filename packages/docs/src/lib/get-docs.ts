import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { getSlug, SlugParams } from './docs/utils';
import fs from 'fs';
import path from 'path';
import {
  Route,
  getCurrentTag,
  fetchDocsManifest,
  fetchRawDoc,
  findRouteByPath,
  getRawAsset,
  getPaths,
} from './docs/page';

import { isProd } from '@utils/index';

export interface DocsResp {
  routes: any;
  meta?: { [key: string]: any };
  source?: any;
  currentRoute?: Route;
}

export const fetchPaths = async () => {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  return getPaths(manifest.routes);
};

export const fetchDocs = async (
  params: SlugParams,
  onlyRoutes: boolean = false
): Promise<DocsResp> => {
  const { tag, slug } = getSlug(params);
  const currentTag = await getCurrentTag(tag);
  const manifest = await fetchDocsManifest(currentTag).catch((error) => {
    // If a manifest wasn't found for a custom tag, show a 404 instead
    if (error.status === 404) return;
    throw error;
  });

  if (manifest && !!onlyRoutes) {
    return {
      routes: manifest.routes,
    };
  }
  const route = manifest && findRouteByPath(slug, manifest.routes);

  if (!route) {
    return {
      routes: [],
      meta: {},
      source: {},
      currentRoute: {} as Route,
    };
  }

  let meta, doc;

  if (isProd) {
    const rawFileSource = await fetchRawDoc(route.path, currentTag);
    const { content, data } = matter(rawFileSource);
    doc = content.toString();
    meta = data;
  } else {
    meta = null;
    const folderPath = path.join(process.cwd(), 'content');
    const filePath = path.join(folderPath, `${slug}.mdx`);
    const rawFileSource = fs.readFileSync(filePath);
    const { content, data } = matter(rawFileSource);
    doc = content.toString();
    meta = data;
  }
  const mdxSource = await serialize(doc, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
      ],
      rehypePlugins: [require('@mapbox/rehype-prism')],
    },
  });

  const routes = manifest.routes.map((route: any) => {
    if (route.icon) {
      return {
        ...route,
        icon: getRawAsset(route.icon, currentTag),
      };
    }
    return route;
  });

  return {
    routes,
    meta,
    source: mdxSource,
    currentRoute: route,
  };
};
