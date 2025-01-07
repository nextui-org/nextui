import {ForwardedRef, ReactElement, useId, useState, useEffect, useCallback} from "react";
import {LayoutGroup} from "framer-motion";
import {forwardRef} from "@nextui-org/system";
import {EllipsisIcon} from "@nextui-org/shared-icons";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";

import {UseTabsProps, useTabs} from "./use-tabs";
import Tab from "./tab";
import TabPanel from "./tab-panel";

interface Props<T> extends UseTabsProps<T> {}

export type TabsProps<T extends object = object> = Props<T>;

const Tabs = forwardRef(function Tabs<T extends object>(
  props: TabsProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    Component,
    values,
    state,
    destroyInactiveTabPanel,
    getBaseProps,
    getTabListProps,
    getWrapperProps,
  } = useTabs<T>({
    ...props,
    ref,
  });

  const layoutId = useId();
  const [showOverflow, setShowOverflow] = useState(false);
  const [hiddenTabs, setHiddenTabs] = useState<Array<{key: string; title: string}>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const layoutGroupEnabled = !props.disableAnimation && !props.disableCursorAnimation;
  const tabListProps = getTabListProps();
  const tabList =
    tabListProps.ref && "current" in tabListProps.ref ? tabListProps.ref.current : null;

  const checkOverflow = useCallback(() => {
    if (!tabList) return;

    const isOverflowing = tabList.scrollWidth > tabList.clientWidth;

    setShowOverflow(isOverflowing);

    if (!isOverflowing) {
      setHiddenTabs([]);

      return;
    }

    const tabs = [...state.collection];
    const hiddenTabsList: Array<{key: string; title: string}> = [];
    const {left: containerLeft, right: containerRight} = tabList.getBoundingClientRect();

    tabs.forEach((item) => {
      const tabElement = tabList.querySelector(`[data-key="${item.key}"]`);

      if (!tabElement) return;

      const {left: tabLeft, right: tabRight} = tabElement.getBoundingClientRect();
      const isHidden = tabRight > containerRight || tabLeft < containerLeft;

      if (isHidden) {
        hiddenTabsList.push({
          key: String(item.key),
          title: item.textValue || "",
        });
      }
    });

    setHiddenTabs(hiddenTabsList);
  }, [state.collection, tabListProps.ref]);

  const scrollToTab = useCallback(
    (key: string) => {
      if (!tabList) return;

      const tabElement = tabList.querySelector(`[data-key="${key}"]`);

      if (!tabElement) return;

      tabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    },
    [tabListProps.ref],
  );

  const handleTabSelect = useCallback(
    (key: string) => {
      state.setSelectedKey(key);
      setIsDropdownOpen(false);

      scrollToTab(key);
      checkOverflow();
    },
    [state, scrollToTab, checkOverflow],
  );

  useEffect(() => {
    if (!tabList) return;

    tabList.style.overflowX = isDropdownOpen ? "hidden" : "auto";
  }, [isDropdownOpen, tabListProps.ref]);

  useEffect(() => {
    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

  const tabsProps = {
    state,
    listRef: values.listRef,
    slots: values.slots,
    classNames: values.classNames,
    isDisabled: values.isDisabled,
    motionProps: values.motionProps,
    disableAnimation: values.disableAnimation,
    shouldSelectOnPressUp: values.shouldSelectOnPressUp,
    disableCursorAnimation: values.disableCursorAnimation,
  };

  const tabs = [...state.collection].map((item) => (
    <Tab key={item.key} item={item} {...tabsProps} {...item.props} />
  ));

  const renderTabs = (
    <>
      <div
        {...getBaseProps()}
        className={clsx("relative flex w-full items-center", getBaseProps().className)}
      >
        <Component
          {...tabListProps}
          className={clsx(
            "relative flex overflow-x-auto scrollbar-hide",
            showOverflow ? "w-[calc(100%-32px)]" : "w-full",
            tabListProps.className,
          )}
          data-has-overflow={dataAttr(showOverflow)}
          onScroll={checkOverflow}
        >
          {layoutGroupEnabled ? <LayoutGroup id={layoutId}>{tabs}</LayoutGroup> : tabs}
        </Component>
        {showOverflow && (
          <Dropdown>
            <DropdownTrigger>
              <button
                aria-label="Show more tabs"
                className="flex-none flex items-center justify-center w-10 h-8 ml-1 hover:bg-default-100 rounded-small transition-colors"
              >
                <EllipsisIcon className="w-5 h-5" />
                <span className="sr-only">More tabs</span>
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Hidden tabs"
              onAction={(key) => handleTabSelect(key as string)}
            >
              {hiddenTabs.map((tab) => (
                <DropdownItem key={tab.key}>{tab.title}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      {[...state.collection].map((item) => (
        <TabPanel
          key={item.key}
          classNames={values.classNames}
          destroyInactiveTabPanel={destroyInactiveTabPanel}
          slots={values.slots}
          state={values.state}
          tabKey={item.key}
        />
      ))}
    </>
  );

  if ("placement" in props || "isVertical" in props) {
    return <div {...getWrapperProps()}>{renderTabs}</div>;
  }

  return renderTabs;
}) as <T extends object>(props: TabsProps<T>) => ReactElement;

export default Tabs;
