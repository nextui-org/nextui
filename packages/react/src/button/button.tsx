import React, { useMemo, PropsWithoutRef, RefAttributes } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { FocusableRef, PressEvents, PressEvent } from '@react-types/shared';
import { AriaButtonProps } from '@react-types/button';
import { mergeProps } from '@react-aria/utils';

import useWarning from '../use-warning';
import ButtonDrip from '../utils/drip';
import { CSS } from '../theme/stitches.config';
import { NormalColors } from '../utils/prop-types';
import { filterPropsWithGroup, getCssColors } from './utils';
import { useButtonGroupContext } from './button-group-context';
import ButtonGroup from './button-group';
import ButtonIcon from './button-icon';
import clsx from '../utils/clsx';
import useDrip from '../use-drip';
import StyledButton, { ButtonVariantsProps } from './button.styles';
import withDefaults from '../utils/with-defaults';
import { useFocusableRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import { FocusableProps } from '@react-types/shared';

export interface Props extends PressEvents, FocusableProps, AriaButtonProps {
  light?: boolean;
  color?: NormalColors;
  flat?: boolean;
  animated?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  bordered?: boolean;
  auto?: boolean;
  ripple?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode | undefined;
}

const defaultProps = {
  clickable: true,
  ghost: false,
  bordered: false,
  ripple: true,
  animated: true,
  disabled: false,
  autoFocus: false,
  auto: false,
  className: '',
  type: 'button'
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;

export type ButtonProps = Props &
  NativeAttrs &
  Omit<ButtonVariantsProps, 'isPressed' | 'isHovered'> & { css?: CSS };

const Button = React.forwardRef(
  (
    { onClick, onPress, as, ...btnProps }: ButtonProps,
    ref: FocusableRef<HTMLElement>
  ) => {
    const groupConfig = useButtonGroupContext();
    const filteredProps = filterPropsWithGroup(btnProps, groupConfig);
    const cssColors = getCssColors(filteredProps);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      flat,
      children,
      disabled,
      animated,
      light,
      ripple,
      bordered,
      auto,
      borderWeight,
      icon,
      iconRight,
      ghost,
      clickable,
      autoFocus,
      className,
      ...props
    } = filteredProps;

    const handleDrip = (
      e: React.MouseEvent<HTMLButtonElement> | PressEvent
    ) => {
      if (animated && ripple && buttonRef.current) {
        onDripClickHandler(e);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !clickable) return;
      handleDrip(e);
      onClick?.(e);
    };

    const handlePress = (e: PressEvent) => {
      if (disabled || !clickable) return;
      if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
        handleDrip(e);
      }
      onPress?.(e);
    };

    const buttonRef = useFocusableRef(ref);
    const { buttonProps, isPressed } = useButton(
      {
        ...btnProps,
        isDisabled: disabled,
        elementType: as,
        onClick: handleClick,
        onPress: handlePress
      } as AriaButtonProps,
      buttonRef
    );
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });

    /* eslint-enable @typescript-eslint/no-unused-vars */
    if (__DEV__ && filteredProps.color === 'gradient' && (flat || light)) {
      useWarning(
        'Using the gradient color on flat and light buttons will have no effect.'
      );
    }
    const hasIcon = icon || iconRight;
    const isRight = Boolean(iconRight);

    const {
      isFocusVisible,
      focusProps
    }: {
      isFocusVisible: boolean;
      focusProps: Omit<
        React.HTMLAttributes<HTMLButtonElement>,
        keyof ButtonProps
      >;
    } = useFocusRing({ autoFocus });

    const { onClick: onDripClickHandler, ...dripBindings } = useDrip(
      false,
      buttonRef
    );

    const getState = useMemo(() => {
      if (isPressed) return 'pressed';
      if (isHovered) return 'hovered';
      return disabled ? 'disabled' : 'ready';
    }, [disabled, isHovered, isPressed]);

    return (
      <StyledButton
        as={as}
        ref={buttonRef}
        borderWeight={borderWeight}
        auto={auto}
        flat={flat}
        light={light}
        ghost={ghost}
        bordered={bordered || ghost}
        clickable={clickable}
        data-state={getState}
        disabled={disabled}
        animated={animated}
        isPressed={isPressed}
        isHovered={isHovered}
        isFocusVisible={isFocusVisible}
        className={clsx(
          'nextui-button',
          `nextui-button--${getState}`,
          className
        )}
        css={{
          ...cssColors,
          ...(props.css as any)
        }}
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
      >
        {React.Children.count(children) === 0 ? (
          <ButtonIcon
            isSingle
            isAuto={auto}
            isRight={isRight}
            isGradientButtonBorder={
              props.color === 'gradient' && (bordered || ghost)
            }
          >
            {hasIcon}
          </ButtonIcon>
        ) : hasIcon ? (
          <>
            <ButtonIcon
              isSingle={false}
              isAuto={auto}
              isRight={isRight}
              isGradientButtonBorder={
                props.color === 'gradient' && (bordered || ghost)
              }
            >
              {hasIcon}
            </ButtonIcon>
            <div
              className={clsx('nextui-button-text', {
                'nextui-button-text-right': isRight,
                'nextui-button-text-left': !isRight
              })}
            >
              {children}
            </div>
          </>
        ) : (
          <span className="nextui-button-text">{children}</span>
        )}
        <ButtonDrip color="white" {...dripBindings} />
      </StyledButton>
    );
  }
);

type ButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Group: typeof ButtonGroup;
};

if (__DEV__) {
  Button.displayName = 'NextUI - Button';
}

Button.toString = () => '.nextui-button';

export default withDefaults(Button, defaultProps) as ButtonComponent<
  HTMLElement,
  ButtonProps
>;
