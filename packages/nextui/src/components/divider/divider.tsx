import React, { useMemo } from 'react';
import useTheme from '../../hooks/use-theme';
import withDefaults from '../../utils/with-defaults';
import { DividerAlign, SnippetTypes } from '../../utils/prop-types';
import { getMargin } from '../../utils/dimensions';
import { getNormalColor } from '../../utils/color';

export type DividerTypes = SnippetTypes;

interface Props {
  x?: number;
  y?: number;
  volume?: number;
  color?: DividerTypes | string;
  align?: DividerAlign;
  className?: string;
}

const defaultProps = {
  x: 0,
  y: 2,
  volume: 1,
  align: 'center' as DividerAlign,
  color: 'default' as DividerTypes,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type DividerProps = Props & typeof defaultProps & NativeAttrs;

const Divider: React.FC<React.PropsWithChildren<DividerProps>> = ({
  volume,
  color,
  x,
  y,
  align,
  children,
  className,
  ...props
}) => {
  const theme = useTheme();
  const bgColor = useMemo(
    () => getNormalColor(color, theme.palette),
    [color, theme.palette]
  );
  const alignClassName = useMemo(() => {
    if (!align || align === 'center') return '';
    if (align === 'left' || align === 'start') return 'start';
    return 'end';
  }, [align]);
  const textColor =
    color === 'default' || color === 'gradient'
      ? theme.palette.foreground
      : color;
  const top = y ? getMargin(y / 2) : 0;
  const left = x ? getMargin(x / 2) : 0;

  return (
    <div role="separator" className={`divider ${className}`} {...props}>
      {children && <span className={`text ${alignClassName}`}>{children}</span>}
      <style jsx>{`
        .divider {
          width: auto;
          max-width: 100%;
          height: calc(${volume} * 1px);
          background: ${bgColor};
          margin: ${top} ${left};
          position: relative;
        }
        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          min-height: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50%, -50%);
          padding: 0 ${theme.layout.gap};
          font-size: 1rem;
          font-weight: bold;
          text-transform: capitalize;
          background-color: ${theme.palette.background};
          color: ${textColor};
          z-index: 10;
        }
        .text.start {
          transform: translateY(-50%);
          left: 7%;
        }
        .text.end {
          transform: translateY(-50%);
          left: auto;
          right: 7%;
        }
      `}</style>
    </div>
  );
};

const MemoDivider = React.memo(Divider);

export default withDefaults(MemoDivider, defaultProps);
