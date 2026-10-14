"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {ComboBoxVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactElement, ReactNode} from "react";
import type {ButtonProps} from "react-aria-components/Button";
import type {ComboBoxValueRenderProps} from "react-aria-components/ComboBox";

import {comboBoxVariants} from "@heroui/styles";
import React, {Children, createContext, isValidElement, use} from "react";
import {useIsHidden} from "react-aria/private/collections/Hidden";
import {Button} from "react-aria-components/Button";
import {
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  ComboBoxValue as ComboBoxValuePrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/ComboBox";
import {OverlayTriggerStateContext} from "react-aria-components/Dialog";
import {Group as GroupPrimitive} from "react-aria-components/Group";

import {dataAttr} from "../../utils/assertion";
import {createCollectionSlot} from "../../utils/collection-prop-injection";
import {useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {FieldSlotsGate} from "../../utils/field-slots-gate";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Context
 * -----------------------------------------------------------------------------------------------*/
type ComboBoxContext = {
  slots?: ReturnType<typeof comboBoxVariants>;
  variant?: "primary" | "secondary";
};

const ComboBoxContext = createContext<ComboBoxContext>({});

/* -------------------------------------------------------------------------------------------------
 * ComboBox Collection Slot
 * -----------------------------------------------------------------------------------------------*/
type InputGroupInjectedProps = {
  className?: string;
  render?: DOMRenderProps<"div", undefined>["render"];
  siblings?: ReactElement[];
} & Record<string, unknown>;

const inputGroupSlot = createCollectionSlot<InputGroupInjectedProps>("combo-box.inputGroup");

const EMPTY_SIBLINGS: ReactElement[] = [];

/* -------------------------------------------------------------------------------------------------
 * ComboBox Root
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof ComboBoxPrimitive<T, M>>, ComboBoxVariants {
  items?: Iterable<T>;
  /**
   * The variant of the combo box.
   * @default "primary"
   */
  variant?: "primary" | "secondary";
}

const ComboBoxRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  menuTrigger = "focus",
  variant,
  ...props
}: ComboBoxRootProps<T, M>) => {
  const slots = React.useMemo(() => comboBoxVariants({fullWidth}), [fullWidth]);
  const contextValue = React.useMemo(() => ({slots, variant}), [slots, variant]);

  return (
    <FieldSlotsGate>
      <ComboBoxContext value={contextValue}>
        <ComboBoxPrimitive
          data-slot="combo-box"
          menuTrigger={menuTrigger}
          {...props}
          className={useResolvedClassName(className, slots?.base())}
        >
          {children}
        </ComboBoxPrimitive>
      </ComboBoxContext>
    </FieldSlotsGate>
  );
};

ComboBoxRoot.displayName = "HeroUI.ComboBox";

/* -------------------------------------------------------------------------------------------------
 * ComboBox InputGroup
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxInputGroupProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ComboBoxInputGroup = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  render,
  ...containerProps
}: ComboBoxInputGroupProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ComboBoxInputGroupProps<E>>) => {
  const childArray = Children.toArray(children).filter(isValidElement) as ReactElement[];
  // Trigger is last (Input + Trigger); inject only into it so Input stays out of the slot props.
  const trigger = childArray.at(-1);
  const siblings = childArray.slice(0, -1);

  if (!trigger) {
    return null;
  }

  return (
    <inputGroupSlot.Injector
      {...({
        ...containerProps,
        className,
        render,
        siblings,
      } as InputGroupInjectedProps)}
    >
      {trigger}
    </inputGroupSlot.Injector>
  );
};

ComboBoxInputGroup.displayName = "HeroUI.ComboBox.InputGroup";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Value
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxValueProps<T extends object> extends ComponentPropsWithRef<
  typeof ComboBoxValuePrimitive<T>
> {}

const ComboBoxValue = <T extends object = object>({
  children,
  className,
  ...props
}: ComboBoxValueProps<T>) => {
  const {slots} = use(ComboBoxContext);

  return (
    <ComboBoxValuePrimitive
      className={useResolvedClassName(className, slots?.value())}
      data-slot="combo-box-value"
      {...props}
    >
      {children}
    </ComboBoxValuePrimitive>
  );
};

ComboBoxValue.displayName = "HeroUI.ComboBox.Value";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxTriggerProps extends ButtonProps {
  className?: string;
  children?: ReactNode;
}

const ComboBoxTrigger = ({children, className, ...props}: ComboBoxTriggerProps) => {
  const {slots} = use(ComboBoxContext);
  const state = use(ComboBoxStateContext);
  const isHidden = useIsHidden();
  const [inputGroupProps, restProps] = inputGroupSlot.useSlot(props);
  const triggerClassName = useResolvedClassName(className, slots?.trigger());
  const inputGroupClassName = useResolvedClassName(inputGroupProps?.className, slots?.inputGroup());

  if (!inputGroupProps) {
    return (
      <Button
        className={triggerClassName}
        data-open={dataAttr(state?.isOpen)}
        data-slot="combo-box-trigger"
        {...restProps}
      >
        {children ?? <IconChevronDown data-slot="combo-box-trigger-default-icon" />}
      </Button>
    );
  }

  if (isHidden) {
    return null;
  }

  const {render: containerRender, siblings = EMPTY_SIBLINGS, ...containerRest} = inputGroupProps;

  return (
    <GroupPrimitive
      {...(containerRest as ComponentPropsWithRef<typeof GroupPrimitive>)}
      className={inputGroupClassName}
      data-slot="combo-box-input-group"
      render={(renderProps) => {
        const {
          children: _groupChildren,
          className: groupClassName,
          ref: groupRef,
          ...groupRest
        } = renderProps as typeof renderProps & {ref?: React.Ref<HTMLDivElement>};

        return (
          <dom.div
            className={groupClassName}
            data-slot="combo-box-input-group"
            render={containerRender as DOMRenderProps<"div", undefined>["render"]}
            {...(groupRest as React.HTMLAttributes<HTMLDivElement>)}
            ref={groupRef}
          >
            {siblings}
            <Button
              className={triggerClassName}
              data-open={dataAttr(state?.isOpen)}
              data-slot="combo-box-trigger"
              {...restProps}
            >
              {children ?? <IconChevronDown data-slot="combo-box-trigger-default-icon" />}
            </Button>
          </dom.div>
        );
      }}
    />
  );
};

ComboBoxTrigger.displayName = "HeroUI.ComboBox.Trigger";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Popover
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const ComboBoxPopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement = "bottom",
  ref,
  ...props
}: ComboBoxPopoverProps) => {
  const {slots} = use(ComboBoxContext);
  const overlayState = use(OverlayTriggerStateContext);
  const {isExiting, ref: overlayRef} = useOverlayExitHold(
    resolveOverlayOpen(isOpen, defaultOpen, overlayState),
    {ref},
  );

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        ref={overlayRef}
        className={useResolvedClassName(className, slots?.popover())}
        data-slot="combo-box-popover"
        defaultOpen={defaultOpen}
        isExiting={isExiting || isExitingProp}
        isOpen={isOpen}
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

ComboBoxPopover.displayName = "HeroUI.ComboBox.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  ComboBoxRoot,
  ComboBoxInputGroup,
  ComboBoxValue,
  ComboBoxTrigger,
  ComboBoxPopover,
  ComboBoxContext,
};

export type {
  ComboBoxRootProps,
  ComboBoxInputGroupProps,
  ComboBoxValueProps,
  ComboBoxValueRenderProps,
  ComboBoxTriggerProps,
  ComboBoxPopoverProps,
};
