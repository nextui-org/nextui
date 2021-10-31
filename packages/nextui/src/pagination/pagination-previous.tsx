import React from 'react';
import PaginationItem from './pagination-item';
import { usePaginationContext } from './pagination-context';

export type PaginationNextProps = React.ButtonHTMLAttributes<unknown>;

const PaginationPrevious: React.FC<
  React.PropsWithChildren<PaginationNextProps>
> = ({ children, ...props }) => {
  const { update, isFirst } = usePaginationContext();
  return (
    <PaginationItem
      onClick={() => update && update('prev')}
      disabled={isFirst}
      {...props}
    >
      {children}
    </PaginationItem>
  );
};

export default PaginationPrevious;
