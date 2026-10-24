"use client";

import type {ColorFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {Color} from "react-aria-components/ColorArea";

import {colorFieldVariants} from "@heroui/styles";
import React from "react";
import {ColorField as ColorFieldPrimitive} from "react-aria-components/ColorField";

import {dataAttr} from "../../utils/assertion";
import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorField Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorFieldRootProps
  extends ComponentPropsWithRef<typeof ColorFieldPrimitive>, ColorFieldVariants {}

function ColorFieldRoot({children, className, fullWidth, ...props}: ColorFieldRootProps) {
  const styles = React.useMemo(() => colorFieldVariants({fullWidth}), [fullWidth]);

  return (
    <ColorFieldPrimitive
      data-required={dataAttr(props.isRequired)}
      data-slot="color-field"
      {...props}
      className={useResolvedClassName(className, styles)}
    >
      {children}
    </ColorFieldPrimitive>
  );
}

ColorFieldRoot.displayName = "HeroUI.ColorField";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorFieldRoot};

export type {ColorFieldRootProps, Color as ColorValue};
