import React, {
  useRef,
  MouseEvent,
  useMemo,
  useImperativeHandle,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import useWarning from '../use-warning';
import useTheme from '../use-theme';
import ButtonDrip from '../utils/drip';
import ButtonLoading from './button-loading';
import {
  NormalColors,
  NormalLoaders,
  NormalSizes,
  NormalWeights
} from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { filterPropsWithGroup } from './utils';
import { useButtonGroupContext } from './button-group-context';
import ButtonGroup from './button-group';
import ButtonIcon from './button-icon';
import {
  getButtonColors,
  getButtonCursor,
  getButtonDripColor,
  getButtonSize
} from './styles';
import { getNormalShadowColor } from '../utils/color';
import { getFocusStyles, getSpacingsStyles } from '../utils/styles';
import { getNormalRadius } from '../utils/dimensions';
import { __DEV__ } from '../utils/assertion';
import clsx from '../utils/clsx';
import useDrip from '../use-drip';

export interface Props extends DefaultProps {
  color?: NormalColors | string;
  size?: NormalSizes;
  light?: boolean;
  flat?: boolean;
  loading?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  ghost?: boolean;
  borderWeight?: NormalWeights;
  loaderType?: NormalLoaders;
  htmlType?: React.ButtonHTMLAttributes<unknown>['type'];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps = {
  color: 'default' as NormalColors | string,
  size: 'md' as NormalSizes,
  htmlType: 'button' as React.ButtonHTMLAttributes<unknown>['type'],
  loaderType: 'default' as NormalLoaders,
  borderWeight: 'normal' as NormalWeights | undefined,
  flat: false,
  light: false,
  loading: false,
  rounded: false,
  shadow: false,
  auto: false,
  bordered: false,
  ghost: false,
  animated: true,
  disabled: false,
  className: ''
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;
export type ButtonProps = Props & typeof defaultProps & NativeAttrs;

const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ ...btnProps }, ref: React.Ref<HTMLButtonElement | null>) => {
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => buttonRef.current);
  const groupConfig = useButtonGroupContext();
  const filteredProps = filterPropsWithGroup(btnProps, groupConfig);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    children,
    disabled,
    loading,
    shadow,
    animated,
    light,
    flat,
    rounded,
    onClick,
    auto,
    size,
    icon,
    htmlType,
    iconRight,
    className,
    loaderType,
    bordered,
    ghost,
    style: buttonStyle,
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

  const { stringCss } = getSpacingsStyles(theme, props);

  const { bg, color, loaderBg, border, style, hover } = useMemo(
    () => getButtonColors(theme, filteredProps),
    [theme, filteredProps]
  );

  const radius = useMemo(() => getNormalRadius(size, rounded), [size, rounded]);

  const shadowColor = useMemo(
    () =>
      shadow ? getNormalShadowColor(filteredProps.color, theme.palette) : '',
    [theme.palette, filteredProps, shadow]
  );

  const { cursor, events } = useMemo(
    () => getButtonCursor(disabled, loading),
    [disabled, loading]
  );

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

  const { height, minWidth, padding, width, fontSize, loaderSize } = useMemo(
    () => getButtonSize(size, auto),
    [size, auto]
  );

  const dripColor = useMemo(
    () => getButtonDripColor(theme.palette, filteredProps),
    [theme.palette, filteredProps]
  );

  const { onClick: onDripClickHandler, ...dripBindings } = useDrip(
    false,
    buttonRef
  );

  const paddingForAutoMode = useMemo(
    () =>
      auto || size === 'xs'
        ? `calc(var(--nextui-button-height) / 2 + var(--nextui-button-padding) * .5)`
        : 0,
    [auto, size]
  );

  const hoverBeforeOpacity = useMemo(
    () => (filteredProps.color === 'gradient' && ghost ? 1 : 0),
    [ghost, filteredProps]
  );

  const paddingForBorderedGradient = useMemo(
    () =>
      filteredProps.color === 'gradient' && (bordered || ghost)
        ? `var(--nextui-button-padding)`
        : 0,
    [filteredProps.color, bordered]
  );

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    if (animated && buttonRef.current) {
      onDripClickHandler(event);
    }
    onClick && onClick(event);
  };

  // to avoid passing borderweight prop to the html button element
  delete props.borderWeight;

  return (
    <button
      ref={buttonRef}
      type={htmlType}
      className={clsx(
        'nextui-button',
        { 'nextui-button-disabled': disabled },
        focusClassName,
        className
      )}
      disabled={disabled}
      onClick={clickHandler}
      style={{
        ...style,
        ...buttonStyle
      }}
      {...props}
    >
      {loading && (
        <ButtonLoading
          size={loaderSize}
          type={loaderType}
          color={color}
          background={loaderBg}
        />
      )}
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
        <div className="nextui-button-text">{children}</div>
      )}
      <ButtonDrip color={dripColor} {...dripBindings} />
      <style jsx>{`
        .nextui-button {
          background: ${bg};
          box-sizing: border-box;
          display: flex;
          align-items: center;
          padding: 0 ${padding};
          height: ${height};
          line-height: ${height};
          min-width: ${minWidth};
          width: ${width};
          border-radius: ${radius};
          border: ${border?.width || '2px'} ${border?.display || 'none'}
            ${border?.color || 'transparent'};
          font-weight: 500;
          font-size: ${fontSize};
          user-select: none;
          text-transform: capitalize;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          transition: all 250ms ease;
          position: relative;
          overflow: hidden;
          color: ${color};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadowColor};
          ${stringCss};
          --nextui-button-border-radius: ${radius};
          --nextui-button-padding: ${padding};
          --nextui-button-height: ${height};
          --nextui-button-color: ${color};
          --nextui-button-bg: ${bg};
        }
        .nextui-button:before {
          content: '';
          background: ${hover?.bg};
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius: ${radius};
          transition: all 0.2s ease;
          z-index: 1;
          opacity: 0;
        }
        .nextui-button:hover:before {
          opacity: ${hoverBeforeOpacity};
        }
        .nextui-button:not(.nextui-button-disabled):active {
          transform: ${animated ? 'scale(0.97)' : 'none'};
        }
        .nextui-button:hover,
        .nextui-button:focus {
          background: ${hover?.bg || 'inherit'};
          --nextui-button-color: ${hover?.color};
          filter: ${hover?.style?.filter || 'none'};
          color: ${hover?.color};
          border-color: ${hover?.border?.color || 'transparent'};
          border-width: ${hover?.border?.width};
          padding: ${hover?.padding} !important;
          cursor: ${cursor};
          pointer-events: ${events};
        }
        .nextui-button-text {
          position: relative;
          z-index: 1;
          transform: translateY(
            -${bordered || ghost ? border?.width || '2px' : '0'}
          );
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          line-height: inherit;
          padding: 0 ${paddingForBorderedGradient};
          opacity: ${loading ? 0 : 1};
        }
        .nextui-button-text p,
        .nextui-button-text pre,
        .nextui-button-text div {
          margin: 0;
        }
        .nextui-button-text.nextui-button-text-left {
          padding-left: ${paddingForAutoMode};
        }
        .nextui-button-text.nextui-button-text-right {
          padding-right: ${paddingForAutoMode};
        }
      `}</style>
      {focusStyles}
    </button>
  );
});

type ButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Group: typeof ButtonGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

if (__DEV__) {
  Button.displayName = 'NextUI - Button';
}

Button.defaultProps = defaultProps;

export default Button as ButtonComponent<HTMLButtonElement, ComponentProps>;
