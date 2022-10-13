import type {PaginationItemParam} from "@nextui-org/use-pagination";

import {useCallback} from "react";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {DOTS} from "@nextui-org/use-pagination";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import PaginationItem from "./pagination-item";
import PaginationEllipsis from "./pagination-ellipsis";
import PaginationHighlight from "./pagination-highlight";
import PaginationIcon from "./pagination-icon";
import {StyledPagination} from "./pagination.styles";
import {UsePaginationProps, usePagination} from "./use-pagination";

export interface PaginationProps extends UsePaginationProps {}

const Pagination = forwardRef<PaginationProps, "nav">((props, ref) => {
  const {
    className,
    controls,
    animated,
    rounded,
    bordered,
    shadow,
    onlyDots,
    dotsJump,
    noMargin,
    loop,
    total,
    range,
    active,
    setPage,
    onPrevious,
    onNext,
    ...otherProps
  } = usePagination(props);

  const domRef = useDOMRef(ref);

  const renderItem = useCallback(
    (value: PaginationItemParam, index: number) => {
      if (value === DOTS) {
        const isBefore = index < range.indexOf(active);

        return (
          <PaginationEllipsis
            key={`nextui-pagination-item-${value}-${index}`}
            animated={animated}
            bordered={bordered}
            isBefore={isBefore}
            onlyDots={onlyDots}
            value={value}
            onClick={() =>
              isBefore
                ? setPage(active - dotsJump >= 1 ? active - dotsJump : 1)
                : setPage(active + dotsJump <= total ? active + dotsJump : total)
            }
          />
        );
      }

      return (
        <PaginationItem
          key={`nextui-pagination-item-${value}-${index}`}
          active={value === active}
          animated={animated}
          bordered={bordered}
          onlyDots={onlyDots}
          value={value}
          onClick={() => value !== active && setPage(value)}
        >
          {value}
        </PaginationItem>
      );
    },
    [total, onlyDots, active, bordered, animated],
  );

  return (
    <StyledPagination
      ref={domRef}
      bordered={bordered}
      className={clsx("nextui-pagination", className)}
      noMargin={noMargin}
      onlyDots={onlyDots}
      rounded={rounded}
      {...otherProps}
    >
      {controls && (
        <PaginationIcon
          isPrev
          animated={animated}
          bordered={bordered}
          disabled={!loop && active === 1}
          onlyDots={onlyDots}
          onClick={onPrevious}
        />
      )}
      <PaginationHighlight
        active={controls ? range.indexOf(active) + 1 : range.indexOf(active)}
        animated={animated}
        noMargin={noMargin}
        rounded={rounded}
        shadow={shadow}
      />
      {range.map(renderItem)}
      {controls && (
        <PaginationIcon
          animated={animated}
          bordered={bordered}
          disabled={!loop && active === total}
          onlyDots={onlyDots}
          onClick={onNext}
        />
      )}
    </StyledPagination>
  );
});

if (__DEV__) {
  Pagination.displayName = "NextUI.Pagination";
}

Pagination.toString = () => ".nextui-pagination";

export default Pagination;
