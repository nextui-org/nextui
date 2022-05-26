import { useRef } from 'react';
import { useRadio as useReactAriaRadio } from '@react-aria/radio';
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

export type UseRadioProps = Props;

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
