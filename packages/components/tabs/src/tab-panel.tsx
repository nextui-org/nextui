import type {AriaTabPanelProps} from "@react-aria/tabs";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useTabPanel} from "@react-aria/tabs";
import {useFocusRing} from "@react-aria/focus";

import {useTabsContext} from "./tabs-context";

interface Props extends HTMLNextUIProps<"div"> {}

export type TabPanelProps = Props & AriaTabPanelProps;

/**
 * @internal
 */
const TabPanel = forwardRef<TabPanelProps, "div">((props, ref) => {
  const {as, className, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, tabPanelId, state, classNames} = useTabsContext();

  const {tabPanelProps} = useTabPanel(props, state, domRef);
  const {focusProps, isFocused, isFocusVisible} = useFocusRing();

  const selectedItem = state.selectedItem;

  const content = selectedItem?.props.children;

  const tabPanelStyles = clsx(classNames?.panel, className, selectedItem.props?.className);

  if (!content) {
    return null;
  }

  return (
    <Component
      ref={domRef}
      data-focus={isFocused}
      data-focus-visible={isFocusVisible}
      {...mergeProps(tabPanelProps, focusProps, otherProps)}
      aria-labelledby={`${tabPanelId}-${state.selectedItem?.key}`}
      className={slots.panel?.({class: tabPanelStyles})}
      data-slot="panel"
      id={tabPanelId}
    >
      {content}
    </Component>
  );
});

TabPanel.displayName = "NextUI.TabPanel";

export default TabPanel;
