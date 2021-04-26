import React, { useMemo } from 'react';
import withDefaults from '@utils/with-defaults';
import useTheme from '@hooks/use-theme';
import { NormalTypes } from '@utils/prop-types';
import { NextUIThemesPalette } from '@theme/index';

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  type?: NormalTypes;
  size?: string | number;
  className?: '';
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
};

const getTypeColor = (type: NormalTypes, palette: NextUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  };

  return colors[type] || colors.primary;
};

type NativeAttrs = Omit<React.DetailsHTMLAttributes<unknown>, keyof Props>;
export type TextChildProps = Props & typeof defaultProps & NativeAttrs;

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = ({
  children,
  tag,
  className,
  type,
  size,
  ...props
}) => {
  const theme = useTheme();
  const Component = tag;
  const color = useMemo(() => getTypeColor(type, theme.palette), [
    type,
    theme.palette,
  ]);
  const fontSize = useMemo<string>(() => {
    if (!size) return 'inherit';
    if (typeof size === 'number') return `${size}px`;
    return size;
  }, [size]);

  return (
    <>
      <Component
        className={`${size ? 'custom-size' : ''} ${className}`}
        {...props}
      >
        {children}
      </Component>
      <style jsx>{`
        ${tag} {
          color: ${color};
        }
        .custom-size {
          font-size: ${fontSize};
        }
      `}</style>
    </>
  );
};

const MemoTextChild = React.memo(TextChild);

export default withDefaults(MemoTextChild, defaultProps);
