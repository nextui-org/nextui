import {forwardRef} from "@nextui-org/system";
import React, {Children, cloneElement, useMemo} from "react";
import {pickChildren} from "@nextui-org/shared-utils";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {Button} from "@nextui-org/button";
import {mergeProps} from "@react-aria/utils";

import {useModalContext} from "./modal-context";

export interface ModalTriggerProps {
  children?: React.ReactNode;
}

/**
 * ModalTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const ModalTrigger = forwardRef<ModalTriggerProps, "button">((props, _) => {
  const {triggerRef, getTriggerProps} = useModalContext();

  const {children, ...otherProps} = props;

  // force a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const {onPress, ...rest} = useMemo(() => {
    return getTriggerProps(mergeProps(child.props, otherProps), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress}, triggerRef);

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  return cloneElement(child, mergeProps(rest, hasNextUIButton ? {onPress} : buttonProps));
});

ModalTrigger.displayName = "NextUI.ModalTrigger";

export default ModalTrigger;
