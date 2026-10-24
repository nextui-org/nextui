"use client";

import type {ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonVariants} from "@heroui/styles";
import {use, useMemo} from "react";
import {ToggleButton as ToggleButtonPrimitive} from "react-aria-components/ToggleButton";

import {useResolvedClassName} from "../../utils";
import {ToggleButtonGroupContext} from "../toggle-button-group";

/* -------------------------------------------------------------------------------------------------
 * ToggleButton Root
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonRootProps
  extends ComponentPropsWithRef<typeof ToggleButtonPrimitive>, ToggleButtonVariants {}

const ToggleButtonRoot = ({
  children,
  className,
  isIconOnly,
  size,
  style,
  variant,
  ...rest
}: ToggleButtonRootProps) => {
  const groupContext = use(ToggleButtonGroupContext);

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? groupContext?.size;

  const styles = useMemo(
    () =>
      toggleButtonVariants({
        isIconOnly,
        size: finalSize,
        variant,
      }),
    [finalSize, isIconOnly, variant],
  );
  const resolvedClassName = useResolvedClassName(className, styles);

  return (
    <ToggleButtonPrimitive
      className={resolvedClassName}
      data-slot="toggle-button"
      style={style}
      {...rest}
    >
      {children}
    </ToggleButtonPrimitive>
  );
};

ToggleButtonRoot.displayName = "HeroUI.ToggleButton";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonRoot};

export type {ToggleButtonRootProps};
