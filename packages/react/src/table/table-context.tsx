import React from 'react';
import { NormalAlignment } from '../utils/prop-types';

export interface TableConfig {
  footerAlign?: NormalAlignment;
  setFooterAlign?: (value: NormalAlignment) => void;
}

const defaultContext = {
  footerAlign: 'end' as NormalAlignment
};

export const TableContext = React.createContext<TableConfig>(defaultContext);

export const useTableContext = (): TableConfig =>
  React.useContext<TableConfig>(TableContext);

const Provider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [footerAlign, setFooterAlign] = React.useState(
    defaultContext.footerAlign
  );

  const initialValue = React.useMemo<TableConfig>(
    () => ({
      footerAlign,
      setFooterAlign
    }),
    [footerAlign]
  );

  return (
    <TableContext.Provider value={initialValue}>
      {children}
    </TableContext.Provider>
  );
};

export default { Provider, Consumer: TableContext.Consumer };
