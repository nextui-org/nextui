import {forwardRef} from "@nextui-org/system";
import {PaginationItemValue} from "@nextui-org/use-pagination";
import {useCallback} from "react";
import {PaginationItemType} from "@nextui-org/use-pagination";

import {UsePaginationProps, usePagination} from "./use-pagination";
import PaginationItem from "./pagination-item";
import PaginationCursor from "./pagination-cursor";

export interface PaginationProps extends Omit<UsePaginationProps, "ref"> {}

const Pagination = forwardRef<PaginationProps, "ul">((props, ref) => {
  const {
    Component,
    // showControls,
    dotsJump,
    // loop,
    slots,
    styles,
    total,
    range,
    activePage,
    // setPage,
    // onPrevious,
    // onNext,
    disableCursor,
    disableAnimation,
    renderItem: renderItemProp,
    getBaseProps,
    getItemProps,
    getCursorProps,
  } = usePagination({ref, ...props});

  const renderItem = useCallback(
    (value: PaginationItemValue, index: number) => {
      // const isBefore = index < range.indexOf(activePage);

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
        return <PaginationItem className={slots.prev({class: styles?.prev})}>{"<"}</PaginationItem>;
      }
      if (value === PaginationItemType.NEXT) {
        return <PaginationItem className={slots.next({class: styles?.next})}>{">"}</PaginationItem>;
      }

      if (value === PaginationItemType.DOTS) {
        return <PaginationItem className={slots.item({class: styles?.item})}>...</PaginationItem>;
        //   return (
        //     <PaginationEllipsis
        //       key={`nextui-pagination-item-${value}-${index}`}
        //       animated={animated}
        //       bordered={bordered}
        //       isBefore={isBefore}
        //       onlyDots={onlyDots}
        //       value={value}
        //       onClick={() =>
        //         isBefore
        //           ? setPage(active - dotsJump >= 1 ? active - dotsJump : 1)
        //           : setPage(active + dotsJump <= total ? active + dotsJump : total)
        //       }
        //     />
        //   );
      }

      return (
        <PaginationItem key={`${value}-${index}`} {...getItemProps({value})}>
          {value}
        </PaginationItem>
      );
    },
    [activePage, dotsJump, getItemProps, range, renderItemProp, slots, styles, total],
  );

  return (
    <Component {...getBaseProps()}>
      {!disableCursor && !disableAnimation && <PaginationCursor {...getCursorProps()} />}
      {range.map(renderItem)}

      {/* {controls && (
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
      )} */}
    </Component>
  );
});

Pagination.displayName = "NextUI.Pagination";

export default Pagination;
