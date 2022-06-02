import React, { useRef } from 'react';
import { useRadio as useReactAriaRadio } from '@react-aria/radio';
import useWarning from '../use-warning';
import { __DEV__ } from '../utils/assertion';
import { useRadioGroupContext } from './radio-context';
import type { AriaRadioProps } from '@react-types/radio';
import type {
  NormalSizes,
  NormalColors,
  SimpleColors
} from '../utils/prop-types';

interface Props extends AriaRadioProps {
  isSquared?: boolean;
  disableAnimation?: boolean;
  size?: NormalSizes;
  color?: NormalColors;
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
    size = groupContext.size ?? 'md',
    color = groupContext.color ?? 'default',
    labelColor = groupContext.labelColor ?? 'default',
    isSquared = false,
    disableAnimation = false,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if (otherProps.checked !== undefined) {
      useWarning('Remove props "checked" if in the Radio.Group.', 'Radio');
    }
    if (otherProps.value === undefined) {
      useWarning(
        'Props "value" must be deinfed if in the Radio.Group.',
        'Radio'
      );
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const { inputProps } = useReactAriaRadio(
    otherProps,
    groupContext.radioGroupState,
    inputRef
  );

  return {
    size,
    color,
    labelColor,
    isSquared,
    disableAnimation,
    inputRef,
    inputProps
  };
};

export type UseRadioReturn = ReturnType<typeof useRadio>;
