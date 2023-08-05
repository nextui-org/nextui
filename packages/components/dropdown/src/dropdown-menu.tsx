import {PopoverContent} from "@nextui-org/popover";
import {DOMProps, AriaLabelingProps} from "@react-types/shared";
import {useMenu} from "@react-aria/menu";
import {useDOMRef} from "@nextui-org/react-utils";
import {AriaMenuProps} from "@react-types/menu";
import {useTreeState} from "@react-stately/tree";
import {dropdownMenu} from "@nextui-org/theme";
import {FocusScope} from "@react-aria/focus";
import {useMemo} from "react";
import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";

import DropdownSection from "./dropdown-section";
import DropdownItem, {DropdownItemProps} from "./dropdown-item";
import {useDropdownContext} from "./dropdown-context";

export interface DropdownMenuProps<T = object>
  extends DOMProps,
    AriaLabelingProps,
    AriaMenuProps<T>,
    Omit<HTMLNextUIProps<"ul">, keyof AriaMenuProps<T>> {
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
   * The dropdown items classNames.
   */
  itemClasses?: DropdownItemProps["classNames"];
}

const DropdownMenu = forwardRef<"ul", DropdownMenuProps>(
  (
    {
      as,
      variant,
      color,
      disableAnimation,
      onAction,
      closeOnSelect,
      className,
      itemClasses,
      ...otherProps
    },
    ref,
  ) => {
    const {getMenuProps} = useDropdownContext();

    const Component = as || "ul";

    const domRef = useDOMRef(ref);

    const state = useTreeState(otherProps);
    const {menuProps} = useMenu(otherProps, state, domRef);

    const classNames = useMemo(() => dropdownMenu({className}), [className]);

    return (
      <PopoverContent>
        <FocusScope contain restoreFocus>
          <Component {...getMenuProps({...menuProps}, domRef)} className={classNames}>
            {[...state.collection].map((item) => {
              const itemProps = {
                closeOnSelect,
                color,
                disableAnimation,
                item,
                state,
                variant,
                onAction,
                ...item.props,
              };

              if (item.type === "section") {
                return <DropdownSection key={item.key} {...itemProps} itemClasses={itemClasses} />;
              }
              let dropdownItem = (
                <DropdownItem key={item.key} {...itemProps} classNames={itemClasses} />
              );

              if (item.wrapper) {
                dropdownItem = item.wrapper(dropdownItem);
              }

              return dropdownItem;
            })}
          </Component>
        </FocusScope>
      </PopoverContent>
    );
  },
);

DropdownMenu.displayName = "NextUI.DropdownMenu";

export default DropdownMenu;
