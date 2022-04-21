import React, { ReactNode } from 'react';
import { Avatar } from '../index';
import UserLink from './user-link';
import { NormalColors, NormalSizes } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import {
  StyledUser,
  StyledUserInfo,
  StyledUserName,
  StyledUserDesc
} from './user.styles';

interface Props {
  name: ReactNode | string;
  children?: ReactNode;
  color?: NormalColors;
  size?: NormalSizes;
  src?: string;
  zoomed?: boolean;
  bordered?: boolean;
  pointer?: boolean;
  altText?: string;
  text?: string;
  description?: string;
  squared?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  size: 'lg',
  squared: false,
  bordered: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type UserProps = Props &
  typeof defaultProps &
  NativeAttrs & { css?: CSS };

const preClass = 'nextui-user';

export const User = React.forwardRef(
  (props: UserProps, ref: ReactRef<HTMLDivElement>) => {
    const {
      src,
      text,
      name,
      children,
      altText,
      color,
      squared,
      bordered,
      size,
      description,
      ...otherProps
    } = props;

    const domRef = useDOMRef(ref);

    return (
      <StyledUser ref={domRef} {...otherProps}>
        <Avatar
          className={`${preClass}-avatar`}
          src={src}
          color={color}
          squared={squared}
          zoomed={props.zoomed}
          pointer={props.pointer}
          bordered={bordered}
          text={text}
          size={size}
          alt={altText}
        />
        <StyledUserInfo className={`${preClass}-info`}>
          <StyledUserName className={`${preClass}-name`}>{name}</StyledUserName>
          <StyledUserDesc className={`${preClass}-desc`}>
            {description || children}
          </StyledUserDesc>
        </StyledUserInfo>
      </StyledUser>
    );
  }
);

if (__DEV__) {
  User.displayName = 'NextUI.User';
}

User.toString = () => '.nextui-user';

type UserComponent<P = {}> = React.NamedExoticComponent<P> & {
  Link: typeof UserLink;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs & { css?: CSS };

export default User as UserComponent<ComponentProps>;
