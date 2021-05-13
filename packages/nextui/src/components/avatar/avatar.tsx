import React, { useMemo } from 'react';
import { NormalSizes, NormalColors } from '../../utils/prop-types';
import useTheme from '../../hooks/use-theme';
import useWarning from '../../hooks/use-warning';
import AvatarGroup from './avatar-group';
import { isColor, getNormalColor, isNormalColor } from '../../utils/color';

interface Props {
  src?: string;
  stacked?: boolean;
  zoomed?: boolean;
  bordered?: boolean;
  icon?: React.ReactNode;
  color?: NormalColors;
  pointer?: boolean;
  alt?: string;
  text?: string;
  size?: NormalSizes | number;
  squared?: boolean;
  className?: string;
}

const defaultProps = {
  text: '',
  stacked: false,
  size: 'medium' as NormalSizes | number,
  squared: false,
  zoomed: false,
  className: '',
};

type NativeAttrs = Omit<
  Partial<React.ImgHTMLAttributes<unknown> & React.HTMLAttributes<unknown>>,
  keyof Props
>;
export type AvatarProps = Props & typeof defaultProps & NativeAttrs;

const getSize = (size: NormalSizes | number): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '1.375rem',
    small: '1.823rem',
    medium: '2.43rem',
    large: '3.23rem',
    xlarge: '4.3rem',
  };
  if (typeof size === 'number') return `${size}px`;
  return sizes[size];
};

const getBorder = (size: NormalSizes | number): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '1px',
    small: '1px',
    medium: '1.5px',
    large: '2px',
    xlarge: '2.5px',
  };
  if (typeof size === 'number') return `1.5px`;
  return sizes[size];
};

const safeText = (text: string): string => {
  if (text.length <= 4) return text;
  return text.slice(0, 3);
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  stacked,
  text,
  size,
  squared,
  zoomed,
  bordered,
  color,
  icon,
  pointer,
  alt,
  className,
  ...props
}) => {
  const theme = useTheme();
  const showText = !src;
  const radius = squared ? '33%' : '50%';
  const marginLeft = stacked ? '-.625rem' : 0;
  const width = useMemo(() => getSize(size), [size]);
  const border = useMemo(() => getBorder(size), [size]);
  const avatarColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.accents_2),
    [color, theme.palette]
  );

  const background =
    color === 'gradient'
      ? `background-image: ${avatarColor}`
      : `background-color: ${avatarColor}`;

  if (color && !isNormalColor(color) && !isColor(color)) {
    useWarning(`Props "color" ${color} is not a valid color.`, 'Avatar');
  }

  return (
    <span
      className={`avatar ${bordered ? 'bordered' : ''} ${className}`}
      {...props}
    >
      {!showText && <img className="avatar-img" src={src} alt={alt} />}
      {showText && !icon && (
        <span className="avatar-text">{safeText(text)}</span>
      )}
      {icon && <span className="icon">{icon}</span>}
      <style jsx>{`
        .avatar {
          ${background};
          min-width: ${width};
          min-height: ${width};
          width: ${width};
          height: ${width};
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          border-radius: ${radius};
          vertical-align: top;
          cursor: ${pointer ? 'pointer' : 'auto'};
          margin: 0 0 0 ${marginLeft};
          transition: box-shadow, 0.25s ease;
        }
        .avatar.bordered {
          padding: ${border};
        }
        .avatar:first-child {
          margin: 0;
        }
        .avatar-img {
          display: flex;
          border-radius: 50%;
          background: ${theme.palette.background};
          border-radius: ${radius};
          transition: all 0.25s ease;
        }
        .bordered .avatar-img {
          border: ${border} solid ${theme.palette.background};
        }
        .avatar-text {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 1em;
          text-align: center;
          color: ${color ? theme.palette.background : theme.palette.text};
          transform: translate(-50%, -50%) scale(0.65);
          white-space: nowrap;
          user-select: none;
        }
        .icon {
          display: flex;
          position: absolute;
          left: 50%;
          top: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          user-select: none;
        }
        .avatar:hover .avatar-img {
          transform: ${zoomed && 'scale(1.125)'};
        }
        .avatar:hover:not(.avatar-img) {
          box-shadow: inset 0 0 40px 0 rgb(0 0 0 / 14%);
        }
      `}</style>
    </span>
  );
};

type MemoAvatarComponent<P = {}> = React.NamedExoticComponent<P> & {
  Group: typeof AvatarGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Avatar.defaultProps = defaultProps;

export default React.memo(Avatar) as MemoAvatarComponent<ComponentProps>;
