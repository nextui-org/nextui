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
   * Show and hide step indicator.
   */
  showSteps?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Slider classNames={{
   *    base:"base-classes",
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

export type UseSliderProps = Props & Omit<AriaSliderProps, "orientation"> & SliderVariantProps;

export function useSlider(originalProps: UseSliderProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, slider.variantKeys);

  const {ref, as, name, label, formatOptions, className, classNames, fillOffset, ...otherProps} =
    props;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const trackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const numberFormatter = useNumberFormatter(formatOptions);
  const {direction} = useLocale();
  const state = useSliderState({...otherProps, numberFormatter});
  const {groupProps, trackProps, labelProps, outputProps} = useAriaSlider(
    otherProps,
    state,
    trackRef,
  );

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () => slider({...variantProps, className}),
    [...Object.values(variantProps), className],
  );

  const [startOffset, endOffset] = [
    state.values.length > 1
      ? state.getThumbPercent(0)
      : fillOffset !== undefined
      ? state.getValuePercent(fillOffset)
      : 0,
    state.getThumbPercent(state.values.length - 1),
  ].sort();

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-orientation": state.orientation,
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
      ...props,
    };
  };

  const getLabelProps: PropGetter = (props = {}) => {
    return {
      className: slots.label({class: classNames?.label}),
      ...labelProps,
      ...props,
    };
  };

  const getOutputProps: PropGetter = (props = {}) => {
    return {
      className: slots.output({class: classNames?.output}),
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
      className: slots.track({class: classNames?.track}),
      "data-thumb-count": fillOffset === undefined ? state.values.length : undefined,
      ...trackProps,
      ...props,
    };
  };

  const getFillerProps: PropGetter = (props = {}) => {
    return {
      className: slots.filler({class: classNames?.filler}),
      ...props,
      style: {
        ...props.style,
        [direction === "rtl" ? "right" : "left"]: `${startOffset * 100}%`,
        width: `${(endOffset - startOffset) * 100}%`,
      },
    };
  };

  const getThumbProps = (index: number) => {
    return {
      name,
      index,
      state,
      trackRef,
      inputRef,
      className: slots.thumb({class: classNames?.thumb}),
      ...props,
    } as SliderThumbProps;
  };

  const {maxValue = 100, minValue = 0, step = 1, showSteps} = props;
  const stepsCount = showSteps ? Math.floor((maxValue - minValue) / step) + 1 : 0;
  const getStepsProps = (index: number) => {
    const percent = state.getValuePercent(index * step + minValue);

    return {
      className: slots.step({class: classNames?.step}),
      "data-in-range": percent <= endOffset && percent >= startOffset,
      style: {
        [direction === "rtl" ? "right" : "left"]: `${percent * 100}%`,
      },
    };
  };

  return {
    Component,
    state,
    domRef,
    label,
    stepsCount,
    getStepsProps,
    getBaseProps,
    getLabelWrapperProps,
    getLabelProps,
    getOutputProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
  };
}

export type UseSliderReturn = ReturnType<typeof useSlider>;
