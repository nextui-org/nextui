import { useMemo, useRef } from 'react';
import { useToggleState } from '@react-stately/toggle';
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem
} from '@react-aria/checkbox';
import { __DEV__ } from '../utils/assertion';
import { useCheckboxGroupContext } from './checkbox-context';
import type { AriaCheckboxProps } from '@react-types/checkbox';
import type {
  NormalSizes,
  NormalColors,
  SimpleColors
} from '../utils/prop-types';

export interface UseCheckboxProps extends AriaCheckboxProps {
  isRounded?: boolean;
  lineThrough?: boolean;
  disableAnimation?: boolean;
  size?: NormalSizes;
  color?: NormalColors;
  labelColor?: SimpleColors;
}

/**
 * @internal
 */
export const useCheckbox = (props: UseCheckboxProps) => {
  const group = useCheckboxGroupContext();

  const {
    size = group?.size ?? 'md',
    color = group?.color ?? 'default',
    labelColor = group?.labelColor ?? 'default',
    lineThrough,
    isRounded = false,
    disableAnimation = false,
    isIndeterminate = false,
    ...otherProps
  } = props;

  if (group && __DEV__) {
    const warningMessage =
      'The Checkbox.Group is being used, `%s` will be ignored. Use the `%s` of the Checkbox.Group instead.';
    if ('isSelected' in otherProps) {
      console.warn(warningMessage, 'isSelected', 'value');
    }
    if ('defaultSelected' in otherProps) {
      console.warn(warningMessage, 'defaultSelected', 'defaultValue');
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const ariaCheckboxProps = useMemo(() => {
    return {
      ...otherProps,
      isIndeterminate,
      value: otherProps.value ?? ''
    };
  }, [otherProps, isIndeterminate]);

  const { inputProps } = group
    ? useReactAriaCheckboxGroupItem(
        ariaCheckboxProps,
        group.groupState,
        inputRef
      )
    : useReactAriaCheckbox(
        ariaCheckboxProps,
        useToggleState(ariaCheckboxProps),
        inputRef
      );

  return {
    size,
    color,
    labelColor,
    isRounded,
    lineThrough,
    disableAnimation,
    isIndeterminate,
    inputRef,
    inputProps
  };
};

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;
