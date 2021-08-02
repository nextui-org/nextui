import React, {
  useRef,
  useState,
  MouseEvent,
  useMemo,
  useImperativeHandle,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import useWarning from '../../hooks/use-warning';
import useTheme from '../../hooks/use-theme';
import ButtonDrip from './button.drip';
import ButtonLoading from './button-loading';
import {
  NormalColors,
  NormalLoaders,
  NormalSizes,
  NormalWeights,
} from '../../utils/prop-types';
import { filterPropsWithGroup } from './utils';
import { useButtonGroupContext } from './button-group-context';
import ButtonGroup from './button-group';
import ButtonIcon from './button-icon';
import {
  getButtonColors,
  getButtonCursor,
  getButtonRadius,
  getButtonDripColor,
  getShadowColor,
  getButtonSize,
} from './styles';

export interface Props {
  color?: NormalColors;
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
  weight?: NormalWeights;
  loaderType?: NormalLoaders;
  htmlType?: React.ButtonHTMLAttributes<unknown>['type'];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps = {
  color: 'default' as NormalColors,
  size: 'medium' as NormalSizes,
  htmlType: 'button' as React.ButtonHTMLAttributes<unknown>['type'],
  loaderType: 'default' as NormalLoaders,
  weight: 'normal' as NormalWeights,
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
  className: '',
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

  const [dripShow, setDripShow] = useState<boolean>(false);
  const [dripX, setDripX] = useState<number>(0);
  const [dripY, setDripY] = useState<number>(0);
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
  if (filteredProps.color === 'gradient' && (flat || light)) {
    useWarning(
      'Using the gradient color on flat and light buttons will have no effect.'
    );
  }
  const hasIcon = icon || iconRight;
  const isRight = Boolean(iconRight);

  const { bg, color, loaderBg, border, style, hover } = useMemo(
    () => getButtonColors(theme.palette, filteredProps),
    [theme.palette, filteredProps]
  );

  const radius = useMemo(() => getButtonRadius(size, rounded), [size, rounded]);

  const shadowColor = useMemo(
    () =>
      shadow ? getShadowColor(theme.palette, filteredProps.color) : 'none',
    [theme.palette, filteredProps, shadow]
  );

  const { cursor, events } = useMemo(
    () => getButtonCursor(disabled, loading),
    [disabled, loading]
  );
  const { height, minWidth, padding, width, fontSize, loaderSize } = useMemo(
    () => getButtonSize(size, auto),
    [size, auto]
  );

  const dripColor = useMemo(
    () => getButtonDripColor(theme.palette, filteredProps),
    [theme.palette, filteredProps]
  );

  const paddingForAutoMode = useMemo(
    () =>
      auto || size === 'mini'
        ? `calc(var(--next-ui-button-height) / 2 + var(--next-ui-button-padding) * .5)`
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
        ? `var(--next-ui-button-padding)`
        : 0,
    [filteredProps.color, bordered]
  );

  const dripCompletedHandle = () => {
    setDripShow(false);
    setDripX(0);
    setDripY(0);
  };

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    if (animated && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDripShow(true);
      setDripX(event.clientX - rect.left);
      setDripY(event.clientY - rect.top);
    }
    onClick && onClick(event);
  };

  return (
    <button
      ref={buttonRef}
      type={htmlType}
      className={`button ${className}`}
      disabled={disabled}
      onClick={clickHandler}
      style={{
        ...style,
        ...buttonStyle,
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
          <div className={`text ${isRight ? 'right' : 'left'}`}>{children}</div>
        </div>
      ) : (
        <div className="text">{children}</div>
      )}
      {dripShow && (
        <ButtonDrip
          x={dripX}
          y={dripY}
          color={dripColor}
          onCompleted={dripCompletedHandle}
        />
      )}
      <style jsx>{`
        .button {
          background: ${bg};
          box-sizing: border-box;
          display: inline-block;
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
          outline: none;
          text-transform: capitalize;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          transition: background-color 250ms ease 0ms, filter 250ms ease 0ms,
            box-shadow 250ms ease 0ms, border 250ms ease 0ms,
            color 250ms ease 0ms, transform 250ms ease 0ms;
          position: relative;
          overflow: hidden;
          color: ${color};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadowColor};
          --next-ui-button-border-radius: ${radius};
          --next-ui-button-padding: ${padding};
          --next-ui-button-height: ${height};
          --next-ui-button-color: ${color};
          --next-ui-button-bg: ${bg};
        }
        .button:before {
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
        .button:hover:before {
          opacity: ${hoverBeforeOpacity};
        }
        .button:active {
          transform: ${animated ? 'scale(0.97)' : 'none'};
        }
        .button:hover,
        .button:focus {
          background: ${hover?.bg || 'inherit'};
          --next-ui-button-color: ${hover?.color};
          filter: ${hover?.style?.filter || 'none'};
          color: ${hover?.color};
          border-color: ${hover?.border?.color || 'transparent'};
          border-width: ${hover?.border?.width};
          padding: ${hover?.padding} !important;
          cursor: ${cursor};
          pointer-events: ${events};
        }
        .text {
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
        .text p,
        .text pre,
        .text div {
          margin: 0;
        }
        .text.left {
          padding-left: ${paddingForAutoMode};
        }
        .text.right {
          padding-right: ${paddingForAutoMode};
        }
      `}</style>
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

Button.displayName = 'NextUI - Button';
Button.defaultProps = defaultProps;

export default Button as ButtonComponent<HTMLButtonElement, ComponentProps>;
