import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {chain, filterDOMProps, mergeProps} from "@react-aria/utils";
import scrollIntoView from "scroll-into-view-if-needed";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {useTab} from "@react-aria/tabs";
import {useHover} from "@react-aria/interactions";
import {motion} from "framer-motion";
import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";
import {useIsMounted} from "@nextui-org/use-is-mounted";

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
const Tab = forwardRef<TabItemProps, "div">((props, ref) => {
  const {className, as, item, style, onClick, ...otherProps} = props;

  const {key} = item;

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  const {
    slots,
    state,
    tabPanelId,
    listRef,
    disableCursorAnimation,
    isDisabled: isDisabledProp,
    disableAnimation,
    classNames,
  } = useTabsContext();

  const {
    tabProps,
    isSelected,
    isDisabled: isDisabledItem,
    isPressed,
  } = useTab({key}, state, domRef);

  const isDisabled = isDisabledProp || isDisabledItem;

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({
    isDisabled,
  });

  const tabStyles = clsx(classNames?.tab, className);

  const ariaControls = item?.props.children ? `${tabPanelId}-${key}` : undefined;

  const [, isMounted] = useIsMounted({
    rerender: true,
  });

  const handleClick = () => {
    chain(onClick, tabProps.onClick);

    if (!domRef?.current || !listRef?.current) return;

    scrollIntoView(domRef.current, {
      scrollMode: "if-needed",
      behavior: "smooth",
      block: "end",
      inline: "end",
      boundary: listRef?.current,
    });
  };

  return (
    <Component
      ref={domRef}
      data-disabled={dataAttr(isDisabledItem)}
      data-focus={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-hover-unselected={dataAttr((isHovered || isPressed) && !isSelected)}
      data-pressed={dataAttr(isPressed)}
      data-selected={dataAttr(isSelected)}
      data-slot="tab"
      {...mergeProps(
        tabProps,
        !isDisabled
          ? {
              ...focusProps,
              ...hoverProps,
            }
          : {},
        filterDOMProps(otherProps, {labelable: true}),
      )}
      aria-controls={ariaControls}
      className={slots.tab?.({class: tabStyles})}
      id={`${tabPanelId}-${key}`}
      style={{
        ...style,
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={handleClick}
    >
      {isSelected && !disableAnimation && !disableCursorAnimation && isMounted ? (
        <motion.span
          className={slots.cursor({class: classNames?.cursor})}
          data-slot="cursor"
          layoutDependency={false}
          layoutId="cursor"
          transition={{
            ease: TRANSITION_EASINGS.softSpring,
            duration: 0.6,
          }}
        />
      ) : null}
      <div
        className={slots.tabContent({
          class: classNames?.tabContent,
        })}
        data-slot="tabContent"
      >
        {item.rendered}
      </div>
    </Component>
  );
});

Tab.displayName = "NextUI.Tab";

export default Tab;
