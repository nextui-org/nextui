import {forwardRef} from "@nextui-org/system";
import {AriaTabProps} from "@react-aria/tabs";

import {TabsProvider} from "./tabs-context";
import {UseTabsProps, useTabs} from "./use-tabs";
import TabItem from "./tab-item";
import TabPanel from "./tab-panel";

interface Props extends Omit<UseTabsProps, "ref"> {}

export type TabsProps = Props & AriaTabProps;

const Tabs = forwardRef<TabsProps, "div">((props, ref) => {
  const {Component, state, context, getBaseProps, getTabListProps} = useTabs({ref, ...props});

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
});

Tabs.displayName = "NextUI.Tabs";

export default Tabs;
