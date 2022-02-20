import React from 'react';
import { NormalAlignment } from '../utils/prop-types';

export interface TableConfig {
  footerAlign?: NormalAlignment;
  animated?: boolean;
  setFooterAlign?: (value: NormalAlignment) => void;
  setAnimated?: (value: boolean) => void;
}

const defaultContext = {
  footerAlign: 'end' as NormalAlignment,
  animated: true
};

export const TableContext = React.createContext<TableConfig>(defaultContext);

export const useTableContext = (): TableConfig =>
  React.useContext<TableConfig>(TableContext);

export type ProviderProps = {
  children: React.ReactNode;
  defaultValues?: Partial<TableConfig>;
};

const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  defaultValues
}) => {
  const [footerAlign, setFooterAlign] = React.useState(
    defaultValues?.footerAlign || defaultContext.footerAlign
  );
  const [animated, setAnimated] = React.useState(
    defaultValues?.animated === undefined
      ? defaultContext.animated
      : defaultValues?.animated
  );

  const providerValue = React.useMemo<TableConfig>(
    () => ({
      animated,
      footerAlign,
      setFooterAlign,
      setAnimated
    }),
    [animated, footerAlign]
  );

  return (
    <TableContext.Provider value={providerValue}>
      {children}
    </TableContext.Provider>
  );
};

export default { Provider, Consumer: TableContext.Consumer };
