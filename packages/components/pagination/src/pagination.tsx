import {PaginationItemValue} from "@nextui-org/use-pagination";
import {forwardRef} from "@nextui-org/system";
import {PaginationItemType} from "@nextui-org/use-pagination";
import {ChevronIcon, EllipsisIcon, ForwardIcon} from "@nextui-org/shared-icons";
import {clsx, dataAttr} from "@nextui-org/shared-utils";

import {UsePaginationProps, usePagination} from "./use-pagination";
import PaginationItem from "./pagination-item";
import PaginationCursor from "./pagination-cursor";

export interface PaginationProps extends UsePaginationProps {}

const Pagination = forwardRef<"nav", PaginationProps>((props, ref) => {
  const {
    Component,
    dotsJump,
    slots,
    classNames,
    total,
    range,
    loop,
    activePage,
    disableCursorAnimation,
    disableAnimation,
    renderItem: renderItemProp,
    onNext,
    onPrevious,
    setPage,
    getItemAriaLabel,
    getItemRef,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps,
  } = usePagination({...props, ref});

  const renderItem = (value: PaginationItemValue, index: number) => {
    const isBefore = index < range.indexOf(activePage);

    if (renderItemProp && typeof renderItemProp === "function") {
      const isNumber = typeof value === "number";
      let page = isNumber ? value : index;
      let isDisabled = false;

      if (value === PaginationItemType.NEXT) {
        page = activePage + 1;
        isDisabled = !loop && activePage === total;
      }

      if (value === PaginationItemType.PREV) {
        page = activePage - 1;
        isDisabled = !loop && activePage === 1;
      }

      if (value === PaginationItemType.DOTS) {
        page = isBefore
          ? activePage - dotsJump >= 1
            ? activePage - dotsJump
            : 1
          : activePage + dotsJump <= total
          ? activePage + dotsJump
          : total;
      }

      const itemChildren: Record<PaginationItemType, React.ReactNode> = {
        [PaginationItemType.PREV]: <ChevronIcon />,
        [PaginationItemType.NEXT]: (
          <ChevronIcon
            className={slots.chevronNext({
              class: classNames?.chevronNext,
            })}
          />
        ),
        [PaginationItemType.DOTS]: (
          <>
            <EllipsisIcon className={slots?.ellipsis({class: classNames?.ellipsis})} />
            <ForwardIcon
              className={slots?.forwardIcon({class: classNames?.forwardIcon})}
              data-before={dataAttr(isBefore)}
            />
          </>
        ),
      };

      const itemClass: Record<PaginationItemType, string> = {
        [PaginationItemType.PREV]: slots.prev({
          class: classNames?.prev,
        }),
        [PaginationItemType.NEXT]: slots.next({
          class: clsx(classNames?.next),
        }),
        [PaginationItemType.DOTS]: slots.item({
          class: clsx(classNames?.item, "group"),
        }),
      };

      return renderItemProp({
        value,
        index,
        key: `${value}-${index}`,
        page,
        total,
        isDisabled,
        children: isNumber ? value : itemChildren[value],
        activePage,
        dotsJump,
        isBefore,
        isActive: value === activePage,
        isPrevious: value === activePage - 1,
        isNext: value === activePage + 1,
        isFirst: value === 1,
        isLast: value === total,
        onNext,
        onPrevious,
        setPage,
        onPress: () => {
          if (page !== activePage) {
            setPage(page);
          }
        },
        ref: isNumber ? (node) => getItemRef(node, value) : undefined,
        className: isNumber ? slots.item({class: classNames?.item}) : itemClass[value],
        getAriaLabel: getItemAriaLabel,
      });
    }

    if (value === PaginationItemType.PREV) {
      return (
        <PaginationItem
          key={PaginationItemType.PREV}
          className={slots.prev({
            class: classNames?.prev,
          })}
          data-slot="prev"
          getAriaLabel={getItemAriaLabel}
          isDisabled={!loop && activePage === 1}
          value={value}
          onPress={onPrevious}
        >
          <ChevronIcon />
        </PaginationItem>
      );
    }
    if (value === PaginationItemType.NEXT) {
      return (
        <PaginationItem
          key={PaginationItemType.NEXT}
          className={slots.next({
            class: clsx(classNames?.next),
          })}
          data-slot="next"
          getAriaLabel={getItemAriaLabel}
          isDisabled={!loop && activePage === total}
          value={value}
          onPress={onNext}
        >
          <ChevronIcon
            className={slots.chevronNext({
              class: classNames?.chevronNext,
            })}
          />
        </PaginationItem>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <PaginationItem
          key={PaginationItemType.DOTS + isBefore}
          className={slots.item({
            class: clsx(classNames?.item, "group"),
          })}
          data-slot="item"
          getAriaLabel={getItemAriaLabel}
          value={value}
          onPress={() =>
            isBefore
              ? setPage(activePage - dotsJump >= 1 ? activePage - dotsJump : 1)
              : setPage(activePage + dotsJump <= total ? activePage + dotsJump : total)
          }
        >
          <EllipsisIcon className={slots?.ellipsis({class: classNames?.ellipsis})} />
          <ForwardIcon
            className={slots?.forwardIcon({class: classNames?.forwardIcon})}
            data-before={dataAttr(isBefore)}
          />
        </PaginationItem>
      );
    }

    return (
      <PaginationItem {...getItemProps({value})} key={value} getAriaLabel={getItemAriaLabel}>
        {value}
      </PaginationItem>
    );
  };

  return (
    <Component {...getBaseProps()}>
      <ul {...getWrapperProps()}>
        {!disableCursorAnimation && !disableAnimation && <PaginationCursor {...getCursorProps()} />}
        {range.map(renderItem)}
      </ul>
    </Component>
  );
});

Pagination.displayName = "NextUI.Pagination";

export default Pagination;
