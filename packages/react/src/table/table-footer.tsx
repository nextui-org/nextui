import React, { useRef, useImperativeHandle } from 'react';
import { CSS } from '../theme/stitches.config';
import { StyledTableFooter, TableFooterVatiantsProps } from './table.styles';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TableFooterProps = Props &
  NativeAttrs &
  TableFooterVatiantsProps & { css?: CSS };

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.PropsWithChildren<TableFooterProps>
>(({ children, ...props }, ref: React.Ref<HTMLTableSectionElement | null>) => {
  const tableFooterRef = useRef<HTMLTableSectionElement | null>(null);

  useImperativeHandle(ref, () => tableFooterRef?.current);

  return (
    <StyledTableFooter ref={tableFooterRef} role="rowgroup" {...props}>
      {children}
    </StyledTableFooter>
  );
});

TableFooter.displayName = 'NextUI - TableFooter';

TableFooter.toString = () => '.nextui-table-footer';

export default TableFooter;
