import type {TabItemProps as BaseTabItemProps} from "./base/tab-item-base";

import {forwardRef} from "@nextui-org/system";
import {useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {chain, mergeProps} from "@react-aria/utils";
import scrollIntoView from "scroll-into-view-if-needed";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {useTab} from "@react-aria/tabs";
import {useHover} from "@react-aria/interactions";
import {m, domMax, LazyMotion} from "framer-motion";
import {useIsMounted} from "@nextui-org/use-is-mounted";

import {ValuesType} from "./use-tabs";

export interface TabItemProps<T extends object = object> extends BaseTabItemProps<T> {
  item: Node<T>;
  state: ValuesType["state"];
  slots: ValuesType["slots"];
  listRef?: ValuesType["listRef"];
  classNames?: ValuesType["classNames"];
  isDisabled?: ValuesType["isDisabled"];
  motionProps?: ValuesType["motionProps"];
  disableAnimation?: ValuesType["disableAnimation"];
  disableCursorAnimation?: ValuesType["disableCursorAnimation"];
}

/**
 * @internal
 */
const Tab = forwardRef<"button", TabItemProps>((props, ref) => {
  const {
    className,
    as,
    item,
    state,
    classNames,
    isDisabled: isDisabledProp,
    listRef,
    slots,
    motionProps,
    disableAnimation,
    disableCursorAnimation,
    shouldSelectOnPressUp,
    onClick,
    ...otherProps
  } = props;

  const {key} = item;

  const domRef = useDOMRef(ref);

  const Component = as || (props.href ? "a" : "button");
  const shouldFilterDOMProps = typeof Component === "string";

  const {
    tabProps,
    isSelected,
    isDisabled: isDisabledItem,
    isPressed,
  } = useTab({key, isDisabled: isDisabledProp, shouldSelectOnPressUp}, state, domRef);

  const isDisabled = isDisabledProp || isDisabledItem;

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({
    isDisabled,
  });

  const tabStyles = clsx(classNames?.tab, className);

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
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
          omitPropNames: new Set(["title"]),
        }),
        {onClick: handleClick},
      )}
      className={slots.tab?.({class: tabStyles})}
      title={otherProps?.titleValue}
      type={Component === "button" ? "button" : undefined}
    >
      {isSelected && !disableAnimation && !disableCursorAnimation && isMounted ? (
        <LazyMotion features={domMax}>
          <m.span
            className={slots.cursor({class: classNames?.cursor})}
            data-slot="cursor"
            layoutDependency={false}
            layoutId="cursor"
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.5,
            }}
            {...motionProps}
          />
        </LazyMotion>
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
