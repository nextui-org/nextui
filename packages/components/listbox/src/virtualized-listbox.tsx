import {useRef} from "react";
import {mergeProps} from "@react-aria/utils";
import {useVirtualizer} from "@tanstack/react-virtual";
import {isEmpty} from "@nextui-org/shared-utils";

import ListboxItem from "./listbox-item";
import ListboxSection from "./listbox-section";
import {VirtualizationProps} from "./listbox";
import {UseListboxReturn} from "./use-listbox";

interface Props extends UseListboxReturn {
  isVirtualized?: boolean;
  virtualization?: VirtualizationProps;
}

const VirtualizedListbox = (props: Props) => {
  const {
    Component,
    state,
    color,
    variant,
    itemClasses,
    getBaseProps,
    topContent,
    bottomContent,
    hideEmptyContent,
    hideSelectedIcon,
    shouldHighlightOnFocus,
    disableAnimation,
    getEmptyContentProps,
    getListProps,
  } = props;

  const {virtualization} = props;

  if (
    !virtualization ||
    (!isEmpty(virtualization) && !virtualization.maxListboxHeight && !virtualization.itemHeight)
  ) {
    throw new Error(
      "You are using a virtualized listbox. VirtualizedListbox requires 'virtualization' props with 'maxListboxHeight' and 'itemHeight' properties. This error might have originated from autocomplete components that use VirtualizedListbox. Please provide these props to use the virtualized listbox.",
    );
  }
  const {maxListboxHeight, itemHeight} = virtualization;

  const listHeight = Math.min(maxListboxHeight, itemHeight * state.collection.size);

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: state.collection.size,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const renderRow = ({
    index,
    style: virtualizerStyle,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = [...state.collection][index];

    const itemProps = {
      color,
      item,
      state,
      variant,
      disableAnimation,
      hideSelectedIcon,
      ...item.props,
    };

    if (item.type === "section") {
      return (
        <ListboxSection
          key={item.key}
          {...itemProps}
          itemClasses={itemClasses}
          style={{...virtualizerStyle, ...itemProps.style}}
        />
      );
    }

    let listboxItem = (
      <ListboxItem
        key={item.key}
        {...itemProps}
        classNames={mergeProps(itemClasses, item.props?.classNames)}
        shouldHighlightOnFocus={shouldHighlightOnFocus}
        style={{...virtualizerStyle, ...itemProps.style}}
      />
    );

    if (item.wrapper) {
      listboxItem = item.wrapper(listboxItem);
    }

    return listboxItem;
  };

  const content = (
    <Component {...getListProps()}>
      {!state.collection.size && !hideEmptyContent && (
        <li>
          <div {...getEmptyContentProps()} />
        </li>
      )}
      <div
        ref={parentRef}
        style={{
          height: maxListboxHeight,
          overflow: "auto",
        }}
      >
        {listHeight > 0 && itemHeight > 0 && (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualItems.map((virtualItem) =>
              renderRow({
                index: virtualItem.index,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                },
              }),
            )}
          </div>
        )}
      </div>
    </Component>
  );

  return (
    <div {...getBaseProps()}>
      {topContent}
      {content}
      {bottomContent}
    </div>
  );
};

export default VirtualizedListbox;
