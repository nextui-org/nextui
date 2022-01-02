import React, { useState } from 'react';
import PaginationItem from './pagination-item';
import { StyledPaginationEllipsis } from './pagination.styles';

interface Props {
  value?: string | number;
  isBefore?: boolean;
  onlyDots?: boolean;
  animated?: boolean;
  bordered?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const PaginationEllipsis: React.FC<Props> = ({
  value,
  isBefore,
  onlyDots,
  animated,
  bordered,
  onClick
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <PaginationItem
      value={value}
      onlyDots={onlyDots}
      animated={animated}
      bordered={bordered}
      onClick={(e) => onClick && onClick(e)}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      {showMore ? (
        <StyledPaginationEllipsis
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
          className="nextui-pagination-ellipsis"
          isEllipsis={true}
          isBefore={isBefore}
        >
          <path d="M13 17l5-5-5-5" />
          <path d="M6 17l5-5-5-5" />
        </StyledPaginationEllipsis>
      ) : (
        <StyledPaginationEllipsis
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
          isEllipsis={false}
          isBefore={isBefore}
        >
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
          <circle cx="5" cy="12" r="1" fill="currentColor" />
        </StyledPaginationEllipsis>
      )}
    </PaginationItem>
  );
};

export default PaginationEllipsis;
