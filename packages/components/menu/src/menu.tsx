import {forwardRef} from "@nextui-org/system";

import {UseMenuProps, useMenu} from "./use-menu";
import MenuSection from "./menu-section";
import MenuItem from "./menu-item";

export interface MenuProps extends UseMenuProps {}

const Menu = forwardRef<"ul", MenuProps>((props, ref) => {
  const {
    Component,
    state,
    getMenuProps,
    closeOnSelect,
    color,
    disableAnimation,
    variant,
    onClose,
    onAction,
    itemClasses,
  } = useMenu({...props, ref});

  return (
    <Component {...getMenuProps()}>
      {[...state.collection].map((item) => {
        const itemProps = {
          closeOnSelect,
          color,
          disableAnimation,
          item,
          state,
          variant,
          onClose,
          onAction,
          ...item.props,
        };

        if (item.type === "section") {
          return <MenuSection key={item.key} {...itemProps} itemClasses={itemClasses} />;
        }
        let menuItem = <MenuItem key={item.key} {...itemProps} classNames={itemClasses} />;

        if (item.wrapper) {
          menuItem = item.wrapper(menuItem);
        }

        return menuItem;
      })}
    </Component>
  );
});

Menu.displayName = "NextUI.Menu";

export default Menu;
