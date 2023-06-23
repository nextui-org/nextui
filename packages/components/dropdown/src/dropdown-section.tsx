import type {DropdownSectionSlots, SlotsToClasses} from "@nextui-org/theme";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {dropdownSection} from "@nextui-org/theme";
import {Node} from "@react-types/shared";
import {TreeState} from "@react-stately/tree";
import {useMenuSection} from "@react-aria/menu";
import {useMemo, Key, useId} from "react";
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
   * The dropdown items classNames.
   */
  classNames?: DropdownItemProps["classNames"] & SlotsToClasses<DropdownSectionSlots>;
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
      key: keyProp,
      disableAnimation,
      onAction,
      closeOnSelect,
      className,
      classNames: stylesProp = {},
      showDivider = true,
      // removed title from props to avoid browsers showing a tooltip on hover
      // the title props is already inside the rendered prop
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      title,
      ...otherProps
    },
    _,
  ) => {
    const {section, heading, group, ...classNames} = stylesProp || {};

    const headingId = useId();

    const Component = as || "li";
    const isFirstKey = item.key === state.collection.getFirstKey();

    const slots = useMemo(
      () => dropdownSection({showDivider: showDivider && !isFirstKey}),
      [showDivider, isFirstKey],
    );

    const baseStyles = clsx(section, className);

    const {itemProps, headingProps, groupProps} = useMenuSection({
      heading: item.rendered,
      "aria-label": item["aria-label"],
    });

    return (
      <Component
        key={keyProp || item.key}
        {...mergeProps(itemProps, otherProps)}
        className={slots.section({class: baseStyles})}
      >
        {item.rendered && (
          <span {...headingProps} className={slots.heading({class: heading})} id={headingId}>
            {item.rendered}
          </span>
        )}
        <ul {...groupProps} aria-labelledby={headingId} className={slots.group({class: group})}>
          {[...item.childNodes].map((node) => {
            let dropdownItem = (
              <DropdownItem
                key={node.key}
                classNames={classNames}
                closeOnSelect={closeOnSelect}
                color={color}
                disableAnimation={disableAnimation}
                item={node}
                state={state}
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
