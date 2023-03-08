import {MouseEvent} from "react";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

import PaginationItem from "./pagination-item";
import {StyledPaginationIcon} from "./pagination.styles";

export interface PaginationIconProps extends HTMLNextUIProps<"svg"> {
  isPrev?: boolean;
  disabled?: boolean;
  onlyDots?: boolean;
  animated?: boolean;
  bordered?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const PaginationIcon = forwardRef<PaginationIconProps, "svg">((props, ref) => {
  const {className, isPrev, disabled, onlyDots, animated, bordered, onClick, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <PaginationItem
      preserveContent
      animated={animated}
      bordered={bordered}
      disabled={disabled}
      onlyDots={onlyDots}
      value={isPrev ? "<" : ">"}
      onClick={(e) => onClick?.(e)}
    >
      <StyledPaginationIcon
        ref={domRef}
        className={clsx("nextui-pagination-icon", className)}
        fill="none"
        focusable="false"
        isPrev={isPrev}
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <path
          d="M15.5 19l-7-7 7-7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </StyledPaginationIcon>
    </PaginationItem>
  );
});

PaginationIcon.displayName = "NextUI.PaginationIcon";

export default PaginationIcon;
