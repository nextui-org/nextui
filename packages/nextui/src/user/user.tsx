import React, { ReactNode } from 'react';
import { Avatar } from '../index';
import useTheme from '../use-theme';
import UserLink from './user-link';
import { NormalColors, NormalSizes } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
  name: ReactNode | string;
  color?: NormalColors;
  size?: NormalSizes;
  src?: string;
  className?: string;
  zoomed?: boolean;
  bordered?: boolean;
  pointer?: boolean;
  altText?: string;
  text?: string;
  squared?: boolean;
}

const defaultProps = {
  className: '',
  size: 'lg',
  squared: false,
  bordered: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type UserProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-user';

const User: React.FC<React.PropsWithChildren<UserProps>> = ({
  src,
  text,
  name,
  children,
  className,
  altText,
  color,
  squared,
  bordered,
  size,
  ...props
}) => {
  const theme = useTheme();
  const { stringCss } = getSpacingsStyles(theme, props);

  return (
    <div className={clsx(preClass, className)} {...props}>
      <Avatar
        className={`${preClass}-avatar`}
        src={src}
        color={color}
        squared={squared}
        bordered={bordered}
        text={text}
        size={size}
        alt={altText}
      />
      <div className={`${preClass}-info`}>
        <span className={`${preClass}-name`}>{name}</span>
        <span className={`${preClass}-social`}>{children}</span>
      </div>
      <style jsx>{`
        .${preClass} {
          display: inline-flex;
          padding: 0 ${theme.spacing.sm};
          justify-content: center;
          align-items: center;
          width: max-content;
          max-width: 100%;
          ${stringCss};
        }
        .${preClass}-info {
          margin-left: ${theme.spacing.sm};
          display: inline-flex;
          flex-direction: column;
          white-space: nowrap;
        }
        .${preClass}-name {
          font-size: 0.89rem;
          color: ${theme.palette.text};
          line-height: 1.1rem;
          text-transform: capitalize;
          font-weight: 500;
          max-width: 15rem;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .${preClass}-social {
          font-size: 0.75rem;
          color: ${theme.palette.accents_4};
        }
        .${preClass}-social :global(*:first-child) {
          margin-top: 0;
        }
        .${preClass}-social :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

type MemoUserComponent<P = {}> = React.NamedExoticComponent<P> & {
  Link: typeof UserLink;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

export default React.memo(User) as MemoUserComponent<ComponentProps>;
