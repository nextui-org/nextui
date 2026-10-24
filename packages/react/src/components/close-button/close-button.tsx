"use client";

import type {CloseButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {closeButtonVariants} from "@heroui/styles";
import {useMemo} from "react";
import {ButtonContext, Button as ButtonPrimitive} from "react-aria-components/Button";
import {useSlottedContext} from "react-aria-components/slots";

import {useResolvedClassName} from "../../utils";
import {CloseIcon} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Close Button Root
 * -----------------------------------------------------------------------------------------------*/
interface CloseButtonRootProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, CloseButtonVariants {}

const CloseButtonRoot = ({
  "aria-label": ariaLabel,
  children,
  className,
  slot,
  style,
  variant,
  ...rest
}: CloseButtonRootProps) => {
  const styles = useMemo(() => closeButtonVariants({variant}), [variant]);
  const slotProps = useSlottedContext(ButtonContext, slot);
  const resolvedAriaLabel =
    ariaLabel ??
    (rest["aria-labelledby"] != null ||
    (slotProps != null && (slotProps["aria-label"] != null || slotProps["aria-labelledby"] != null))
      ? undefined
      : "Close");

  return (
    <ButtonPrimitive
      aria-label={resolvedAriaLabel}
      className={useResolvedClassName(className, styles)}
      data-slot="close-button"
      slot={slot}
      style={style}
      type="button"
      {...rest}
    >
      {typeof children === "function"
        ? children
        : (children ?? <CloseIcon data-slot="close-button-icon" />)}
    </ButtonPrimitive>
  );
};

CloseButtonRoot.displayName = "HeroUI.CloseButton";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {CloseButtonRoot};

export type {CloseButtonRootProps};
