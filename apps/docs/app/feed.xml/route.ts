import Rss from "rss";
import {allBlogPosts} from "contentlayer/generated";

import {siteConfig} from "@/config/site";
import {allCoreContent} from "@/libs/contentlayer";

export async function GET() {
  const feed = new Rss({
    title: siteConfig.name,
    description: siteConfig.description,
    feed_url: `${siteConfig.siteUrl}/feed.xml`,
    site_url: siteConfig.siteUrl,
    webMaster: `${siteConfig.author} <${siteConfig.email}>`,
    managingEditor: `${siteConfig.author} <${siteConfig.email}>`,
    language: "en-US",
  });

  allCoreContent(allBlogPosts).forEach((post) => {
    const author = post.author ? post.author : siteConfig.author;

    feed.item({
      title: post.title,
      description: post.description ?? "",
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      guid: `${siteConfig.siteUrl}/blog/${post.slug}`,
      date: post.date,
      // @ts-ignore - name does exist
      author: `${author.name} <${siteConfig.email}>`,
      categories: post.tags ?? [],
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
