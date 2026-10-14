"use client";

import type {FieldErrorVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {fieldErrorVariants} from "@heroui/styles";
import {useMemo} from "react";
import {FieldError as FieldErrorPrimitive} from "react-aria-components/FieldError";

import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Field Error Root
 * -----------------------------------------------------------------------------------------------*/
interface FieldErrorRootProps
  extends ComponentPropsWithRef<typeof FieldErrorPrimitive>, FieldErrorVariants {}

const FieldErrorRoot = ({children, className, ...rest}: FieldErrorRootProps) => {
  const styles = useMemo(() => fieldErrorVariants(), []);
  const resolvedClassName = useResolvedClassName(className, styles);

  return (
    <FieldErrorPrimitive
      data-visible
      className={resolvedClassName}
      data-slot="field-error"
      {...rest}
    >
      {children}
    </FieldErrorPrimitive>
  );
};

FieldErrorRoot.displayName = "HeroUI.FieldError";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldErrorRoot};

export type {FieldErrorRootProps};
