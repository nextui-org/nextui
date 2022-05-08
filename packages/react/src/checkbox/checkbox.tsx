import React, { useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { usePress } from '@react-aria/interactions';
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
import type { PressResult } from '@react-aria/interactions';

interface Props extends UseCheckboxProps {
  css?: CSS;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

// type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;

export type CheckboxProps = Props;

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof CheckboxProps>;
}

interface IPressResult extends PressResult {
  pressProps: Omit<React.HTMLAttributes<HTMLElement>, keyof CheckboxProps>;
}

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props: CheckboxProps, forwardedRef: React.Ref<HTMLLabelElement | null>) => {
    const { className, as, css, children, label, ...otherProps } = props;

    const {
      size,
      color,
      labelColor,
      isRounded,
      lineThrough,
      disableAnimation,
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

    // TODO: Event's propagation wasn't stopped https://github.com/adobe/react-spectrum/issues/2383
    const { pressProps }: IPressResult = usePress({
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
        isHovered={isHovered}
        disabled={inputProps.disabled}
        disableAnimation={disableAnimation}
        {...mergeProps(hoverProps, pressProps)}
      >
        <StyledCheckboxContainer
          className="nextui-checkbox-container"
          color={color}
          isRounded={isRounded}
          isHovered={isHovered}
          disabled={inputProps.disabled}
          isFocusVisible={isFocusVisible}
          disableAnimation={disableAnimation}
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
            checked={inputProps.checked}
            isIndeterminate={isIndeterminate}
            disableAnimation={disableAnimation}
          >
            <StyledIconCheck
              className="nextui-icon-check"
              size={size}
              checked={inputProps.checked}
              isIndeterminate={isIndeterminate}
              disableAnimation={disableAnimation}
            >
              <StyledIconCheckFirstLine
                className="nextui-icon-check-line1"
                checked={inputProps.checked}
                isIndeterminate={isIndeterminate}
                disableAnimation={disableAnimation}
              />
              <StyledIconCheckSecondLine
                className="nextui-icon-check-line2"
                checked={inputProps.checked}
                isIndeterminate={isIndeterminate}
                disableAnimation={disableAnimation}
              />
            </StyledIconCheck>
          </StyledCheckboxMask>
        </StyledCheckboxContainer>
        {(children || label) && (
          <StyledCheckboxText
            className="nextui-checkbox-text"
            color={labelColor}
            lineThrough={lineThrough}
            checked={inputProps.checked}
            disabled={inputProps.disabled}
            disableAnimation={disableAnimation}
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
