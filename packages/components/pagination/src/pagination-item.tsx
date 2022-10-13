import {useMemo, MouseEvent} from "react";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {DOTS} from "@nextui-org/use-pagination";

import {StyledPaginationItem, StyledPaginationItemContent} from "./pagination.styles";

export interface PaginationItemProps extends HTMLNextUIProps<"button"> {
  active?: boolean;
  value?: string | number;
  onlyDots?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  animated?: boolean;
  preserveContent?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const getItemAriaLabel = (page?: string | number) => {
  if (!page) return;
  switch (page) {
    case DOTS:
      return "dots element";
    case "<":
      return "previous page button";
    case ">":
      return "next page button";
    case "first":
      return "first page button";
    case "last":
      return "last page button";
    default:
      return `${page} item`;
  }
};

const PaginationItem = forwardRef<PaginationItemProps, "button">((props, ref) => {
  const {
    children,
    className,
    active,
    value,
    animated,
    bordered,
    disabled,
    onlyDots,
    preserveContent = false,
    onClick,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const ariaLabel = useMemo(
    () => (active ? `${getItemAriaLabel(value)} active` : getItemAriaLabel(value)),
    [value, active],
  );

  const clickHandler = (event: React.MouseEvent) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <StyledPaginationItem
      ref={domRef}
      active={active}
      animated={animated}
      aria-label={ariaLabel}
      bordered={bordered}
      className={clsx("nextui-pagination-item", className)}
      disabled={disabled}
      onlyDots={onlyDots}
      preserveContent={preserveContent}
      tabIndex={disabled ? -1 : 0}
      onClick={clickHandler}
      {...otherProps}
    >
      <StyledPaginationItemContent className="nextui-pagination-item-count">
        {children}
      </StyledPaginationItemContent>
    </StyledPaginationItem>
  );
});

if (__DEV__) {
  PaginationItem.displayName = "NextUI.PaginationItem";
}

PaginationItem.toString = () => ".nextui-pagination-item";

export default PaginationItem;
