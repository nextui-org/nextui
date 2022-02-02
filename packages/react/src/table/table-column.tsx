import React, { forwardRef, PropsWithChildren } from 'react';
import { CSS } from '../theme/stitches.config';
import {
  TableRowData,
  TableColumnHeaderData,
  TableColumnProps as TableColumnPropsBase
} from './table-types';
import { StyledTableColumn } from './table.styles';
import { cleanObject } from '../utils/object';
import withDefaults from '../utils/with-defaults';

interface Props {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  labelCase: 'uppercase'
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

export type TableColumnProps<TableDataItem extends TableRowData> =
  TableColumnPropsBase<TableDataItem> & Props & NativeAttrs & { css?: CSS };

const TableColumn = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<TableColumnProps<TableRowData>>
>(
  (
    {
      children,
      field,
      label,
      width,
      hide,
      cellClassName,
      className,
      align,
      cellAlign,
      labelCase,
      css,
      headerCss,
      ...props
    },
    ref
  ) => {
    if (hide) return null;

    const shouldBeRenderElement = typeof props.renderHeader === 'function';

    const headerData: TableColumnHeaderData = cleanObject({
      field,
      label,
      width,
      align,
      hide,
      labelCase,
      headerCss,
      className
    });

    return (
      <StyledTableColumn
        role="columnheader"
        ref={ref}
        className={className}
        css={{
          width: width || 'auto',
          textAlign: align,
          textTransform: labelCase,
          ...(css as any),
          ...(headerCss as any)
        }}
        {...props}
      >
        {shouldBeRenderElement
          ? props.renderHeader?.(headerData)
          : children || label}
      </StyledTableColumn>
    );
  }
);

TableColumn.displayName = 'NextUI - TableColumn';
TableColumn.toString = () => '.nextui-table-column';

export default withDefaults(TableColumn, defaultProps);
