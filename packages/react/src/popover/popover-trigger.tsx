import type {ReactRef} from "../utils/refs";

import * as React from "react";
import {useButton} from "@react-aria/button";
import {mergeProps} from "@react-aria/utils";

import {Button, Text} from "../index";
import {pickChild} from "../utils/collections";
import {__DEV__} from "../utils/assertion";

import {usePopoverContext} from "./popover-context";

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const PopoverTrigger = React.forwardRef(
  (props: React.PropsWithChildren<{}>, _: ReactRef<HTMLElement>) => {
    const {state, triggerRef, getTriggerProps} = usePopoverContext();
    const {children, ...otherProps} = props;

    const onPress = () => state.open();

    const {buttonProps} = useButton(
      {
        onPress,
        ...otherProps,
      },
      triggerRef,
    );

    // enforce a single child
    const child: any =
      typeof children === "string" ? <Text>{children}</Text> : React.Children.only(children);

    // validates if contains a NextUI Button as a child
    const [, triggerChildren] = pickChild(props.children, Button);
    const hasNextUIButton = triggerChildren?.[0] !== undefined;

    return React.cloneElement(
      child,
      getTriggerProps(
        mergeProps(child.props, hasNextUIButton ? {onPress} : buttonProps, otherProps),
        child.ref,
      ),
    );
  },
);

if (__DEV__) {
  PopoverTrigger.displayName = "NextUI.PopoverTrigger";
}

PopoverTrigger.toString = () => ".nextui-popover-trigger";

type PopoverTriggerComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

export default PopoverTrigger as PopoverTriggerComponent<HTMLElement, React.PropsWithChildren<{}>>;
