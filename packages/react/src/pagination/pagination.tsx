import React, {useCallback} from "react";

import usePagination, {DOTS, PaginationItemParam} from "../use-pagination";
import {CSS} from "../theme/stitches.config";
import {__DEV__} from "../utils/assertion";
import clsx from "../utils/clsx";

import PaginationItem from "./pagination-item";
import PaginationEllipsis from "./pagination-ellipsis";
import PaginationIcon from "./pagination-icon";
import PaginationHighlight from "./pagination-highlight";
import {StyledPagination, PaginationVariantsProps} from "./pagination.styles";

interface Props {
  page?: number;
  shadow?: boolean;
  initialPage?: number;
  loop?: boolean;
  animated?: boolean;
  controls?: boolean;
  rounded?: boolean;
  dotsJump?: number;
  total?: number;
  bordered?: boolean;
  noMargin?: boolean;
  onlyDots?: boolean;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PaginationProps = Props & NativeAttrs & PaginationVariantsProps & {css?: CSS};

const preClass = "nextui-pagination";

const Pagination: React.FC<PaginationProps> = ({
  page,
  initialPage = 1,
  onlyDots = false,
  total = 1,
  loop = false,
  siblings = 1,
  boundaries = 1,
  shadow = false,
  animated = true,
  bordered = false,
  dotsJump = 5,
  controls = true,
  noMargin = false,
  onChange,
  rounded = false,
  ...props
}) => {
  const {range, active, setPage, previous, next, first, last} = usePagination({
    page,
    initialPage,
    siblings: onlyDots ? 10 : siblings,
    boundaries: onlyDots ? 10 : boundaries,
    total,
    onChange,
  });

  const renderItem = useCallback(
    (value: PaginationItemParam, index: number) => {
      if (value === DOTS) {
        const isBefore = index < range.indexOf(active);

        return (
          <PaginationEllipsis
            key={`${preClass}-item-${value}-${index}`}
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
          key={`${preClass}-item-${value}-${index}`}
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
    [total, onlyDots, active, bordered, animated, setPage],
  );

  const handleNext = () => {
    if (loop && active === total) {
      return first();
    }

    return next();
  };

  const handlePrevious = () => {
    if (loop && active === 1) {
      return last();
    }

    return previous();
  };

  return (
    <StyledPagination
      bordered={bordered}
      className={clsx(preClass, {
        [`${preClass}--no-margin`]: noMargin,
        [`${preClass}--bordered`]: bordered,
        [`${preClass}--shadow`]: shadow,
        [`${preClass}--rounded`]: rounded,
      })}
      noMargin={noMargin}
      onlyDots={onlyDots}
      rounded={rounded}
      {...props}
    >
      {controls && (
        <PaginationIcon
          isPrev
          animated={animated}
          bordered={bordered}
          disabled={!loop && active === 1}
          onlyDots={onlyDots}
          onClick={handlePrevious}
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
          onClick={handleNext}
        />
      )}
    </StyledPagination>
  );
};

type MemoPaginationComponent<P = {}> = React.NamedExoticComponent<P>;

type ComponentProps = Props & NativeAttrs & PaginationVariantsProps & {css?: CSS};

if (__DEV__) {
  Pagination.displayName = "NextUI.Pagination";
}

Pagination.toString = () => ".nextui-pagination";

export default React.memo(Pagination) as MemoPaginationComponent<ComponentProps>;
