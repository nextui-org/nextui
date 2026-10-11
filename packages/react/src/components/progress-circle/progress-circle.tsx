"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ProgressCircleVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ProgressBarRenderProps} from "react-aria-components/ProgressBar";

import {progressCircleVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components/ProgressBar";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Constants
 * -----------------------------------------------------------------------------------------------*/
const STROKE_WIDTH = 4;
const CENTER = 18;
const RADIUS = CENTER - STROKE_WIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Context
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleContext {
  slots?: ReturnType<typeof progressCircleVariants>;
  state?: ProgressBarRenderProps;
}

const ProgressCircleContext = createContext<ProgressCircleContext>({});

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Root
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleRootProps
  extends ComponentPropsWithRef<typeof ProgressBarPrimitive>, ProgressCircleVariants {}

const ProgressCircleRoot = ({
  children,
  className,
  color,
  size,
  ...props
}: ProgressCircleRootProps) => {
  const slots = React.useMemo(() => progressCircleVariants({color, size}), [color, size]);

  return (
    <ProgressBarPrimitive
      data-slot="progress-circle"
      {...props}
      className={useResolvedClassName(className, slots.base())}
    >
      {(values) => (
        <ProgressCircleContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ProgressCircleContext>
      )}
    </ProgressBarPrimitive>
  );
};

ProgressCircleRoot.displayName = "HeroUI.ProgressCircle";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Track
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleTrackProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ProgressCircleTrack = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: ProgressCircleTrackProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleTrackProps<E>>) => {
  const {slots} = use(ProgressCircleContext);

  return (
    <dom.svg
      className={composeSlotClassName(slots?.track, className)}
      data-slot="progress-circle-track"
      fill="none"
      viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
      {...(props as any)}
    >
      {children}
    </dom.svg>
  );
};

ProgressCircleTrack.displayName = "HeroUI.ProgressCircle.Track";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle TrackCircle
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleTrackCircleProps<
  E extends keyof React.JSX.IntrinsicElements = "circle",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ProgressCircleTrackCircle = <E extends keyof React.JSX.IntrinsicElements = "circle">({
  className,
  ...props
}: ProgressCircleTrackCircleProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleTrackCircleProps<E>>) => {
  const {slots} = use(ProgressCircleContext);

  return (
    <dom.circle
      className={composeSlotClassName(slots?.trackCircle, className)}
      cx={CENTER}
      cy={CENTER}
      data-slot="progress-circle-track-circle"
      r={RADIUS}
      strokeWidth={STROKE_WIDTH}
      {...(props as any)}
    />
  );
};

ProgressCircleTrackCircle.displayName = "HeroUI.ProgressCircle.TrackCircle";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle FillCircle
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleFillCircleProps<
  E extends keyof React.JSX.IntrinsicElements = "circle",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ProgressCircleFillCircle = <E extends keyof React.JSX.IntrinsicElements = "circle">({
  className,
  ...props
}: ProgressCircleFillCircleProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleFillCircleProps<E>>) => {
  const {slots, state} = use(ProgressCircleContext);
  const percentage = state?.percentage ?? 0;
  const isIndeterminate = state?.isIndeterminate ?? false;
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <dom.circle
      className={composeSlotClassName(slots?.fillCircle, className)}
      cx={CENTER}
      cy={CENTER}
      data-slot="progress-circle-fill-circle"
      r={RADIUS}
      strokeDasharray={CIRCUMFERENCE}
      strokeDashoffset={isIndeterminate ? CIRCUMFERENCE * 0.75 : strokeDashoffset}
      strokeLinecap="round"
      strokeWidth={STROKE_WIDTH}
      transform={`rotate(-90 ${CENTER} ${CENTER})`}
      {...(props as any)}
    />
  );
};

ProgressCircleFillCircle.displayName = "HeroUI.ProgressCircle.FillCircle";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleTrackCircle,
  ProgressCircleFillCircle,
};

export type {
  ProgressCircleRootProps,
  ProgressCircleTrackProps,
  ProgressCircleTrackCircleProps,
  ProgressCircleFillCircleProps,
};
