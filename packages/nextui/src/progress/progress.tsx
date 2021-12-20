import React, { useMemo } from 'react';
import CSSTransition from '../utils/css-transition';
import withDefaults from '../utils/with-defaults';
import { valueToPercent } from '../utils/numbers';
import { CSS } from '../theme/stitches.config';
import {
  StyledProgress,
  StyledProgressBar,
  ProgressVariantsProps
} from './progress.styles';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props {
  value: number;
  striped?: boolean;
  animated?: boolean;
  indeterminated?: boolean;
  shadow?: boolean;
  max?: number;
  min?: number;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  striped: false,
  animated: true,
  shadow: false,
  indeterminated: false,
  value: 0,
  min: 0,
  max: 100
};

type NativeAttrs = Omit<
  Partial<
    React.ProgressHTMLAttributes<unknown> & React.HTMLAttributes<unknown>
  >,
  keyof Props
>;

export type ProgressProps = Props &
  typeof defaultProps &
  NativeAttrs &
  ProgressVariantsProps;

const preClass = 'nextui-progress';

const Progress: React.FC<ProgressProps> = ({
  value: valueProp,
  max,
  min,
  striped,
  animated,
  shadow,
  indeterminated,
  css,
  ...props
}) => {
  const value = useMemo(
    () => (valueProp > max ? max : valueProp < min ? min : valueProp),
    [valueProp, min, max]
  );

  const percent = useMemo(
    () => valueToPercent(value, min, max),
    [value, min, max]
  );

  return (
    <StyledProgress
      role="progressbar"
      indeterminated={indeterminated}
      css={{
        'nextui-progress-wrapper-enter': {
          opacity: 0
        },
        '.nextui-progress-wrapper-enter-active': {
          opacity: 1,
          width: `${percent}%`
        },
        ...(css as any)
      }}
      {...props}
    >
      <CSSTransition
        visible
        name={`${preClass}-wrapper`}
        enterTime={10}
        leaveTime={20}
        clearTime={300}
      >
        <StyledProgressBar
          className={clsx(`${preClass}-bar`, {
            [`${preClass}-striped`]: striped,
            [`${preClass}-indeterminated`]: indeterminated
          })}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          striped={striped}
          animated={animated}
          shadow={shadow}
          indeterminated={indeterminated}
          {...props}
        />
      </CSSTransition>
    </StyledProgress>
  );
};

if (__DEV__) {
  Progress.displayName = 'NextUI - Progress';
}

const MemoProgress = React.memo(Progress);

export default withDefaults(MemoProgress, defaultProps);
