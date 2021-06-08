/* eslint-disable react/display-name */
import * as React from 'react';
import Playground from '../playground';
import Codeblock from './codeblock';
import * as Icons from '../icons';
import { useTheme } from '@nextui/react';
import { Anchor } from '@components';

const Table: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <table>
      {children}
      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }
      `}</style>
    </table>
  );
};
const Thead: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme();
  return (
    <thead>
      {children}
      <style jsx>{`
        :global(tr) {
          height: 2.875rem;
        }
        :global(th) {
          background: ${theme.palette.accents_1};
          color: ${theme.palette.accents_5};
          font-size: 0.8rem;
          font-weight: 600;
          text-align: left;
          padding: 0 ${theme.layout.gap};
        }
        :global(th:nth-child(1)) {
          border-radius: ${theme.layout.radius} 0 0 ${theme.layout.radius};
        }
        :global(th:last-child) {
          border-radius: 0 ${theme.layout.radius} ${theme.layout.radius} 0;
        }
      `}</style>
    </thead>
  );
};
const Trow: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme();
  return (
    <tr>
      {children}
      <style jsx>{`
        :global(tr td) {
          font-size: 0.9rem;
          padding: 0 ${theme.layout.gapHalf};
        }
      `}</style>
    </tr>
  );
};
const Tcol: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <td>
      {children}
      <style jsx>{`
        :global(strong) {
          font-weight: 500;
        }
      `}</style>
    </td>
  );
};
export interface LinkedHeadingProps {
  as: keyof JSX.IntrinsicElements;
}

const LinkedHeading: React.FC<LinkedHeadingProps> = ({ as, ...props }) => {
  const Component = as;
  return (
    <Component {...props}>
      <Anchor>{props.children}</Anchor>
    </Component>
  );
};

const MDXComponents = {
  ...Icons,
  h2: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h3" {...props} />
  ),
  h3: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h3" {...props} />
  ),
  h4: (props: React.DetailsHTMLAttributes<unknown>) => (
    <LinkedHeading as="h4" {...props} />
  ),
  table: Table,
  thead: Thead,
  tr: Trow,
  td: Tcol,
  Playground,
  code: Codeblock,
};

export default MDXComponents;
