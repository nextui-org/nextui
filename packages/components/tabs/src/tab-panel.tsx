import type {AriaTabPanelProps} from "@react-aria/tabs";

import {Key} from "@react-types/shared";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useTabPanel} from "@react-aria/tabs";
import {useFocusRing} from "@react-aria/focus";

import {ValuesType} from "./use-tabs";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Whether to destroy inactive tab panel when switching tabs.
   * Inactive tab panels are inert and cannot be interacted with.
   */
  destroyInactiveTabPanel: boolean;
  /**
   * The current tab key.
   */
  tabKey: Key;
  /**
   * The tab list state.
   */
  state: ValuesType["state"];
  /**
   * Component slots classes
   */
  slots: ValuesType["slots"];
  /**
   * User custom classnames
   */
  classNames?: ValuesType["classNames"];
}

export type TabPanelProps = Props & AriaTabPanelProps;

/**
 * @internal
 */
const TabPanel = forwardRef<"div", TabPanelProps>((props, ref) => {
  const {as, tabKey, destroyInactiveTabPanel, state, className, slots, classNames, ...otherProps} =
    props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {tabPanelProps} = useTabPanel(props, state, domRef);

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();

  const selectedItem = state.selectedItem;

  const content = selectedItem?.props?.children;

  const tabPanelStyles = clsx(classNames?.panel, className, selectedItem?.props?.className);

  const isSelected = tabKey === selectedItem?.key;

  if (!content || (!isSelected && destroyInactiveTabPanel)) {
    return null;
  }

  return (
    <Component
      ref={domRef}
      data-focus={isFocused}
      data-focus-visible={isFocusVisible}
      data-inert={!isSelected ? "true" : undefined}
      inert={!isSelected ? "true" : undefined}
      {...(isSelected && mergeProps(tabPanelProps, focusProps, otherProps))}
      className={slots.panel?.({class: tabPanelStyles})}
      data-slot="panel"
    >
      {content}
    </Component>
  );
});

TabPanel.displayName = "NextUI.TabPanel";

export default TabPanel;
