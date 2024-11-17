import {ForwardedRef, ReactElement, Ref} from "react";
import {forwardRef} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";

import {UseListboxProps, UseListboxReturn, useListbox} from "./use-listbox";
import ListboxSection from "./listbox-section";
import ListboxItem from "./listbox-item";
import VirtualizedListbox from "./virtualized-listbox";

export interface VirtualizationProps {
  maxListboxHeight: number;
  itemHeight: number;
}

interface Props<T> extends UseListboxProps<T> {
  isVirtualized?: boolean;
  virtualization?: VirtualizationProps;
}

function Listbox<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLUListElement>) {
  const {isVirtualized, ...restProps} = props;

  const useListboxProps = useListbox<T>({...restProps, ref});

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
  } = useListboxProps;

  if (isVirtualized) {
    return (
      <VirtualizedListbox {...(props as Props<T>)} {...(useListboxProps as UseListboxReturn)} />
    );
  }

  const content = (
    <Component {...getListProps()}>
      {!state.collection.size && !hideEmptyContent && (
        <li>
          <div {...getEmptyContentProps()} />
        </li>
      )}
      {[...state.collection].map((item) => {
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
          return <ListboxSection key={item.key} {...itemProps} itemClasses={itemClasses} />;
        }
        let listboxItem = (
          <ListboxItem
            key={item.key}
            {...itemProps}
            classNames={mergeProps(itemClasses, item.props?.classNames)}
            shouldHighlightOnFocus={shouldHighlightOnFocus}
          />
        );

        if (item.wrapper) {
          listboxItem = item.wrapper(listboxItem);
        }

        return listboxItem;
      })}
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

Listbox.displayName = "NextUI.Listbox";

export type ListboxProps<T extends object = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Listbox) as <T extends object>(props: ListboxProps<T>) => ReactElement;
