import type {DropdownSectionSlots, SlotsToClasses} from "@nextui-org/theme";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {dropdownSection} from "@nextui-org/theme";
import {Node} from "@react-types/shared";
import {TreeState} from "@react-stately/tree";
import {useMenuSection} from "@react-aria/menu";
import {useMemo, Key} from "react";
import {mergeProps} from "@react-aria/utils";
import {clsx} from "@nextui-org/shared-utils";

import DropdownItem, {DropdownItemProps} from "./dropdown-item";

export interface DropdownSectionProps<T extends object = object> extends HTMLNextUIProps<"li"> {
  item: Node<T>;
  state: TreeState<T>;
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
  styles?: DropdownItemProps["styles"] & SlotsToClasses<DropdownSectionSlots>;
  /**
   * Shows a divider between sections
   * @default true
   */
  showDivider?: boolean;
  onAction?: (key: Key) => void;
}

/**
 * @internal
 */
const DropdownSection = forwardRef<DropdownSectionProps, "li">(
  (
    {
      item,
      state,
      as,
      variant,
      color,
      disableAnimation,
      onAction,
      closeOnSelect,
      className,
      styles: stylesProp = {},
      showDivider = true,
      ...otherProps
    },
    _,
  ) => {
    const {section, heading, ...styles} = stylesProp;

    const Component = as || "li";
    const isFirstKey = item.key === state.collection.getFirstKey();

    const slots = useMemo(() => dropdownSection({showDivider: showDivider && !isFirstKey}), [
      showDivider,
      isFirstKey,
    ]);

    const baseStyles = clsx(section, className, item.props?.className);

    const {itemProps, headingProps, groupProps} = useMenuSection({
      heading: item.rendered,
      "aria-label": item["aria-label"],
    });

    return (
      <Component
        {...mergeProps(itemProps, otherProps, item.props)}
        className={slots.section({class: baseStyles})}
      >
        {item.rendered && (
          <span {...headingProps} className={slots.heading({class: heading})}>
            {item.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...item.childNodes].map((node) => {
            let dropdownItem = (
              <DropdownItem
                key={node.key}
                closeOnSelect={closeOnSelect}
                color={color}
                disableAnimation={disableAnimation}
                item={node}
                state={state}
                styles={styles}
                variant={variant}
                onAction={onAction}
                {...node.props}
              />
            );

            if (node.wrapper) {
              dropdownItem = node.wrapper(dropdownItem);
            }

            return dropdownItem;
          })}
        </ul>
      </Component>
    );
  },
);

DropdownSection.displayName = "NextUI.DropdownSection";

export default DropdownSection;
