import React, {Children, cloneElement, useMemo} from "react";
import {forwardRef, cn} from "@nextui-org/system";
import {pickChildren, filterDOMProps} from "@nextui-org/react-utils";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {Button} from "@nextui-org/button";
import {mergeProps} from "@react-aria/utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverTriggerProps {
  children?: React.ReactNode;
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = forwardRef<"button", PopoverTriggerProps>((props, _) => {
  const {triggerRef, getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  // force a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const {onPress, ...rest} = useMemo(() => {
    return getTriggerProps(mergeProps(otherProps, child.props), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress}, triggerRef);

  let restProps = rest;

  if (restProps?.isDisabled) {
    // if `child` doesn't have `isDisabled` prop, e.g. custom trigger (div), NextUI User component
    // adding `isDisabled` would make React fail to recognize it on a DOM element
    // hence, adding the `isDisabled` logic to cover this case
    restProps.className = cn(restProps.className, "opacity-disabled pointer-events-none");
    restProps = filterDOMProps(restProps);
  }

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  return cloneElement(child, mergeProps(restProps, hasNextUIButton ? {onPress} : buttonProps));
});

PopoverTrigger.displayName = "NextUI.PopoverTrigger";

export default PopoverTrigger;
