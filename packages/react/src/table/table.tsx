import React from 'react';
import { TableDataItemBase } from './table-types';
import { CSS } from '../theme/stitches.config';
import { StyledTable } from './table.styles';

interface Props<TableDataItem extends TableDataItemBase> {
  data?: Array<TableDataItem>;
}

type NativeAttrs = Omit<React.TableHTMLAttributes<unknown>, keyof Props<any>>;

export type TableProps<TableDataItem extends TableDataItemBase> =
  Props<TableDataItem> & NativeAttrs & { css?: CSS };

const Table = React.forwardRef<
  HTMLTableElement,
  React.PropsWithChildren<TableProps<TableDataItemBase>>
>(({ data, children, ...props }, ref) => {
  return (
    <StyledTable ref={ref} {...props}>
      {children}
    </StyledTable>
  );
});

Table.displayName = 'NextUI - Table';
Table.toString = () => '.nextui-table';

export default Table;
