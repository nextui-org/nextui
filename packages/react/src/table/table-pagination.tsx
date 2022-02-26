import React, { useMemo } from 'react';
import { CSS } from '../theme/stitches.config';
import { Pagination, PaginationProps } from '../index';
import { NormalAlignment } from '../utils/prop-types';
import { useTableContext } from './table-context';
import clsx from '../utils/clsx';

interface Props {
  animated?: boolean;
  rowsPerPage?: number;
  align?: NormalAlignment;
  onPageChange?: PaginationProps['onChange'];
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TablePaginationProps = Props &
  NativeAttrs &
  Omit<Partial<PaginationProps>, 'onChage'> & { css?: CSS };

const TablePagination: React.FC<TablePaginationProps> = ({
  align,
  rowsPerPage: rowsPerPageProp,
  onPageChange,
  ...props
}) => {
  const {
    color,
    animated,
    collection,
    footerAlign,
    rowsPerPage,
    setFooterAlign,
    setRowsPerPage,
    setCurrentPage
  } = useTableContext();

  React.useEffect(() => {
    if (align && align !== footerAlign) {
      setFooterAlign?.(align);
    }
  }, [align, footerAlign]);

  React.useEffect(() => {
    if (rowsPerPageProp && rowsPerPageProp !== rowsPerPage) {
      setRowsPerPage?.(rowsPerPageProp);
    }
  }, [rowsPerPage, rowsPerPageProp]);

  const handlePageChanged = (page: number) => {
    setCurrentPage?.(page);
    onPageChange?.(page);
  };

  const totalPagination = useMemo(() => {
    const rowsCount = collection?.body
      ? [...collection?.body?.childNodes].length
      : 0;
    return rowsPerPage > 0 ? Math.ceil(rowsCount / rowsPerPage) : 1;
  }, [collection, rowsPerPage]);

  return (
    <Pagination
      total={totalPagination}
      animated={animated}
      onChange={handlePageChanged}
      color={props.color || (color as PaginationProps['color'])}
      className={clsx('nextui-table-pagination', props.className)}
      {...props}
    />
  );
};

TablePagination.displayName = 'NextUI - TablePagination';

TablePagination.toString = () => '.nextui-table-pagination';

export default TablePagination;
