import React, { useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';
import { useFocusableRef } from '../utils/dom';
import { pickChild } from '../utils/collections';
import RadioDesc from './radio-desc';
import RadioGroup from './radio-group';
import { useRadio } from './use-radio';
import {
  StyledRadioText,
  StyledRadioPoint,
  StyledRadioLabel,
  StyledRadioContainer
} from './radio.styles';
import type { FocusRingAria } from '@react-aria/focus';
import type { FocusableRef } from '@react-types/shared';
import type { ReactRef } from '../utils/refs';
import type { CSS } from '../theme/stitches.config';
import type { UseRadioProps } from './use-radio';

interface Props extends UseRadioProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;

export type RadioProps = Props & NativeAttrs & { css?: CSS };

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof RadioProps>;
}

export const Radio = React.forwardRef(
  (props: RadioProps, ref: ReactRef<HTMLInputElement>) => {
    const { className, as, css, children, label, ...otherProps } = props;

    const [textChildren, descChildren] = pickChild(children, RadioDesc);

    const {
      size,
      color,
      labelColor,
      isSquared,
      disableAnimation,
      inputRef,
      inputProps
    } = useRadio({ ...otherProps, children: children ?? label });

    const domRef = useFocusableRef<HTMLLabelElement>(
      ref as FocusableRef<HTMLLabelElement>,
      inputRef
    );

    const { focusProps, isFocusVisible }: IFocusRingAria = useFocusRing({
      autoFocus: inputProps.autoFocus
    });

    const radioState = useMemo(() => {
      if (inputProps.disabled) return 'disabled';
      return inputProps.checked ? 'checked' : 'uncheked';
    }, [inputProps.disabled, inputProps.checked]);

    return (
      <StyledRadioLabel
        ref={domRef}
        className={clsx(
          'nextui-radio-label',
          `nextui-radio--${radioState}`,
          className
        )}
        as={as}
        css={css as any}
        size={size}
        color={color as any}
        isSquared={isSquared}
        isChecked={inputProps.checked}
        isDisabled={inputProps.disabled}
        disableAnimation={disableAnimation}
      >
        <StyledRadioContainer className="nextui-radio-container">
          <StyledRadioPoint
            className="nextui-radio-point"
            isFocusVisible={isFocusVisible}
            {...focusProps}
          >
            <VisuallyHidden>
              <input
                ref={inputRef}
                className="nextui-radio-input"
                {...mergeProps(inputProps, focusProps)}
              />
            </VisuallyHidden>
          </StyledRadioPoint>
          <StyledRadioText
            className="nextui-radio-text"
            color={labelColor}
            isDisabled={inputProps.disabled}
          >
            {textChildren}
          </StyledRadioText>
        </StyledRadioContainer>
        {descChildren && descChildren}
      </StyledRadioLabel>
    );
  }
);

type RadioComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> & {
  Group: typeof RadioGroup;
  Desc: typeof RadioDesc;
  Description: typeof RadioDesc;
};

if (__DEV__) {
  Radio.displayName = 'NextUI.Radio';
}

Radio.toString = () => '.nextui-radio';

export default Radio as RadioComponent<HTMLLabelElement, RadioProps>;
