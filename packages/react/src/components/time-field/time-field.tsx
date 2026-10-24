"use client";

import type {TimeFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {TimeValue} from "react-aria-components/TimeField";

import {timeFieldVariants} from "@heroui/styles";
import React from "react";
import {TimeField as TimeFieldPrimitive} from "react-aria-components/TimeField";

import {dataAttr} from "../../utils/assertion";
import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * TimeField Root
 * -----------------------------------------------------------------------------------------------*/
interface TimeFieldRootProps<T extends TimeValue>
  extends ComponentPropsWithRef<typeof TimeFieldPrimitive<T>>, TimeFieldVariants {}

function TimeFieldRoot<T extends TimeValue>({
  children,
  className,
  fullWidth,
  ...props
}: TimeFieldRootProps<T>) {
  const styles = React.useMemo(() => timeFieldVariants({fullWidth}), [fullWidth]);

  return (
    <TimeFieldPrimitive
      data-required={dataAttr(props.isRequired)}
      data-slot="time-field"
      {...props}
      className={useResolvedClassName(className, styles)}
    >
      {children}
    </TimeFieldPrimitive>
  );
}

TimeFieldRoot.displayName = "HeroUI.TimeField";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TimeFieldRoot};

export type {TimeFieldRootProps};
