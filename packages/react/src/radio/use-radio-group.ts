import React, { useMemo, HTMLAttributes } from 'react';
import { useRadioGroupState } from '@react-stately/radio';
import { useRadioGroup as useReactAriaRadioGroup } from '@react-aria/radio';
import type { AriaRadioGroupProps } from '@react-types/radio';
import type { NormalSizes, SimpleColors } from '../utils/prop-types';

interface Props extends AriaRadioGroupProps {
  size?: NormalSizes;
  color?: SimpleColors;
  labelColor?: SimpleColors;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type UseRadioGroupProps = Props & NativeAttrs;

interface IRadioGroupAria {
  /** Props for the radio group wrapper element. */
  radioGroupProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  /** Props for the radio group's visible label (if any). */
  labelProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
}

/**
 * @internal
 */
export const useRadioGroup = (props: UseRadioGroupProps) => {
  const {
    size = 'md',
    color = 'default',
    labelColor = 'default',
    orientation = 'vertical',
    isRequired,
    validationState,
    ...otherProps
  } = props;

  const otherPropsWithOrientation = useMemo<AriaRadioGroupProps>(() => {
    return {
      ...otherProps,
      orientation
    };
  }, [otherProps]);

  const radioGroupState = useRadioGroupState(otherPropsWithOrientation);

  const { radioGroupProps, labelProps }: IRadioGroupAria =
    useReactAriaRadioGroup(otherPropsWithOrientation, radioGroupState);

  return {
    size,
    color,
    orientation,
    labelColor,
    isRequired,
    validationState,
    radioGroupState,
    radioGroupProps,
    labelProps
  };
};

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
