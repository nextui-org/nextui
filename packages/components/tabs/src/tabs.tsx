import {ForwardedRef, ReactElement, Ref, useId} from "react";
import {LayoutGroup} from "framer-motion";
import {forwardRef} from "@nextui-org/system";

import {UseTabsProps, useTabs} from "./use-tabs";
import Tab from "./tab";
import TabPanel from "./tab-panel";

interface Props<T> extends UseTabsProps<T> {}

function Tabs<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
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

  const layoutGroupEnabled = !props.disableAnimation && !props.disableCursorAnimation;

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
      <div {...getBaseProps()}>
        <Component {...getTabListProps()}>
          {layoutGroupEnabled ? <LayoutGroup id={layoutId}>{tabs}</LayoutGroup> : tabs}
        </Component>
      </div>
      {[...state.collection].map((item) => {
        return (
          <TabPanel
            key={item.key}
            classNames={values.classNames}
            destroyInactiveTabPanel={destroyInactiveTabPanel}
            slots={values.slots}
            state={values.state}
            tabKey={item.key}
          />
        );
      })}
    </>
  );

  if ("placement" in props || "isVertical" in props) {
    return <div {...getWrapperProps()}>{renderTabs}</div>;
  }

  return renderTabs;
}

export type TabsProps<T extends object = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Tabs) as <T extends object>(props: TabsProps<T>) => ReactElement;

Tabs.displayName = "NextUI.Tabs";
