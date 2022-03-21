/* eslint-disable react/display-name */
import * as React from 'react';
import Playground from '../playground';
import Codeblock from '../codeblock';
import CarbonAd from '../carbon-ad';
import * as Icons from '../icons';
import { styled, useTheme } from '@nextui-org/react';
import { Anchor } from '@components';
import Block from '../templates/example-block';
import cn from 'classnames';

const Table: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="docs-table-container">
      <table className="docs-table">{children}</table>
      <style jsx>{`
        .docs-table-container {
          overflow-x: auto;
          overflow-y: hidden;
        }
        .docs-table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }
      `}</style>
    </div>
  );
};
const Thead: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <thead className="docs-thead">
      {children}
      <style jsx>{`
        :global(.docs-tr) {
          height: 2.875rem;
        }
        :global(.docs-thead th) {
          background: ${theme?.colors?.accents1?.value};
          color: ${theme?.colors?.accents5?.value};
          font-size: 0.8rem;
          font-weight: 600;
          text-align: left;
          padding: 0 ${theme?.space?.lg?.value} 0 0;
        }
        :global(.docs-thead th:nth-child(1)) {
          padding-left: 1rem;
          border-radius: ${theme?.radii?.lg?.value} 0 0
            ${theme?.radii?.lg?.value};
        }
        :global(.docs-thead th:last-child) {
          border-radius: 0 ${theme?.radii?.lg?.value} ${theme?.radii?.lg?.value}
            0;
        }
      `}</style>
    </thead>
  );
};
const Trow: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <tr className="docs-tr">{children}</tr>;
};
const Tcol: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <td className="docs-col">
      {children}
      <style jsx>{`
        :global(.docs-col) {
          font-size: 0.9rem;
          padding: ${theme?.space?.sm?.value};
        }
        :global(strong) {
          font-weight: 500;
        }
      `}</style>
    </td>
  );
};
export interface LinkedHeadingProps {
  as: keyof JSX.IntrinsicElements;
  linked?: boolean;
}

const LinkedHeading: React.FC<LinkedHeadingProps> = ({
  as,
  linked = true,
  ...props
}) => {
  const Component = as;
  return (
    <Component
      className={cn({ 'linked-heading': linked })}
      data-name={props.children}
      {...props}
    >
      {linked ? <Anchor>{props.children}</Anchor> : <>{props.children}</>}
    </Component>
  );
};

const List: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ul className="mdx-ul">
      {children}
      <style jsx>
        {`
          ul {
            list-style-type: disc;
          }
          :global(.mdx-ul strong) {
            color: ${theme?.colors.code.value};
          }
        `}
      </style>
    </ul>
  );
};

// @ts-ignore
const Paragraph = styled('p', {
  fontSize: '1.125rem'
});

const MDXComponents = {
  ...Icons,
  h1: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h1" linked={false} {...props} />
  ),
  h2: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h2" {...props} />
  ),
  h3: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h3" {...props} />
  ),
  h4: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h4" {...props} />
  ),
  p: Paragraph,
  table: Table,
  thead: Thead,
  tr: Trow,
  td: Tcol,
  Playground,
  CarbonAd,
  code: Codeblock,
  ul: List,
  Block
};

export default MDXComponents;
