import React, {useState} from "react";

import PaginationItem from "./pagination-item";
import {StyledPaginationEllipsis} from "./pagination.styles";

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
  onClick,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <PaginationItem
      animated={animated}
      bordered={bordered}
      onlyDots={onlyDots}
      value={value}
      onClick={(e) => onClick && onClick(e)}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      {showMore ? (
        <StyledPaginationEllipsis
          className="nextui-pagination-ellipsis"
          fill="none"
          focusable="false"
          isBefore={isBefore}
          isEllipsis={true}
          role="presentation"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M13 17l5-5-5-5" />
          <path d="M6 17l5-5-5-5" />
        </StyledPaginationEllipsis>
      ) : (
        <StyledPaginationEllipsis
          fill="none"
          isBefore={isBefore}
          isEllipsis={false}
          shapeRendering="geometricPrecision"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" fill="currentColor" r="1" />
          <circle cx="19" cy="12" fill="currentColor" r="1" />
          <circle cx="5" cy="12" fill="currentColor" r="1" />
        </StyledPaginationEllipsis>
      )}
    </PaginationItem>
  );
};

export default PaginationEllipsis;
