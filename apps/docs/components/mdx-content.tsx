/* eslint-disable react/display-name */
"use client";
import type {MDXComponents as MDXComponentsType} from "mdx/types";

import {useMDXComponent} from "next-contentlayer/hooks";

import {MDXComponents} from "./mdx-components";

interface MDXContentProps {
  code: string;
}

export function MDXContent({code}: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={MDXComponents as MDXComponentsType} />
    </div>
  );
}
