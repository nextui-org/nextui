import React, {ReactNode} from "react";
import {Section} from "@react-stately/collections";

import Popover from "../popover";
import {__DEV__} from "../utils/assertion";

import DropdownItemBase from "./base/dropdown-item-base";
import {DropdownProvider} from "./dropdown-context";
import DropdownTrigger from "./dropdown-trigger";
import DropdownMenu from "./dropdown-menu";
import DropdownButton from "./dropdown-button";
import {useDropdown, UseDropdownProps} from "./use-dropdown";

interface Props extends UseDropdownProps {
  /**
   * The content of the dropdown. It is usually the `Dropdown.Trigger`,
   * and `Dropdown.Menu`
   */
  children: ReactNode[];
}

export type DropdownProps = Props;

const Dropdown = (props: DropdownProps) => {
  const {children, ...otherProps} = props;

  const context = useDropdown(otherProps);

  const [menuTrigger, menu] = React.Children.toArray(children);

  return (
    <DropdownProvider value={context}>
      <Popover
        ref={context.menuPopoverRef}
        {...context.popoverProps}
        borderWeight={context.borderWeight}
        disableAnimation={context.disableAnimation}
        isOpen={context.state.isOpen}
        scrollRef={context.menuRef}
        triggerRef={context.menuTriggerRef}
        onClose={context.onClose}
      >
        {menuTrigger}
        {menu}
      </Popover>
    </DropdownProvider>
  );
};

if (__DEV__) {
  Dropdown.displayName = "NextUI.Dropdown";
}

type DropdownComponent<P = {}> = React.FC<P> & {
  Trigger: typeof DropdownTrigger;
  Button: typeof DropdownButton;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItemBase;
  Section: typeof Section;
};

Dropdown.toString = () => ".nextui-dropdown";

export default Dropdown as DropdownComponent<DropdownProps>;
