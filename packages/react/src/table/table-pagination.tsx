import React from 'react';
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
  onPageChange,
  ...props
}) => {
  const { animated, footerAlign, setFooterAlign } = useTableContext();

  React.useEffect(() => {
    if (align && align !== footerAlign) {
      setFooterAlign?.(align);
    }
  }, [align, footerAlign]);

  const handlePageChanged = (page: number) => {
    onPageChange?.(page);
  };

  console.log({ animated });

  return (
    <Pagination
      total={5}
      siblings={1}
      animated={animated}
      onChange={handlePageChanged}
      className={clsx('nextui-table-pagination', props.className)}
    />
  );
};

TablePagination.displayName = 'NextUI - TablePagination';

TablePagination.toString = () => '.nextui-table-pagination';

export default TablePagination;
