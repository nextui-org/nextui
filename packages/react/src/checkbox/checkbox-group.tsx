import React, { useMemo, RefAttributes, PropsWithoutRef } from 'react';
import { useCheckboxGroupState } from '@react-stately/checkbox';
import { AriaCheckboxGroupProps } from '@react-types/checkbox';
import { useCheckboxGroup } from '@react-aria/checkbox';
import { mergeProps } from '@react-aria/utils';

import { CheckboxContext } from './checkbox-context';
import { NormalSizes, NormalColors, SimpleColors } from '../utils/prop-types';
import {
  StyledCheckboxGroup,
  StyledCheckboxGroupLabel,
  StyledCheckboxGroupContainer
} from './checkbox.styles';
import { CSS } from '../theme/stitches.config';
import { useDOMRef } from '../utils/dom';

interface Props
  extends Omit<
    AriaCheckboxGroupProps,
    'isDisabled' | 'isReadOnly' | 'defaultChecked'
  > {
  color?: NormalColors;
  labelColor?: SimpleColors;
  row?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: NormalSizes;
}

const defaultProps = {
  color: 'default' as NormalColors,
  labelColor: 'default' as SimpleColors,
  disabled: false,
  readOnly: false,
  row: false,
  size: 'md' as NormalSizes
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type CheckboxGroupProps = Props &
  typeof defaultProps &
  NativeAttrs & { css?: CSS };

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      color,
      labelColor,
      disabled,
      size,
      label,
      children,
      readOnly,
      row,
      ...props
    },
    ref: React.Ref<HTMLDivElement | null>
  ) => {
    const domRef = useDOMRef(ref);
    const state = useCheckboxGroupState({
      ...props,
      isDisabled: disabled,
      isReadOnly: readOnly
    });
    const { groupProps } = useCheckboxGroup(
      {
        ...props,
        'aria-label':
          props['aria-label'] ||
          (typeof label === 'string' ? label : undefined),
        isDisabled: disabled,
        isReadOnly: readOnly
      },
      state
    );

    const providerValue = useMemo(() => {
      return {
        ...state,
        color: color,
        size: size,
        labelColor: labelColor,
        inGroup: true
      };
    }, [state, color, size, labelColor]);

    return (
      <StyledCheckboxGroup
        ref={domRef}
        size={size}
        {...mergeProps(props, groupProps)}
      >
        {label && (
          <StyledCheckboxGroupLabel disabled={disabled}>
            {label}
          </StyledCheckboxGroupLabel>
        )}
        <StyledCheckboxGroupContainer role="presentation" row={row}>
          <CheckboxContext.Provider value={providerValue}>
            {children}
          </CheckboxContext.Provider>
        </StyledCheckboxGroupContainer>
      </StyledCheckboxGroup>
    );
  }
);
CheckboxGroup.defaultProps = defaultProps;

CheckboxGroup.displayName = 'NextUI - CheckboxGroup';
CheckboxGroup.toString = () => '.nextui-checkbox-group';

type CheckboxGroupComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>;

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs & { css?: CSS };

export default CheckboxGroup as CheckboxGroupComponent<
  HTMLDivElement,
  ComponentProps
>;
