import React, { useMemo } from 'react';
import withDefaults from '../../utils/with-defaults';
import useTheme from '../../hooks/use-theme';
import { NormalColors } from '../../utils/prop-types';
import { getNormalColor } from '../../utils/color';

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  color?: NormalColors;
  size?: string | number;
  capitalize?: boolean;
  className?: '';
}

const defaultProps = {
  color: 'default' as NormalColors,
  className: '',
  capitalize: false,
};

type NativeAttrs = Omit<React.DetailsHTMLAttributes<unknown>, keyof Props>;
export type TextChildProps = Props & typeof defaultProps & NativeAttrs;

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = ({
  children,
  tag,
  className,
  color: userColor,
  capitalize,
  size,
  ...props
}) => {
  const theme = useTheme();
  const Component = tag;
  const color = useMemo(
    () => getNormalColor(userColor, theme.palette),
    [userColor, theme.palette]
  );
  const fontSize = useMemo<string>(() => {
    if (!size) return 'inherit';
    if (typeof size === 'number') return `${size}px`;
    return size;
  }, [size]);

  return (
    <React.Fragment>
      <Component
        className={`${size ? 'custom-size' : ''} ${
          capitalize ? 'capitalize' : ''
        } ${className}`}
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
        .capitalize {
          text-transform: capitalize;
        }
      `}</style>
    </React.Fragment>
  );
};

const MemoTextChild = React.memo(TextChild);

export default withDefaults(MemoTextChild, defaultProps);
