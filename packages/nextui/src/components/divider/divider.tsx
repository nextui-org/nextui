import React, { useMemo } from 'react';
import useTheme from '@hooks/use-theme';
import withDefaults from '@utils/with-defaults';
import { DividerAlign, SnippetTypes } from '@utils/prop-types';
import { getMargin } from '@utils/dimensions';
import { NextUIThemesPalette } from '@theme/index';

export type DividerTypes = SnippetTypes;

interface Props {
  x?: number;
  y?: number;
  volume?: number;
  type?: DividerTypes;
  align?: DividerAlign;
  className?: string;
}

const defaultProps = {
  x: 0,
  y: 2,
  volume: 1,
  align: 'center' as DividerAlign,
  type: 'default' as DividerTypes,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type DividerProps = Props & typeof defaultProps & NativeAttrs;

const getColor = (type: DividerTypes, palette: NextUIThemesPalette) => {
  const colors: { [key in DividerTypes]: string } = {
    default: palette.border,
    primary: palette.primary,
    lite: palette.accents_1,
    success: palette.successLight,
    warning: palette.warningLight,
    error: palette.errorLight,
    secondary: palette.secondary,
    dark: palette.foreground,
  };
  return colors[type];
};

const Divider: React.FC<React.PropsWithChildren<DividerProps>> = ({
  volume,
  type,
  x,
  y,
  align,
  children,
  className,
  ...props
}) => {
  const theme = useTheme();
  const color = useMemo(() => getColor(type, theme.palette), [
    type,
    theme.palette,
  ]);
  const alignClassName = useMemo(() => {
    if (!align || align === 'center') return '';
    if (align === 'left' || align === 'start') return 'start';
    return 'end';
  }, [align]);
  const textColor = type === 'default' ? theme.palette.foreground : color;
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
          background-color: ${color};
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
