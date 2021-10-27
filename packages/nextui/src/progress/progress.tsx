import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import { NormalColors } from '../utils/prop-types';
import withDefaults from '../utils/with-defaults';
import { getNormalColor } from '../utils/color';
import { valueToPercent } from '../utils/numbers';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props {
  value: number;
  striped?: boolean;
  animated?: boolean;
  squared?: boolean;
  max?: number;
  min?: number;
  color?: NormalColors | string;
  className?: string;
}

const defaultProps = {
  color: 'primary' as NormalColors | string,
  striped: false,
  animated: true,
  squared: false,
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
  animated,
  squared,
  className,
  ...props
}) => {
  const theme = useTheme();

  const percent = useMemo(
    () => valueToPercent(value, min, max),
    [value, min, max]
  );

  const radius = squared ? '4px' : theme.layout.radius;

  const fillerColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.primary),
    [color, theme.palette]
  );

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
          className={clsx('filler', { striped })}
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
            min-width: 50px;
            height: 20px;
            background: ${theme.palette.accents_2};
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
