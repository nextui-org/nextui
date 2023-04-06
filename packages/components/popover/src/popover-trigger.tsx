import {forwardRef} from "@nextui-org/system";
import React, {Children, cloneElement} from "react";
import {warn} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverTriggerProps {
  children?: React.ReactNode;
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = forwardRef<PopoverTriggerProps, "button">((props, _) => {
  const {getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  let trigger: React.ReactElement;

  try {
    /**
     * Ensure tooltip has only one child node
     */
    const child = Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };

    trigger = cloneElement(child, getTriggerProps(mergeProps(child.props, otherProps), child.ref));
  } catch (error) {
    trigger = <span />;
    warn("PopoverTrigger must have only one child node. Please, check your code.");
  }

  return trigger;
});

PopoverTrigger.displayName = "NextUI.PopoverTrigger";

export default PopoverTrigger;
