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
  extends ComponentPropsWithRef<typeof SeparatorPrimitive>, SeparatorVariants {
  /** Whether the divider is purely visual and hidden from assistive technology. @default false */
  isDecorative?: boolean;
}

const SeparatorRoot = ({
  className,
  isDecorative = false,
  orientation,
  render,
  variant,
  ...props
}: SeparatorRootProps) => {
  const context = useSlottedContext(SeparatorContext, props.slot);
  const resolvedRender = render ?? context?.render;
  const resolvedOrientation = orientation ?? context?.orientation ?? "horizontal";
  const elementType = props.elementType ?? context?.elementType ?? "div";
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
      render={
        isDecorative
          ? (domProps, values) => {
              const decorativeProps = {
                ...domProps,
                "aria-hidden": true as const,
                "aria-orientation": undefined,
                role: "presentation",
              };

              return resolvedRender
                ? resolvedRender(decorativeProps, values)
                : React.createElement(
                    elementType === "hr" && resolvedOrientation === "vertical"
                      ? "div"
                      : elementType,
                    decorativeProps,
                  );
            }
          : render
      }
    />
  );
};

SeparatorRoot.displayName = "HeroUI.Separator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SeparatorRoot};

export type {SeparatorRootProps};
