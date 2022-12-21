import type {ReactRef} from "../utils/refs";

import React, {Children, cloneElement, useMemo} from "react";
import {useButton} from "@react-aria/button";
import {mergeProps} from "@react-aria/utils";

import {Button, Text} from "../index";
import {pickChild} from "../utils/collections";
import {__DEV__} from "../utils/assertion";

import {usePopoverContext} from "./popover-context";

interface Props {
  children?: React.ReactNode;
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = React.forwardRef((props: Props, _: ReactRef<HTMLElement>) => {
  const {state, triggerRef, getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  // enforce a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <Text>{children}</Text>;

    return Children.only(children);
  }, [children]);

  const {onPress, onPressStart, ...rest} = useMemo(() => {
    return getTriggerProps(mergeProps(child.props, otherProps), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  const {buttonProps} = useButton({onPress, onPressStart, ...rest}, triggerRef);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChild(props.children, Button);

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  const nextUIButtonProps = useMemo(() => {
    return {
      ...rest,
      onPressStart,
      onPress: () => state.open(),
    };
  }, [rest, onPressStart, state.open]);

  return cloneElement(child, mergeProps(rest, hasNextUIButton ? nextUIButtonProps : buttonProps));
});

if (__DEV__) {
  PopoverTrigger.displayName = "NextUI.PopoverTrigger";
}

PopoverTrigger.toString = () => ".nextui-popover-trigger";

type PopoverTriggerComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

export default PopoverTrigger as PopoverTriggerComponent<HTMLElement, {children?: React.ReactNode}>;
