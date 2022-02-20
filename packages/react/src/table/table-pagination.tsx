import React from 'react';
import { CSS } from '../theme/stitches.config';
import { Pagination, PaginationProps } from '../index';
import { NormalAlignment } from '../utils/prop-types';
import { useTableContext } from './table-context';

interface Props {
  animated?: boolean;
  rowsPerPage?: number;
  align?: NormalAlignment;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TablePaginationProps = Props &
  NativeAttrs &
  Partial<PaginationProps> & { css?: CSS };

const TablePagination: React.FC<TablePaginationProps> = ({
  animated,
  align
}) => {
  const { footerAlign, setFooterAlign } = useTableContext();

  React.useEffect(() => {
    if (align && align !== footerAlign) {
      setFooterAlign?.(align);
    }
  }, [align, footerAlign]);

  return (
    <Pagination
      total={5}
      siblings={1}
      animated={animated}
      onChange={(page: number) => console.log({ page })}
    />
  );
};

TablePagination.displayName = 'NextUI - TablePagination';

TablePagination.toString = () => '.nextui-table-pagination';

export default TablePagination;
