import React, { useMemo, PropsWithoutRef, RefAttributes } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type {
  PressEvents,
  PressEvent,
  FocusableProps
} from '@react-types/shared';
import type { AriaButtonProps } from '@react-types/button';
import type { FocusRingAria } from '@react-aria/focus';
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
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';

export interface Props extends PressEvents, FocusableProps, AriaButtonProps {
  light?: boolean;
  color?: NormalColors;
  flat?: boolean;
  animated?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  bordered?: boolean;
  auto?: boolean;
  ripple?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  // @deprecated
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode | undefined;
  // TODO: put this on the docs
  iconLeftCss?: CSS;
  // TODO: put this on the docs
  iconRightCss?: CSS;
}

const defaultProps = {
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

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof ButtonProps>;
}

export type ButtonProps = Props &
  NativeAttrs &
  Omit<ButtonVariantsProps, 'isPressed' | 'isHovered'> & { css?: CSS };

const Button = React.forwardRef(
  (
    {
      onClick,
      onPress,
      as,
      css,
      iconLeftCss,
      iconRightCss,
      ...btnProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement | null>
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
      handleDrip(e);
      onClick?.(e);
    };

    const handlePress = (e: PressEvent) => {
      if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
        handleDrip(e);
        // TODO: take this out and deprecate onClick function for next release (only use the @react-aria/button impl)
        onClick?.(e as any);
      }
      onPress?.(e);
    };

    const buttonRef = useDOMRef(ref);
    const { buttonProps, isPressed } = useButton(
      {
        ...btnProps,
        onClick: handleClick,
        isDisabled: disabled,
        elementType: as,
        onPress: handlePress
      } as AriaButtonProps,
      buttonRef
    );

    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { isFocused, isFocusVisible, focusProps }: IFocusRingAria =
      useFocusRing({ autoFocus });

    const { onClick: onDripClickHandler, ...dripBindings } = useDrip(
      false,
      buttonRef
    );

    /* eslint-enable @typescript-eslint/no-unused-vars */
    if (__DEV__ && filteredProps.color === 'gradient' && (flat || light)) {
      useWarning(
        'Using the gradient color on flat and light buttons will have no effect.'
      );
    }
    const hasIcon = icon || iconRight;
    const isRight = Boolean(iconRight);

    const getState = useMemo(() => {
      if (isPressed) return 'pressed';
      if (isHovered) return 'hovered';
      return disabled ? 'disabled' : 'ready';
    }, [disabled, isHovered, isPressed]);

    const getIconCss = useMemo<any>(() => {
      if (isRight) return iconRightCss;
      return iconLeftCss;
    }, [isRight, iconRightCss, iconLeftCss]);

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
        data-state={getState}
        animated={animated}
        isPressed={isPressed}
        isHovered={isHovered || (ghost && isFocused)}
        isFocusVisible={isFocusVisible && !disabled}
        className={clsx(
          'nextui-button',
          `nextui-button--${getState}`,
          className
        )}
        css={{
          ...(css as any),
          ...cssColors
        }}
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
      >
        {React.Children.count(children) === 0 ? (
          <ButtonIcon
            isSingle
            isAuto={auto}
            isRight={isRight}
            css={getIconCss}
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
              css={getIconCss}
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
  Button.displayName = 'NextUI.Button';
}

Button.toString = () => '.nextui-button';

export default withDefaults(Button, defaultProps) as ButtonComponent<
  HTMLElement,
  ButtonProps
>;
