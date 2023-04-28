import {forwardRef, ForwardedRef, ReactElement, Ref} from "react";

import {TabsProvider} from "./tabs-context";
import {UseTabsProps, useTabs} from "./use-tabs";
import TabItem from "./tab-item";
import TabPanel from "./tab-panel";

interface Props<T> extends Omit<UseTabsProps<T>, "ref"> {}

function Tabs<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {Component, state, context, getBaseProps, getTabListProps} = useTabs<T>({ref, ...props});

  return (
    <TabsProvider value={context}>
      <div {...getBaseProps()}>
        <Component {...getTabListProps()}>
          {[...state.collection].map((item) => (
            <TabItem key={item.key} item={item} {...item.props} />
          ))}
        </Component>
      </div>
      <TabPanel key={state.selectedItem?.key} />
    </TabsProvider>
  );
}

export type TabsProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Tabs) as <T = object>(props: TabsProps<T>) => ReactElement;

Tabs.displayName = "NextUI.Tabs";
