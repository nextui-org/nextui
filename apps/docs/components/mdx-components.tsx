/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */
// import * as React from "react";
// import {styled, useTheme} from "@nextui-org/react";
// import cn from "classnames";

// import Playground from "../playground";
// import Codeblock from "../codeblock";
// import CarbonAd from "../carbon-ad";
// import Block from "../templates/example-block";
import {clsx} from "@nextui-org/shared-utils";
import * as Components from "@nextui-org/react";

import * as DocsComponents from "@/components/docs/components";
import {VirtualAnchor} from "@/components";

const Table: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="border-collapse border-spacing-0 w-full">{children}</table>
    </div>
  );
};

const Thead: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <thead className="[&>tr]:h-12 [&>tr>th]:bg-neutral-300 [&>tr>th]:text-neutral-400 [&>tr>th]:text-sm [&>tr>th]:text-left [&>tr>th]:px-4">
      {children}
    </thead>
  );
};
const Trow: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <tr>{children}</tr>;
};

const Tcol: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <td className="text-sm p-2">{children}</td>;
};

export interface LinkedHeadingProps {
  as: keyof JSX.IntrinsicElements;
  linked?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const linkedLevels: Record<string, number> = {
  h1: 0,
  h2: 1,
  h3: 2,
  h4: 3,
};

const LinkedHeading: React.FC<LinkedHeadingProps> = ({as, linked = true, className, ...props}) => {
  const Component = as;

  const level = linkedLevels[as] || 1;

  return (
    <Component
      className={clsx({"linked-heading": linked}, linked ? {} : className)}
      data-level={level}
      data-name={props.children}
      {...props}
    >
      {linked ? <VirtualAnchor>{props.children}</VirtualAnchor> : <>{props.children}</>}
    </Component>
  );
};

const List: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <ul className="list-disc flex flex-col gap-2 ml-4 mt-2 [&>li>strong]:text-pink-500 dark:[&>li>strong]:text-cyan-600">
      {children}
    </ul>
  );
};

const Code = ({children, className}: {children?: React.ReactNode; className?: string}) => {
  const isMultiline =
    Array.isArray(children) && !!children.find((child) => String(child).includes("\n\n"));

  return (
    <Components.Snippet
      disableTooltip
      fullWidth
      hideSymbol
      classNames={{
        base: clsx(
          "bg-code-background text-code-foreground",
          {
            "items-start": isMultiline,
          },
          className,
        ),
        pre: "font-light text-sm",
        copyButton: "text-lg text-code-foreground/50 -mr-2",
      }}
    >
      <div>{children}</div>
    </Components.Snippet>
  );
};

const Link = ({href, children}: {href?: string; children?: React.ReactNode}) => {
  const isExternal = href?.startsWith("http");

  return (
    <Components.Link showAnchorIcon href={href} isExternal={isExternal}>
      {children}
    </Components.Link>
  );
};

export const MDXComponents = ({
  /**
   * NextUI components
   */
  ...Components,
  /**
   * Docs components
   */
  ...DocsComponents,
  /**
   * Markdown components
   */
  // ...Icons,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <LinkedHeading as="h1" linked={false} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h2" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h3" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h4" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium" {...props} />
  ),
  table: Table,
  thead: Thead,
  tr: Trow,
  td: Tcol,
  // Playground,
  // CarbonAd,
  code: Code,
  ul: List,
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
  blockquote: (props: Omit<React.HTMLAttributes<HTMLElement>, "color">) => (
    <DocsComponents.Blockquote {...props} />
  ),
  inlineCode: (props: Omit<React.HTMLAttributes<HTMLElement>, "color">) => (
    <Components.Code className="font-normal bg-transparent px-0 py-0 text-code-mdx" {...props} />
  ),
  // Block,
} as unknown) as Record<string, React.ReactNode>;
