import type {SliderVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useSliderThumb as useAriaSliderThumb} from "@react-aria/slider";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {RefObject, useRef} from "react";
import {AriaSliderThumbProps} from "@react-aria/slider";
import {SliderState} from "@react-stately/slider";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {dataAttr} from "@nextui-org/shared-utils";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * slider state, created via `useSliderState`.
   */
  state: SliderState;
  /**
   * A ref to the track element.
   */
  trackRef: RefObject<HTMLDivElement>;
}

export type UseSliderThumbProps = Props & AriaSliderThumbProps & SliderVariantProps;

export function useSliderThumb(props: UseSliderThumbProps) {
  const {ref, as, state, index, name, trackRef, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);
  const inputRef = useRef<HTMLInputElement>(null);

  const {thumbProps, inputProps, isDragging} = useAriaSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
      ...otherProps,
    },
    state,
  );

  const {hoverProps, isHovered} = useHover({
    isDisabled: state.isDisabled,
  });
  const {focusProps, isFocusVisible} = useFocusRing();
  const {pressProps, isPressed} = usePress({
    isDisabled: state.isDisabled,
  });

  const getThumbProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-dragging": dataAttr(isDragging),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(thumbProps, pressProps, hoverProps, otherProps),
      className,
      ...props,
    };
  };

  const getInputProps: PropGetter = (props = {}) => {
    return {
      ref: inputRef,
      ...mergeProps(inputProps, focusProps),
      ...props,
    };
  };

  return {Component, getThumbProps, getInputProps};
}

export type UseSliderThumbReturn = ReturnType<typeof useSliderThumb>;
