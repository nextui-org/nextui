import type {SliderSlots, SliderVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {slider} from "@nextui-org/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useSliderState} from "@react-stately/slider";
import {useMemo, useRef} from "react";
import {useNumberFormatter, useLocale} from "@react-aria/i18n";
import {mergeProps} from "@react-aria/utils";
import {AriaSliderProps, useSlider as useAriaSlider} from "@react-aria/slider";
import {clsx} from "@nextui-org/shared-utils";

import {SliderThumbProps} from "./slider-thumb";

export type SliderValue = number | number[];

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The content to display as the label.
   */
  label?: string;
  /**
   * The input name.
   */
  name?: string;
  /**
   * The offset from which to start the fill.
   */
  fillOffset?: number;
  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * Whether to show the step indicators.
   * @default false
   */
  showSteps?: boolean;
  /**
   * Element to be rendered in the start side of the slider.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the end side of the slider.
   */
  endContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Slider classNames={{
   *    base:"base-classes",
   *    step: "step-classes",
   *    labelWrapper: "label-wrapper-classes",
   *    label: "label-classes",
   *    output: "output-classes",
   *    track: "track-classes",
   *    filler: "filler-classes",
   *    thumb: "thumb-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<SliderSlots>;
}

export type UseSliderProps = Omit<Props, "onChange"> & AriaSliderProps & SliderVariantProps;

export function useSlider(originalProps: UseSliderProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, slider.variantKeys);

  const {
    ref,
    as,
    name,
    label,
    formatOptions,
    maxValue = 100,
    minValue = 0,
    step = 1,
    showSteps = false,
    orientation = "horizontal",
    startContent,
    endContent,
    fillOffset,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const trackRef = useRef<HTMLDivElement>(null);

  const numberFormatter = useNumberFormatter(formatOptions);
  const {direction} = useLocale();

  const state = useSliderState({
    ...otherProps,
    isDisabled: originalProps?.isDisabled ?? false,
    orientation,
    step,
    minValue,
    maxValue,
    numberFormatter,
  });

  const {groupProps, trackProps, labelProps, outputProps} = useAriaSlider(props, state, trackRef);

  const baseStyles = clsx(classNames?.base, className);
  const isVertical = orientation === "vertical";

  const slots = useMemo(
    () => slider({...variantProps, isVertical, className}),
    [...Object.values(variantProps), isVertical, className],
  );

  const [startOffset, endOffset] = [
    state.values.length > 1
      ? state.getThumbPercent(0)
      : fillOffset !== undefined
      ? state.getValuePercent(fillOffset)
      : 0,
    state.getThumbPercent(state.values.length - 1),
  ].sort();

  const steps = showSteps ? Math.floor((maxValue - minValue) / step) + 1 : 0;

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-orientation": state.orientation,
      "data-slot": "base",
      className: slots.base({class: baseStyles}),
      ...mergeProps(
        groupProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
    };
  };

  const getLabelWrapperProps: PropGetter = (props = {}) => {
    return {
      className: slots.labelWrapper({class: classNames?.labelWrapper}),
      "data-slot": "labelWrapper",
      ...props,
    };
  };

  const getLabelProps: PropGetter = (props = {}) => {
    return {
      className: slots.label({class: classNames?.label}),
      "data-slot": "label",
      ...labelProps,
      ...props,
    };
  };

  const getOutputProps: PropGetter = (props = {}) => {
    return {
      className: slots.output({class: classNames?.output}),
      "data-slot": "output",
      ...outputProps,
      ...props,
      children:
        state.values.length === 1
          ? numberFormatter.format(state.values[0])
          : numberFormatter.formatRange(state.values[0], state.values[state.values.length - 1]),
    };
  };

  const getTrackProps: PropGetter = (props = {}) => {
    return {
      ref: trackRef,
      "data-slot": "track",
      "data-vertical": isVertical,
      className: slots.track({class: classNames?.track}),
      "data-thumb-count": fillOffset === undefined ? state.values.length : undefined,
      ...trackProps,
      ...props,
    };
  };

  const getTrackWrapperProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "track-wrapper",
      className: slots.trackWrapper({class: classNames?.trackWrapper}),
      ...props,
    };
  };

  const getFillerProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "filler",
      className: slots.filler({class: classNames?.filler}),
      ...props,
      style: {
        ...props.style,
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${startOffset * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset - startOffset) * 100}%`,
            }
          : {
              width: `${(endOffset - startOffset) * 100}%`,
            }),
      },
    };
  };

  const getThumbProps = (index: number) => {
    return {
      name,
      index,
      state,
      trackRef,
      orientation,
      className: slots.thumb({class: classNames?.thumb}),
      ...props,
    } as SliderThumbProps;
  };

  const getStepProps = (index: number) => {
    const percent = state.getValuePercent(index * step + minValue);

    return {
      className: slots.step({class: classNames?.step}),
      "data-slot": "step",
      "data-in-range": percent <= endOffset && percent >= startOffset,
      style: {
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${percent * 100}%`,
      },
    };
  };

  const getStartContentProps: PropGetter = (props = {}) => ({
    "data-slot": "startContent",
    className: slots.startContent({class: classNames?.startContent}),
    ...props,
  });

  const getEndContentProps: PropGetter = (props = {}) => ({
    "data-slot": "endContent",
    className: slots.endContent({class: classNames?.endContent}),
    ...props,
  });

  return {
    Component,
    state,
    domRef,
    label,
    steps,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    getTrackWrapperProps,
    getLabelWrapperProps,
    getLabelProps,
    getOutputProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
    getStartContentProps,
    getEndContentProps,
  };
}

export type UseSliderReturn = ReturnType<typeof useSlider>;
