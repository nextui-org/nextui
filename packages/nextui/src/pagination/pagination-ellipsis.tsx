import React, { useState } from 'react';
import PaginationItem from './pagination-item';

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
        <svg
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
        >
          <path d="M13 17l5-5-5-5" />
          <path d="M6 17l5-5-5-5" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
          <circle cx="5" cy="12" r="1" fill="currentColor" />
        </svg>
      )}
      <style jsx>{`
        svg {
          color: currentColor;
          stroke: currentColor;
        }
        .nextui-pagination-ellipsis {
          transform: rotate(${isBefore ? '180deg' : '0deg'});
        }
      `}</style>
    </PaginationItem>
  );
};

export default PaginationEllipsis;
