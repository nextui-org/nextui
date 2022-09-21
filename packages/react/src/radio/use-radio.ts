import type {AriaRadioProps} from "@react-types/radio";
import type {NormalSizes, SimpleColors} from "../utils/prop-types";

import React, {useRef, useMemo} from "react";
import {useRadio as useReactAriaRadio} from "@react-aria/radio";
import {useHover} from "@react-aria/interactions";

import {warn} from "../utils/console";
import {__DEV__} from "../utils/assertion";

import {useRadioGroupContext} from "./radio-context";

interface Props extends AriaRadioProps {
  isSquared?: boolean;
  disableAnimation?: boolean;
  size?: NormalSizes;
  color?: SimpleColors;
  labelColor?: SimpleColors;
}

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;

export type UseRadioProps = Props & NativeAttrs;

/**
 * @internal
 */
export const useRadio = (props: UseRadioProps) => {
  const groupContext = useRadioGroupContext();

  const {
    size = groupContext.size ?? "md",
    color = groupContext.color ?? "default",
    labelColor = groupContext.labelColor ?? "default",
    autoFocus,
    isSquared = false,
    isDisabled: isDisabledProp = false,
    disableAnimation = false,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if (otherProps.checked !== undefined) {
      warn('Remove props "checked" if in the Radio.Group.', "Radio");
    }
    if (otherProps.value === undefined) {
      warn('Props "value" must be defined if in the Radio.Group.', "Radio");
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const {inputProps} = useReactAriaRadio(
    {
      ...otherProps,
      ...groupContext,
      isDisabled: isDisabledProp,
    },
    groupContext.radioGroupState,
    inputRef,
  );

  const isDisabled = useMemo(() => inputProps.disabled ?? false, [inputProps.disabled]);

  const {hoverProps, isHovered} = useHover({isDisabled});

  const isInvalid = useMemo(
    () => groupContext.validationState === "invalid",
    [groupContext.validationState],
  );

  const isRequired = useMemo(() => groupContext.isRequired ?? false, [groupContext.isRequired]);

  return {
    size,
    color,
    inputRef,
    autoFocus,
    isDisabled,
    labelColor,
    isInvalid,
    isHovered,
    isSquared,
    isRequired,
    disableAnimation,
    inputProps,
    hoverProps,
  };
};

export type UseRadioReturn = ReturnType<typeof useRadio>;
