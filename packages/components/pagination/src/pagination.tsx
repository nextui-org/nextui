import {forwardRef} from "@nextui-org/system";
import {PaginationItemParam} from "@nextui-org/use-pagination";
import {useCallback} from "react";
import {DOTS} from "@nextui-org/use-pagination";

import {UsePaginationProps, usePagination} from "./use-pagination";
import PaginationItem from "./pagination-item";

export interface PaginationProps extends UsePaginationProps {}

const Pagination = forwardRef<PaginationProps, "ul">((props, ref) => {
  const {
    Component,
    // showControls,
    dotsJump,
    loop,
    slots,
    styles,
    total,
    range,
    active,
    setPage,
    // onPrevious,
    // onNext,
    renderItem: renderItemProp,
    getBaseProps,
  } = usePagination({ref, ...props});

  const renderItem = useCallback(
    (value: PaginationItemParam, index: number) => {
      const isBefore = index < range.indexOf(active);

      if (renderItemProp && typeof renderItemProp === "function") {
        return renderItemProp({
          value,
          index,
          dotsJump,
          isDots: value === DOTS,
          isBefore,
          isActive: value === active,
          isPrevious: value === active - 1,
          isNext: value === active + 1,
          isFirst: value === 1,
          isLast: value === total,
          className: slots.item({class: styles?.item}),
        });
      }

      if (value === DOTS) {
        return <li>...</li>;
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
        <PaginationItem
          key={`${value}-${index}`}
          className={slots.item({class: styles?.item})}
          isActive={value === active}
          value={value}
          onPress={() => value !== active && setPage(value)}
        >
          {value}
        </PaginationItem>
      );
    },
    [active, dotsJump, loop, range, renderItemProp, setPage, slots.item, styles?.item, total],
  );

  return (
    <Component {...getBaseProps()}>
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
