"use client";

import type {SeparatorVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {separatorVariants} from "@heroui/styles";
import React, {useMemo} from "react";
import {SeparatorContext, Separator as SeparatorPrimitive} from "react-aria-components/Separator";
import {useSlottedContext} from "react-aria-components/slots";

/* -------------------------------------------------------------------------------------------------
 * Separator Root
 * -----------------------------------------------------------------------------------------------*/
interface SeparatorRootProps
  extends ComponentPropsWithRef<typeof SeparatorPrimitive>, SeparatorVariants {}

const SeparatorRoot = ({className, orientation, variant, ...props}: SeparatorRootProps) => {
  const context = useSlottedContext(SeparatorContext);
  const resolvedOrientation = orientation ?? context?.orientation ?? "horizontal";
  const resolvedClassName = useMemo(
    () =>
      separatorVariants({
        className,
        orientation: resolvedOrientation,
        variant,
      }),
    [className, resolvedOrientation, variant],
  );

  return (
    <SeparatorPrimitive
      className={resolvedClassName}
      data-orientation={resolvedOrientation}
      data-slot="separator"
      orientation={resolvedOrientation}
      {...props}
    />
  );
};

SeparatorRoot.displayName = "HeroUI.Separator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SeparatorRoot};

export type {SeparatorRootProps};
