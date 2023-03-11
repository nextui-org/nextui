import {forwardRef} from "@nextui-org/system";
import {PaginationItemValue} from "@nextui-org/use-pagination";
import {useCallback} from "react";
import {PaginationItemType} from "@nextui-org/use-pagination";
import {ChevronIcon, EllipsisIcon, ForwardIcon} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";

import {UsePaginationProps, usePagination} from "./use-pagination";
import PaginationItem from "./pagination-item";
import PaginationCursor from "./pagination-cursor";

export interface PaginationProps extends Omit<UsePaginationProps, "ref"> {}

const Pagination = forwardRef<PaginationProps, "ul">((props, ref) => {
  const {
    Component,
    dotsJump,
    slots,
    styles,
    total,
    range,
    loop,
    activePage,
    disableCursor,
    disableAnimation,
    renderItem: renderItemProp,
    onNext,
    onPrevious,
    setPage,
    getBaseProps,
    getItemProps,
    getCursorProps,
  } = usePagination({ref, ...props});

  const renderItem = useCallback(
    (value: PaginationItemValue, index: number) => {
      const isBefore = index < range.indexOf(activePage);

      if (renderItemProp && typeof renderItemProp === "function") {
        return renderItemProp({
          value,
          index,
          isActive: value === activePage,
          isPrevious: value === activePage - 1,
          isNext: value === activePage + 1,
          isFirst: value === 1,
          isLast: value === total,
          className: slots.item({class: styles?.item}),
        });
      }
      if (value === PaginationItemType.PREV) {
        return (
          <PaginationItem
            className={slots.prev({
              class: clsx(
                styles?.prev,
                !loop && activePage === 1 && "opacity-50 pointer-events-none",
              ),
            })}
            onPress={onPrevious}
          >
            <ChevronIcon />
          </PaginationItem>
        );
      }
      if (value === PaginationItemType.NEXT) {
        return (
          <PaginationItem
            className={slots.next({
              class: clsx(
                styles?.next,
                !loop && activePage === total && "opacity-50 pointer-events-none",
              ),
            })}
            onPress={onNext}
          >
            <ChevronIcon className="rotate-180" />
          </PaginationItem>
        );
      }

      if (value === PaginationItemType.DOTS) {
        return (
          <PaginationItem
            className={slots.item({
              class: clsx(styles?.item, "group"),
            })}
            onPress={() =>
              isBefore
                ? setPage(activePage - dotsJump >= 1 ? activePage - dotsJump : 1)
                : setPage(activePage + dotsJump <= total ? activePage + dotsJump : total)
            }
          >
            <EllipsisIcon className="group-hover:hidden" />
            {isBefore ? (
              <ForwardIcon className="hidden group-hover:block rotate-180" />
            ) : (
              <ForwardIcon className="hidden group-hover:block" />
            )}
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={`${value}-${index}`} {...getItemProps({value})}>
          {value}
        </PaginationItem>
      );
    },
    [activePage, dotsJump, getItemProps, loop, range, renderItemProp, slots, styles, total],
  );

  return (
    <Component {...getBaseProps()}>
      {!disableCursor && !disableAnimation && <PaginationCursor {...getCursorProps()} />}
      {range.map(renderItem)}
    </Component>
  );
});

Pagination.displayName = "NextUI.Pagination";

export default Pagination;
