import {forwardRef} from "@nextui-org/system";
import {PopoverContent} from "@nextui-org/popover";
import {DOMProps, AriaLabelingProps} from "@react-types/shared";
import {useMenu} from "@react-aria/menu";
import {useDOMRef} from "@nextui-org/dom-utils";
import {AriaMenuProps} from "@react-types/menu";
import {useTreeState} from "@react-stately/tree";

import {useDropdownContext} from "./dropdown-context";

export interface DropdownMenuProps<T = object>
  extends AriaMenuProps<T>,
    DOMProps,
    AriaLabelingProps {}

const DropdownMenu = forwardRef<DropdownMenuProps, "button">((props, ref) => {
  const {getMenuProps} = useDropdownContext();

  const domRef = useDOMRef(ref);

  const state = useTreeState(props);
  const {menuProps} = useMenu(props, state, domRef);

  return (
    <PopoverContent>
      <div {...getMenuProps(menuProps, domRef)}>
        {[...state.collection].map((item) => {
          if (item.type === "section") {
            return <div>Section</div>;
          }
          let dropdownItem = (
            <div>
              <div>{item.rendered}</div>
            </div>
          );

          if (item.wrapper) {
            dropdownItem = item.wrapper(dropdownItem);
          }

          return dropdownItem;
        })}
      </div>
    </PopoverContent>
  );
});

DropdownMenu.displayName = "NextUI.DropdownMenu";

export default DropdownMenu;
