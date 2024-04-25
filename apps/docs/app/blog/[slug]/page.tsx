import type {Metadata} from "next";

import {notFound} from "next/navigation";
import {allBlogPosts} from "contentlayer/generated";
import {Link, User} from "@nextui-org/react";
import {format, parseISO} from "date-fns";
import NextLink from "next/link";
import {Balancer} from "react-wrap-balancer";

import {__DEV__, __PREVIEW__} from "@/utils";
import {MDXContent} from "@/components/mdx-content";
import {siteConfig} from "@/config/site";
import {Route} from "@/libs/docs/page";
import {ChevronRightLinearIcon} from "@/components/icons";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const isDraftVisible = __DEV__ || __PREVIEW__;

async function getBlogPostFromParams({params}: BlogPostProps) {
  const slug = params.slug || "";
  const post = allBlogPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  const currentRoute: Route = {
    key: post?._id,
    title: post?.title,
    path: `/${post?._raw?.sourceFilePath}`,
  };

  return {post, currentRoute};
}

export async function generateMetadata({params}: BlogPostProps): Promise<Metadata> {
  const {post} = await getBlogPostFromParams({params});

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.url,
      images: [
        {
          url: post.imageAsParams || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.creator,
    },
  };
}

export async function generateStaticParams(): Promise<BlogPostProps["params"][]> {
  return allBlogPosts.map((doc) => ({
    slug: doc.slugAsParams,
  }));
}

export default async function DocPage({params}: BlogPostProps) {
  const {post} = await getBlogPostFromParams({params});

  if (!post || (post.draft && !isDraftVisible)) {
    notFound();
  }

  return (
    <div className="w-full mt-12 flex flex-col justify-start items-center prose prose-neutral">
      <div className="w-full max-w-4xl">
        <Link
          isBlock
          as={NextLink}
          className="mb-8 -ml-3 text-default-500 hover:text-default-900"
          color="foreground"
          href="/blog"
          size="sm"
        >
          <ChevronRightLinearIcon className="rotate-180 inline-block mr-1" size={15} />
          Back to blog
        </Link>

        <time className="block text-small mb-2 text-default-500" dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <div className="mb-3 flex w-full flex-col items-start">
          <User
            isExternal
            as={Link}
            avatarProps={{
              className: "w-9 h-9 text-large",
              src: post.author?.avatar,
            }}
            className="hover:opacity-100"
            classNames={{
              base: "-ml-2 px-2 py-1.5 hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer transition-colors",
              name: "text-foreground",
            }}
            description={post.author?.username}
            href={post.author?.link}
            name={post.author?.name}
          />
        </div>
        <h1 className="mb-2 font-bold text-4xl">
          <Balancer>{post.title}</Balancer>
          <strong className="text-default-300">{post?.draft && " (Draft)"}</strong>
        </h1>
        <MDXContent code={post.body.code} />
      </div>
    </div>
  );
}
