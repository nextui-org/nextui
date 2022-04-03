import React, { useMemo, useRef, PropsWithoutRef, RefAttributes } from 'react';
import { FocusableRef } from '@react-types/shared';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useToggleState } from '@react-stately/toggle';
import { AriaCheckboxProps } from '@react-types/checkbox';
import { useCheckbox, useCheckboxGroupItem } from '@react-aria/checkbox';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { mergeProps } from '@react-aria/utils';

import { useCheckbox as useCheckboxContext } from './checkbox-context';
import CheckboxGroup from './checkbox-group';
import { NormalSizes, NormalColors, SimpleColors } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import { useFocusableRef } from '../utils/dom';
import {
  StyledCheckboxLabel,
  StyledCheckboxContainer,
  StyledCheckboxMask,
  StyledIconCheck,
  StyledIconCheckFirstLine,
  StyledIconCheckSecondLine,
  StyledCheckboxText
} from './checkbox.styles';
import { mapPropsToReactAriaAttr } from './utils';
import clsx from '../utils/clsx';

interface Props
  extends Omit<
    AriaCheckboxProps,
    | 'isDisabled'
    | 'isSelected'
    | 'defaultSelected'
    | 'isIndeterminate'
    | 'isReadOnly'
    | 'isRequired'
  > {
  color?: NormalColors;
  size?: NormalSizes;
  label?: string;
  labelColor?: SimpleColors;
  line?: boolean;
  indeterminate?: boolean;
  animated?: boolean;
  rounded?: boolean;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  initialChecked?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  value: '',
  size: 'md' as NormalSizes,
  color: 'default' as NormalColors,
  labelColor: 'default' as SimpleColors,
  disabled: false,
  initialChecked: false,
  indeterminate: false,
  readOnly: false,
  required: false,
  rounded: false,
  autoFocus: false,
  line: false,
  animated: true,
  className: ''
};

type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;
export type CheckboxProps = Props &
  typeof defaultProps &
  NativeAttrs & { css?: CSS };

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (checkboxProps, ref: React.Ref<HTMLLabelElement | null>) => {
    const mappedProps = mapPropsToReactAriaAttr(checkboxProps);

    const {
      line,
      rounded,
      indeterminate,
      disabled,
      size,
      className,
      children,
      label,
      color,
      labelColor,
      animated,
      autoFocus,
      ...props
    } = checkboxProps;

    const groupState = useCheckboxContext();

    const inputRef = useRef<HTMLInputElement>(null);
    const domRef = useFocusableRef<HTMLLabelElement>(
      ref as FocusableRef<HTMLLabelElement>,
      inputRef
    );

    const { inputProps } = groupState?.inGroup
      ? useCheckboxGroupItem(mappedProps, groupState, inputRef)
      : useCheckbox(mappedProps, useToggleState(mappedProps), inputRef);

    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });

    const {
      isFocusVisible,
      focusProps
    }: {
      isFocusVisible: boolean;
      focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof CheckboxProps>;
    } = useFocusRing({ autoFocus });

    const checkboxColor = color !== 'default' ? color : groupState?.color;
    const checkboxSize = size !== 'md' ? size : groupState?.size;
    const textColor =
      labelColor !== 'default' ? labelColor : groupState?.labelColor;

    const getState = useMemo(() => {
      if (isHovered) return 'hovered';
      return inputProps.checked && indeterminate
        ? 'mixed'
        : inputProps.checked
        ? 'checked'
        : 'uncheked';
    }, [isHovered, inputProps.checked, indeterminate]);

    return (
      <StyledCheckboxLabel
        {...hoverProps}
        ref={domRef}
        className={clsx(
          'nextui-checkbox-label',
          `nextui-checkbox--${getState}`,
          className
        )}
        size={checkboxSize}
        animated={animated}
        isHovered={isHovered}
        disabled={inputProps.disabled}
        css={props.css}
      >
        <StyledCheckboxContainer
          className="nextui-checkbox-container"
          color={checkboxColor}
          rounded={rounded}
          animated={animated}
          isFocusVisible={isFocusVisible}
          isHovered={isHovered}
          disabled={inputProps.disabled}
          {...focusProps}
        >
          <VisuallyHidden>
            <input
              ref={inputRef}
              className="nextui-checkbox-input"
              {...mergeProps(inputProps, focusProps)}
            />
          </VisuallyHidden>
          <StyledCheckboxMask
            className="nextui-checkbox-mask"
            animated={animated}
            checked={inputProps.checked}
          >
            <StyledIconCheck
              className="nextui-icon-check"
              size={checkboxSize}
              indeterminate={indeterminate}
              animated={animated}
              checked={inputProps.checked}
            >
              <StyledIconCheckFirstLine
                className="nextui-icon-check-line1"
                indeterminate={indeterminate}
                animated={animated}
                checked={inputProps.checked}
              />
              <StyledIconCheckSecondLine
                className="nextui-icon-check-line2"
                indeterminate={indeterminate}
                animated={animated}
                checked={inputProps.checked}
              />
            </StyledIconCheck>
          </StyledCheckboxMask>
        </StyledCheckboxContainer>
        {(children || label) && (
          <StyledCheckboxText
            className="nextui-checkbox-text"
            color={textColor}
            line={line}
            animated={animated}
            checked={inputProps.checked}
            disabled={inputProps.disabled}
          >
            {children || label}
          </StyledCheckboxText>
        )}
      </StyledCheckboxLabel>
    );
  }
);

Checkbox.defaultProps = defaultProps;

Checkbox.displayName = 'NextUI - Checkbox';
Checkbox.toString = () => '.nextui-checkbox';

type CheckboxComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Group: typeof CheckboxGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs & { css?: CSS };

export default Checkbox as CheckboxComponent<HTMLLabelElement, ComponentProps>;
