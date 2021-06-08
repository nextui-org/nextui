import React, {
  useRef,
  useState,
  MouseEvent,
  useMemo,
  useImperativeHandle,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import useWarning from '@hooks/use-warning';
import useTheme from '@hooks/use-theme';
import ButtonDrip from './button.drip';
import ButtonLoading from './button-loading';
import {
  NormalColors,
  NormalLoaders,
  NormalSizes,
  NormalWeights,
} from '@utils/prop-types';
import { filterPropsWithGroup, getButtonChildrenWithIcon } from './utils';
import { useButtonGroupContext } from './button-group-context';
import ButtonGroup from './button-group';
import {
  getButtonColors,
  getButtonCursor,
  getButtonRadius,
  getButtonDripColor,
  getButtonSize,
} from './styles';

interface Props {
  color?: NormalColors;
  size?: NormalSizes;
  light?: boolean;
  bordered?: boolean;
  flat?: boolean;
  loading?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  rounded?: boolean;
  disabled?: boolean;
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
  bordered: false,
  flat: false,
  light: false,
  loading: false,
  rounded: false,
  shadow: false,
  auto: false,
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
    bordered,
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
    style: buttonStyle,
    ...props
  } = filteredProps;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  if (filteredProps.color === 'gradient' && (flat || light)) {
    useWarning(
      'Using the gradient color on flat and light buttons will have no effect.'
    );
  }
  const { bg, color, loaderBg, border, style } = useMemo(
    () => getButtonColors(theme.palette, filteredProps),
    [theme.palette, filteredProps]
  );

  const radius = useMemo(() => getButtonRadius(size, rounded), [size, rounded]);

  const { cursor, events } = useMemo(() => getButtonCursor(disabled, loading), [
    disabled,
    loading,
  ]);
  const {
    height,
    minWidth,
    padding,
    width,
    fontSize,
    loaderSize,
  } = useMemo(() => getButtonSize(size, auto), [size, auto]);

  const dripColor = useMemo(
    () => getButtonDripColor(theme.palette, filteredProps),
    [theme.palette, filteredProps]
  );

  const background =
    filteredProps.color === 'gradient' && !flat && !light
      ? `background-image: ${bg}`
      : `background-color: ${bg}`;

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

  const childrenWithIcon = useMemo(
    () =>
      getButtonChildrenWithIcon(
        auto,
        size,
        children,
        loading,
        {
          icon,
          iconRight,
        },
        filteredProps.color === 'gradient' && filteredProps.bordered
      ),
    [
      auto,
      loading,
      size,
      children,
      icon,
      iconRight,
      filteredProps.bordered,
      filteredProps.color,
    ]
  );

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
      {childrenWithIcon}
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
          ${background};
          box-sizing: border-box;
          display: inline-block;
          padding: 0 ${padding};
          height: ${height};
          line-height: ${height};
          min-width: ${minWidth};
          width: ${width};
          border-radius: ${radius};
          border: ${border?.weight || '2px'} ${border?.display || 'none'}
            ${border?.color || 'transparent'};
          font-weight: 500;
          font-size: ${fontSize};
          user-select: none;
          outline: none;
          text-transform: capitalize;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          transition: background-color 250ms ease 0ms, box-shadow 250ms ease 0ms,
            border 250ms ease 0ms, color 250ms ease 0ms,
            transform 250ms ease 0ms;
          position: relative;
          overflow: hidden;
          color: ${color};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          --next-ui-button-padding: ${padding};
          --next-ui-button-height: ${height};
          --next-ui-button-color: ${color};
          --next-ui-button-bg: ${bg};
        }
        .button:hover {
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow
            ? theme.expressiveness.shadowMedium
            : !disabled && !bordered && !flat && !light
            ? 'inset 0 0 40px 0 rgb(0 0 0 / 14%)'
            : 'none'};
          transform: translate3d(0px, ${shadow ? '-1.5px' : '0px'}, 0px);
        }
        .button :global(.text) {
          position: relative;
          z-index: 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          line-height: inherit;
          top: -1px;
        }
        .button :global(.text p),
        .button :global(.text pre),
        .button :global(.text div) {
          margin: 0;
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
