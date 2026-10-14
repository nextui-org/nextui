"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ProgressBarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ProgressBarRenderProps} from "react-aria-components/ProgressBar";

import {progressBarVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components/ProgressBar";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Context
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarContext {
  slots?: ReturnType<typeof progressBarVariants>;
  state?: ProgressBarRenderProps;
}

const ProgressBarContext = createContext<ProgressBarContext>({});

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Root
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarRootProps
  extends ComponentPropsWithRef<typeof ProgressBarPrimitive>, ProgressBarVariants {}

const ProgressBarRoot = ({children, className, color, size, ...props}: ProgressBarRootProps) => {
  const slots = React.useMemo(() => progressBarVariants({color, size}), [color, size]);

  return (
    <ProgressBarPrimitive
      data-slot="progress-bar"
      {...props}
      className={useResolvedClassName(className, slots.base())}
    >
      {(values) => (
        <ProgressBarContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ProgressBarContext>
      )}
    </ProgressBarPrimitive>
  );
};

ProgressBarRoot.displayName = "HeroUI.ProgressBar";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Output
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarOutputProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ProgressBarOutput = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ProgressBarOutputProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarOutputProps<E>>) => {
  const {slots, state} = use(ProgressBarContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.output, className)}
      data-slot="progress-bar-output"
      {...(props as any)}
    >
      {children ?? state?.valueText}
    </dom.span>
  );
};

ProgressBarOutput.displayName = "HeroUI.ProgressBar.Output";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Track
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarTrackProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ProgressBarTrack = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ProgressBarTrackProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarTrackProps<E>>) => {
  const {slots} = use(ProgressBarContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.track, className)}
      data-slot="progress-bar-track"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

ProgressBarTrack.displayName = "HeroUI.ProgressBar.Track";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Fill
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ProgressBarFill = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: ProgressBarFillProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarFillProps<E>>) => {
  const {slots, state} = use(ProgressBarContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.fill, className)}
      data-slot="progress-bar-fill"
      style={{
        ...style,
        width: state?.isIndeterminate ? undefined : `${state?.percentage ?? 0}%`,
      }}
      {...(props as any)}
    />
  );
};

ProgressBarFill.displayName = "HeroUI.ProgressBar.Fill";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ProgressBarRoot, ProgressBarOutput, ProgressBarTrack, ProgressBarFill};

export type {
  ProgressBarRootProps,
  ProgressBarOutputProps,
  ProgressBarTrackProps,
  ProgressBarFillProps,
};
