import fs from "fs";
import path from "path";

import {FC} from "react";
import {useRouter} from "next/router";
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";
import {GetStaticProps, GetStaticPaths} from "next";
import matter from "gray-matter";
import {serialize} from "next-mdx-remote/serialize";

import {MetaProps} from "@/libs/docs/meta";
import {getSlug} from "@/libs/docs/utils";
import {DocsLayout} from "@/layouts/docs";
import {
  Route,
  getCurrentTag,
  fetchDocsManifest,
  fetchRawDoc,
  findRouteByPath,
  getRawAsset,
  getPaths,
} from "@/libs/docs/page";
import {MDXComponents} from "@/components";
import {useDocsRoute} from "@/hooks/use-docs-route";
import {__PROD__, __PREVIEW__} from "@/utils";
import * as componentsContent from "@/content/components";

interface DocsPageProps {
  routes: Route[];
  currentRoute?: Route;
  source?: MDXRemoteSerializeResult;
  meta?: MetaProps;
}

const scope = {
  // Markdown content
  ...componentsContent,
};

const DocsPage: FC<DocsPageProps> = ({routes, currentRoute, source, meta}) => {
  const {route, prevRoute, nextRoute} = useDocsRoute(routes, currentRoute);
  const {query} = useRouter();
  const {tag, slug} = getSlug(query);

  return (
    <DocsLayout
      currentRoute={route}
      meta={meta}
      nextRoute={nextRoute}
      prevRoute={prevRoute}
      routes={routes}
      slug={slug}
      tag={tag}
    >
      {source && <MDXRemote {...source} components={MDXComponents} scope={scope} />}
    </DocsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  const paths = getPaths(manifest.routes);

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {tag, slug} = getSlug(params);
  const currentTag = await getCurrentTag(tag);
  const manifest = await fetchDocsManifest(currentTag).catch((error) => {
    // If a manifest wasn't found for a custom tag, show a 404 instead
    if (error.status === 404) return;
    throw error;
  });

  const route = manifest && findRouteByPath(slug, manifest.routes);

  if (!route) {
    return {
      props: {},
    };
  }

  let meta, doc;

  if (__PROD__ && !__PREVIEW__) {
    const rawFileSource = await fetchRawDoc(route.path, currentTag);
    const {content, data} = matter(rawFileSource);

    doc = content.toString();
    meta = data;
  } else {
    meta = null;
    const folderPath = path.join(process.cwd(), "content");
    const filePath = path.join(folderPath, `${slug}.mdx`);
    const rawFileSource = fs.readFileSync(filePath);
    const {content, data} = matter(rawFileSource);

    doc = content.toString();
    meta = data;
  }

  const mdxSource = await serialize(doc);

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
    props: {
      routes,
      meta,
      source: mdxSource,
      currentRoute: route,
    },
  };
};

export default DocsPage;
