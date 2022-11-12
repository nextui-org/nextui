import React from "react";
import {TableCollection} from "@react-types/table";

import {NormalAlignment} from "../utils/prop-types";

import {TableVariantsProps} from "./table.styles";

export interface TableConfig {
  rowsPerPage: number;
  currentPage: number;
  color?: TableVariantsProps["color"];
  animated?: boolean;
  footerAlign?: NormalAlignment;
  collection?: TableCollection<any>;
  setFooterAlign?: (value: NormalAlignment) => void;
  setAnimated?: (value: boolean) => void;
  setCollection?: (value: TableCollection<any>) => void;
  setRowsPerPage?: (value: number) => void;
  setCurrentPage?: (value: number) => void;
  setColor?: (value: TableVariantsProps["color"]) => void;
}

const defaultContext = {
  footerAlign: "end" as NormalAlignment,
  rowsPerPage: 0,
  currentPage: 1,
  animated: true,
};

export const TableContext = React.createContext<TableConfig>(defaultContext);

export const useTableContext = (): TableConfig => React.useContext<TableConfig>(TableContext);

export type ProviderProps = {
  children: React.ReactNode;
  defaultValues?: Partial<TableConfig>;
};

const Provider: React.FC<ProviderProps> = ({children, defaultValues}) => {
  const [footerAlign, setFooterAlign] = React.useState(
    defaultValues?.footerAlign || defaultContext.footerAlign,
  );
  const [animated, setAnimated] = React.useState(
    defaultValues?.animated === undefined ? defaultContext.animated : defaultValues?.animated,
  );
  const [collection, setCollection] = React.useState(defaultValues?.collection);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    defaultValues?.rowsPerPage === undefined
      ? defaultContext.rowsPerPage
      : defaultValues?.rowsPerPage,
  );
  const [currentPage, setCurrentPage] = React.useState(defaultContext.currentPage);
  const [color, setColor] = React.useState<TableVariantsProps["color"]>(defaultValues?.color);

  const providerValue = React.useMemo<TableConfig>(
    () => ({
      animated,
      footerAlign,
      collection,
      rowsPerPage,
      currentPage,
      color,
      setFooterAlign,
      setCollection,
      setAnimated,
      setRowsPerPage,
      setColor,
      setCurrentPage,
    }),
    [animated, color, collection, footerAlign, rowsPerPage, currentPage],
  );

  return <TableContext.Provider value={providerValue}>{children}</TableContext.Provider>;
};

export default {Provider, Consumer: TableContext.Consumer};
