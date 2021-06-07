import * as React from 'react';
import Playground from '../playground';
import Codeblock from './codeblock';
import * as Icons from '../icons';
import { useTheme } from '@nextui/react';

const Table: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <table>
      {children}
      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          margin: 2rem 0;
        }
      `}</style>
    </table>
  );
};
const Thead: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme();
  return (
    <thead className="thead__header">
      {children}
      <style jsx>{`
        :global(tr) {
          height: 2.875rem;
        }
        :global(th:nth-child(1)) {
          padding: 0 1rem;
          border-radius: ${theme.layout.radius} 0 0 ${theme.layout.radius};
        }
        :global(th:last-child) {
          padding: 0 1rem;
          border-radius: 0 ${theme.layout.radius} ${theme.layout.radius} 0;
        }
        :global(th) {
          background: ${theme.palette.accents_1};
          color: ${theme.palette.accents_5};
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>
    </thead>
  );
};

const MDXComponents = {
  ...Icons,
  table: Table,
  thead: Thead,
  Playground,
  code: Codeblock,
};

export default MDXComponents;
