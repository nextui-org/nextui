"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {TabsVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {tabsVariants} from "@heroui/styles";
import React, {createContext, use, useCallback, useRef} from "react";
import {SelectionIndicator as SelectionIndicatorPrimitive} from "react-aria-components/SelectionIndicator";
import {
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components/Tabs";

import {createCollectionSlot} from "../../utils";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp} from "../icons";
import {ScrollShadow} from "../scroll-shadow";

/* -------------------------------------------------------------------------------------------------
 * Tabs Context
 * -----------------------------------------------------------------------------------------------*/
type TabsContext = {
  orientation?: "horizontal" | "vertical";
  slots?: ReturnType<typeof tabsVariants>;
};

const TabsContext = createContext<TabsContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tabs Collection Slot
 * -----------------------------------------------------------------------------------------------*/
type ListContainerInjectedProps = {
  className?: string;
  render?: DOMRenderProps<"div", undefined>["render"];
} & Record<string, unknown>;

const listContainerSlot = createCollectionSlot<ListContainerInjectedProps>("tabs.listContainer");

/* -------------------------------------------------------------------------------------------------
 * Tabs Root
 * -----------------------------------------------------------------------------------------------*/
interface TabsRootProps extends ComponentPropsWithRef<typeof TabsPrimitive>, TabsVariants {
  children: React.ReactNode;
  className?: string;
}

const TabsRoot = ({
  align,
  children,
  className,
  orientation = "horizontal",
  variant,
  ...props
}: TabsRootProps) => {
  const slots = React.useMemo(() => tabsVariants({align, variant}), [align, variant]);
  const contextValue = React.useMemo(() => ({orientation, slots}), [orientation, slots]);

  return (
    <TabsContext value={contextValue}>
      <TabsPrimitive
        {...props}
        className={useResolvedClassName(className, slots.base())}
        data-slot="tabs"
        orientation={orientation}
      >
        {children}
      </TabsPrimitive>
    </TabsContext>
  );
};

TabsRoot.displayName = "HeroUI.Tabs";

/* -------------------------------------------------------------------------------------------------
 * Tabs List Container
 * -----------------------------------------------------------------------------------------------*/
interface TabListContainerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const TabListContainer = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  render,
  ...containerProps
}: TabListContainerProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof TabListContainerProps<E>>) => {
  return (
    <listContainerSlot.Injector
      {...({...containerProps, className, render} as ListContainerInjectedProps)}
    >
      {children}
    </listContainerSlot.Injector>
  );
};

TabListContainer.displayName = "HeroUI.Tabs.ListContainer";

/* -------------------------------------------------------------------------------------------------
 * Tabs List
 * -----------------------------------------------------------------------------------------------*/
interface TabListProps extends ComponentPropsWithRef<typeof TabListPrimitive<object>> {
  children: React.ReactNode;
  className?: string;
}

const TabList = ({children, className, ...props}: TabListProps) => {
  const {orientation = "horizontal", slots} = use(TabsContext);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isVertical = orientation === "vertical";

  const [listContainerProps, restProps] = listContainerSlot.useSlot(props);
  const resolvedClassName = useResolvedClassName(className, slots?.tabList());

  const scrollBy = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current;

      if (!el) return;
      const size = isVertical ? el.clientHeight : el.clientWidth;
      const scrollSize = isVertical ? el.scrollHeight : el.scrollWidth;
      const maxScroll = Math.max(0, scrollSize - size);

      // In RTL, the horizontal scroll range runs from 0 (start, on the right) to negative,
      // so the delta sign must be flipped for `scrollLeft` to move toward the intended edge.
      const isRTL = !isVertical && getComputedStyle(el).direction === "rtl";
      const delta = direction * size * 0.8 * (isRTL ? -1 : 1);
      const current = isVertical ? el.scrollTop : el.scrollLeft;

      // Clamp the target to the scrollable range so a press near the edge lands
      // flush on it instead of requesting a position past the content, which can
      // cut the smooth scroll short of the edge (e.g. iOS Safari) or leave the
      // strip visually stranded. RTL ranges run [-maxScroll, 0].
      const next = Math.min(
        isRTL ? 0 : maxScroll,
        Math.max(isRTL ? -maxScroll : 0, current + delta),
      );

      if (next === current) return;

      el.scrollTo({
        behavior: "smooth",
        [isVertical ? "top" : "left"]: next,
      });
    },
    [isVertical],
  );

  // Without ListContainer, stay a thin RAC TabList
  if (!listContainerProps) {
    return (
      <TabListPrimitive {...restProps} className={resolvedClassName} data-slot="tabs-list">
        {children}
      </TabListPrimitive>
    );
  }

  const {
    className: containerClassName,
    render: containerRender,
    ...containerRest
  } = listContainerProps;

  return (
    <TabListPrimitive
      {...restProps}
      className={resolvedClassName}
      data-slot="tabs-list"
      render={(renderProps) => {
        const {
          children: listChildren,
          className: listClassName,
          ref: listRef,
          ...listRest
        } = renderProps as typeof renderProps & {
          ref?: React.Ref<HTMLDivElement>;
        };

        return (
          <dom.div
            className={composeSlotClassName(slots?.tabListContainer, containerClassName)}
            data-slot="tabs-list-container"
            render={containerRender as DOMRenderProps<"div", undefined>["render"]}
            {...(containerRest as React.HTMLAttributes<HTMLDivElement>)}
          >
            <ScrollShadow
              ref={scrollerRef}
              hideScrollBar
              className={composeSlotClassName(slots?.scroller)}
              orientation={orientation}
              size={64}
            >
              <div {...listRest} ref={listRef} className={listClassName}>
                {listChildren}
              </div>
            </ScrollShadow>

            <button
              aria-label={isVertical ? "Scroll tabs up" : "Scroll tabs left"}
              className={composeSlotClassName(slots?.scrollPrev)}
              tabIndex={-1}
              type="button"
              onClick={() => scrollBy(-1)}
            >
              {isVertical ? <IconChevronUp /> : <IconChevronLeft />}
            </button>

            <button
              aria-label={isVertical ? "Scroll tabs down" : "Scroll tabs right"}
              className={composeSlotClassName(slots?.scrollNext)}
              tabIndex={-1}
              type="button"
              onClick={() => scrollBy(1)}
            >
              {isVertical ? <IconChevronDown /> : <IconChevronRight />}
            </button>
          </dom.div>
        );
      }}
    >
      {children}
    </TabListPrimitive>
  );
};

TabList.displayName = "HeroUI.Tabs.List";

/* -------------------------------------------------------------------------------------------------
 * Tab
 * -----------------------------------------------------------------------------------------------*/
interface TabProps extends ComponentPropsWithRef<typeof TabPrimitive> {
  className?: string;
}

const Tab = ({children, className, ...props}: TabProps) => {
  const {slots} = use(TabsContext);

  return (
    <TabPrimitive
      {...props}
      className={useResolvedClassName(className, slots?.tab())}
      data-slot="tabs-tab"
    >
      {children}
    </TabPrimitive>
  );
};

Tab.displayName = "HeroUI.Tabs.Tab";

/* -------------------------------------------------------------------------------------------------
 * Tab Indicator
 * -----------------------------------------------------------------------------------------------*/
interface TabIndicatorProps extends ComponentPropsWithRef<typeof SelectionIndicatorPrimitive> {
  className?: string;
}

const TabIndicator = ({className, ...props}: TabIndicatorProps) => {
  const {slots} = use(TabsContext);

  return (
    <SelectionIndicatorPrimitive
      className={composeSlotClassName(slots?.tabIndicator, className)}
      data-slot="tabs-indicator"
      {...props}
    />
  );
};

TabIndicator.displayName = "HeroUI.Tabs.Indicator";

/* -------------------------------------------------------------------------------------------------
 * Tab Panel
 * -----------------------------------------------------------------------------------------------*/
interface TabPanelProps extends Omit<ComponentPropsWithRef<typeof TabPanelPrimitive>, "children"> {
  children: React.ReactNode;
  className?: string;
}

const TabPanel = ({children, className, ...props}: TabPanelProps) => {
  const {slots} = use(TabsContext);

  return (
    <TabPanelPrimitive
      {...props}
      className={useResolvedClassName(className, slots?.tabPanel())}
      data-slot="tabs-panel"
    >
      {children}
    </TabPanelPrimitive>
  );
};

TabPanel.displayName = "HeroUI.Tabs.Panel";

/* -------------------------------------------------------------------------------------------------
 * Tab Separator
 * -----------------------------------------------------------------------------------------------*/
interface TabSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const TabSeparator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: TabSeparatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TabSeparatorProps<E>>) => {
  const {slots} = use(TabsContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="tabs-separator"
      {...(props as any)}
    />
  );
};

TabSeparator.displayName = "HeroUI.Tabs.Separator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TabsRoot, TabListContainer, TabList, Tab, TabIndicator, TabPanel, TabSeparator};

export type {
  TabsRootProps,
  TabListContainerProps,
  TabListProps,
  TabProps,
  TabIndicatorProps,
  TabPanelProps,
  TabSeparatorProps,
};
