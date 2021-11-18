import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import { NormalColors, NormalSizes } from '../utils/prop-types';
import withDefaults from '../utils/with-defaults';
import { addColorAlpha, getNormalColor } from '../utils/color';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import { getShadowColor, getSizes } from './styles';
import { valueToPercent } from '../utils/numbers';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props extends DefaultProps {
  value: number;
  striped?: boolean;
  animated?: boolean;
  squared?: boolean;
  indeterminated?: boolean;
  shadow?: boolean;
  max?: number;
  min?: number;
  size?: NormalSizes;
  color?: NormalColors | string;
  status?: NormalColors | string;
  bgColor?: NormalColors | string;
  className?: string;
}

const defaultProps = {
  color: 'primary' as NormalColors | string,
  status: 'default' as NormalColors | string,
  size: 'md' as NormalSizes,
  striped: false,
  animated: true,
  squared: false,
  shadow: false,
  indeterminated: false,
  value: 0,
  min: 0,
  max: 100,
  className: ''
};

type NativeAttrs = Omit<
  Partial<
    React.ProgressHTMLAttributes<unknown> & React.HTMLAttributes<unknown>
  >,
  keyof Props
>;

export type ProgressBarProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-progress';

const ProgressBar: React.FC<ProgressBarProps> = ({
  color,
  value: valueProp,
  max,
  min,
  striped,
  status,
  animated,
  shadow,
  squared,
  size,
  bgColor: bgColorProp,
  indeterminated,
  className,
  ...props
}) => {
  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

  const value = useMemo(
    () => (valueProp > max ? max : valueProp < min ? min : valueProp),
    [valueProp, min, max]
  );

  const percent = useMemo(
    () => valueToPercent(value, min, max),
    [value, min, max]
  );

  const fillerColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.primary),
    [color, theme.palette]
  );

  const shadowColor = useMemo(
    () => (shadow ? getShadowColor(color, theme.palette) : 'none'),
    [color, shadow, theme.palette]
  );

  const { height, radius } = useMemo(
    () => getSizes(size, squared),
    [size, squared]
  );

  const bgColor = useMemo(() => {
    if (bgColorProp) {
      return getNormalColor(bgColorProp, theme.palette, bgColorProp);
    }
    if (status === 'default') {
      return theme.palette.accents_2;
    }
    const normalColor = getNormalColor(
      status,
      theme.palette,
      theme.palette.accents_2
    );
    return addColorAlpha(normalColor, 0.2);
  }, [status, theme.palette]);

  return (
    <div role="progressbar" className={clsx(preClass, className)} {...props}>
      <CSSTransition
        visible
        name={`${preClass}-wrapper`}
        enterTime={10}
        leaveTime={20}
        clearTime={300}
      >
        <div
          className={clsx(`${preClass}-filler`, {
            [`${preClass}-striped`]: striped,
            [`${preClass}-indeterminated`]: indeterminated
          })}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          {...props}
        />
      </CSSTransition>
      <style jsx>
        {`
          .${preClass} {
            margin: 0;
            padding: 0;
            width: 100%;
            height: ${height};
            position: relative;
            overflow: ${!indeterminated ? 'visible' : 'hidden'};
            background: ${bgColor};
            border-radius: ${radius};
            ${stringCss};
          }
          .${preClass}-filler {
            margin: 0;
            padding: 0;
            width: 0;
            opacity: 0;
            height: 100%;
            min-width: inherit;
            background: ${fillerColor};
            border-radius: inherit;
            transition: ${animated
              ? 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none'};
            box-shadow: ${shadowColor};
            transition: all 0.25s ease;
          }
          .${preClass}-wrapper-enter {
            opacity: 0;
          }
          .${preClass}-wrapper-enter-active {
            opacity: 1;
            width: ${percent}%;
          }
          .${preClass}-filler.${preClass}-striped {
            background-image: linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.1) 25%,
              transparent 25%,
              transparent 50%,
              rgba(0, 0, 0, 0.1) 50%,
              rgba(0, 0, 0, 0.1) 75%,
              transparent 75%,
              transparent
            );
            background-size: ${theme.spacing.lg} ${theme.spacing.lg};
          }
          .${preClass}-filler.${preClass}-indeterminated {
            position: absolute;
            width: 0%;
            transition-property: background-color, width, left, border-color,
              opacity, shadow, transform;
            transition-duration: 300ms;
            will-change: left;
            min-width: 50%;
            animation: 1s ease 0s infinite normal none running
              indeterminate-animation;
          }
          @keyframes indeterminate-animation {
            0% {
              left: -40%;
            }
            100% {
              left: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

ProgressBar.defaultProps = defaultProps;

if (__DEV__) {
  ProgressBar.displayName = 'NextUI - Progress';
}

export default withDefaults(React.memo(ProgressBar), defaultProps);
