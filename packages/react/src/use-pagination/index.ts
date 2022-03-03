import { useMemo, useCallback, useState, useEffect } from 'react';
import { range } from '../utils/numbers';

export const DOTS = 'dots';

export interface PaginationParams {
  total: number;
  initialPage?: number;
  page?: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}

export type PaginationItemParam = number | typeof DOTS;

const usePagination = ({
  page,
  total,
  siblings = 1,
  boundaries = 1,
  initialPage = 1,
  onChange
}: PaginationParams) => {
  const [activePage, setActivePage] = useState(page || initialPage);

  const onChangeActivePage = (newPage: number) => {
    setActivePage(newPage);
    onChange && onChange(newPage);
  };

  useEffect(() => {
    if (page && page !== activePage) {
      setActivePage(page);
    }
  }, [page]);

  const setPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber <= 0) {
        onChangeActivePage(1);
      } else if (pageNumber > total) {
        onChangeActivePage(total);
      } else {
        onChangeActivePage(pageNumber);
      }
    },
    [total]
  );

  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(total);

  const paginationRange = useMemo((): PaginationItemParam[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= total) {
      return range(1, total);
    }
    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(
      activePage + siblings,
      total - boundaries
    );

    /*
     * We do not want to show dots if there is only one position left
     * after/before the left/right page count as that would lead to a change if our Pagination
     * component size which we do not want
     */
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(total - (boundaries - 1), total)
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(total - rightItemCount, total)
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(total - boundaries + 1, total)
    ];
  }, [total, siblings, activePage]);

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last
  };
};

export default usePagination;
