import React from 'react';
import { useCheckboxGroupState } from '@react-stately/checkbox';
import { useCheckboxGroup as useReactAriaCheckboxGroup } from '@react-aria/checkbox';
import type { AriaCheckboxGroupProps } from '@react-types/checkbox';
import type { Orientation } from '@react-types/shared';
import type { CSS } from '../theme/stitches.config';
import type {
  NormalSizes,
  NormalColors,
  SimpleColors
} from '../utils/prop-types';

interface Props extends AriaCheckboxGroupProps {
  size?: NormalSizes;
  color?: NormalColors;
  labelColor?: SimpleColors;
  orientation?: Orientation;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type UseCheckboxGroupProps = Props & NativeAttrs & { css?: CSS };

/**
 * @internal
 */
export const useCheckboxGroup = (props: UseCheckboxGroupProps = {}) => {
  const {
    size = 'md',
    color = 'default',
    labelColor = 'default',
    orientation = 'vertical',
    css,
    ...otherProps
  } = props;

  const groupState = useCheckboxGroupState(otherProps);

  const { labelProps, groupProps } = useReactAriaCheckboxGroup(
    otherProps,
    groupState
  );

  return {
    css,
    size,
    orientation,
    color,
    labelColor,
    groupState,
    labelProps,
    groupProps
  };
};

export type UseCheckboxGroupReturn = Omit<
  ReturnType<typeof useCheckboxGroup>,
  'css'
>;
