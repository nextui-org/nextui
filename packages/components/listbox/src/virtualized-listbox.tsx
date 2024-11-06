import {ReactElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {
  FixedSizeList as ReactWindowVirtualizedList,
  ListChildComponentProps as ReactWindowListChildComponentProps,
} from "react-window";

import ListboxItem from "./listbox-item";
import ListboxSection from "./listbox-section";
import {VirtualizationProps} from "./listbox";
import {UseListboxReturn} from "./use-listbox";

interface Props extends UseListboxReturn {
  isVirtualized?: boolean;
  virtualization?: VirtualizationProps;
}

function VirtualizedListbox(props: Props) {
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

  if (!virtualization) {
    throw new Error(
      "You are using a virtualized listbox. VirtualizedListbox requires 'virtualization' props with 'maxListboxHeight' and 'itemHeight' properties. This error might have originated from autocomplete components that use VirtualizedListbox. Please provide these props to use the virtualized listbox.",
    );
  }
  const {maxListboxHeight, itemHeight} = virtualization;

  const listHeight = Math.min(maxListboxHeight, itemHeight * state.collection.size);

  const renderRow = ({
    index,
    style: reactWindowVirtualizedStyle,
  }: ReactWindowListChildComponentProps) => {
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
          style={{...reactWindowVirtualizedStyle, ...itemProps.style}}
        />
      );
    }

    let listboxItem = (
      <ListboxItem
        key={item.key}
        {...itemProps}
        classNames={mergeProps(itemClasses, item.props?.classNames)}
        shouldHighlightOnFocus={shouldHighlightOnFocus}
        style={{...reactWindowVirtualizedStyle, ...itemProps.style}}
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
      {listHeight > 0 && itemHeight > 0 && (
        <ReactWindowVirtualizedList
          height={listHeight}
          itemCount={state.collection.size}
          itemSize={itemHeight}
          width="100%"
        >
          {renderRow}
        </ReactWindowVirtualizedList>
      )}
    </Component>
  );

  return (
    <div {...getBaseProps()}>
      {topContent}
      {content}
      {bottomContent}
    </div>
  );
}

VirtualizedListbox.displayName = "NextUI.VirtualizedListbox";

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(VirtualizedListbox) as (props: Props) => ReactElement;
