import {forwardRef} from "@nextui-org/system";
import {ForwardedRef, ReactElement} from "react";
import {mergeClasses} from "@nextui-org/theme";

import {UseMenuProps, useMenu} from "./use-menu";
import MenuSection from "./menu-section";
import MenuItem from "./menu-item";

interface Props<T> extends UseMenuProps<T> {}

export type MenuProps<T extends object = object> = Props<T>;

const Menu = forwardRef(function Menu<T extends object>(
  props: MenuProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) {
  const {
    Component,
    state,
    closeOnSelect,
    color,
    disableAnimation,
    hideSelectedIcon,
    hideEmptyContent,
    variant,
    onClose,
    topContent,
    bottomContent,
    itemClasses,
    getBaseProps,
    getListProps,
    getEmptyContentProps,
  } = useMenu<T>({...props, ref});

  const content = (
    <Component {...getListProps()}>
      {!state.collection.size && !hideEmptyContent && (
        <li>
          <div {...getEmptyContentProps()} />
        </li>
      )}
      {[...state.collection].map((item) => {
        const itemProps = {
          closeOnSelect,
          color,
          disableAnimation,
          item,
          state,
          variant,
          onClose,
          hideSelectedIcon,
          ...item.props,
        };

        const mergedItemClasses = mergeClasses(itemClasses, itemProps?.classNames);

        if (item.type === "section") {
          return <MenuSection key={item.key} {...itemProps} itemClasses={mergedItemClasses} />;
        }
        let menuItem = <MenuItem key={item.key} {...itemProps} classNames={mergedItemClasses} />;

        if (item.wrapper) {
          menuItem = item.wrapper(menuItem);
        }

        return menuItem;
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
}) as <T extends object>(props: MenuProps<T>) => ReactElement;

export default Menu;
