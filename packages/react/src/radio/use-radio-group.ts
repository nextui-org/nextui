import React, { useMemo } from 'react';
import { useRadioGroupState } from '@react-stately/radio';
import { useRadioGroup as useReactAriaRadioGroup } from '@react-aria/radio';
import type { AriaRadioGroupProps } from '@react-types/radio';
import type {
  NormalSizes,
  NormalColors,
  SimpleColors
} from '../utils/prop-types';

interface Props extends AriaRadioGroupProps {
  isRow?: boolean;
  size?: NormalSizes;
  color?: NormalColors;
  labelColor?: SimpleColors;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type UseRadioGroupProps = Props & NativeAttrs;

/**
 * @internal
 */
export const useRadioGroup = (props: UseRadioGroupProps) => {
  const {
    size = 'md',
    color = 'default',
    labelColor = 'default',
    isRow = false,
    ...otherProps
  } = props;

  const otherPropsWithOrientation = useMemo<AriaRadioGroupProps>(() => {
    return {
      ...otherProps,
      orientation: isRow ? 'horizontal' : 'vertical'
    };
  }, [otherProps]);

  const radioGroupState = useRadioGroupState(otherPropsWithOrientation);

  const { radioGroupProps, labelProps } = useReactAriaRadioGroup(
    otherPropsWithOrientation,
    radioGroupState
  );

  return {
    size,
    isRow,
    color,
    labelColor,
    radioGroupState,
    radioGroupProps,
    labelProps
  };
};

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
