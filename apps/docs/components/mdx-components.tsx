/* eslint-disable react/display-name */
import {clsx} from "@nextui-org/shared-utils";
import * as Components from "@nextui-org/react";
import {Language} from "prism-react-renderer";
import NextImage from "next/image";

import {Sandpack} from "@/components/sandpack";
import * as DocsComponents from "@/components/docs/components";
import {Codeblock} from "@/components/docs/components/codeblock";
import {VirtualAnchor, virtualAnchorEncode} from "@/components";

const Table: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="border-collapse border-spacing-0 w-full">{children}</table>
    </div>
  );
};

const Thead: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <thead
      className={clsx(
        "[&>tr]:h-12 [&>tr>th]:bg-neutral-100",
        "[&>tr>th]:align-middle",
        "[&>tr>th]:py-0",
        "[&>tr>th]:text-neutral-500 [&>tr>th]:text-xs",
        "[&>tr>th]:text-left [&>tr>th]:pl-2",
        "[&>tr>th:first-child]:rounded-l-lg",
        "[&>tr>th:last-child]:rounded-r-lg",
      )}
    >
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

  const id = virtualAnchorEncode(props.children as string);

  return (
    <Component
      className={clsx({"linked-heading": linked}, linked ? {} : className)}
      data-id={id}
      data-level={level}
      data-name={props.children}
      id={id}
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

const Code = ({
  className,
  children,
  metastring,
}: {
  children?: React.ReactNode;
  metastring?: string;
  className?: string;
}) => {
  const isMultiLine = (children as string).split("\n").length > 2;
  const language = (className?.replace(/language-/, "") ?? "jsx") as Language;
  const codeString = String(children).trim();

  return (
    <Components.Snippet
      disableTooltip
      fullWidth
      hideSymbol
      classNames={{
        base: clsx(
          "px-0 bg-code-background text-code-foreground",
          {
            "items-start": isMultiLine,
          },
          className,
        ),
        pre: "font-light w-full text-sm",
        copyButton: "text-lg text-code-foreground/50 mr-2",
      }}
      codeString={codeString}
    >
      <Codeblock codeString={codeString} language={language} metastring={metastring} />
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

const InlineCode = ({children}: {children?: React.ReactNode}) => {
  return (
    <Components.Code className="font-normal bg-transparent px-0 py-0 text-code-mdx">
      {children}
    </Components.Code>
  );
};

export const MDXComponents = ({
  /**
   * Next.js components
   */
  NextImage,
  /**
   * NextUI components
   */
  ...Components,
  /**
   * Docs components
   */
  ...DocsComponents,
  Sandpack,
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
  inlineCode: InlineCode,
  InlineCode,
  // Block,
} as unknown) as Record<string, React.ReactNode>;
