"use client";

import type {DateFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {dateFieldVariants} from "@heroui/styles";
import React from "react";
import {DateField as DateFieldPrimitive} from "react-aria-components/DateField";

import {dataAttr} from "../../utils/assertion";
import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * DateField Root
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DateFieldPrimitive<T>>, DateFieldVariants {}

function DateFieldRoot<T extends DateValue>({
  children,
  className,
  fullWidth,
  ...props
}: DateFieldRootProps<T>) {
  const styles = React.useMemo(() => dateFieldVariants({fullWidth}), [fullWidth]);

  return (
    <DateFieldPrimitive
      data-required={dataAttr(props.isRequired)}
      data-slot="date-field"
      {...props}
      className={useResolvedClassName(className, styles)}
    >
      {children}
    </DateFieldPrimitive>
  );
}

DateFieldRoot.displayName = "HeroUI.DateField";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DateFieldRoot};

export type {DateFieldRootProps};
