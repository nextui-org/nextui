import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  NormalSizes,
  NormalColors,
  SimpleColors,
  NormalWeights
} from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import useTheme from '../use-theme';
import AvatarGroup from './avatar-group';
import { getNormalColor, addColorAlpha } from '../utils/color';
import { getNormalWeight } from '../utils/dimensions';
import { getSpacingsStyles } from '../utils/styles';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
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
  size: 'md' as NormalSizes | number,
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
    xs: '1.375rem',
    sm: '1.823rem',
    md: '2.43rem',
    lg: '3.23rem',
    xl: '4.3rem'
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

  const { stringCss } = getSpacingsStyles(theme, props);

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
        : !src
        ? avatarColor
        : addColorAlpha(avatarColor, 0.8),
    [src, color, avatarColor, bordered]
  );

  const getState = useMemo(() => {
    return !ready && src ? 'loading' : 'ready';
  }, [src, ready]);

  return (
    <span
      className={clsx(
        'nextui-avatar',
        { 'nextui-avatar-bordered': bordered, 'only-text-avatar': showText },
        className
      )}
      data-state={getState}
      {...props}
    >
      <span className="nextui-avatar-bg" />
      {!showText && (
        <img
          ref={imgRef}
          className={clsx('nextui-avatar-img', {
            'nextui-avatar-ready': ready
          })}
          src={src}
          alt={alt}
          data-state={getState}
          onLoad={() => setReady(true)}
        />
      )}
      {showText && !icon && (
        <span className="nextui-avatar-text">{safeText(text)}</span>
      )}
      {icon && <span className="nextui-avatar-icon">{icon}</span>}
      <style jsx>{`
        .nextui-avatar {
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
          overflow: hidden;
          border-radius: ${radius};
          vertical-align: top;
          cursor: ${pointer ? 'pointer' : 'auto'};
          margin: 0 0 0 ${marginLeft};
          transition: all 0.25s ease;
          ${stringCss}
        }
        .nextui-avatar-bg {
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
        .nextui-avatar.nextui-avatar-bordered {
          padding: ${border};
        }
        .nextui-avatar:first-child {
          ${!stringCss?.includes('margin') ? 'margin:0' : ''};
        }
        .nextui-avatar-img {
          z-index: 99;
          opacity: 0;
          display: flex;
          background: ${theme.palette.background};
          border-radius: ${radius};
          transition: transform 250ms ease 0ms, opacity 200ms ease-in 0ms;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .nextui-avatar-ready {
          opacity: 1;
        }
        .nextui-avatar-bordered .nextui-avatar-img {
          border: ${border} solid ${theme.palette.background};
        }
        .nextui-avatar-text {
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
        .nextui-avatar-icon {
          display: flex;
          position: absolute;
          left: 50%;
          top: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          user-select: none;
        }
        .nextui-avatar-bordered:hover .nextui-avatar-bg {
          background: ${hoverBackground};
          filter: ${color === 'gradient' ? 'opacity(0.8)' : 'none'};
        }
        .nextui-avatar:hover .nextui-avatar-img {
          transform: ${zoomed && 'scale(1.125)'};
        }
        .nextui-avatar:hover .nextui-avatar-bg {
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
