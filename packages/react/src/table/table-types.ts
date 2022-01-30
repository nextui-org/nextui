export type TableDataItemBase = Record<string, unknown>;

export type TableColumnRender<Item extends TableDataItemBase> = (
  value: Item[keyof Item],
  rowData: Item,
  rowIndex: number
) => JSX.Element | void;

export type TableOnCellClick<TableDataItem> = (
  cellData: TableDataItem[keyof TableDataItem],
  rowIndex?: number,
  columnIndex?: number
) => void;
