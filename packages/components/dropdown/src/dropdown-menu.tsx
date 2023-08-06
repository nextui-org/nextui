import {PopoverContent} from "@nextui-org/popover";
import {FocusScope} from "@react-aria/focus";
import {forwardRef} from "@nextui-org/system";
import {Menu, MenuProps} from "@nextui-org/menu";
import {mergeRefs} from "@nextui-org/react-utils";

import {useDropdownContext} from "./dropdown-context";

export interface DropdownMenuProps extends Omit<MenuProps, "menuProps"> {}

const DropdownMenu = forwardRef<"ul", DropdownMenuProps>((props, ref) => {
  const {menuRef, menuProps} = useDropdownContext();

  return (
    <PopoverContent>
      <FocusScope contain restoreFocus>
        <Menu ref={mergeRefs(ref, menuRef)} menuProps={menuProps} {...props} />
      </FocusScope>
    </PopoverContent>
  );
});

DropdownMenu.displayName = "NextUI.DropdownMenu";

export default DropdownMenu;
