"use client";

import type {ColorAreaVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";

import {colorAreaVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  ColorArea as ColorAreaPrimitive,
  ColorThumb as ColorThumbPrimitive,
} from "react-aria-components/ColorArea";

import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorArea Context
 * -----------------------------------------------------------------------------------------------*/
interface ColorAreaContext {
  slots?: ReturnType<typeof colorAreaVariants>;
}

const ColorAreaContext = createContext<ColorAreaContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorArea Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorAreaRootProps
  extends ComponentPropsWithRef<typeof ColorAreaPrimitive>, ColorAreaVariants {}

const ColorAreaRoot = ({children, className, showDots, style, ...props}: ColorAreaRootProps) => {
  const slots = React.useMemo(() => colorAreaVariants({showDots}), [showDots]);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <ColorAreaContext value={contextValue}>
      <ColorAreaPrimitive
        {...props}
        className={useResolvedClassName(className, slots.base())}
        data-slot="color-area"
        style={(renderProps) => {
          const userStyle = typeof style === "function" ? style(renderProps) : style;

          return {
            "--color-area-background": renderProps.defaultStyle.background,
            ...userStyle,
          } as CSSProperties;
        }}
      >
        {children}
      </ColorAreaPrimitive>
    </ColorAreaContext>
  );
};

ColorAreaRoot.displayName = "HeroUI.ColorArea";

/* -------------------------------------------------------------------------------------------------
 * ColorArea Thumb
 * -----------------------------------------------------------------------------------------------*/
interface ColorAreaThumbProps extends ComponentPropsWithRef<typeof ColorThumbPrimitive> {}

const ColorAreaThumb = ({className, style, ...props}: ColorAreaThumbProps) => {
  const {slots} = use(ColorAreaContext);

  return (
    <ColorThumbPrimitive
      className={useResolvedClassName(className, slots?.thumb())}
      data-slot="color-area-thumb"
      style={(renderProps) => {
        const userStyle = typeof style === "function" ? style(renderProps) : style;

        return {
          "--color-area-thumb-color": renderProps.defaultStyle.backgroundColor,
          ...userStyle,
        } as CSSProperties;
      }}
      {...props}
    />
  );
};

ColorAreaThumb.displayName = "HeroUI.ColorArea.Thumb";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorAreaRoot, ColorAreaThumb};

export type {ColorAreaRootProps, ColorAreaThumbProps};
