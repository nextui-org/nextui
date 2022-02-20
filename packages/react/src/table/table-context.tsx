import React from 'react';
import { TableCollection } from '@react-types/table';
import { NormalAlignment } from '../utils/prop-types';

export interface TableConfig {
  animated?: boolean;
  footerAlign?: NormalAlignment;
  collection?: TableCollection<any>;
  rowsPerPage: number;
  currentPage: number;
  setFooterAlign?: (value: NormalAlignment) => void;
  setAnimated?: (value: boolean) => void;
  setCollection?: (value: TableCollection<any>) => void;
  setRowsPerPage?: (value: number) => void;
  setCurrentPage?: (value: number) => void;
}

const defaultContext = {
  footerAlign: 'end' as NormalAlignment,
  rowsPerPage: 0,
  currentPage: 1,
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

  const [collection, setCollection] = React.useState(defaultValues?.collection);

  const [rowsPerPage, setRowsPerPage] = React.useState(
    defaultContext.rowsPerPage
  );
  const [currentPage, setCurrentPage] = React.useState(
    defaultContext.currentPage
  );

  const providerValue = React.useMemo<TableConfig>(
    () => ({
      animated,
      footerAlign,
      collection,
      rowsPerPage,
      currentPage,
      setFooterAlign,
      setCollection,
      setAnimated,
      setRowsPerPage,
      setCurrentPage
    }),
    [animated, collection, footerAlign, rowsPerPage, currentPage]
  );

  return (
    <TableContext.Provider value={providerValue}>
      {children}
    </TableContext.Provider>
  );
};

export default { Provider, Consumer: TableContext.Consumer };
