import React, { useContext, useMemo } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import clsx from '../utils/clsx';
import { CardContext } from './card-context';
import { addColorAlpha, getNormalColor } from '../utils/color';
import { NormalColors, NormalWeights, SimpleColors } from '../utils/prop-types';
import { getNormalWeight } from '../utils/dimensions';

interface Props {
  blur?: boolean;
  autoMargin?: boolean;
  border?: boolean;
  className?: string;
  width?: string;
  height?: string;
  color?: NormalColors | string;
  borderColor?: SimpleColors | string;
  borderWeight?: NormalWeights;
  noPadding?: boolean;
}

const defaultProps = {
  autoMargin: false,
  blur: false,
  border: false,
  width: '100%',
  height: 'auto',
  noPadding: false,
  borderWeight: 'light' as NormalWeights,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardFooterProps = Props & typeof defaultProps & NativeAttrs;

const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = ({
  children,
  blur,
  className,
  color,
  width,
  height,
  border: borderProp,
  borderColor,
  borderWeight,
  noPadding,
  autoMargin: autoMarginProp,
  ...props
}) => {
  const theme = useTheme();
  const { background, autoMargin: autoMarginContext } = useContext(CardContext);

  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  const bgColor = useMemo(() => {
    if (color) {
      return getNormalColor(color, theme.palette);
    }
    return background || theme.palette.background;
  }, [color, theme.palette, background]);

  const border = useMemo(() => {
    if (!borderProp) return 'none';
    return `${getNormalWeight(borderWeight)} solid ${getNormalColor(
      borderColor,
      theme.palette,
      theme.palette.border
    )}`;
  }, [borderWeight, theme.palette, borderColor, borderProp]);

  return (
    <div
      className={clsx(
        'card-footer',
        { 'auto-margin': autoMargin, blur, 'no-padding': noPadding },
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .card-footer {
          width: ${width};
          height: ${height};
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          display: flex;
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: ${bgColor};
          font-size: 0.875rem;
          border-top: ${border};
          border-bottom-left-radius: ${theme.radius.lg};
          border-bottom-right-radius: ${theme.radius.lg};
        }
        .card-footer.blur {
          backdrop-filter: saturate(180%) blur(10px);
          background: ${addColorAlpha(bgColor, 0.4)};
        }
        .card-footer.no-padding {
          padding: 0;
        }
        .auto-margin :global(*) {
          margin-top: 0;
          margin-bottom: 0;
          margin-right: calc(${theme.spacing.sm} * 0.5);
        }
      `}</style>
    </div>
  );
};

const MemoCardFooter = React.memo(CardFooter);

export default withDefaults(MemoCardFooter, defaultProps);
