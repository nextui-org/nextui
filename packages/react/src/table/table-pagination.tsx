import React from 'react';
import { CSS } from '../theme/stitches.config';
import { Pagination } from '../index';

interface Props {
  animated?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TableFooterProps = Props & NativeAttrs & { css?: CSS };

const TablePagination: React.FC<TableFooterProps> = ({ animated }) => {
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
