import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import PaginationItem from './pagination-item';
import PaginationEllipsis from './pagination-ellipsis';

interface Props {
  limit: number;
  count: number;
  current: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PaginationPages: React.FC<Props> = ({
  limit,
  count,
  current,
  setPage
}) => {
  const showPages = useMemo(() => {
    const oddLimit = limit % 2 === 0 ? limit - 1 : limit;
    return oddLimit - 2;
  }, [limit]);

  const middleNumber = (showPages + 1) / 2;

  const [showBeforeEllipsis, showAfterEllipsis] = useMemo(() => {
    const showEllipsis = count > limit;
    return [
      showEllipsis && current > middleNumber + 1,
      showEllipsis && current < count - middleNumber
    ];
  }, [current, showPages, middleNumber, count, limit]);

  const pagesArray = useMemo(() => [...new Array(showPages)], [showPages]);

  const renderItem = useCallback(
    (value: number, active: number) => (
      <PaginationItem
        key={`pagination-item-${value}`}
        active={value === active}
        onClick={() => setPage(value)}
      >
        {value}
      </PaginationItem>
    ),
    []
  );
  const startPages = pagesArray.map((_, index) => {
    const value = index + 2;
    return renderItem(value, current);
  });
  const middlePages = pagesArray.map((_, index) => {
    const middleIndexNumber = middleNumber - (index + 1);
    const value = current - middleIndexNumber;
    return (
      <PaginationItem
        key={`pagination-middle-${index}`}
        active={index + 1 === middleNumber}
        onClick={() => setPage(value)}
      >
        {value}
      </PaginationItem>
    );
  });
  const endPages = pagesArray.map((_, index) => {
    const value = count - (showPages - index);
    return renderItem(value, current);
  });
  if (count <= limit) {
    /* eslint-disable react/jsx-no-useless-fragment */
    return (
      <>
        {[...new Array(count)].map((_, index) => {
          const value = index + 1;
          return (
            <PaginationItem
              key={`pagination-item-${value}`}
              active={value === current}
              onClick={() => setPage(value)}
            >
              {value}
            </PaginationItem>
          );
        })}
      </>
    );
    /* eslint-enable */
  }
  return (
    <>
      {renderItem(1, current)}
      {showBeforeEllipsis && (
        <PaginationEllipsis
          key="pagination-ellipsis-before"
          isBefore
          onClick={() => setPage((last) => (last - 5 >= 1 ? last - 5 : 1))}
        />
      )}
      {showBeforeEllipsis && showAfterEllipsis
        ? middlePages
        : showBeforeEllipsis
        ? endPages
        : startPages}
      {showAfterEllipsis && (
        <PaginationEllipsis
          key="pagination-ellipsis-after"
          onClick={() =>
            setPage((last) => (last + 5 <= count ? last + 5 : count))
          }
        />
      )}
      {renderItem(count, current)}
    </>
  );
};

export default PaginationPages;
