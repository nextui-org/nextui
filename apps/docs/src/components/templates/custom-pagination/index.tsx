import React from 'react';
import {
  Pagination,
  StyledPaginationHighlight,
  StyledPaginationItemContent,
  styled
} from '@nextui-org/react';

const StyledPagination = styled(Pagination, {
  $$paginationItemSize: '60px',
  $$paginationSize: '60px',
  height: '$$paginationItemSize',
  borderRadius: '2px',
  '& .nextui-pagination-item': {
    bg: 'linear-gradient(180deg, #6FEE8D 25%, #17c964 100%)',
    width: '$$paginationItemSize',
    height: '$$paginationItemSize'
  },
  [`& ${StyledPaginationHighlight}`]: {
    display: 'none'
  },
  '.nextui-pagination-item-content': {
    color: '$green900',
    fontWeight: '$medium'
  },
  '.nextui-pagination-item-active span': {
    color: '$green100'
  }
});

const CustomPagination = () => {
  return <StyledPagination noMargin total={20} size="xl" initialPage={10} />;
};

export default CustomPagination;
