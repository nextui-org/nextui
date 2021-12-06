import React, { ReactNode } from 'react';
import { Avatar } from '../index';
import UserLink from './user-link';
import { NormalColors, NormalSizes } from '../utils/prop-types';
import {
  StyledUser,
  StyledUserInfo,
  StyledUserName,
  StyledUserSocial,
  UserVariantsProps
} from './user.styles';

interface Props {
  name: ReactNode | string;
  color?: NormalColors;
  size?: NormalSizes;
  src?: string;
  zoomed?: boolean;
  bordered?: boolean;
  pointer?: boolean;
  altText?: string;
  text?: string;
  squared?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  size: 'lg',
  squared: false,
  bordered: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;
export type UserProps = Props &
  typeof defaultProps &
  NativeAttrs &
  UserVariantsProps;

const preClass = 'nextui-user';

const User: React.FC<React.PropsWithChildren<UserProps>> = ({
  src,
  text,
  name,
  children,
  altText,
  color,
  squared,
  bordered,
  size,
  ...props
}) => {
  return (
    <StyledUser {...props}>
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
      <StyledUserInfo className={`${preClass}-info`}>
        <StyledUserName className={`${preClass}-name`}>{name}</StyledUserName>
        <StyledUserSocial className={`${preClass}-social`}>
          {children}
        </StyledUserSocial>
      </StyledUserInfo>
    </StyledUser>
  );
};

type MemoUserComponent<P = {}> = React.NamedExoticComponent<P> & {
  Link: typeof UserLink;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

export default React.memo(User) as MemoUserComponent<ComponentProps>;
