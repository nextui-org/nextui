import {listboxSection} from "@nextui-org/theme";
import {Node} from "@react-types/shared";
import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {clsx} from "@nextui-org/shared-utils";
import {Divider} from "@nextui-org/divider";
import {ListState} from "@react-stately/list";
import {useListBoxSection} from "@react-aria/listbox";

import ListboxItem, {ListboxItemProps} from "./listbox-item";
import {ListboxSectionBaseProps} from "./base/listbox-section-base";

export interface ListboxSectionProps<T extends object = object> extends ListboxSectionBaseProps {
  item: Node<T>;
  state: ListState<T>;
  /**
   * The listbox items variant.
   */
  variant?: ListboxItemProps["variant"];
  /**
   * The listbox items color.
   */
  color?: ListboxItemProps["color"];
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
}

/**
 * @internal
 */
const ListboxSection = forwardRef<"li", ListboxSectionProps>(
  (
    {
      item,
      state,
      as,
      variant,
      color,
      disableAnimation,
      className,
      classNames,
      showDivider = false,
      dividerProps = {},
      itemClasses,
      // removed title from props to avoid browsers showing a tooltip on hover
      // the title props is already inside the rendered prop
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      title,
      ...otherProps
    },
    _,
  ) => {
    const Component = as || "li";

    const slots = useMemo(() => listboxSection(), []);

    const baseStyles = clsx(classNames?.base, className);
    const dividerStyles = clsx(classNames?.divider, dividerProps?.className);

    const {itemProps, headingProps, groupProps} = useListBoxSection({
      heading: item.rendered,
      "aria-label": item["aria-label"],
    });

    return (
      <Component
        key={item.key}
        data-slot="base"
        {...mergeProps(itemProps, otherProps)}
        className={slots.base({class: baseStyles})}
      >
        {item.rendered && (
          <span
            {...headingProps}
            className={slots.heading({class: classNames?.heading})}
            data-slot="heading"
          >
            {item.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          className={slots.group({class: classNames?.group})}
          data-has-title={!!item.rendered}
          data-slot="group"
        >
          {[...item.childNodes].map((node) => {
            const {key: nodeKey, props: nodeProps} = node;

            let listboxItem = (
              <ListboxItem
                key={nodeKey}
                classNames={itemClasses}
                color={color}
                disableAnimation={disableAnimation}
                item={node}
                state={state}
                variant={variant}
                {...nodeProps}
              />
            );

            if (node.wrapper) {
              listboxItem = node.wrapper(listboxItem);
            }

            return listboxItem;
          })}
          {showDivider && (
            <Divider
              as="li"
              className={slots.divider({
                class: dividerStyles,
              })}
              {...dividerProps}
            />
          )}
        </ul>
      </Component>
    );
  },
);

ListboxSection.displayName = "NextUI.ListboxSection";

export default ListboxSection;
