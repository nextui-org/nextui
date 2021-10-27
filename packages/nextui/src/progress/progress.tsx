import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import clsx from '../utils/clsx';
import { NormalColors, NormalWeights } from '../utils/prop-types';
import { getNormalColor } from '../utils/color';
import withDefaults from '../utils/with-defaults';
import { getNormalWeight } from '../utils/dimensions';

interface Props {
  color?: NormalColors | string;
  borderWeight?: NormalWeights;
  bordered?: boolean;
  value: number;
  max?: number;
}

const defaultProps = {
  color: 'primary' as NormalColors | string,
  borderWeight: 'normal' as NormalWeights,
  bordered: false,
  max: 100
};

type NativeAttrs = Omit<
  Partial<React.ImgHTMLAttributes<unknown> & React.HTMLAttributes<unknown>>,
  keyof Props
>;

export type ProgressBarProps = Props & typeof defaultProps & NativeAttrs;

const ProgressBar: React.FC<ProgressBarProps> = ({
  color,
  value,
  max,
  borderWeight,
  bordered,
  ...props
}) => {
  const theme = useTheme();
  const border = useMemo(() => getNormalWeight(borderWeight), [borderWeight]);

  const currentValue = value >= max ? max : (value / max) * 100;

  const fillerColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.accents_2),
    [color, theme.palette]
  );

  return (
    <div className={clsx('progress-bar', { bordered })} {...props}>
      <div className="filler"></div>
      <style jsx>
        {`
          .progress-bar {
            margin: 0;
            padding: 0;
            width: 100%;
            min-width: 50px;
            height: 20px;
            background: #eaeaea;
            border-radius: ${theme.layout.radius};
          }
          .progress-bar.bordered {
            padding: ${border};
          }
          .filler {
            margin: 0;
            padding: 0;
            width: ${currentValue}%;
            min-width: inherit;
            height: 100%;
            background: ${fillerColor};
            border-radius: inherit;
          }
        `}
      </style>
    </div>
  );
};

ProgressBar.defaultProps = defaultProps;

export default withDefaults(React.memo(ProgressBar), defaultProps);
