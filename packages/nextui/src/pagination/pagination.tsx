import React, { useMemo, useCallback } from 'react';
import PaginationPrevious from './pagination-previous';
import PaginationNext from './pagination-next';
import { NormalSizes } from '../utils/prop-types';
import { getPaginationSizes } from './styles';
import usePagination, { DOTS, PaginationItemParam } from '../use-pagination';
import PaginationItem from './pagination-item';
import PaginationEllipsis from './pagination-ellipsis';
import { __DEV__ } from '../utils/assertion';

interface Props {
  size?: NormalSizes;
  page?: number;
  initialPage?: number;
  total?: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (val: number) => void;
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  initialPage: 1,
  siblings: 1,
  boundaries: 1,
  total: 1
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type PaginationProps = Props & typeof defaultProps & NativeAttrs;

const Pagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  page,
  initialPage,
  total,
  size,
  siblings,
  boundaries,
  onChange
}) => {
  const { range, active, setPage, previous, next } = usePagination({
    page,
    initialPage,
    siblings,
    boundaries,
    total,
    onChange
  });

  const { font, width } = useMemo(() => getPaginationSizes(size), [size]);

  const renderItem = useCallback(
    (value: PaginationItemParam, index: number) => {
      if (value === DOTS) {
        const isBefore = index < range.indexOf(active);
        return (
          <PaginationEllipsis
            isBefore={isBefore}
            onClick={() =>
              isBefore
                ? setPage(active - 5 >= 1 ? active - 5 : 1)
                : setPage(active + 5 <= total ? active + 5 : total)
            }
          />
        );
      }
      return (
        <PaginationItem
          key={`pagination-item-${value}-${index}`}
          active={value === active}
          onClick={() => setPage(value)}
        >
          {value}
        </PaginationItem>
      );
    },
    [total, active]
  );

  return (
    <nav>
      <button onClick={previous} disabled={active === 1}>
        Prev
      </button>
      {range.map(renderItem)}
      <button onClick={next} disabled={active === total}>
        Next
      </button>
      <style jsx>{`
        nav {
          margin: 0;
          padding: 0;
          font-variant: tabular-nums;
          font-feature-settings: 'tnum';
          font-size: ${font};
          --pagination-size: ${width};
        }
        nav :global(button:last-of-type) {
          margin-right: 0;
        }
      `}</style>
    </nav>
  );
};

type MemoPaginationComponent<P = {}> = React.NamedExoticComponent<P> & {
  Previous: typeof PaginationPrevious;
  Next: typeof PaginationNext;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Pagination.defaultProps = defaultProps;

if (__DEV__) {
  Pagination.displayName = 'NextUI - Pagination';
}

export default React.memo(
  Pagination
) as MemoPaginationComponent<ComponentProps>;
