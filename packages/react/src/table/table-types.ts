export type TableRowData = {
  [key: string]: any;
};

export type TableColumnData<Item extends TableRowData> = {
  value?: Item[keyof Item];
  rowData?: Item;
  rowIndex?: number;
};

export type TableColumnRender<Item extends TableRowData> = (
  data?: TableColumnData<Item>
) => JSX.Element | void;

export type TableOnCellClick<TableDataItem> = (
  cellData: TableDataItem[keyof TableDataItem],
  rowIndex?: number,
  columnIndex?: number
) => void;

export type TableColumnProps<TableDataItem> = {
  field?: keyof TableDataItem;
  label?: string;
  width?: number;
  renderCell?: TableColumnRender<TableDataItem>;
};

export type TableCellData = TableColumnData<TableRowData>;
export type TableColumnItem = TableColumnProps<TableRowData>;
