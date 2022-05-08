import { useMemo } from 'react';
import { useCheckboxGroupState } from '@react-stately/checkbox';
import { useCheckboxGroup as useReactAriaCheckboxGroup } from '@react-aria/checkbox';
import type { ICheckboxGroupContext } from './checkbox-context';
import type { AriaCheckboxGroupProps } from '@react-types/checkbox';
import type {
  NormalSizes,
  NormalColors,
  SimpleColors
} from '../utils/prop-types';

export interface UseCheckboxGroupProps extends AriaCheckboxGroupProps {
  row?: boolean;
  size?: NormalSizes;
  color?: NormalColors;
  labelColor?: SimpleColors;
}

/**
 * @internal
 */
export const useCheckboxGroup = (props: UseCheckboxGroupProps = {}) => {
  const {
    size = 'md',
    color = 'default',
    labelColor = 'default',
    row = false,
    ...otherProps
  } = props;

  const groupState = useCheckboxGroupState(otherProps);

  const { groupProps } = useReactAriaCheckboxGroup(otherProps, groupState);

  const getProviderValue = useMemo<ICheckboxGroupContext>(() => {
    return { size, color, labelColor, groupState };
  }, [size, color, labelColor, groupState]);

  return {
    size,
    row,
    groupProps,
    groupState,
    getProviderValue
  };
};

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
