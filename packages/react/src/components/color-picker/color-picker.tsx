"use client";

import type {SurfaceVariants} from "../surface";
import type {ColorPickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ColorPickerProps as ColorPickerPrimitiveProps} from "react-aria-components/ColorPicker";

import {colorPickerVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {ColorPicker as ColorPickerPrimitive} from "react-aria-components/ColorPicker";
import {
  DialogTrigger as DialogTriggerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/Popover";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {usePopoverExitHold} from "../../utils/use-popover-exit-hold";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Context
 * -----------------------------------------------------------------------------------------------*/
type ColorPickerContext = {
  slots?: ReturnType<typeof colorPickerVariants>;
};

const ColorPickerContext = createContext<ColorPickerContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerRootProps
  extends Omit<ColorPickerPrimitiveProps, "children">, ColorPickerVariants {
  /** Additional class name for the wrapper element */
  className?: string;
  /** Content of the color picker (Trigger, Popover, etc.) */
  children: React.ReactNode;
}

const ColorPickerRoot = ({children, className, ...props}: ColorPickerRootProps) => {
  const slots = React.useMemo(() => colorPickerVariants(), []);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <ColorPickerContext value={contextValue}>
      <ColorPickerPrimitive {...props}>
        <DialogTriggerPrimitive>
          <div className={composeSlotClassName(slots?.base, className)} data-slot="color-picker">
            {children}
          </div>
        </DialogTriggerPrimitive>
      </ColorPickerPrimitive>
    </ColorPickerContext>
  );
};

ColorPickerRoot.displayName = "HeroUI.ColorPicker";

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const ColorPickerTrigger = ({children, className, ...props}: ColorPickerTriggerProps) => {
  const {slots} = use(ColorPickerContext);

  return (
    <ButtonPrimitive
      className={useResolvedClassName(className, slots?.trigger())}
      data-slot="color-picker-trigger"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

ColorPickerTrigger.displayName = "HeroUI.ColorPicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const ColorPickerPopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement = "bottom left",
  ref,
  ...props
}: ColorPickerPopoverProps) => {
  const {slots} = use(ColorPickerContext);
  const {isExiting, ref: overlayRef} = usePopoverExitHold({...props, defaultOpen, isOpen}, {ref});

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
        data-slot="color-picker-popover"
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

ColorPickerPopover.displayName = "HeroUI.ColorPicker.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorPickerRoot, ColorPickerTrigger, ColorPickerPopover};

export type {ColorPickerRootProps, ColorPickerTriggerProps, ColorPickerPopoverProps};
