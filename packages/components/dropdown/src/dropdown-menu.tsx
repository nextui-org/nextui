import {forwardRef} from "@nextui-org/system";
import {PopoverContent} from "@nextui-org/popover";
import {DOMProps, AriaLabelingProps} from "@react-types/shared";
import {useMenu} from "@react-aria/menu";
import {useDOMRef} from "@nextui-org/dom-utils";
import {AriaMenuProps} from "@react-types/menu";
import {useTreeState} from "@react-stately/tree";

import DropdownItem, {DropdownItemProps} from "./dropdown-item";
import {useDropdownContext} from "./dropdown-context";

export interface DropdownMenuProps<T = object>
  extends AriaMenuProps<T>,
    DOMProps,
    AriaLabelingProps {
  /**
   * The dropdown items variant.
   */
  variant?: DropdownItemProps["variant"];
  /**
   * The dropdown items color.
   */
  color?: DropdownItemProps["color"];
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Whether the menu should close when the menu item is selected.
   * @default true
   */
  closeOnSelect?: DropdownItemProps["closeOnSelect"];
  /**
   * The dropdown items styles.
   */
  styles?: DropdownItemProps["styles"];
}

const DropdownMenu = forwardRef<DropdownMenuProps, "ul">(
  (
    {
      as,
      variant,
      color,
      disableAnimation,
      onAction,
      closeOnSelect,
      className,
      styles,
      ...otherProps
    },
    ref,
  ) => {
    const {getMenuProps} = useDropdownContext();

    const Component = as || "ul";

    const domRef = useDOMRef(ref);

    const state = useTreeState(otherProps);
    const {menuProps} = useMenu(otherProps, state, domRef);

    return (
      <PopoverContent>
        <Component {...getMenuProps({...menuProps, className}, domRef)}>
          {[...state.collection].map((item) => {
            if (item.type === "section") {
              return <div>Section</div>;
            }
            let dropdownItem = (
              <DropdownItem
                key={item.key}
                closeOnSelect={closeOnSelect}
                color={color}
                disableAnimation={disableAnimation}
                item={item}
                state={state}
                styles={styles}
                variant={variant}
                onAction={onAction}
                {...item.props}
              />
            );

            if (item.wrapper) {
              dropdownItem = item.wrapper(dropdownItem);
            }

            return dropdownItem;
          })}
        </Component>
      </PopoverContent>
    );
  },
);

DropdownMenu.displayName = "NextUI.DropdownMenu";

export default DropdownMenu;
