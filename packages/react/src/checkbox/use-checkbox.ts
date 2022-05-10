import { useMemo, useRef } from 'react';
import { useToggleState } from '@react-stately/toggle';
import type { AriaCheckboxProps } from '@react-types/checkbox';
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem
} from '@react-aria/checkbox';
import { __DEV__ } from '../utils/assertion';
import { useCheckboxGroupContext } from './checkbox-context';
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
  const groupContext = useCheckboxGroupContext();

  const {
    size = groupContext?.size ?? 'md',
    color = groupContext?.color ?? 'default',
    labelColor = groupContext?.labelColor ?? 'default',
    lineThrough,
    isRounded = false,
    disableAnimation = false,
    isIndeterminate = false,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
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
      value: otherProps.value ?? '',
      isRequired: otherProps.isRequired ?? false
    };
  }, [isIndeterminate, otherProps]);

  const { inputProps } = groupContext
    ? useReactAriaCheckboxGroupItem(
        {
          ...ariaCheckboxProps,
          validationState: otherProps.validationState
        },
        groupContext.groupState,
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
