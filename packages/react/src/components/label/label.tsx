"use client";

import type {LabelVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {labelVariants} from "@heroui/styles";
import {useMemo} from "react";
import {Label as LabelPrimitive} from "react-aria-components/Label";

/* -------------------------------------------------------------------------------------------------
 * Label Root
 * -----------------------------------------------------------------------------------------------*/
interface LabelRootProps extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

const LabelRoot = ({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) => {
  const resolvedClassName = useMemo(
    () => labelVariants({className, isDisabled, isInvalid, isRequired}),
    [className, isDisabled, isInvalid, isRequired],
  );

  return (
    <LabelPrimitive className={resolvedClassName} data-slot="label" {...rest}>
      {children}
    </LabelPrimitive>
  );
};

LabelRoot.displayName = "HeroUI.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LabelRoot};

export type {LabelRootProps};
