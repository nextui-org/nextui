import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import { NormalColors, NormalSizes, SimpleColors } from '../utils/prop-types';
import withDefaults from '../utils/with-defaults';
import { addColorAlpha, getNormalColor } from '../utils/color';
import { getShadowColor, getSizes } from './styles';
import { valueToPercent } from '../utils/numbers';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props {
  value: number;
  striped?: boolean;
  animated?: boolean;
  squared?: boolean;
  indeterminated?: boolean;
  shadow?: boolean;
  max?: number;
  min?: number;
  color?: NormalColors | string;
  status?: SimpleColors | string;
  size?: NormalSizes;
  className?: string;
}

const defaultProps = {
  color: 'primary' as NormalColors | string,
  status: 'default' as SimpleColors | string,
  size: 'medium' as NormalSizes,
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

const ProgressBar: React.FC<ProgressBarProps> = ({
  color,
  value,
  max,
  min,
  striped,
  status,
  animated,
  shadow,
  squared,
  size,
  indeterminated,
  className,
  ...props
}) => {
  const theme = useTheme();

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
    <div className={clsx('progress', className)} {...props}>
      <CSSTransition
        visible
        name="progress-wrapper"
        enterTime={0}
        leaveTime={0}
        clearTime={300}
      >
        <div
          role="progressbar"
          className={clsx('filler', { striped, indeterminated })}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          {...props}
        />
      </CSSTransition>
      <style jsx>
        {`
          .progress {
            margin: 0;
            padding: 0;
            width: 100%;
            height: ${height};
            position: relative;
            overflow: ${shadow && !indeterminated ? 'visible' : 'hidden'};
            background: ${bgColor};
            border-radius: ${radius};
          }
          .filler {
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
          }
          .progress-wrapper-enter {
            opacity: 0;
          }
          .progress-wrapper-enter-active {
            opacity: 1;
            width: ${percent}%;
          }
          .filler.striped {
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
            background-size: ${theme.layout.gap} ${theme.layout.gap};
          }
          .filler.indeterminated {
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
