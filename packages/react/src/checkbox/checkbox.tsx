import React, { useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from '../utils/clsx';
import CheckboxGroup from './checkbox-group';
import { __DEV__ } from '../utils/assertion';
import { useFocusableRef } from '../utils/dom';
import { useCheckbox, UseCheckboxProps } from './use-checkbox';
import {
  StyledCheckboxLabel,
  StyledCheckboxContainer,
  StyledCheckboxMask,
  StyledIconCheck,
  StyledIconCheckFirstLine,
  StyledIconCheckSecondLine,
  StyledCheckboxText
} from './checkbox.styles';
import type { CSS } from '../theme/stitches.config';
import type { FocusRingAria } from '@react-aria/focus';
import type { FocusableRef } from '@react-types/shared';

interface Props extends UseCheckboxProps {
  css?: CSS;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof CheckboxProps>;
}

// type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;

export type CheckboxProps = Props;

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props: CheckboxProps, forwardedRef: React.Ref<HTMLLabelElement | null>) => {
    const { className, as, css, children, label, ...otherProps } = props;

    const {
      size,
      color,
      labelColor,
      line,
      rounded,
      animated,
      isIndeterminate,
      inputRef,
      inputProps
    } = useCheckbox({ ...otherProps, children: children ?? label });

    const ref = useFocusableRef<HTMLLabelElement>(
      forwardedRef as FocusableRef<HTMLLabelElement>,
      inputRef
    );

    const { hoverProps, isHovered } = useHover({
      isDisabled: inputProps.disabled
    });

    const { focusProps, isFocusVisible }: IFocusRingAria = useFocusRing({
      autoFocus: inputProps.autoFocus
    });

    const checkboxState = useMemo(() => {
      if (isHovered) return 'hovered';
      return isIndeterminate && inputProps.checked
        ? 'mixed'
        : inputProps.checked
        ? 'checked'
        : 'uncheked';
    }, [isHovered, isIndeterminate, inputProps.checked]);

    return (
      <StyledCheckboxLabel
        className={clsx(
          'nextui-checkbox-label',
          `nextui-checkbox--${checkboxState}`,
          className
        )}
        as={as}
        ref={ref}
        css={css}
        size={size}
        animated={animated}
        isHovered={isHovered}
        disabled={inputProps.disabled}
        {...hoverProps}
      >
        <StyledCheckboxContainer
          className="nextui-checkbox-container"
          color={color}
          rounded={rounded}
          animated={animated}
          isHovered={isHovered}
          disabled={inputProps.disabled}
          isFocusVisible={isFocusVisible}
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
            isIndeterminate={isIndeterminate}
          >
            <StyledIconCheck
              className="nextui-icon-check"
              size={size}
              animated={animated}
              checked={inputProps.checked}
              isIndeterminate={isIndeterminate}
            >
              <StyledIconCheckFirstLine
                className="nextui-icon-check-line1"
                animated={animated}
                checked={inputProps.checked}
                isIndeterminate={isIndeterminate}
              />
              <StyledIconCheckSecondLine
                className="nextui-icon-check-line2"
                animated={animated}
                checked={inputProps.checked}
                isIndeterminate={isIndeterminate}
              />
            </StyledIconCheck>
          </StyledCheckboxMask>
        </StyledCheckboxContainer>
        {(children || label) && (
          <StyledCheckboxText
            className="nextui-checkbox-text"
            line={line}
            color={labelColor}
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

type CheckboxComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> & {
  Group: typeof CheckboxGroup;
};

if (__DEV__) {
  Checkbox.displayName = 'NextUI.Checkbox';
}

Checkbox.toString = () => '.nextui-checkbox';

export default Checkbox as CheckboxComponent<HTMLLabelElement, CheckboxProps>;
