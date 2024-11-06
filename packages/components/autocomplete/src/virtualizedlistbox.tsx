import {ForwardedRef, ReactElement, Ref} from "react";
import {forwardRef} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {
  FixedSizeList as ReactWindowVirtualizedList,
  ListChildComponentProps as ReactWindowListChildComponentProps,
} from "react-window";
import {UseListboxProps, useListbox} from "@nextui-org/listbox/src/use-listbox";
import ListboxItem from "@nextui-org/listbox/src/listbox-item";
import ListboxSection from "@nextui-org/listbox/src/listbox-section";
interface Props<T> extends UseListboxProps<T> {}

function VirtualizedListbox<T extends object>(
  props: Props<T> & VirtualizationProps,
  ref: ForwardedRef<HTMLUListElement>,
) {
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
  } = useListbox<T>({...props, ref});

  const {virtualization} = props;

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

VirtualizedListbox.displayName = "NextUI.Listbox";

export type ListboxProps<T extends object = object> = Props<T> & {ref?: Ref<HTMLElement>};

export type VirtualizationProps = {
  virtualization: {
    maxListboxHeight: number;
    itemHeight: number;
  };
};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(VirtualizedListbox) as <T extends object>(
  props: ListboxProps<T> & VirtualizationProps,
) => ReactElement;
