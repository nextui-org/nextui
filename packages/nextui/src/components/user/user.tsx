import React, { ReactNode } from 'react';
import { Avatar } from '../index';
import useTheme from '../../hooks/use-theme';
import UserLink from './user-link';
import { NormalColors, NormalSizes } from '../../utils/prop-types';

interface Props {
  name: ReactNode | string;
  color?: NormalColors;
  size?: NormalSizes | number;
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
  size: 32,
  squared: false,
  bordered: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type UserProps = Props & typeof defaultProps & NativeAttrs;

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

  return (
    <div className={`user ${className}`} {...props}>
      <Avatar
        src={src}
        color={color}
        squared={squared}
        bordered={bordered}
        text={text}
        size={size}
        alt={altText}
      />
      <div className="names">
        <span className="name">{name}</span>
        <span className="social">{children}</span>
      </div>
      <style jsx>{`
        .user {
          display: inline-flex;
          padding: 0 ${theme.layout.gapHalf};
          justify-content: center;
          align-items: center;
          width: max-content;
          max-width: 100%;
        }
        .names {
          margin-left: ${theme.layout.gapHalf};
          display: inline-flex;
          flex-direction: column;
          white-space: nowrap;
        }
        .name {
          font-size: 0.89rem;
          color: ${theme.palette.text};
          line-height: 1.1rem;
          text-transform: capitalize;
          font-weight: 500;
          max-width: 15rem;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .social {
          font-size: 0.75rem;
          color: ${theme.palette.accents_4};
        }
        .social :global(*:first-child) {
          margin-top: 0;
        }
        .social :global(*:last-child) {
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

User.defaultProps = defaultProps;

export default React.memo(User) as MemoUserComponent<ComponentProps>;
