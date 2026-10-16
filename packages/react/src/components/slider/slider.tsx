"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SliderVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {SliderRenderProps} from "react-aria-components/Slider";

import {sliderVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {useLocale} from "react-aria-components/I18nProvider";
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
            "data-fill-end": dataAttr(fillWidth == 100),
            "data-fill-start": dataAttr(fillWidth > 0),
          }
        : {
            "data-fill-end": dataAttr(startOffset! * 100 + fillWidth == 100),
            "data-fill-start": dataAttr(startOffset == 0),
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
  const {direction} = useLocale();

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
        // Match the locale direction used by React Aria's thumb positioning.
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${startOffset! * 100}%`,
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
 * Slider Indicators
 * -----------------------------------------------------------------------------------------------*/
function getIndicatorProps(state: SliderRenderProps["state"], value: number, direction: string) {
  const minValue = state.getThumbMinValue(0);
  const maxValue = state.getThumbMaxValue(state.values.length - 1);
  const startValue = state.values.length > 1 ? state.values[0]! : minValue;
  const endValue = state.values[state.values.length - 1]!;
  const percent = minValue === maxValue ? 0 : state.getValuePercent(value);

  return {
    "data-disabled": dataAttr(state.isDisabled),
    "data-filled": dataAttr(value >= startValue && value <= endValue),
    "data-value": value,
    style: {
      [state.orientation === "vertical" ? "bottom" : direction === "rtl" ? "right" : "left"]:
        `${percent * 100}%`,
    },
  };
}

function getDecimalPlaces(value: number) {
  const [coefficient, exponent = "0"] = value.toString().split("e");

  return Math.max(0, (coefficient!.split(".")[1]?.length ?? 0) - Number(exponent));
}

/* -------------------------------------------------------------------------------------------------
 * Slider Steps
 * -----------------------------------------------------------------------------------------------*/
interface SliderStepsProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

/**
 * Decorative dots at each step, composed inside Slider.Track.
 * Omitted for invalid ranges or more than 1,000 dots to avoid unbounded DOM output.
 * Exposes slider-steps and slider-step data-slot hooks; dots expose data-value and data-filled.
 */
const SliderSteps = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: SliderStepsProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SliderStepsProps<E> | "children">) => {
  const {slots, state: renderState} = use(SliderContext);
  const {direction} = useLocale();
  const state = renderState?.state;

  if (!state) return null;

  const minValue = state.getThumbMinValue(0);
  const maxValue = state.getThumbMaxValue(state.values.length - 1);
  const stepCount = (maxValue - minValue) / state.step;
  // Account for decimal division such as (0.3 - 0) / 0.1 without adding an off-step endpoint.
  const count = Math.floor(stepCount + Number.EPSILON * Math.max(1, stepCount) * 4) + 1;

  if (
    !Number.isFinite(minValue) ||
    !Number.isFinite(maxValue) ||
    maxValue < minValue ||
    !Number.isFinite(state.step) ||
    state.step <= 0 ||
    !Number.isFinite(count) ||
    count <= 0 ||
    count > 1000
  ) {
    return null;
  }

  const precision = Math.max(getDecimalPlaces(minValue), getDecimalPlaces(state.step));

  return (
    <dom.div
      className={composeSlotClassName(slots?.steps, className)}
      data-direction={direction}
      data-disabled={dataAttr(state.isDisabled)}
      data-orientation={state.orientation}
      data-slot="slider-steps"
      {...(props as any)}
      aria-hidden="true"
    >
      {Array.from({length: count}, (_, index) => {
        // Avoid cumulative floating-point drift in decimal steps and data-value hooks.
        const rawValue = minValue + index * state.step;
        const value = Math.min(
          maxValue,
          precision <= 100 ? Number(rawValue.toFixed(precision)) : rawValue,
        );

        return (
          <span
            key={index}
            className={slots?.step()}
            data-slot="slider-step"
            {...getIndicatorProps(state, value, direction)}
          />
        );
      })}
    </dom.div>
  );
};

SliderSteps.displayName = "HeroUI.Slider.Steps";

/* -------------------------------------------------------------------------------------------------
 * Slider Marks
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarksProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

/** Composed after Slider.Track. Contains Slider.Mark labels and exposes data-slot="slider-marks". */
const SliderMarks = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: SliderMarksProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderMarksProps<E>>) => {
  const {slots, state} = use(SliderContext);
  const {direction} = useLocale();

  return (
    <dom.div
      className={composeSlotClassName(slots?.marks, className)}
      data-direction={direction}
      data-disabled={dataAttr(state?.isDisabled)}
      data-orientation={state?.state.orientation}
      data-slot="slider-marks"
      dir={direction}
      {...(props as any)}
    />
  );
};

SliderMarks.displayName = "HeroUI.Slider.Marks";

/* -------------------------------------------------------------------------------------------------
 * Slider Mark
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarkProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
  /** Value at which to position the label. Values outside the slider bounds are not rendered. */
  value: number;
}

/** Exposes data-slot="slider-mark", data-value, data-filled, and data-disabled. */
const SliderMark = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  style,
  value,
  ...props
}: SliderMarkProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderMarkProps<E>>) => {
  const {slots, state: renderState} = use(SliderContext);
  const {direction} = useLocale();
  const state = renderState?.state;

  if (
    !state ||
    !Number.isFinite(value) ||
    value < state.getThumbMinValue(0) ||
    value > state.getThumbMaxValue(state.values.length - 1)
  ) {
    return null;
  }

  const {style: position, ...indicatorProps} = getIndicatorProps(state, value, direction);

  return (
    <dom.div
      className={composeSlotClassName(slots?.mark, className)}
      data-slot="slider-mark"
      {...indicatorProps}
      {...(props as any)}
      style={{...style, ...position}}
    >
      {children ?? state.getFormattedValue(value)}
    </dom.div>
  );
};

SliderMark.displayName = "HeroUI.Slider.Mark";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  SliderRoot,
  SliderOutput,
  SliderTrack,
  SliderFill,
  SliderThumb,
  SliderSteps,
  SliderMarks,
  SliderMark,
};

export type {
  SliderRootProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderStepsProps,
  SliderMarksProps,
  SliderMarkProps,
};
