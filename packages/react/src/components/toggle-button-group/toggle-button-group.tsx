"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ToggleButtonGroupVariants, ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonGroupVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {useSlottedContext} from "react-aria-components/slots";
import {
  ToggleButtonGroupContext as RACToggleButtonGroupContext,
  ToggleButtonGroup as ToggleButtonGroupPrimitive,
} from "react-aria-components/ToggleButtonGroup";

import {composeSlotClassName, useResolvedClassName} from "../../utils";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ToggleButtonGroupContext = {
  slots?: ReturnType<typeof toggleButtonGroupVariants>;
  size?: ToggleButtonVariants["size"];
  isDisabled?: boolean;
};

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContext>({});

// Property name to mark direct children of ToggleButtonGroup
export const TOGGLE_BUTTON_GROUP_CHILD = "__toggle_button_group_child";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonGroupRootProps
  extends ComponentPropsWithRef<typeof ToggleButtonGroupPrimitive>, ToggleButtonGroupVariants {
  /** Size to propagate to all child ToggleButtons */
  size?: ToggleButtonVariants["size"];
  /** Whether the group buttons are visually separated (detached) instead of connected */
  isDetached?: boolean;
}

const ToggleButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  isDetached = false,
  isDisabled,
  orientation: orientationProp,
  size,
  ...rest
}: ToggleButtonGroupRootProps) => {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation = orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = React.useMemo(
    () => toggleButtonGroupVariants({fullWidth, isDetached, orientation}),
    [fullWidth, isDetached, orientation],
  );
  const contextValue = React.useMemo(() => ({slots, size, isDisabled}), [slots, size, isDisabled]);

  return (
    <ToggleButtonGroupContext value={contextValue}>
      <ToggleButtonGroupPrimitive
        className={useResolvedClassName(className, slots.base())}
        data-slot="toggle-button-group"
        isDisabled={isDisabled}
        orientation={orientation}
        {...rest}
      >
        {children}
      </ToggleButtonGroupPrimitive>
    </ToggleButtonGroupContext>
  );
};

ToggleButtonGroupRoot.displayName = "HeroUI.ToggleButtonGroup";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Separator
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonGroupSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const ToggleButtonGroupSeparator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: ToggleButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ToggleButtonGroupSeparatorProps<E>>) => {
  const {slots} = use(ToggleButtonGroupContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="toggle-button-group-separator"
      {...(props as any)}
    />
  );
};

ToggleButtonGroupSeparator.displayName = "HeroUI.ToggleButtonGroup.Separator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot, ToggleButtonGroupSeparator, ToggleButtonGroupContext};

export type {ToggleButtonGroupRootProps, ToggleButtonGroupSeparatorProps};
