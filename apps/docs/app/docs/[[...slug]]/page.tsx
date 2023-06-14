import type {Metadata} from "next";
import type {MetaProps} from "@/libs/docs/meta";

import fs from "fs";
import path from "path";

import {notFound} from "next/navigation";
import {Spinner} from "@nextui-org/react";
import rehypeSlugPlugin from "rehype-slug";
import {serialize} from "next-mdx-remote/serialize";
import matter from "gray-matter";
import NextLink from "next/link";
import {Link} from "@nextui-org/react";
import {Suspense} from "react";

import {MDXRemote} from "@/components/mdx-remote";
import manifest from "@/content/docs/manifest.json";
import {findRouteByPath} from "@/libs/docs/page";
import {extractHeadings, getAppSlug} from "@/libs/docs/utils";
import {FooterNav} from "@/components/docs/footer-nav";
import {DocsToc} from "@/components/docs/toc";
import {siteConfig} from "@/config/site";
import {GITHUB_URL, REPO_NAME} from "@/libs/github/constants";
import {CONTENT_PATH, TAG} from "@/libs/docs/config";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

const cache = new Map();

export function getDocFromParams(params: {slug: string[]}) {
  let meta, doc;

  const {slug} = getAppSlug(params);

  if (!cache.has(slug)) {
    const folderPath = path.join(process.cwd(), "content");
    const filePath = path.join(folderPath, `${slug}.mdx`);
    const rawFileSource = fs.readFileSync(filePath);
    const {content, data} = matter(rawFileSource);

    doc = content.toString();
    meta = data as MetaProps;

    cache.set(slug, {doc, meta});
  } else {
    const cached = cache.get(slug);

    doc = cached.doc;
    meta = cached.meta;
  }

  const currentRoute = findRouteByPath(slug, manifest.routes);

  return {
    doc,
    meta,
    currentRoute,
  };
}

export async function generateMetadata({params}: DocPageProps): Promise<Metadata> {
  const {doc, meta} = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      url: meta.url,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.creator,
    },
  };
}

async function getDocData({params}: DocPageProps) {
  let meta, doc;

  const {tag, slug} = getAppSlug(params);

  const folderPath = path.join(process.cwd(), "content");
  const filePath = path.join(folderPath, `${slug}.mdx`);
  const rawFileSource = fs.readFileSync(filePath);
  const {content, data} = matter(rawFileSource);

  doc = content.toString();
  meta = data;

  const currentRoute = findRouteByPath(slug, manifest.routes);

  const mdxSource = await serialize(doc, {
    mdxOptions: {
      rehypePlugins: [rehypeSlugPlugin as any],
    },
  });

  return {
    doc,
    tag,
    meta,
    slug,
    currentRoute,
    headings: extractHeadings(mdxSource.compiledSource),
    source: mdxSource,
  };
}

export default async function DocPage({params}: DocPageProps) {
  const {doc, source, tag, slug, currentRoute, headings} = await getDocData({params});

  if (!doc) {
    notFound();
  }

  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;

  return (
    <>
      <div className="col-span-12 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
        <div className="w-full prose prose-neutral">
          <Suspense fallback={<Spinner />}>
            <MDXRemote source={source} />
          </Suspense>
        </div>
        {currentRoute && <FooterNav currentRoute={currentRoute} tag={tag} />}
        <footer>
          {tag ? (
            <Link as={NextLink} href={slug || ""} size="sm">
              Go to the live version of this page
            </Link>
          ) : (
            <Link isExternal showAnchorIcon href={editUrl} size="sm">
              Edit this page on GitHub
            </Link>
          )}
        </footer>
      </div>
      {headings && headings.length > 0 && (
        <div className="hidden xl:flex xl:col-span-2 mt-8 pl-4">
          <DocsToc headings={headings} />
        </div>
      )}
    </>
  );
}
