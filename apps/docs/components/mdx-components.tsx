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

const LinkedHeading: React.FC<LinkedHeadingProps> = ({as, linked = true, className, ...props}) => {
  const Component = as;

  return (
    <Component
      className={clsx({"linked-heading": linked}, "font-semibold", className)}
      data-name={props.children}
      {...props}
    >
      {linked ? (
        <VirtualAnchor className={className}>{props.children}</VirtualAnchor>
      ) : (
        <>{props.children}</>
      )}
    </Component>
  );
};

const List: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <ul className="list-disc">{children}</ul>;
};

// // @ts-ignore
const Paragraph = ({children}: {children?: React.ReactNode}) => {
  return <p>{children}</p>;
};

const Code = ({children, className}: {children?: React.ReactNode; className?: string}) => {
  return (
    <Components.Snippet
      disableTooltip
      fullWidth
      hideSymbol
      classNames={{
        base: clsx("bg-code-background text-code-foreground my-6", className),
        pre: "font-light text-sm",
        copyButton: "text-lg text-code-foreground/50",
      }}
    >
      <div>{children}</div>
    </Components.Snippet>
  );
};

export const MDXComponents = ({
  /**
   * NextUI components
   */
  ...Components,
  /**
   * Markdown components
   */
  // ...Icons,
  h1: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h1" className="text-5xl mb-6" linked={false} {...props} />
  ),
  h2: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h2" className="text-xl" {...props} />
  ),
  h3: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h3" className="text-lg" {...props} />
  ),
  h4: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h4" className="text-base" {...props} />
  ),
  p: Paragraph,
  table: Table,
  thead: Thead,
  tr: Trow,
  td: Tcol,
  // Playground,
  // CarbonAd,
  code: Code,
  ul: List,
  // Block,
} as unknown) as Record<string, React.ReactNode>;
