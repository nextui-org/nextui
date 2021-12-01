import React, {
  useRef,
  useMemo,
  MouseEvent,
  useImperativeHandle,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import useWarning from '../use-warning';
import ButtonDrip from '../utils/drip';
import { NormalColors } from '../utils/prop-types';
import { filterPropsWithGroup } from './utils';
import { useButtonGroupContext } from './button-group-context';
import ButtonGroup from './button-group';
import ButtonIcon from './button-icon';
import clsx from '../utils/clsx';
import useDrip from '../use-drip';
import StyledButton, { ButtonVariantsProps } from './button.styles';
import withDefaults from '../utils/with-defaults';
import { __DEV__ } from '../utils/assertion';

export interface Props {
  light?: boolean;
  color?: NormalColors;
  flat?: boolean;
  animated?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  bordered?: boolean;
  ripple?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  clickable: true,
  ghost: false,
  bordered: false,
  ripple: true,
  animated: true,
  disabled: false
};

type NativeAttrs = Omit<
  React.ButtonHTMLAttributes<unknown>,
  keyof Props | 'css'
>;

export type ButtonProps = Props & NativeAttrs & ButtonVariantsProps;

const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ ...btnProps }, ref: React.Ref<HTMLButtonElement | null>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => buttonRef.current);
  const groupConfig = useButtonGroupContext();
  const filteredProps = filterPropsWithGroup(btnProps, groupConfig);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    flat,
    children,
    disabled,
    animated,
    light,
    ripple,
    bordered,
    borderWeight,
    onClick,
    icon,
    iconRight,
    ghost,
    clickable,
    ...props
  } = filteredProps;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  if (__DEV__ && filteredProps.color === 'gradient' && (flat || light)) {
    useWarning(
      'Using the gradient color on flat and light buttons will have no effect.'
    );
  }
  const hasIcon = icon || iconRight;
  const isRight = Boolean(iconRight);

  const { onClick: onDripClickHandler, ...dripBindings } = useDrip(
    false,
    buttonRef
  );

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || !clickable) return;
    if (animated && ripple && buttonRef.current) {
      onDripClickHandler(event);
    }
    onClick && onClick(event);
  };

  const getState = useMemo(() => {
    return disabled ? 'disabled' : 'ready';
  }, [disabled]);

  return (
    <StyledButton
      ref={buttonRef}
      borderWeight={borderWeight}
      flat={flat}
      light={light}
      ghost={ghost}
      bordered={bordered || ghost}
      clickable={clickable}
      data-state={getState}
      disabled={disabled}
      animated={animated}
      onClick={clickHandler}
      {...props}
    >
      {React.Children.count(children) === 0 ? (
        <ButtonIcon isRight={isRight} isSingle>
          {hasIcon}
        </ButtonIcon>
      ) : hasIcon ? (
        <div>
          <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
          <div
            className={clsx('nextui-button-text', {
              'nextui-button-text-right': isRight,
              'nextui-button-text-left': !isRight
            })}
          >
            {children}
          </div>
        </div>
      ) : (
        <span className="nextui-button-text">{children}</span>
      )}
      <ButtonDrip color="white" {...dripBindings} />
    </StyledButton>
  );
});

type ButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Group: typeof ButtonGroup;
};

if (__DEV__) {
  Button.displayName = 'NextUI - Button';
}

export default withDefaults(Button, defaultProps) as ButtonComponent<
  HTMLButtonElement,
  ButtonProps
>;
