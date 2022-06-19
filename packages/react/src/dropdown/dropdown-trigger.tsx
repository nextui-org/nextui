import type {ReactRef} from "../utils/refs";

import React from "react";

import Popover from "../popover";
import {__DEV__} from "../utils/assertion";

import {useDropdownContext} from "./dropdown-context";

/**
 * DropdownTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const DropdownTrigger = React.forwardRef(
  (props: React.PropsWithChildren<{}>, _: ReactRef<HTMLElement>) => {
    const {children, ...otherProps} = props;
    const {getMenuTriggerProps} = useDropdownContext();

    return <Popover.Trigger {...getMenuTriggerProps(otherProps)}>{children}</Popover.Trigger>;
  },
);

if (__DEV__) {
  DropdownTrigger.displayName = "NextUI.DropdownTrigger";
}

DropdownTrigger.toString = () => ".nextui-dropdown-trigger";

type DropdownTriggerComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

export default DropdownTrigger as DropdownTriggerComponent<
  HTMLElement,
  React.PropsWithChildren<{}>
>;
