"use client";

import {BlogPost} from "contentlayer/generated";
import {Card, CardFooter, CardBody, CardHeader, Link, Avatar, Image} from "@nextui-org/react";
import Balancer from "react-wrap-balancer";
import {format, parseISO} from "date-fns";
import NextLink from "next/link";
import {AnimatePresence, motion} from "framer-motion";

import {useIsMounted} from "@/hooks/use-is-mounted";

const BlogPostCard = (post: BlogPost) => {
  const isMounted = useIsMounted();

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 5}}
          initial={{opacity: 0, y: 5}}
          transition={{duration: 0.3}}
        >
          <Card
            isBlurred
            as={NextLink}
            className="p-2 border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
            href={post.url}
            isPressable={!!post.url}
          >
            <CardHeader>
              <Link
                as={NextLink}
                className="font-semibold "
                href={post.url}
                size="lg"
                underline="hover"
              >
                <Balancer>{post.title}</Balancer>
              </Link>
            </CardHeader>
            <CardBody className="pt-0 px-2 pb-1">
              <Image className="mb-3" src={post.image} />
              <p className="font-normal px-1 text-default-600">{post.description}</p>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <time className="block text-small text-default-500" dateTime={post.date}>
                {format(parseISO(post.date), "LLLL d, yyyy")}
              </time>
              <Avatar size="sm" src={post.author?.avatar} />
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const BlogPostList = ({posts}: {posts: BlogPost[]}) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post, idx) => (
        <BlogPostCard key={idx} {...post} />
      ))}
    </div>
  );
};
