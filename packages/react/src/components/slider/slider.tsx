"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SliderVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {SliderRenderProps} from "react-aria-components/Slider";

import {sliderVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  SliderOutput as SliderOutputPrimitive,
  Slider as SliderPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "react-aria-components/Slider";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Component Status: Preview
 * -----------------------------------------------------------------------------------------------*/

// TODO: steps support
// TODO: marks support
// TODO: rtl support

/* -------------------------------------------------------------------------------------------------
 * Slider Context
 * -----------------------------------------------------------------------------------------------*/
interface SliderContext {
  slots?: ReturnType<typeof sliderVariants>;
  state?: SliderRenderProps;
}

const SliderContext = createContext<SliderContext>({});

/* -------------------------------------------------------------------------------------------------
 * Slider Root
 * -----------------------------------------------------------------------------------------------*/
interface SliderRootProps extends ComponentPropsWithRef<typeof SliderPrimitive>, SliderVariants {}

const SliderRoot = ({
  children,
  className,
  orientation = "horizontal",
  ...props
}: SliderRootProps) => {
  const slots = React.useMemo(() => sliderVariants({}), []);

  return (
    <SliderPrimitive
      data-slot="slider"
      orientation={orientation}
      {...props}
      className={useResolvedClassName(className, slots.base())}
    >
      {(values) => (
        <SliderContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </SliderContext>
      )}
    </SliderPrimitive>
  );
};

SliderRoot.displayName = "HeroUI.Slider";

/* -------------------------------------------------------------------------------------------------
 * Slider Output
 * -----------------------------------------------------------------------------------------------*/
interface SliderOutputProps extends ComponentPropsWithRef<typeof SliderOutputPrimitive> {}

const SliderOutput = ({children, className, ...props}: SliderOutputProps) => {
  const {slots} = use(SliderContext);

  return (
    <SliderOutputPrimitive
      className={useResolvedClassName(className, slots?.output())}
      data-slot="slider-output"
      {...props}
    >
      {children
        ? children
        : ({state}) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
    </SliderOutputPrimitive>
  );
};

SliderOutput.displayName = "HeroUI.Slider.Output";

/* -------------------------------------------------------------------------------------------------
 * Slider Track
 * -----------------------------------------------------------------------------------------------*/
interface SliderTrackProps extends ComponentPropsWithRef<typeof SliderTrackPrimitive> {}

const SliderTrack = ({children, className, ...props}: SliderTrackProps) => {
  const {slots, state} = use(SliderContext);

  const {getThumbPercent, values} = state?.state || {};

  const singleThumb = values?.length && values.length === 1;

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const fillWidth = (endOffset! - startOffset!) * 100;

  return (
    <SliderTrackPrimitive
      className={useResolvedClassName(className, slots?.track())}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-track"
      {...(singleThumb
        ? {
            "data-fill-start": dataAttr(fillWidth > 0),
            "data-fill-end": dataAttr(fillWidth == 100),
          }
        : {
            "data-fill-start": dataAttr(startOffset == 0),
            "data-fill-end": dataAttr(startOffset! * 100 + fillWidth == 100),
          })}
      {...props}
    >
      {children}
    </SliderTrackPrimitive>
  );
};

SliderTrack.displayName = "HeroUI.Slider.Track";

/* -------------------------------------------------------------------------------------------------
 * Slider Fill
 * -----------------------------------------------------------------------------------------------*/
interface SliderFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const SliderFill = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: SliderFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderFillProps<E>>) => {
  const {slots, state} = use(SliderContext);

  const {getThumbPercent, orientation, values} = state?.state || {};

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const isVertical = orientation === "vertical";

  return (
    <dom.div
      className={composeSlotClassName(slots?.fill, className)}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-fill"
      style={{
        ...style,
        // TODO: rtl support
        [isVertical ? "bottom" : "left"]: `${startOffset! * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset! - startOffset!) * 100}%`,
            }
          : {
              width: `${(endOffset! - startOffset!) * 100}%`,
            }),
      }}
      {...(props as any)}
    />
  );
};

SliderFill.displayName = "HeroUI.Slider.Fill";

/* -------------------------------------------------------------------------------------------------
 * Slider Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SliderThumbProps extends ComponentPropsWithRef<typeof SliderThumbPrimitive> {}

const SliderThumb = ({children, className, ...props}: SliderThumbProps) => {
  const {slots} = use(SliderContext);

  return (
    <SliderThumbPrimitive
      className={useResolvedClassName(className, slots?.thumb())}
      data-slot="slider-thumb"
      {...props}
    >
      {children}
    </SliderThumbPrimitive>
  );
};

SliderThumb.displayName = "HeroUI.Slider.Thumb";

/* -------------------------------------------------------------------------------------------------
 * TODO: Slider Marks
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarksProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const SliderMarks = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: SliderMarksProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderMarksProps<E>>) => {
  const {slots} = use(SliderContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.marks, className)}
      data-slot="slider-marks"
      {...(props as any)}
    />
  );
};

SliderMarks.displayName = "HeroUI.Slider.Marks";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SliderRoot, SliderOutput, SliderTrack, SliderFill, SliderThumb, SliderMarks};

export type {
  SliderRootProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderMarksProps,
};
