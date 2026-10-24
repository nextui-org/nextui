"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ColorSwatchPickerVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {ColorSwatchPickerItemRenderProps} from "react-aria-components/ColorSwatchPicker";

import {colorSwatchPickerVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
  ColorSwatch as ColorSwatchPrimitive,
} from "react-aria-components/ColorSwatchPicker";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Context
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerContext {
  slots?: ReturnType<typeof colorSwatchPickerVariants>;
}

const ColorSwatchPickerContext = createContext<ColorSwatchPickerContext>({});

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPickerItem Context
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerItemContext {
  state?: ColorSwatchPickerItemRenderProps;
}

const ColorSwatchPickerItemContext = createContext<ColorSwatchPickerItemContext>({});

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Root
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerRootProps
  extends ComponentPropsWithRef<typeof ColorSwatchPickerPrimitive>, ColorSwatchPickerVariants {}

const ColorSwatchPickerRoot = ({
  children,
  className,
  layout,
  size,
  variant,
  ...props
}: ColorSwatchPickerRootProps) => {
  const slots = React.useMemo(
    () => colorSwatchPickerVariants({layout, size, variant}),
    [layout, size, variant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <ColorSwatchPickerContext value={contextValue}>
      <ColorSwatchPickerPrimitive
        data-slot="color-swatch-picker"
        {...props}
        className={useResolvedClassName(className, slots.base())}
      >
        {children}
      </ColorSwatchPickerPrimitive>
    </ColorSwatchPickerContext>
  );
};

ColorSwatchPickerRoot.displayName = "HeroUI.ColorSwatchPicker";

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Item
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerItemProps extends ComponentPropsWithRef<
  typeof ColorSwatchPickerItemPrimitive
> {}

const ColorSwatchPickerItem = ({children, className, ...props}: ColorSwatchPickerItemProps) => {
  const {slots} = use(ColorSwatchPickerContext);

  return (
    <ColorSwatchPickerItemPrimitive
      data-slot="color-swatch-picker-item"
      {...props}
      className={useResolvedClassName(className, slots?.item())}
      style={(renderProps) =>
        ({
          "--color-swatch-current": renderProps.color.toString("css"),
        }) as CSSProperties
      }
    >
      {(renderProps) => (
        <ColorSwatchPickerItemContext value={{state: renderProps}}>
          {typeof children === "function" ? children(renderProps) : children}
        </ColorSwatchPickerItemContext>
      )}
    </ColorSwatchPickerItemPrimitive>
  );
};

ColorSwatchPickerItem.displayName = "HeroUI.ColorSwatchPicker.Item";

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Swatch
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerSwatchProps extends ComponentPropsWithRef<typeof ColorSwatchPrimitive> {}

const ColorSwatchPickerSwatch = ({className, ...props}: ColorSwatchPickerSwatchProps) => {
  const {slots} = use(ColorSwatchPickerContext);

  return (
    <ColorSwatchPrimitive
      className={useResolvedClassName(className, slots?.swatch())}
      data-slot="color-swatch-picker-swatch"
      {...props}
    />
  );
};

ColorSwatchPickerSwatch.displayName = "HeroUI.ColorSwatchPicker.Swatch";

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Indicator
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode | ((props: ColorSwatchPickerItemRenderProps) => React.ReactNode);
  className?: string;
}

/**
 * Calculate relative luminance of a color
 * Uses the formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * Returns a value between 0 (black) and 1 (white)
 */
function getColorLuminance(color: ColorSwatchPickerItemRenderProps["color"]): number {
  // Get RGB values (0-255 range)
  const r = color.getChannelValue("red");
  const g = color.getChannelValue("green");
  const b = color.getChannelValue("blue");

  // Normalize to 0-1 and calculate luminance
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

const ColorSwatchPickerIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ColorSwatchPickerIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ColorSwatchPickerIndicatorProps<E>>) => {
  const {slots} = use(ColorSwatchPickerContext);
  const {state} = use(ColorSwatchPickerItemContext);

  // Determine if the background color is light (luminance > 0.5)
  // Use white checkmark on dark backgrounds, black on light backgrounds
  const isLightColor = state?.color ? getColorLuminance(state.color) > 0.5 : false;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as ColorSwatchPickerItemRenderProps))
    ) : children ? (
      children
    ) : (
      <svg
        aria-hidden="true"
        data-slot="color-swatch-picker-checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        viewBox="0 0 12 12"
      >
        <polyline points="2.5 6 5 8.5 9.5 3" />
      </svg>
    );

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-light-color={isLightColor ? "true" : undefined}
      data-slot="color-swatch-picker-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

ColorSwatchPickerIndicator.displayName = "HeroUI.ColorSwatchPicker.Indicator";

/* -------------------------------------------------------------------------------------------------
| * Exports
| * -----------------------------------------------------------------------------------------------*/
export {
  ColorSwatchPickerRoot,
  ColorSwatchPickerItem,
  ColorSwatchPickerSwatch,
  ColorSwatchPickerIndicator,
};

export type {
  ColorSwatchPickerRootProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerSwatchProps,
  ColorSwatchPickerIndicatorProps,
};
