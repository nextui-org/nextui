"use client";

import type {ColorSwatchVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";

import {colorSwatchVariants} from "@heroui/styles";
import {useMemo} from "react";
import {ColorSwatch as ColorSwatchPrimitive} from "react-aria-components/ColorSwatch";

import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorSwatch Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchRootProps
  extends ComponentPropsWithRef<typeof ColorSwatchPrimitive>, ColorSwatchVariants {}

const ColorSwatchRoot = ({className, shape, size, style, ...props}: ColorSwatchRootProps) => {
  const styles = useMemo(() => colorSwatchVariants({shape, size}), [shape, size]);
  const resolvedClassName = useResolvedClassName(className, styles);

  return (
    <ColorSwatchPrimitive
      {...props}
      className={resolvedClassName}
      data-slot="color-swatch"
      style={(renderProps) => {
        const userStyle = typeof style === "function" ? style(renderProps) : style;

        return {
          "--color-swatch-current": renderProps.color.toString("css"),
          ...userStyle,
        } as CSSProperties;
      }}
    />
  );
};

ColorSwatchRoot.displayName = "HeroUI.ColorSwatch";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorSwatchRoot};

export type {ColorSwatchRootProps};
