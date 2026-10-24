"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {MeterVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {MeterRenderProps} from "react-aria-components/Meter";

import {meterVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Meter as MeterPrimitive} from "react-aria-components/Meter";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Meter Context
 * -----------------------------------------------------------------------------------------------*/
interface MeterContext {
  slots?: ReturnType<typeof meterVariants>;
  state?: MeterRenderProps;
}

const MeterContext = createContext<MeterContext>({});

/* -------------------------------------------------------------------------------------------------
 * Meter Root
 * -----------------------------------------------------------------------------------------------*/
interface MeterRootProps extends ComponentPropsWithRef<typeof MeterPrimitive>, MeterVariants {}

const MeterRoot = ({children, className, color, size, ...props}: MeterRootProps) => {
  const slots = React.useMemo(() => meterVariants({color, size}), [color, size]);

  return (
    <MeterPrimitive
      data-slot="meter"
      {...props}
      className={useResolvedClassName(className, slots.base())}
    >
      {(values) => (
        <MeterContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </MeterContext>
      )}
    </MeterPrimitive>
  );
};

MeterRoot.displayName = "HeroUI.Meter";

/* -------------------------------------------------------------------------------------------------
 * Meter Output
 * -----------------------------------------------------------------------------------------------*/
interface MeterOutputProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const MeterOutput = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: MeterOutputProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterOutputProps<E>>) => {
  const {slots, state} = use(MeterContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.output, className)}
      data-slot="meter-output"
      {...(props as any)}
    >
      {children ?? state?.valueText}
    </dom.span>
  );
};

MeterOutput.displayName = "HeroUI.Meter.Output";

/* -------------------------------------------------------------------------------------------------
 * Meter Track
 * -----------------------------------------------------------------------------------------------*/
interface MeterTrackProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const MeterTrack = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: MeterTrackProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterTrackProps<E>>) => {
  const {slots} = use(MeterContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.track, className)}
      data-slot="meter-track"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

MeterTrack.displayName = "HeroUI.Meter.Track";

/* -------------------------------------------------------------------------------------------------
 * Meter Fill
 * -----------------------------------------------------------------------------------------------*/
interface MeterFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const MeterFill = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: MeterFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterFillProps<E>>) => {
  const {slots, state} = use(MeterContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.fill, className)}
      data-slot="meter-fill"
      style={{
        ...style,
        width: `${state?.percentage ?? 0}%`,
      }}
      {...(props as any)}
    />
  );
};

MeterFill.displayName = "HeroUI.Meter.Fill";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MeterRoot, MeterOutput, MeterTrack, MeterFill};

export type {MeterRootProps, MeterOutputProps, MeterTrackProps, MeterFillProps};
