import { ReactNode } from 'react';
import { CSS } from '../theme/stitches.config';

export type TableRowData = {
  [key: string]: any;
};

export type TableColumnData<Item extends TableRowData> = {
  value?: Item[keyof Item];
  rowData?: Item;
  rowIndex?: number;
};

export type TableOnCellClick<TableDataItem> = (
  cellData: TableDataItem[keyof TableDataItem],
  rowIndex?: number,
  columnIndex?: number
) => void;

export type TableColumnHeaderData = Omit<
  TableColumnItem,
  'renderHeader' | 'renderCell' | 'cellAlign' | 'cellClassName'
>;

export type TableCellRender<Item extends TableRowData> = (
  data?: TableColumnData<Item>
) => ReactNode;

export type TableColumnProps<TableDataItem> = {
  field?: string;
  label?: string;
  width?: number;
  hide?: boolean;
  align?: 'left' | 'center' | 'right';
  cellAlign?: 'left' | 'center' | 'right';
  labelCase?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  cellClassName?: string;
  className?: string;
  headerCss?: CSS;
  cellCss?: CSS;
  renderHeader?: (data?: TableColumnHeaderData) => ReactNode;
  renderCell?: TableCellRender<TableDataItem>;
};

export type TableColumnItem = TableColumnProps<TableRowData>;
export type TableCellData<T extends TableRowData = {}> = TableColumnData<T>;
