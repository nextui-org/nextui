import React, {useMemo} from "react";

import {DOTS} from "../use-pagination";
import clsx from "../utils/clsx";
import withDefaults from "../utils/with-defaults";
import {CSS} from "../theme/stitches.config";

import {
  StyledPaginationItem,
  StyledPaginationItemContent,
  PaginationItemVariantsProps,
} from "./pagination.styles";

interface Props {
  active?: boolean;
  value?: string | number;
  onlyDots?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  animated?: boolean;
  preserveContent?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

const defaultProps = {
  preserveContent: false,
};

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

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;

export type PaginationItemProps = Props & NativeAttrs & PaginationItemVariantsProps & {css?: CSS};

const preClass = "nextui-pagination-item";

const PaginationItem: React.FC<PaginationItemProps> = ({
  active,
  value,
  children,
  disabled,
  animated,
  bordered,
  onClick,
  onlyDots,
  preserveContent,
  ...props
}) => {
  const ariaLabel = useMemo(
    () => (active ? `${getItemAriaLabel(value)} active` : getItemAriaLabel(value)),
    [value, active],
  );

  const clickHandler = (event: React.MouseEvent) => {
    if (disabled) return;
    onClick && onClick(event);
  };

  return (
    <StyledPaginationItem
      active={active}
      animated={animated}
      aria-label={ariaLabel}
      bordered={bordered}
      className={clsx(preClass, {
        [`${preClass}-active`]: active,
        [`${preClass}-animated`]: animated,
        [`${preClass}-disabled`]: disabled,
        [`${preClass}-bordered`]: bordered,
        [`${preClass}-only-dots`]: onlyDots,
        [`${preClass}-preserve-content`]: preserveContent,
      })}
      disabled={disabled}
      onlyDots={onlyDots}
      preserveContent={preserveContent}
      tabIndex={disabled ? -1 : 0}
      onClick={clickHandler}
      {...props}
    >
      <StyledPaginationItemContent className={`${preClass}-content`}>
        {children}
      </StyledPaginationItemContent>
    </StyledPaginationItem>
  );
};

PaginationItem.toString = () => ".nextui-pagination-item";

export default withDefaults(PaginationItem, defaultProps);
