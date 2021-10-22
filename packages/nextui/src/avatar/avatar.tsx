import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  NormalSizes,
  NormalColors,
  SimpleColors,
  NormalWeights
} from '../utils/prop-types';
import useTheme from '../use-theme';
import AvatarGroup from './avatar-group';
import { getNormalColor, addColorAlpha } from '../utils/color';
import clsx from '../utils/clsx';
import { getNormalWeight } from '../utils/dimensions';

interface Props {
  src?: string;
  stacked?: boolean;
  zoomed?: boolean;
  bordered?: boolean;
  icon?: React.ReactNode;
  color?: NormalColors | string;
  textColor?: SimpleColors | string;
  pointer?: boolean;
  alt?: string;
  text?: string;
  size?: NormalSizes | number;
  borderWeight?: NormalWeights;
  squared?: boolean;
  className?: string;
}

const defaultProps = {
  text: '',
  stacked: false,
  size: 'medium' as NormalSizes | number,
  borderWeight: 'normal' as NormalWeights,
  textColor: 'default' as SimpleColors,
  squared: false,
  zoomed: false,
  className: ''
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
    xlarge: '4.3rem'
  };
  if (typeof size === 'number') return `${size}px`;
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
  borderWeight,
  squared,
  zoomed,
  bordered,
  color,
  textColor,
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
  const [ready, setReady] = useState(false);
  const width = useMemo(() => getSize(size), [size]);
  const border = useMemo(() => getNormalWeight(borderWeight), [borderWeight]);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    imgRef?.current?.complete && setReady(true);
  }, []);

  const avatarColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.accents_2),
    [color, theme.palette]
  );
  const avatarTextColor = useMemo(
    () => getNormalColor(textColor, theme.palette, theme.palette.text),
    [textColor, theme.palette]
  );

  const hoverBackground = useMemo(
    () =>
      color === 'gradient' || !bordered
        ? avatarColor
        : addColorAlpha(avatarColor, 0.6),
    [color, avatarColor, bordered]
  );

  return (
    <span
      className={clsx(
        'avatar',
        { bordered, 'only-text-avatar': showText },
        className
      )}
      {...props}
    >
      <span className="avatar-bg" />
      {!showText && (
        <img
          ref={imgRef}
          className={clsx('avatar-img', { 'avatar-ready': ready })}
          src={src}
          alt={alt}
          onLoad={() => setReady(true)}
        />
      )}
      {showText && !icon && (
        <span className="avatar-text">{safeText(text)}</span>
      )}
      {icon && <span className="icon">{icon}</span>}
      <style jsx>{`
        .avatar {
          position: relative;
          z-index: 1;
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
          transition: all 0.25s ease;
        }
        .avatar-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: ${width};
          height: ${width};
          background: ${avatarColor};
          transition: all 0.25s ease;
        }
        .avatar.bordered {
          padding: ${border};
        }
        .avatar:first-child {
          margin: 0;
        }
        .avatar-img {
          z-index: 99;
          opacity: 0;
          display: flex;
          border-radius: 50%;
          background: ${theme.palette.background};
          border-radius: ${radius};
          transition: transform 250ms ease 0ms, opacity 200ms ease-in 0ms;
        }
        .avatar-ready {
          opacity: 1;
        }
        .bordered .avatar-img {
          border: ${border} solid ${theme.palette.background};
        }
        .avatar-text {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: calc(0.8em + ${width} * 0.1);
          text-align: center;
          color: ${avatarTextColor};
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
        .bordered:hover .avatar-bg {
          background: ${hoverBackground};
          filter: ${color === 'gradient' ? 'opacity(0.6)' : 'none'};
        }
        .avatar:hover .avatar-img {
          transform: ${zoomed && 'scale(1.125)'};
        }
        .avatar:hover .avatar-bg {
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
