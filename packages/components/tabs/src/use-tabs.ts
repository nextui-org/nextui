import type {TabsVariantProps, SlotsToClasses, TabsSlots, TabsReturnType} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {tabs} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";
import {ReactRef} from "@nextui-org/react-utils";
import {useMemo, RefObject} from "react";
import {TabListState, TabListStateOptions, useTabListState} from "@react-stately/tabs";
import {AriaTabListProps, useTabList} from "@react-aria/tabs";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {CollectionProps} from "@nextui-org/aria-utils";
import {CollectionChildren} from "@react-types/shared";

export interface Props extends Omit<HTMLNextUIProps<"div">, "children"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Whether the cursor should be hidden.
   * @default false
   */
  disableCursorAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tabs classNames={{
   *    base:"base-classes", // main wrapper (tabs + panels)
   *    tabList: "tab-list-classes", // tabs wrapper
   *    tab: "tab-classes", // tab item
   *    panel: "panel-classes", // tab panel
   * }} />
   * ``
   */
  classNames?: SlotsToClasses<TabsSlots>;
}

export type UseTabsProps<T> = Props &
  TabsVariantProps &
  Omit<TabListStateOptions<T>, "children"> &
  Omit<AriaTabListProps<T>, "children" | "orientation"> &
  CollectionProps<T>;

export type ContextType<T = object> = {
  state: TabListState<T>;
  slots: TabsReturnType;
  disableCursorAnimation?: boolean;
  listRef?: RefObject<HTMLElement>;
  classNames?: SlotsToClasses<TabsSlots>;
  disableAnimation?: boolean;
  isDisabled?: boolean;
};

export function useTabs<T extends object>(originalProps: UseTabsProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, tabs.variantKeys);

  const {ref, as, className, children, classNames, disableCursorAnimation, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const state = useTabListState<T>({
    children: children as CollectionChildren<T>,
    ...otherProps,
  });
  const {tabListProps} = useTabList<T>(otherProps, state, domRef);

  const slots = useMemo(
    () =>
      tabs({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const baseStyles = clsx(classNames?.base, className);

  const context = useMemo<ContextType<T>>(
    () => ({
      state,
      slots,
      classNames,
      listRef: domRef,
      disableCursorAnimation,
      isDisabled: originalProps?.isDisabled,
      disableAnimation: originalProps?.disableAnimation,
    }),
    [
      state,
      slots,
      domRef,
      disableCursorAnimation,
      originalProps?.disableAnimation,
      originalProps?.isDisabled,
      classNames,
    ],
  );

  const getBaseProps: PropGetter = (props) => ({
    "data-slot": "base",
    className: slots.base({class: clsx(baseStyles, props?.className)}),
    ...mergeProps(filterDOMProps(otherProps, {labelable: true}), props),
  });

  const getTabListProps: PropGetter = (props) => ({
    ref: domRef,
    "data-slot": "tabList",
    className: slots.tabList({class: clsx(classNames?.tabList, props?.className)}),
    ...mergeProps(tabListProps, props),
  });

  return {
    Component,
    domRef,
    state,
    context,
    getBaseProps,
    getTabListProps,
  };
}

export type UseTabsReturn = ReturnType<typeof useTabs>;
