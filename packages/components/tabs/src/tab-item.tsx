import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {chain, filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {useTab} from "@react-aria/tabs";
import {useHover} from "@react-aria/interactions";
import {motion} from "framer-motion";
import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";

import {useTabsContext} from "./tabs-context";

export interface TabItemProps<T = object> extends HTMLNextUIProps<"div"> {
  /**
   * The tab item.
   */
  item: Node<T>;
}

/**
 * @internal
 */
const TabItem = forwardRef<TabItemProps, "div">((props, ref) => {
  const {as, className, item, style, onClick, ...otherProps} = props;

  const {key} = item;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, state, tabPanelId, classNames} = useTabsContext();

  const {tabProps, isSelected, isDisabled, isPressed} = useTab({key}, state, domRef);
  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({
    isDisabled,
  });

  const tabStyles = clsx(classNames?.tab, className, item.props?.className);

  return (
    <Component
      ref={domRef}
      data-focus={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-hover-unselected={dataAttr(isHovered && !isSelected)}
      data-pressed={dataAttr(isPressed)}
      data-selected={dataAttr(isSelected)}
      {...mergeProps(
        tabProps,
        focusProps,
        hoverProps,
        filterDOMProps(item.props, {labelable: true}),
        otherProps,
      )}
      aria-controls={tabPanelId}
      className={slots.tab?.({class: tabStyles})}
      id={`${tabPanelId}-${key}`}
      style={{
        ...style,
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={chain(onClick, tabProps.onClick)}
    >
      {isSelected && (
        <motion.span
          className={slots.cursor({class: classNames?.cursor})}
          layoutDependency={false}
          layoutId="tab-item-cursor"
          transition={{
            ease: TRANSITION_EASINGS.softSpring,
            duration: 0.6,
          }}
        />
      )}
      <div
        className={slots.tabContent({
          class: classNames?.tabContent,
        })}
      >
        {item.rendered}
      </div>
    </Component>
  );
});

TabItem.displayName = "NextUI.TabItem";

export default TabItem;
