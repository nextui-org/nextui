import type {AriaRadioGroupProps} from "@react-types/radio";
import type {NormalSizes, SimpleColors} from "../utils/prop-types";

import React, {useMemo, HTMLAttributes} from "react";
import {mergeProps} from "@react-aria/utils";
import {useRadioGroupState} from "@react-stately/radio";
import {useRadioGroup as useReactAriaRadioGroup} from "@react-aria/radio";

import useId from "../use-id";

interface Props extends AriaRadioGroupProps {
  size?: NormalSizes;
  color?: SimpleColors;
  labelColor?: SimpleColors;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type UseRadioGroupProps = Props & NativeAttrs;

interface IRadioGroupAria {
  /** Props for the radio group wrapper element. */
  radioGroupProps: Omit<HTMLAttributes<HTMLElement>, "css">;
  /** Props for the radio group's visible label (if any). */
  labelProps: Omit<HTMLAttributes<HTMLElement>, "css">;
}

/**
 * @internal
 */
export const useRadioGroup = (props: UseRadioGroupProps) => {
  const {
    size = "md",
    color = "default",
    labelColor = "default",
    orientation = "vertical",
    isRequired,
    validationState,
    ...otherProps
  } = props;

  const labelId = useId();
  const id = useId(props?.id);
  const name = useId(props?.name);

  const otherPropsWithOrientation = useMemo<AriaRadioGroupProps>(() => {
    return {
      ...otherProps,
      isRequired,
      orientation,
    };
  }, [otherProps, isRequired, orientation]);

  const radioGroupState = useRadioGroupState(otherPropsWithOrientation);

  const radioGroup: IRadioGroupAria = useReactAriaRadioGroup(
    otherPropsWithOrientation,
    radioGroupState,
  );

  const radioGroupProps = useMemo(() => {
    return mergeProps(radioGroup.radioGroupProps, {id, "aria-labelledby": labelId});
  }, [radioGroup.radioGroupProps, id, labelId]);

  const labelProps = useMemo(() => {
    return mergeProps(radioGroup.labelProps, {id: labelId});
  }, [radioGroup.labelProps, labelId]);

  return {
    size,
    color,
    orientation,
    labelColor,
    isRequired,
    validationState,
    radioGroupState,
    radioGroupProps,
    labelProps,
    name,
  };
};

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
