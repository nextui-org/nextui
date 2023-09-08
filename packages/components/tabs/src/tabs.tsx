import {ForwardedRef, ReactElement, Ref, useId} from "react";
import {LayoutGroup} from "framer-motion";
import {forwardRef} from "@nextui-org/system";

import {UseTabsProps, useTabs} from "./use-tabs";
import Tab from "./tab";
import TabPanel from "./tab-panel";

interface Props<T> extends UseTabsProps<T> {}

function Tabs<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {Component, values, state, getBaseProps, getTabListProps} = useTabs<T>({
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
    disableCursorAnimation: values.disableCursorAnimation,
  };

  const tabs = [...state.collection].map((item) => (
    <Tab key={item.key} item={item} {...item.props} {...tabsProps} />
  ));

  return (
    <>
      <div {...getBaseProps()}>
        <Component {...getTabListProps()}>
          {layoutGroupEnabled ? <LayoutGroup id={layoutId}>{tabs}</LayoutGroup> : tabs}
        </Component>
      </div>
      <TabPanel
        key={state.selectedItem?.key}
        classNames={values.classNames}
        slots={values.slots}
        state={values.state}
      />
    </>
  );
}

export type TabsProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Tabs) as <T = object>(props: TabsProps<T>) => ReactElement;

Tabs.displayName = "NextUI.Tabs";
