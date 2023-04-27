import type {TabsVariantProps, SlotsToClasses, TabsSlots, TabsReturnType} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {tabs} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useMemo, ReactNode, useId} from "react";
import {TabListState, TabListStateOptions, useTabListState} from "@react-stately/tabs";
import {AriaTabListOptions, useTabList} from "@react-aria/tabs";
import {filterDOMProps, mergeProps} from "@react-aria/utils";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /*
   * The list of `TabItem` elements.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tabs classNames={{
   *    base:"base-classes", // table wrapper
   *    tab: "tab-classes", // tab item
   *    panel: "panel-classes", // tab panel
   * }} />
   * ``
   */
  classNames?: SlotsToClasses<TabsSlots>;
}

export type UseTabsProps<T = object> = Props &
  TabsVariantProps &
  TabListStateOptions<T> &
  AriaTabListOptions<T>;

export type ContextType<T = object> = {
  state: TabListState<T>;
  slots: TabsReturnType;
  tabPanelId: string;
  classNames?: SlotsToClasses<TabsSlots>;
};

export function useTabs<T extends object>(originalProps: UseTabsProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, tabs.variantKeys);

  const {ref, as, className, classNames, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const state = useTabListState(otherProps);
  const {tabListProps} = useTabList(otherProps, state, domRef);

  const tabListId = useId();
  const tabPanelId = useId();

  const slots = useMemo(
    () =>
      tabs({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const tabListStyles = clsx(className, classNames?.tabList);

  const context = useMemo<ContextType<T>>(
    () => ({
      state,
      slots,
      tabPanelId,
      classNames,
    }),
    [state, slots, tabPanelId, classNames],
  );

  const getBaseProps: PropGetter = (props) => ({
    className: slots.base({class: clsx(classNames?.base, props?.className)}),
    ...mergeProps(filterDOMProps(otherProps, {labelable: true}), props),
  });

  const getTabListProps: PropGetter = (props) => ({
    ref: domRef,
    className: slots.tabList({class: clsx(tabListStyles, props?.className)}),
    ...mergeProps(tabListProps, props),
    id: tabListId,
  });

  return {Component, state, context, getBaseProps, getTabListProps};
}

export type UseTabsReturn = ReturnType<typeof useTabs>;
