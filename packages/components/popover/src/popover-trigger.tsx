import React, {Children, cloneElement, useMemo} from "react";
import {pickChildren} from "@nextui-org/react-utils";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {Button} from "@nextui-org/button";
import {mergeProps} from "@react-aria/utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverTriggerProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = (props: PopoverTriggerProps) => {
  const {triggerRef, getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  // force a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  // Accessing the ref from props, else fallback to element.ref
  // https://github.com/facebook/react/pull/28348
  const childRef = child.props.ref ?? (child as any).ref;

  const {onPress, isDisabled, ...restProps} = useMemo(() => {
    return getTriggerProps(mergeProps(otherProps, child.props), childRef);
  }, [getTriggerProps, child.props, otherProps, childRef]);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress, isDisabled}, triggerRef);

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  return cloneElement(
    child,
    mergeProps(restProps, hasNextUIButton ? {onPress, isDisabled} : buttonProps),
  );
};

PopoverTrigger.displayName = "NextUI.PopoverTrigger";

export default PopoverTrigger;
