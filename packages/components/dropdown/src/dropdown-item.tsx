import {forwardRef} from "@nextui-org/system";
import {useMemo, ReactNode} from "react";

import {UseDropdownItemProps, useDropdownItem} from "./use-dropdown-item";
import {DropdownSelectedIcon} from "./dropdown-selected-icon";

export interface DropdownItemProps<T extends object = object> extends UseDropdownItemProps<T> {}

/**
 * @internal
 */
const DropdownItem = forwardRef<DropdownItemProps, "li">((props, _) => {
  const {
    Component,
    rendered,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getSelectedIconProps,
  } = useDropdownItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <DropdownSelectedIcon disableAnimation={disableAnimation} isSelected={isSelected} />
    );

    if (typeof selectedIcon === "function") {
      return selectedIcon({icon: defaultIcon, isSelected, isDisabled});
    }

    if (selectedIcon) return selectedIcon;

    return defaultIcon;
  }, [selectedIcon, isSelected, isDisabled, disableAnimation]);

  return (
    <Component {...getItemProps()}>
      <span {...getLabelProps()}>{rendered}</span>
      {isSelectable && <span {...getSelectedIconProps()}>{selectedContent}</span>}
    </Component>
  );
});

DropdownItem.displayName = "NextUI.DropdownItem";

export default DropdownItem;
