"use client";

import {FC} from "react";
import {MDXRemote as BaseMDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";

import {MDXComponents} from "@/components/mdx-components";
import * as componentsContent from "@/content/components";

const scope = {
  // Markdown content
  ...componentsContent,
};

export interface MDXRemoteProps {
  source?: MDXRemoteSerializeResult;
}

export const MDXRemote: FC<MDXRemoteProps> = ({source}) => {
  if (!source) return null;

  return <BaseMDXRemote {...source} components={MDXComponents} scope={scope} />;
};
