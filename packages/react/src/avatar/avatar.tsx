import React, { useMemo, useState, useRef, useEffect } from 'react';
import AvatarGroup from './avatar-group';
import { CSS } from '../theme/stitches.config';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import StyledAvatar, { AvatarVariantsProps } from './avatar.styles';
import clsx from '../utils/clsx';

interface Props {
  text?: string;
  src?: string;
  icon?: React.ReactNode;
  alt?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<
  Partial<React.ImgHTMLAttributes<unknown> & React.HTMLAttributes<unknown>>,
  keyof Props | 'sizes'
>;

export type AvatarProps = Props &
  AvatarVariantsProps &
  NativeAttrs & { css?: CSS };

const safeText = (text: string): string => {
  if (text?.length <= 4) return text;
  return text?.slice(0, 3);
};

export const Avatar = React.forwardRef(
  (props: AvatarProps, ref: ReactRef<HTMLSpanElement>) => {
    const { src, text, icon, alt, className, ...otherProps } = props;

    const domRef = useDOMRef(ref);

    const showText = !src;
    const [ready, setReady] = useState(false);

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      imgRef?.current?.complete && setReady(true);
    }, []);

    const getState = useMemo(() => {
      return !ready && src ? 'loading' : 'ready';
    }, [src, ready]);

    return (
      <StyledAvatar
        ref={domRef}
        className={clsx(
          {
            'only-text-avatar': showText
          },
          className
        )}
        data-state={getState}
        {...otherProps}
      >
        <span className="nextui-avatar-bg" />
        {!showText && (
          <img
            ref={imgRef}
            className={clsx('nextui-avatar-img', `nextui-avatar--${getState}`, {
              'nextui-avatar-ready': ready
            })}
            src={src}
            alt={alt}
            data-state={getState}
            onLoad={() => setReady(true)}
          />
        )}
        {showText && !icon && text && (
          <span className="nextui-avatar-text">{safeText(text)}</span>
        )}
        {icon && <span className="nextui-avatar-icon">{icon}</span>}
      </StyledAvatar>
    );
  }
);

type AvatarComponent<P = {}> = React.NamedExoticComponent<P> & {
  Group: typeof AvatarGroup;
};

if (__DEV__) {
  Avatar.displayName = 'NextUI.Avatar';
}

Avatar.toString = () => '.nextui-avatar';

export default Avatar as AvatarComponent<AvatarProps>;
