"use client";

import type {ButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {buttonVariants} from "@heroui/styles";
import {use, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {useResolvedClassName} from "../../utils";
import {BUTTON_GROUP_CHILD, ButtonGroupContext} from "../button-group";

/* -------------------------------------------------------------------------------------------------
 * Button Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {
  [BUTTON_GROUP_CHILD]?: boolean;
}

const ButtonRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  isIconOnly,
  size,
  slot,
  style,
  variant,
  [BUTTON_GROUP_CHILD]: isButtonGroupChild,
  ...rest
}: ButtonRootProps) => {
  const buttonGroupContext = use(ButtonGroupContext);

  // Only use context if this button is a direct child of ButtonGroup
  const shouldUseContext = isButtonGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? buttonGroupContext?.size : undefined);
  const finalVariant = variant ?? (shouldUseContext ? buttonGroupContext?.variant : undefined);
  const finalIsDisabled =
    isDisabled ?? (shouldUseContext ? buttonGroupContext?.isDisabled : undefined);
  const finalFullWidth =
    fullWidth ?? (shouldUseContext ? buttonGroupContext?.fullWidth : undefined);

  const styles = useMemo(
    () =>
      buttonVariants({
        fullWidth: finalFullWidth,
        isIconOnly,
        size: finalSize,
        variant: finalVariant,
      }),
    [finalFullWidth, finalSize, finalVariant, isIconOnly],
  );
  const resolvedClassName = useResolvedClassName(className, styles);

  return (
    <ButtonPrimitive
      className={resolvedClassName}
      data-slot="button"
      isDisabled={finalIsDisabled}
      slot={slot}
      style={style}
      {...rest}
    >
      {children}
    </ButtonPrimitive>
  );
};

ButtonRoot.displayName = "HeroUI.Button";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps};
