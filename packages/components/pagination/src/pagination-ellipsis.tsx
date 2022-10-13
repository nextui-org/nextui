import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useState, MouseEvent} from "react";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import PaginationItem from "./pagination-item";
import {StyledPaginationEllipsis} from "./pagination.styles";

export interface PaginationEllipsisProps extends HTMLNextUIProps<"svg"> {
  value?: string | number;
  isBefore?: boolean;
  onlyDots?: boolean;
  animated?: boolean;
  bordered?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const PaginationEllipsis = forwardRef<PaginationEllipsisProps, "svg">((props, ref) => {
  const [showMore, setShowMore] = useState(false);

  const {className, value, animated, bordered, onlyDots, isBefore, onClick, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <PaginationItem
      animated={animated}
      bordered={bordered}
      onlyDots={onlyDots}
      value={value}
      onClick={(e) => onClick?.(e)}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      {showMore ? (
        <StyledPaginationEllipsis
          ref={domRef}
          className={clsx("nextui-pagination-ellipsis", className)}
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
          {...otherProps}
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
});

if (__DEV__) {
  PaginationEllipsis.displayName = "NextUI.PaginationEllipsis";
}

PaginationEllipsis.toString = () => ".nextui-pagination-ellipsis";

export default PaginationEllipsis;
