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

// const Table: React.FC<{children?: React.ReactNode}> = ({children}) => {
//   return (
//     <div className="docs-table-container">
//       <table className="docs-table">{children}</table>
//       <style jsx>{`
//         .docs-table-container {
//           overflow-x: auto;
//           overflow-y: hidden;
//         }
//         .docs-table {
//           border-collapse: separate;
//           border-spacing: 0;
//           width: 100%;
//         }
//       `}</style>
//     </div>
//   );
// };
// const Thead: React.FC<{children?: React.ReactNode}> = ({children}) => {
//   const {theme} = useTheme();

//   return (
//     <thead className="docs-thead">
//       {children}
//       <style jsx>{`
//         :global(.docs-tr) {
//           height: 2.875rem;
//         }
//         :global(.docs-thead th) {
//           background: ${theme?.colors?.accents0?.value};
//           color: ${theme?.colors?.accents7?.value};
//           font-size: 0.8rem;
//           font-weight: 600;
//           text-align: left;
//           padding: 0 ${theme?.space?.lg?.value} 0 0;
//         }
//         :global(.docs-thead th:nth-child(1)) {
//           padding-left: 1rem;
//           border-radius: ${theme?.radii?.lg?.value} 0 0 ${theme?.radii?.lg?.value};
//         }
//         :global(.docs-thead th:last-child) {
//           border-radius: 0 ${theme?.radii?.lg?.value} ${theme?.radii?.lg?.value} 0;
//         }
//       `}</style>
//     </thead>
//   );
// };
// const Trow: React.FC<{children?: React.ReactNode}> = ({children}) => {
//   return <tr className="docs-tr">{children}</tr>;
// };
// const Tcol: React.FC<{children?: React.ReactNode}> = ({children}) => {
//   const {theme} = useTheme();

//   return (
//     <td className="docs-col">
//       {children}
//       <style jsx>{`
//         :global(.docs-col) {
//           font-size: 0.9rem;
//           padding: ${theme?.space?.sm?.value};
//         }
//         :global(strong) {
//           font-weight: 500;
//         }
//       `}</style>
//     </td>
//   );
// };

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
      {linked ? <VirtualAnchor>{props.children}</VirtualAnchor> : <>{props.children}</>}
    </Component>
  );
};

// const List: React.FC<{children?: React.ReactNode}> = ({children}) => {
//   const {theme} = useTheme();

//   return (
//     <ul className="mdx-ul">
//       {children}
//       <style jsx>
//         {`
//           ul {
//             list-style-type: disc;
//           }
//           :global(.mdx-ul strong) {
//             color: ${theme?.colors.code.value};
//           }
//         `}
//       </style>
//     </ul>
//   );
// };

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
    <LinkedHeading as="h2" className="text-4xl leading-7" {...props} />
  ),
  h3: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h3" className="text-3xl leading-6" {...props} />
  ),
  h4: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h4" className="text-2xl leading-4" {...props} />
  ),
  p: Paragraph,
  hr: () => <hr className="my-8" />,
  // table: Table,
  // thead: Thead,
  // tr: Trow,
  // td: Tcol,
  // Playground,
  // CarbonAd,
  code: Code,
  // ul: List,
  // Block,
} as unknown) as Record<string, React.ReactNode>;
